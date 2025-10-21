// =================================================================================
// UI MODULE (ui.js)
// Handles all direct DOM manipulation and rendering.
// =================================================================================

export function populateQueenGrid(queens, queenGrid, onQueenClick) {
    queenGrid.innerHTML = '';
    const sortedQueens = queens.sort((a, b) => (a.season - b.season) || a.name.localeCompare(b.name));
    let currentSeason = -1;
    sortedQueens.forEach(q => {
        if (q.season !== currentSeason) {
            currentSeason = q.season;
            const header = document.createElement('div');
            header.className = 'col-span-full text-center text-pink-400 font-display text-2xl py-2 tracking-widest';
            let seasonTitle = '';
            if (currentSeason === 101) seasonTitle = 'Drag Den S1';
            else if (currentSeason === 102) seasonTitle = 'Drag Den S2';
            else if (currentSeason === 200) seasonTitle = 'Local Queens';
            else seasonTitle = `Drag Race PH S${currentSeason}`;
            header.textContent = seasonTitle;
            queenGrid.appendChild(header);
        }
        const card = document.createElement('div');
        card.className = 'queen-card bg-gray-800/80 rounded-lg p-2 text-center cursor-pointer border-2 border-transparent';
        card.dataset.id = q.id;
        card.innerHTML = `<img src="${q.image}" class="w-full aspect-square rounded-md object-cover" alt="${q.name}"><p class="mt-2 text-xs font-bold truncate">${q.name}</p>`;
        card.addEventListener('click', () => onQueenClick(q));
        queenGrid.appendChild(card);
    });
}

export function switchView(viewToShow, bodyContainer, episodePhase) {
    ['menu-view', 'selection-view', 'simulation-view'].forEach(id => {
        const view = document.getElementById(id);
        if (view) view.classList.add('hidden', 'opacity-0');
    });
    viewToShow.classList.remove('hidden');
    setTimeout(() => viewToShow.classList.remove('opacity-0'), 50);
    let bg = 'var(--bg-image-selection)';
    if (viewToShow.id === 'simulation-view') {
        const phaseToBg = {
            'performance': 'var(--bg-image-challenge)',
            'placements': 'var(--bg-image-runway)',
            'lipsync': 'var(--bg-image-lipsync)',
            'trackRecord': 'var(--bg-image-selection)',
            'finale': 'var(--bg-image-finale)',
            'finaleTop2': 'var(--bg-image-finale)',
            'lipsyncForTheCrown': 'var(--bg-image-lipsync)'
        };
        bg = phaseToBg[episodePhase] || 'var(--bg-image-challenge)';
    }
    bodyContainer.style.backgroundImage = bg;
}

export function updateSelectionUI(selectedCast, castList, castPlaceholder, castCounter, startButton, instructions, MIN_CAST_SIZE, MAX_CAST_SIZE) {
    castList.innerHTML = '';
    castPlaceholder.style.display = selectedCast.length === 0 ? 'block' : 'none';
    selectedCast.forEach(q => {
        const li = document.createElement('div');
        li.className = 'flex items-center bg-gray-800/80 p-2 rounded-lg';
        li.innerHTML = `<img src="${q.image}" class="w-8 h-8 rounded-full mr-3 object-cover" alt="${q.name}"><span class="font-bold text-sm">${q.name}</span>`;
        castList.appendChild(li);
    });
    castCounter.textContent = `Selected: ${selectedCast.length} / ${MAX_CAST_SIZE}`;
    const size = selectedCast.length;
    startButton.disabled = !(size >= MIN_CAST_SIZE && size <= MAX_CAST_SIZE);
    instructions.textContent = startButton.disabled ? (size < MIN_CAST_SIZE ? `Select at least ${MIN_CAST_SIZE - size} more queen(s).` : `Select between ${MIN_CAST_SIZE} and ${MAX_CAST_SIZE}.`) : 'Your cast is ready!';
    document.querySelectorAll('.queen-card').forEach(c => c.classList.toggle('selected', selectedCast.some(q => q.id === c.dataset.id)));
}

export function displayEpisodeHeader(episodeNumber, challenge, episodeHeader, phaseSubheader) {
    episodeHeader.textContent = `Episode ${episodeNumber}: ${challenge.name}`;
    phaseSubheader.innerHTML = `<p class="max-w-2xl mx-auto">${challenge.intro}</p>`;
}

export function displayAllCritiques(scores, resultsContainer) {
    const runwayThemes = ["Filipiniana Extravaganza", "Pearls & Perlas", "Mythical Creatures", "Jeepney Realness", "Divas of the Decades", "Horror-scope", "Terno-dactyl", "Flower Power", "Miss Universe Couture", "Intergalactic Drag", "Aswang Chic"];
    const theme = runwayThemes[Math.floor(Math.random() * runwayThemes.length)];
    let html = `<div class="text-center mb-6"><h3 class="text-2xl font-display tracking-widest text-pink-400">Runway Theme: ${theme}</h3><p class="text-gray-300">The judges have watched the performances and seen the runways. Here are their thoughts...</p></div>`;
    html += '<div class="space-y-4">';
    scores.forEach(s => {
        const scoreLevel = s.totalScore > 75 ? 'good' : s.totalScore > 40 ? 'safe' : 'bad';
        html += `<div class="critique-card critique-${scoreLevel} bg-black/50 p-4 rounded-lg flex items-start gap-4">
                    <img src="${s.queen.image}" class="w-16 h-16 rounded-full object-cover" alt="${s.queen.name}">
                    <div class="flex-1">
                        <p class="font-bold text-lg">${s.queen.name}</p>
                        <p class="text-sm mt-2"><span class="font-semibold text-blue-400">Challenge:</span> ${s.critiques.performance}</p>
                        <p class="text-sm mt-1"><span class="font-semibold text-pink-400">Runway:</span> ${s.critiques.runway}</p>
                    </div>
                 </div>`;
    });
    html += '</div>';
    resultsContainer.innerHTML = html;
}

export function displayPlacements(placements, phaseSubheader, resultsContainer) {
    phaseSubheader.textContent = "The Judges have made their decisions...";
    const placementOrder = { 'WIN': 0, 'HIGH': 1, 'SAFE': 2, 'LOW': 3, 'BTM': 4, 'BTM2': 4, 'ELIM': 5 };
    const sortedPlacements = [...placements].sort((a, b) => placementOrder[a.placement] - placementOrder[b.placement]);
    let html = '<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">';
    sortedPlacements.forEach(({ queen, placement }) => {
        const placementText = placement === 'BTM' ? 'BTM 2' : placement;
        const winClass = placement === 'WIN' ? 'placement-WIN-card' : '';
        const winImgClass = placement === 'WIN' ? 'placement-WIN-img' : '';
        html += `<div class="bg-black/50 p-3 rounded-lg text-center ${winClass} transition-all duration-500">
                    <img src="${queen.image}" class="w-24 h-24 rounded-full mx-auto border-4 border-gray-600 object-cover ${winImgClass}" alt="${queen.name}">
                    <p class="font-bold text-lg mt-2">${queen.name}</p>
                    <p class="font-display text-2xl tracking-widest text-pink-400">${placementText}</p>
                 </div>`;
    });
    resultsContainer.innerHTML = `<div class="text-center mb-4"><p class="text-lg italic text-gray-300">After careful deliberation...</p></div>` + html + `</div>`;
}

export function displayLipSyncResults(episodeResults, eliminatedQueens, phaseSubheader, resultsContainer) {
    phaseSubheader.textContent = "Lip Sync For Your Life!";
    const lipSyncers = episodeResults.placements.filter(p => ['BTM2', 'ELIM'].includes(p.placement)).map(p => p.queen);
    const song = episodeResults.lipSyncSong || "an epic ballad";
    if (eliminatedQueens.length === 2) {
        resultsContainer.innerHTML = `<div class="text-center space-y-4 max-w-3xl mx-auto"><h2 class="font-display text-5xl tracking-widest">LIP SYNC FOR YOUR LIFE</h2><p class="text-lg">The queens performed ${song}, but failed to impress...</p><div class="flex justify-center items-center gap-4 md:gap-8 py-8"><div class="text-center"><img src="${eliminatedQueens[0].image}" class="w-32 h-32 rounded-full mx-auto border-4 border-red-500 object-cover placement-ELIM-img" alt="${eliminatedQueens[0].name}"><p class="font-bold text-xl mt-2">${eliminatedQueens[0].name}</p></div><p class="font-display text-6xl text-pink-500">VS</p><div class="text-center"><img src="${eliminatedQueens[1].image}" class="w-32 h-32 rounded-full mx-auto border-4 border-red-500 object-cover placement-ELIM-img" alt="${eliminatedQueens[1].name}"><p class="font-bold text-xl mt-2">${eliminatedQueens[1].name}</p></div></div><p class="text-gray-300 italic text-lg">"I'm sorry my dears, but it's a no from me."</p><p class="font-display text-3xl mt-2 text-red-400">Both of you, sashay away.</p></div>`;
        return;
    }
    if (eliminatedQueens.length === 0 && lipSyncers.length === 2) {
        resultsContainer.innerHTML = `<div class="text-center space-y-4 max-w-3xl mx-auto"><h2 class="font-display text-5xl tracking-widest">LIP SYNC FOR YOUR LIFE</h2><p class="text-lg">The queens performed ${song} and set the stage on fire!</p><div class="flex justify-center items-center gap-4 md:gap-8 py-8"><div class="text-center"><img src="${lipSyncers[0].image}" class="w-32 h-32 rounded-full mx-auto border-4 border-green-400 object-cover placement-WIN-img" alt="${lipSyncers[0].name}"><p class="font-bold text-xl mt-2">${lipSyncers[0].name}</p></div><p class="font-display text-6xl text-pink-500">VS</p><div class="text-center"><img src="${lipSyncers[1].image}" class="w-32 h-32 rounded-full mx-auto border-4 border-green-400 object-cover placement-WIN-img" alt="${lipSyncers[1].name}"><p class="font-bold text-xl mt-2">${lipSyncers[1].name}</p></div></div><p class="text-gray-300 italic text-lg">"You are both winners, baby!"</p><p class="font-display text-4xl text-green-400 pt-4">Condragulations, shantay you BOTH stay.</p></div>`;
        return;
    }
    const loser = eliminatedQueens[0];
    const winner = lipSyncers.find(q => q && loser && q.id !== loser.id);
    if (!winner || !loser) {
        const queenToShow = loser || winner || lipSyncers[0];
        if (queenToShow) {
             resultsContainer.innerHTML = `<div class="text-center space-y-4 max-w-3xl mx-auto"><h2 class="font-display text-5xl tracking-widest">A FATEFUL DECISION</h2><p class="text-lg">There is no lip sync this week.</p><p class="text-gray-300 italic text-lg">The judges have decided that one queen's time has come to an end.</p><div class="flex justify-center items-center gap-4 md:gap-8 py-8"><div class="text-center"><img src="${queenToShow.image}" class="w-32 h-32 rounded-full mx-auto border-4 border-red-500 object-cover placement-ELIM-img" alt="${queenToShow.name}"><p class="font-bold text-xl mt-2">${queenToShow.name}</p></div></div><p class="font-display text-3xl mt-2 text-red-400">${queenToShow.name}, sashay away.</p></div>`;
        }
        return;
    }
    let narrative = `Both queens gave it their all, but ${winner.name}'s passion and precision on stage gave her the edge. She truly embodied the spirit of the song.`;
    resultsContainer.innerHTML = `<div class="text-center space-y-4 max-w-3xl mx-auto"><h2 class="font-display text-5xl tracking-widest">LIP SYNC FOR YOUR LIFE</h2><p class="text-lg">The bottom two queens must perform ${song}!</p><div class="flex justify-center items-center gap-4 md:gap-8 py-8"><div class="text-center"><img src="${winner.image}" class="w-32 h-32 rounded-full mx-auto border-4 border-green-400 object-cover placement-WIN-img" alt="${winner.name}"><p class="font-bold text-xl mt-2">${winner.name}</p></div><p class="font-display text-6xl text-pink-500">VS</p><div class="text-center"><img src="${loser.image}" class="w-32 h-32 rounded-full mx-auto border-4 border-red-500 object-cover placement-ELIM-img" alt="${loser.name}"><p class="font-bold text-xl mt-2">${loser.name}</p></div></div><p class="text-gray-300 italic text-lg">"${narrative}"</p><p class="font-display text-4xl text-green-400 pt-4">Shantay, you stay, ${winner.name}.</p><p class="font-display text-3xl mt-2 text-red-400">${loser.name}, sashay away.</p></div>`;
}

export function displayTrackRecord(fullCast, shuffledChallenges, resultsContainer, calculateTrackRecordScore, isFinalView = false) {
    const comprehensivePlacementOrder = { 'WINNER': 0, 'RUNNER-UP': 1, 'WIN': 2, 'HIGH': 3, 'SAFE': 4, 'LOW': 5, 'BTM2': 6, 'BTM': 6, 'ELIM': 7 };
    const sortedCast = [...fullCast].sort((a, b) => {
        if (a.eliminated && !b.eliminated) return 1;
        if (!a.eliminated && b.eliminated) return -1;
        if (a.eliminated && b.eliminated) return b.epElim - a.epElim;
        const scoreA = comprehensivePlacementOrder[a.trackRecord[a.trackRecord.length - 1]] ?? 99;
        const scoreB = comprehensivePlacementOrder[b.trackRecord[b.trackRecord.length - 1]] ?? 99;
        if (scoreA !== scoreB) return scoreA - scoreB;
        return calculateTrackRecordScore(b) - calculateTrackRecordScore(a);
    });
    let maxEpisodes = Math.max(0, ...fullCast.map(q => q.trackRecord.length));
    let tableHTML = `<div class="overflow-x-auto"><table class="w-full text-xs md:text-sm track-record-table bg-black/50"><thead><tr><th class="text-left sticky left-0 bg-gray-900/80 z-10">Queen</th>`;
    for (let i = 0; i < maxEpisodes; i++) {
        const challengeName = (shuffledChallenges[i % shuffledChallenges.length]?.name || `Ep ${i + 1}`).split(' ').join('<br>');
        tableHTML += `<th><div class="flex flex-col items-center"><span>Ep ${i + 1}</span><span class="font-normal text-gray-400 text-xs">${challengeName}</span></div></th>`;
    }
    tableHTML += `</tr></thead><tbody>`;
    sortedCast.forEach(queen => {
        const eliminatedClass = queen.eliminated && !isFinalView ? 'opacity-50' : '';
        tableHTML += `<tr class="${eliminatedClass}"><td class="text-left font-bold sticky left-0 bg-gray-800/80 z-10 flex items-center gap-2"><img src="${queen.image}" class="w-8 h-8 object-cover rounded-full" alt="${queen.name}"><span class="queen-name">${queen.name}</span></td>`;
        for (let i = 0; i < maxEpisodes; i++) {
            const placement = queen.trackRecord[i] || '';
            tableHTML += `<td class="placement-${placement}">${placement}</td>`;
        }
        tableHTML += `</tr>`;
    });
    tableHTML += `</tbody></table></div>`;
    resultsContainer.innerHTML = tableHTML;
}

export function displayTop2Results(top2, eliminated, resultsContainer) {
    resultsContainer.innerHTML = `<div class="text-center space-y-4 max-w-2xl mx-auto"><p class="text-2xl font-display tracking-widest">Based on the final performance and season-long track record, the Top 2 queens are...</p><div class="p-4 rounded-lg bg-green-900/50 text-3xl font-display tracking-widest flex items-center justify-center gap-4"><img src="${top2[0].queen.image}" class="w-16 h-16 rounded-full object-cover" alt="${top2[0].queen.name}">${top2[0].queen.name}</div><div class="p-4 rounded-lg bg-green-900/50 text-3xl font-display tracking-widest flex items-center justify-center gap-4"><img src="${top2[1].queen.image}" class="w-16 h-16 rounded-full object-cover" alt="${top2[1].queen.name}">${top2[1].queen.name}</div><p class="text-xl pt-4">This means, ${eliminated.map(q => q.name).join(' and ')}, I'm sorry my dears but this is not your time. Sashay away.</p></div>`;
}

export function displayWinner(winner, runnerUp, resultsContainer) {
    resultsContainer.innerHTML = `<div class="text-center space-y-4 max-w-2xl mx-auto"><p class="text-2xl font-display tracking-widest">Ladies, the decision is final...</p><p class="text-3xl font-display tracking-widest">The next Drag Race Philippines Superstar is...</p><div class="py-8"><img src="${winner.image}" class="w-48 h-48 rounded-full object-cover mx-auto border-8 border-amber-400 placement-WIN-img" alt="${winner.name}"><p class="text-7xl md:text-8xl font-display tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-500 animate-pulse mt-4">${winner.name}</p></div><p class="text-3xl font-display tracking-widest">Condragulations, you're a winner, baby!</p><p class="text-xl pt-4">And to our runner-up, ${runnerUp.name}, you are and will always be a star. Now, prance, my queen!</p></div>`;
}

export function updateAdvanceButton(text, advanceButton, restartButton, hide = false) {
    advanceButton.textContent = text;
    advanceButton.classList.toggle('hidden', hide);
    if (!hide) restartButton.classList.add('hidden');
}

export function showRestartButton(advanceButton, restartButton, onFinalRecordClick) {
    advanceButton.textContent = 'View Final Track Record';
    advanceButton.classList.remove('hidden');
    restartButton.classList.add('hidden');
    advanceButton.onclick = () => {
        onFinalRecordClick();
        advanceButton.classList.add('hidden');
        restartButton.classList.remove('hidden');
    };
}

// =================================================================================
// MAMA PAO MODE - UI PROMPTS
// =================================================================================

function generateStarRating(score) {
    const rating = Math.max(0, Math.min(5, score / 20));
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        const starClass = rating >= i ? 'text-yellow-400' : 'text-gray-600';
        stars += `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4 ${starClass}"><path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.007z" clip-rule="evenodd" /></svg>`;
    }
    return `<div class="flex">${stars}</div>`;
}

export function promptForCustomPlacements(scores, phaseSubheader, resultsContainer, advanceButton, onPlacementsSelected, castSize) {
    let selectedTops = [];
    let selectedBottoms = [];
    let selectionPhase = 'tops';
    const topsToSelect = castSize > 5 ? 3 : 2;
    const bottomsToSelect = castSize > 5 ? 3 : 2;

    const render = () => {
        const topsNeeded = topsToSelect - selectedTops.length;
        const bottomsNeeded = bottomsToSelect - selectedBottoms.length;
        let headerText = '';
        let confirmButtonHTML = '';

        if (selectionPhase === 'tops') {
            headerText = `Select Your Tops (${topsNeeded} remaining)`;
            if (topsNeeded === 0) confirmButtonHTML = `<div class="text-center mt-6"><button id="confirm-btn" class="main-button px-8 py-3 rounded-lg text-xl font-display tracking-widest">Confirm Tops</button></div>`;
        } else {
            headerText = `Select Your Bottoms (${bottomsNeeded} remaining)`;
            if (bottomsNeeded === 0) confirmButtonHTML = `<div class="text-center mt-6"><button id="confirm-btn" class="main-button px-8 py-3 rounded-lg text-xl font-display tracking-widest">Confirm Placements</button></div>`;
        }
        phaseSubheader.textContent = "You're the judge! Choose who soared and who flopped.";
        let html = `<div class="text-center mb-6"><h3 class="text-2xl font-display tracking-widest text-pink-400">${headerText}</h3></div><div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">`;
        scores.forEach(s => {
            const isTop = selectedTops.includes(s.queen.id);
            const isBottom = selectedBottoms.includes(s.queen.id);
            let cardClass = 'custom-placement-card';
            let isDisabled = false;

            if (isTop) cardClass += ' selected-top';
            if (isBottom) cardClass += ' selected-bottom';
            
            if (selectionPhase === 'bottoms' && isTop) {
                isDisabled = true;
                cardClass += ' dimmed'; // FIX: Add dimmed class
            } else if (selectionPhase === 'tops' && selectedTops.length >= topsToSelect && !isTop) {
                isDisabled = true;
            } else if (selectionPhase === 'bottoms' && selectedBottoms.length >= bottomsToSelect && !isBottom) {
                isDisabled = true;
            }
            
            html += `<button class="secondary-button text-left p-3 rounded-lg flex flex-col items-center h-full ${cardClass}" data-queen-id="${s.queen.id}" ${isDisabled ? 'disabled' : ''}><img src="${s.queen.image}" class="w-24 h-24 rounded-full mx-auto border-4 border-gray-600 object-cover flex-shrink-0" alt="${s.queen.name}"><p class="font-bold text-md mt-2 text-center flex-shrink-0">${s.queen.name}</p><div class="text-xs mt-2 text-left w-full space-y-1"><div><p class="font-semibold text-blue-400">Challenge:</p>${generateStarRating(s.perfScore)}</div><div><p class="font-semibold text-pink-400">Runway:</p>${generateStarRating(s.runwayScore)}</div></div></button>`;
        });
        html += `</div>${confirmButtonHTML}`;
        resultsContainer.innerHTML = html;
        addEventListeners();
    };

    const addEventListeners = () => {
        document.querySelectorAll('.custom-placement-card').forEach(card => {
            card.addEventListener('click', e => {
                const queenId = e.currentTarget.dataset.queenId;
                if (selectionPhase === 'tops') {
                    if (selectedTops.includes(queenId)) selectedTops = selectedTops.filter(id => id !== queenId);
                    else if (selectedTops.length < topsToSelect) selectedTops.push(queenId);
                } else {
                    if (selectedBottoms.includes(queenId)) selectedBottoms = selectedBottoms.filter(id => id !== queenId);
                    else if (selectedBottoms.length < bottomsToSelect) selectedBottoms.push(queenId);
                }
                render();
            });
        });

        const confirmBtn = document.getElementById('confirm-btn');
        if (confirmBtn) {
            confirmBtn.addEventListener('click', () => {
                if (selectionPhase === 'tops') {
                    if (castSize <= 5) {
                        const remainingQueens = scores.filter(s => !selectedTops.includes(s.queen.id));
                        selectedBottoms = remainingQueens.map(s => s.queen.id);
                        onPlacementsSelected(selectedTops, selectedBottoms);
                    } else {
                        selectionPhase = 'bottoms';
                        render();
                    }
                } else {
                    onPlacementsSelected(selectedTops, selectedBottoms);
                }
            });
        }
    };
    advanceButton.classList.add('hidden');
    render();
}

export function promptForWinner(topQueens, phaseSubheader, resultsContainer, advanceButton, onWinnerSelected, fullCast) {
    phaseSubheader.textContent = "Judges' Deliberations: The Tops";
    let html = `<div class="text-center mb-6"><h3 class="text-2xl font-display tracking-widest text-pink-400">From your chosen tops, select the winner(s).</h3></div><div class="space-y-3">`;
    let selectedWinners = [];
    topQueens.forEach(s => {
        const fullQueenData = fullCast.find(q => q.id === s.queen.id);
        const trackRecordHTML = fullQueenData.trackRecord.map(p => `<span class="track-record-pill placement-${p}">${p}</span>`).join(' ') || "No record yet";
        html += `<button class="secondary-button w-full p-4 rounded-lg text-left flex items-start gap-4 multi-select-winner" data-winner-id="${s.queen.id}"><img src="${s.queen.image}" class="w-16 h-16 rounded-full object-cover" alt="${s.queen.name}"><div class="flex-1"><p class="font-bold text-lg">${s.queen.name}</p><div class="text-xs mt-2 space-y-1"><div><p class="font-semibold text-blue-400">Challenge:</p>${generateStarRating(s.perfScore)}</div><div><p class="font-semibold text-pink-400">Runway:</p>${generateStarRating(s.runwayScore)}</div></div><div class="text-xs mt-2 space-y-1"><p class="font-semibold mb-1">Track Record:</p><div class="flex flex-wrap gap-1">${trackRecordHTML}</div></div></div></button>`;
    });
    html += `<div class="text-center mt-6"><button id="confirm-winners-btn" class="main-button px-8 py-3 rounded-lg text-xl font-display tracking-widest" disabled>Confirm Winner(s)</button></div>`;
    resultsContainer.innerHTML = html;
    const confirmBtn = document.getElementById('confirm-winners-btn');
    document.querySelectorAll('.multi-select-winner').forEach(btn => {
        btn.addEventListener('click', () => {
            btn.classList.toggle('selected');
            const winnerId = btn.dataset.winnerId;
            if (selectedWinners.includes(winnerId)) {
                selectedWinners = selectedWinners.filter(id => id !== winnerId);
            } else {
                selectedWinners.push(winnerId);
            }
            confirmBtn.disabled = selectedWinners.length === 0;
        });
    });
    confirmBtn.addEventListener('click', () => onWinnerSelected(selectedWinners));
    advanceButton.classList.add('hidden');
}

export function promptForBottoms(bottomQueens, phaseSubheader, resultsContainer, advanceButton, onBottomSelected, fullCast) {
    phaseSubheader.textContent = "Judges' Deliberations: The Bottoms";
    let html = `<div class="text-center mb-6"><h3 class="text-2xl font-display tracking-widest text-pink-400">From your chosen bottoms, you must save one.</h3><p class="text-gray-300">The other two will lip sync for their lives.</p></div><div class="space-y-3">`;
    bottomQueens.forEach(s => {
        const fullQueenData = fullCast.find(q => q.id === s.queen.id);
        const trackRecordHTML = fullQueenData.trackRecord.map(p => `<span class="track-record-pill placement-${p}">${p}</span>`).join(' ') || "No record yet";
        html += `<button class="secondary-button w-full p-4 rounded-lg text-left flex items-start gap-4" data-safe-id="${s.queen.id}"><img src="${s.queen.image}" class="w-16 h-16 rounded-full object-cover" alt="${s.queen.name}"><div class="flex-1"><p class="font-bold text-lg">${s.queen.name}</p><div class="text-xs mt-2 space-y-1"><div><p class="font-semibold text-blue-400">Challenge:</p>${generateStarRating(s.perfScore)}</div><div><p class="font-semibold text-pink-400">Runway:</p>${generateStarRating(s.runwayScore)}</div></div><div class="text-xs mt-2 space-y-1"><p class="font-semibold mb-1">Track Record:</p><div class="flex flex-wrap gap-1">${trackRecordHTML}</div></div></div></button>`;
    });
    html += `</div>`;
    resultsContainer.innerHTML = html;
    resultsContainer.querySelectorAll('button').forEach(btn => {
        btn.addEventListener('click', e => {
            e.currentTarget.classList.add('selected');
            resultsContainer.querySelectorAll('button').forEach(b => b.disabled = true);
            setTimeout(() => onBottomSelected(btn.dataset.safeId), 500);
        });
    });
    advanceButton.classList.add('hidden');
}

// ... the rest of the file is unchanged ...

export function promptForLipSyncWinner(episodeResults, finalScores, fullCast, phaseSubheader, resultsContainer, advanceButton, onLipSyncDecision) {
    const bottomQueens = episodeResults.placements.filter(p => p.placement === 'BTM').map(p => finalScores.find(s => s.queen.id === p.queen.id));
    if (!bottomQueens || bottomQueens.length < 2) {
        onLipSyncDecision({ eliminated: bottomQueens.map(q => q.queen) });
        return;
    }
    const [s1, s2] = bottomQueens;
    episodeResults.lipSyncSong = episodeResults.lipSyncSong || "a powerful anthem";
    let html = `<div class="text-center mb-6"><h3 class="text-2xl font-display tracking-widest text-pink-400">Two queens stand before me.</h3><p class="text-gray-300">They will lip sync to ${episodeResults.lipSyncSong}. Mama, you decide their fate.</p></div><div class="grid grid-cols-1 md:grid-cols-2 gap-4">`;
    const createButton = s => {
        const fullQueenData = fullCast.find(q => q.id === s.queen.id);
        const trackRecordHTML = fullQueenData.trackRecord.map(p => `<span class="track-record-pill placement-${p}">${p}</span>`).join(' ') || "No record yet";
        return `<button class="secondary-button w-full p-4 rounded-lg text-left flex flex-col" data-winner-id="${s.queen.id}"><div class="flex items-center gap-4"><img src="${s.queen.image}" class="w-16 h-16 rounded-full object-cover" alt="${s.queen.name}"><div class="flex-1"><p class="text-xl font-bold">${s.queen.name}</p><p class="text-sm mt-1"><span class="font-semibold">Lip Sync Stat:</span> ${s.queen.stats.lipsync}/10</p></div></div><div class="text-xs mt-3"><p class="font-semibold mb-1">Track Record:</p><div class="flex flex-wrap gap-1">${trackRecordHTML}</div></div></button>`;
    };
    html += createButton(s1);
    html += createButton(s2);
    html += `<button class="secondary-button w-full p-4 rounded-lg col-span-1 md:col-span-2 bg-green-800/70 border-green-500" data-decision="shantay"><p class="text-xl font-bold">Double Shantay</p><p class="text-sm mt-1">Condragulations, you are both safe!</p></button>`;
    html += `<button class="secondary-button w-full p-4 rounded-lg col-span-1 md:col-span-2 bg-red-800/70 border-red-500" data-decision="sashay"><p class="text-xl font-bold">Double Sashay</p><p class="text-sm mt-1">I must ask you both to sashay away.</p></button></div>`;
    resultsContainer.innerHTML = html;
    resultsContainer.querySelectorAll('button').forEach(btn => {
        btn.addEventListener('click', e => {
            e.currentTarget.classList.add('selected');
            resultsContainer.querySelectorAll('button').forEach(b => b.disabled = true);
            const decisionType = e.currentTarget.dataset.decision;
            let decision = {};
            if (decisionType === 'shantay') decision = { shantay: true, eliminated: [] };
            else if (decisionType === 'sashay') decision = { sashay: true, eliminated: [s1.queen, s2.queen] };
            else {
                const winnerId = e.currentTarget.dataset.winnerId;
                decision = { winner: winnerId === s1.queen.id ? s1.queen : s2.queen, loser: winnerId === s1.queen.id ? s2.queen : s1.queen, eliminated: [winnerId === s1.queen.id ? s2.queen : s1.queen] };
            }
            setTimeout(() => onLipSyncDecision(decision), 500);
        });
    });
    advanceButton.classList.add('hidden');
}

export function promptForTop2(finalePerformances, phaseSubheader, resultsContainer, advanceButton, onTop2Selected, calculateTrackRecordScore) {
    phaseSubheader.textContent = 'Four Queens, one crown.';
    let html = `<div class="text-center mb-6"><h3 class="text-2xl font-display tracking-widest text-pink-400">Four Queens, one crown.</h3><p class="text-gray-300">Based on their final performance and their journey so far, choose your Top 2.</p></div><div class="space-y-3">`;
    let selectedTop2 = [];
    finalePerformances.forEach(s => {
        html += `<button class="secondary-button w-full p-4 rounded-lg text-left flex items-center gap-4" data-top2-id="${s.queen.id}"><img src="${s.queen.image}" class="w-16 h-16 rounded-full object-cover" alt="${s.queen.name}"><div class="flex-1"><div class="flex justify-between items-center"><span class="text-lg font-bold">${s.queen.name}</span><div><span class="text-sm text-gray-400">Finale Perf: ${s.score.toFixed(0)}</span><span class="text-sm text-gray-400 ml-2">Track Record: ${calculateTrackRecordScore(s.queen)}</span></div></div></div></button>`;
    });
    html += `</div>`;
    resultsContainer.innerHTML = html;
    resultsContainer.querySelectorAll('button').forEach(btn => {
        btn.addEventListener('click', e => {
            e.currentTarget.classList.toggle('selected');
            const queenId = e.currentTarget.dataset.top2Id;
            if (selectedTop2.includes(queenId)) {
                selectedTop2 = selectedTop2.filter(id => id !== queenId);
            } else if (selectedTop2.length < 2) {
                selectedTop2.push(queenId);
            }
            if (selectedTop2.length === 2) {
                resultsContainer.querySelectorAll('button').forEach(b => b.disabled = true);
                setTimeout(() => onTop2Selected(selectedTop2), 500);
            }
        });
    });
    advanceButton.classList.add('hidden');
}

export function promptForWinnerCrown(q1, q2, score1, score2, phaseSubheader, resultsContainer, advanceButton, onWinnerCrowned, calculateTrackRecordScore) {
    phaseSubheader.textContent = 'The Final Showdown';
    let html = `<div class="text-center mb-6"><h3 class="text-3xl font-display tracking-widest text-pink-400">The time has come... to lip sync... for the CROWN!</h3><p class="text-gray-300">Who delivered the winning performance?</p></div><div class="grid grid-cols-1 md:grid-cols-2 gap-4">`;
    const createButton = (q, score) => `<button class="secondary-button w-full p-4 rounded-lg flex items-center gap-4" data-winner-id="${q.id}"><img src="${q.image}" class="w-24 h-24 rounded-full object-cover" alt="${q.name}"><div class="flex-1 text-left"><p class="text-2xl font-display tracking-wider">${q.name}</p><div class="text-sm mt-2"><p><span class="font-semibold">Lip Sync Performance Score:</span> ${score.toFixed(0)}</p><p><span class="font-semibold">Final Track Record:</span> ${calculateTrackRecordScore(q)}</p></div></div></button>`;
    html += createButton(q1, score1);
    html += createButton(q2, score2);
    html += `</div>`;
    resultsContainer.innerHTML = html;
    resultsContainer.querySelectorAll('button').forEach(btn => {
        btn.addEventListener('click', () => {
            resultsContainer.querySelectorAll('button').forEach(b => b.disabled = true);
            const winnerId = btn.dataset.winnerId;
            const winner = winnerId === q1.id ? q1 : q2;
            const runnerUp = winnerId === q1.id ? q2 : q1;
            setTimeout(() => onWinnerCrowned(winner, runnerUp), 500);
        });
    });
    advanceButton.classList.add('hidden');
}

