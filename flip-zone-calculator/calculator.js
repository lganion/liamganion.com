// 2026 NBA Rookie Scale - Year 1 salaries (100% scale)
const ROOKIE_SCALE = {
    1: 11521600, 2: 10308600, 3: 9257400, 4: 8346400, 5: 7558200,
    6: 6864700, 7: 6266700, 8: 5741000, 9: 5277100, 10: 5013400,
    11: 4762600, 12: 4524600, 13: 4298300, 14: 4083600, 15: 3879200,
    16: 3685300, 17: 3500900, 18: 3326100, 19: 3176300, 20: 3049000,
    21: 2927100, 22: 2810200, 23: 2697900, 24: 2590100, 25: 2486100,
    26: 2403800, 27: 2334400, 28: 2319900, 29: 2303300, 30: 2286500
};

// Annual salary cap increase projection (~10% per year based on recent trends)
const CAP_GROWTH_RATE = 0.10;

// Second round / two-way / undrafted compensation
const SECOND_ROUND_SALARY = 636435; // Two-way contract value
const SECOND_ROUND_EXCEPTION_MAX = 2233000; // Second round pick exception max year 1

// Estimate rookie scale for future years (years 2-4 get annual raises of ~5%)
const ROOKIE_ANNUAL_RAISE = 0.05;

function getFirstYearSalary(pick) {
    if (pick >= 1 && pick <= 30) {
        return ROOKIE_SCALE[pick];
    }
    // Second round picks: best case is the second-round pick exception
    if (pick >= 31 && pick <= 45) {
        return SECOND_ROUND_EXCEPTION_MAX;
    }
    // Late second round and undrafted: two-way or minimum
    return SECOND_ROUND_SALARY;
}

function isFirstRound(pick) {
    return pick >= 1 && pick <= 30;
}

function calculateNBAPath(pick) {
    const years = [];
    const firstYear = getFirstYearSalary(pick);

    if (isFirstRound(pick)) {
        // First round: 4-year rookie scale (years 1-2 guaranteed, years 3-4 team options)
        for (let i = 0; i < 4; i++) {
            const salary = Math.round(firstYear * Math.pow(1 + ROOKIE_ANNUAL_RAISE, i));
            years.push({
                year: i + 1,
                salary: salary,
                status: i < 2 ? 'Guaranteed' : 'Team Option',
                guaranteed: i < 2
            });
        }
    } else {
        // Second round / undrafted: non-guaranteed, likely two-way
        years.push({
            year: 1,
            salary: firstYear,
            status: 'Non-Guaranteed',
            guaranteed: false
        });
        // If they stick: minimum salary years 2-4 (optimistic)
        const minSalary = 1200000; // Approximate minimum
        for (let i = 1; i < 4; i++) {
            years.push({
                year: i + 1,
                salary: Math.round(minSalary * Math.pow(1 + ROOKIE_ANNUAL_RAISE, i)),
                status: 'Non-Guaranteed',
                guaranteed: false
            });
        }
    }

    return years;
}

function calculateCollegeThenNBAPath(currentPick, collegeComp, yearsRemaining, improvement) {
    const years = [];

    // College years
    for (let i = 0; i < yearsRemaining; i++) {
        // College comp may grow slightly year over year as the market rises
        const yearComp = Math.round(collegeComp * Math.pow(1.05, i));
        years.push({
            year: i + 1,
            salary: yearComp,
            status: 'College (NIL + Rev Share)',
            guaranteed: true, // Assuming deal holds
            isCollege: true
        });
    }

    // Improved draft position after returning
    let improvedPick = Math.max(1, currentPick - improvement);
    // Cap at 60 (can't fall past undrafted)
    improvedPick = Math.min(60, improvedPick);

    // NBA years after college (fill remaining years of the 4-year window)
    const nbaYears = 4 - yearsRemaining;
    if (nbaYears > 0) {
        const futureFirstYear = getFirstYearSalary(improvedPick);
        // Future salary adjusted for cap growth over the years spent in college
        const capAdjusted = Math.round(futureFirstYear * Math.pow(1 + CAP_GROWTH_RATE, yearsRemaining));

        for (let i = 0; i < nbaYears; i++) {
            const salary = Math.round(capAdjusted * Math.pow(1 + ROOKIE_ANNUAL_RAISE, i));
            const isFirstRd = isFirstRound(improvedPick);
            years.push({
                year: yearsRemaining + i + 1,
                salary: salary,
                status: isFirstRd
                    ? (i < 2 ? 'Guaranteed (Rookie Scale)' : 'Team Option')
                    : 'Non-Guaranteed',
                guaranteed: isFirstRd && i < 2,
                isCollege: false
            });
        }
    }

    return years;
}

function formatMoney(amount) {
    if (amount >= 1000000) {
        const millions = amount / 1000000;
        return '$' + millions.toFixed(2) + 'M';
    }
    return '$' + amount.toLocaleString();
}

function formatMoneyFull(amount) {
    return '$' + amount.toLocaleString();
}

function getOrdinal(n) {
    const s = ['th', 'st', 'nd', 'rd'];
    const v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

function calculate() {
    const pick = parseInt(document.getElementById('draft-pick').value);
    const compRaw = document.getElementById('college-comp').value.replace(/[,$]/g, '');
    const collegeComp = parseInt(compRaw) || 0;
    const yearsRemaining = parseInt(document.getElementById('years-remaining').value);
    const improvement = parseInt(document.getElementById('improvement').value);

    // Calculate both paths
    const nbaPath = calculateNBAPath(pick);
    const collegePath = calculateCollegeThenNBAPath(pick, collegeComp, yearsRemaining, improvement);

    // Totals
    const nbaTotal = nbaPath.reduce((sum, y) => sum + y.salary, 0);
    const collegeTotal = collegePath.reduce((sum, y) => sum + y.salary, 0);

    // Guaranteed money comparison
    const nbaGuaranteed = nbaPath.filter(y => y.guaranteed).reduce((sum, y) => sum + y.salary, 0);
    const collegeGuaranteed = collegePath.filter(y => y.guaranteed || y.isCollege).reduce((sum, y) => sum + y.salary, 0);

    // Render NBA path
    document.getElementById('nba-total').textContent = formatMoney(nbaTotal);
    const nbaBody = document.getElementById('nba-breakdown');
    nbaBody.innerHTML = nbaPath.map(y => `
        <tr class="${y.guaranteed ? '' : 'non-guaranteed'}">
            <td>Year ${y.year}</td>
            <td>${formatMoneyFull(y.salary)}</td>
            <td><span class="status-badge ${y.guaranteed ? 'guaranteed' : 'option'}">${y.status}</span></td>
        </tr>
    `).join('');

    // NBA notes
    const nbaNotes = document.getElementById('nba-notes');
    if (isFirstRound(pick)) {
        nbaNotes.innerHTML = `
            <p><strong>Guaranteed money:</strong> ${formatMoney(nbaGuaranteed)} (Years 1-2)</p>
            <p>Years 3-4 are team options. If the team declines, the player becomes a restricted free agent.</p>
        `;
    } else {
        nbaNotes.innerHTML = `
            <p><strong>No guaranteed money.</strong> Second-round picks and undrafted players sign non-guaranteed contracts.</p>
            <p>Many second-round picks sign two-way contracts (${formatMoneyFull(SECOND_ROUND_SALARY)}/year) and split time between the NBA and G League.</p>
        `;
    }

    // Render College path
    document.getElementById('college-total').textContent = formatMoney(collegeTotal);
    const collegeBody = document.getElementById('college-breakdown');
    const improvedPick = Math.max(1, Math.min(60, pick - improvement));
    collegeBody.innerHTML = collegePath.map(y => `
        <tr class="${y.isCollege ? 'college-year' : (y.guaranteed ? '' : 'non-guaranteed')}">
            <td>Year ${y.year}</td>
            <td>${formatMoneyFull(y.salary)}</td>
            <td><span class="status-badge ${y.isCollege ? 'college' : (y.guaranteed ? 'guaranteed' : 'option')}">${y.status}</span></td>
        </tr>
    `).join('');

    // College notes
    const collegeNotes = document.getElementById('college-notes');
    let improvedPickText = '';
    if (improvement > 0) {
        improvedPickText = `Projected to improve from ${getOrdinal(pick)} to ${getOrdinal(improvedPick)} pick after returning.`;
    } else if (improvement < 0) {
        improvedPickText = `Stock projected to fall from ${getOrdinal(pick)} to ${getOrdinal(improvedPick)} pick.`;
    } else {
        improvedPickText = `Same draft projection (${getOrdinal(pick)}) after returning.`;
    }

    collegeNotes.innerHTML = `
        <p><strong>College earnings:</strong> ${formatMoney(collegeComp * yearsRemaining)} over ${yearsRemaining} year${yearsRemaining > 1 ? 's' : ''}</p>
        <p>${improvedPickText}</p>
        <p>NBA salaries adjusted for projected ${(CAP_GROWTH_RATE * 100).toFixed(0)}% annual salary cap growth.</p>
    `;

    // Verdict
    const difference = collegeTotal - nbaTotal;
    const verdictBody = document.getElementById('verdict-body');
    const absDiff = Math.abs(difference);

    if (difference > 0) {
        const pct = ((difference / nbaTotal) * 100).toFixed(1);
        verdictBody.innerHTML = `
            <div class="verdict-result college-wins">
                <div class="verdict-icon">&#8593;</div>
                <div class="verdict-text">
                    <p class="verdict-headline">Returning to school projects to earn <strong>${formatMoney(absDiff)} more</strong> over four years (+${pct}%).</p>
                    <p class="verdict-detail">This prospect is in the flip zone. The college path offers more total compensation, especially when factoring in the projected draft position improvement and rising NIL market. ${!isFirstRound(pick) ? 'As a second-round prospect, the NBA path carries significant non-guarantee risk that makes the college option even more compelling.' : ''}</p>
                </div>
            </div>
        `;
    } else if (difference < 0) {
        const pct = ((absDiff / collegeTotal) * 100).toFixed(1);
        verdictBody.innerHTML = `
            <div class="verdict-result nba-wins">
                <div class="verdict-icon">&#8595;</div>
                <div class="verdict-text">
                    <p class="verdict-headline">Entering the draft projects to earn <strong>${formatMoney(absDiff)} more</strong> over four years (+${pct}%).</p>
                    <p class="verdict-detail">The NBA path is the stronger financial play at this draft position. ${pick <= 10 ? 'For lottery picks, the rookie scale salary far exceeds what college programs can offer, even in the post-House era.' : 'However, this assumes the prospect is actually selected at this position. Draft night volatility could change the calculus.'}</p>
                </div>
            </div>
        `;
    } else {
        verdictBody.innerHTML = `
            <div class="verdict-result even">
                <div class="verdict-text">
                    <p class="verdict-headline">The two paths project to roughly equal compensation.</p>
                    <p class="verdict-detail">This is the exact edge of the flip zone. The decision comes down to non-financial factors: development trajectory, injury risk, draft class strength, and personal preference.</p>
                </div>
            </div>
        `;
    }

    // Show results
    document.getElementById('results').classList.remove('hidden');
    document.getElementById('results').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Event listeners
document.getElementById('calculate').addEventListener('click', calculate);

// Preset buttons
document.querySelectorAll('.preset').forEach(btn => {
    btn.addEventListener('click', function () {
        const value = this.dataset.value;
        document.getElementById('college-comp').value = parseInt(value).toLocaleString();
        document.querySelectorAll('.preset').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
    });
});

// Format input as user types
document.getElementById('college-comp').addEventListener('input', function () {
    const raw = this.value.replace(/[^0-9]/g, '');
    if (raw) {
        this.value = parseInt(raw).toLocaleString();
    }
    // Update preset active states
    document.querySelectorAll('.preset').forEach(b => {
        b.classList.toggle('active', b.dataset.value === raw);
    });
});

// Case study click handlers
document.querySelectorAll('.case-study').forEach(card => {
    card.addEventListener('click', function () {
        const pick = this.dataset.pick;
        const comp = this.dataset.comp;
        const years = this.dataset.years;
        const improvement = this.dataset.improvement;

        document.getElementById('draft-pick').value = pick;
        document.getElementById('college-comp').value = parseInt(comp).toLocaleString();
        document.getElementById('years-remaining').value = years;
        document.getElementById('improvement').value = improvement;

        // Update preset active state
        document.querySelectorAll('.preset').forEach(b => {
            b.classList.toggle('active', b.dataset.value === comp);
        });

        calculate();

        // Scroll to calculator
        document.querySelector('.calculator').scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

// Calculate on page load with defaults
document.addEventListener('DOMContentLoaded', calculate);
