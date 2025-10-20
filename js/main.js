// =================================================================================
// 1. IMPORTS
// =================================================================================
import { queens, challenges, lipsyncSongs, critiques } from './data.js';
import * as ui from './ui.js';

// =================================================================================
// 2. STATE & DOM ELEMENTS
// =================================================================================
// -- Game State Variables --
let gameMode = 'standard';
let selectedCast = [];
let currentCast = [];
let fullCast = [];
let shuffledChallenges = [];
let top2 = [];
let episodeNumber = 1;
let episodePhase = 'performance';
let episodeResults = {};
let finalScores = [];
let eliminatedQueens = [];
let doubleShantayCount = 0;
let doubleSashayCount = 0;

// -- Constants --
const MAX_CAST_SIZE = 15;
const MIN_CAST_SIZE = 8;

// -- DOM Element References --
const bodyContainer = document.getElementById('body-container');
const menuView = document.getElementById('menu-view');
const selectionView = document.getElementById('selection-view');
const simulationView = document.getElementById('simulation-view');
const standardModeBtn = document.getElementById('standard-mode-btn');
const mamapaoModeBtn = document.getElementById('mamapao-mode-btn');
const startButton = document.getElementById('start-competition-button');
const advanceButton = document.getElementById('advance-button');
const restartButton = document.getElementById('restart-button');
const queenGrid = document.getElementById('queen-grid');
const castList = document.getElementById('cast-list');
const castCounter = document.getElementById('cast-counter');
const castPlaceholder = document.getElementById('cast-placeholder');
const instructions = document.getElementById('instructions');
const episodeHeader = document.getElementById('episode-header');
const phaseSubheader = document.getElementById('phase-subheader');
const resultsContainer = document.getElementById('results-container');

// =================================================================================
// 3. CORE LOGIC & HELPER FUNCTIONS
// =================================================================================

function generateCritique(queen, stat, score) {
    const level = score > 75 ? 'high' : score > 40 ? 'mid' : 'low';
    const options = critiques[stat][level];
    const critiqueText = options[Math.floor(Math.random() * options.length)];
    const separator = critiqueText.startsWith("'") ? "" : " ";
    return queen.name + separator + critiqueText;
}

function calculateTrackRecordScore(queen) {
    const placementScores = { 'WINNER': 10, 'RUNNER-UP': 8, 'WIN': 5, 'HIGH': 4, 'SAFE': 3, 'LOW': 2, 'BTM2': 1, 'BTM': 1, 'ELIM': 0 };
    return queen.trackRecord.reduce((acc, placement) => acc + (placementScores[placement] || 0), 0);
}

function assignPlacements(results) {
    const len = results.length;
    if (len === 0) return [];

    // FIX: Add specific logic for Top 5 placements in Standard Mode
    if (len === 5) {
        return results.map((r, i) => {
            let placement;
            if (i === 0) placement = 'WIN';
            else if (i <= 2) placement = 'HIGH'; // Top 3 are WIN, HIGH, HIGH
            else placement = 'BTM'; // Bottom 2
            return { queen: r.queen, placement: placement };
        });
    }

    // Default logic for other cast sizes
    return results.map((r, i) => {
        let placement;
        if (i === 0) placement = 'WIN';
        else if (len > 5 && i <= 2) placement = 'HIGH';
        else if (i >= len - 2) placement = 'BTM';
        else if (len > 4 && i === len - 3) placement = 'LOW';
        else placement = 'SAFE';
        return { queen: r.queen, placement: placement };
    });
}

// =================================================================================
// 4. STATE & UI MANAGEMENT FUNCTIONS
// =================================================================================

function selectMode(mode) {
    gameMode = mode;
    ui.switchView(selectionView, bodyContainer, episodePhase);
}

function toggleQueenSelection(queen) {
    const i = selectedCast.findIndex(q => q.id === queen.id);
    if (i > -1) {
        selectedCast.splice(i, 1);
    } else if (selectedCast.length < MAX_CAST_SIZE) {
        selectedCast.push(queen);
    }
    ui.updateSelectionUI(selectedCast, castList, castPlaceholder, castCounter, startButton, instructions, MIN_CAST_SIZE, MAX_CAST_SIZE);
}

function startCompetition() {
    fullCast = selectedCast.map(q => ({ ...q, trackRecord: [], eliminated: false, epElim: -1 }));
    currentCast = [...fullCast];
    episodeNumber = 1;
    shuffledChallenges = [...challenges].sort(() => 0.5 - Math.random());
    doubleShantayCount = 0;
    doubleSashayCount = 0;
    runEpisode();
}

// =================================================================================
// 5. EPISODE & FINALE FLOW
// =================================================================================

function runEpisode() {
    episodePhase = 'performance';
    const challenge = shuffledChallenges[(episodeNumber - 1) % shuffledChallenges.length];

    finalScores = currentCast.map(q => {
        const lipsyncCount = q.trackRecord.filter(p => p === 'BTM' || p === 'BTM2').length;
        const fatiguePenalty = lipsyncCount * 5;
        
        const perfScore = (q.stats[challenge.primaryStat] * 5) + (Math.random() * 65);
        const runwayScore = (q.stats.runway * 5) + (Math.random() * 65);
        
        let totalScore = (perfScore * 0.75) + (runwayScore * 0.25);
        totalScore -= fatiguePenalty;

        return { queen: q, totalScore, perfScore, runwayScore, critiques: {} };
    }).sort((a, b) => b.totalScore - a.totalScore);

    finalScores.forEach(s => {
        s.critiques.performance = generateCritique(s.queen, challenge.primaryStat, s.perfScore);
        s.critiques.runway = generateCritique(s.queen, 'runway', s.runwayScore);
    });

    ui.switchView(simulationView, bodyContainer, episodePhase);
    ui.displayEpisodeHeader(episodeNumber, challenge, episodeHeader, phaseSubheader);
    ui.displayAllCritiques(finalScores, resultsContainer);
    ui.updateAdvanceButton('Proceed to Judging', advanceButton, restartButton);
}

function advanceEpisode() {
    switch (episodePhase) {
        case 'performance': runJudgingPhase(); break;
        case 'placements':
            runLipSyncPhase(); 
            break;
        case 'lipsync': runTrackRecordPhase(); break;
        case 'trackRecord':
            if (currentCast.length <= 4) {
                episodePhase = 'finale';
                episodeNumber++; 
                runFinalePerformancePhase();
            } else {
                episodeNumber++;
                runEpisode();
            }
            break;
        case 'finale': 
            runFinaleTop2Phase(); 
            break;
        case 'finaleTop2': runLipsyncForTheCrownPhase(); break;
    }
}

function runJudgingPhase() {
    episodePhase = 'placements';
    ui.switchView(simulationView, bodyContainer, episodePhase);

    if (gameMode === 'standard') {
        episodeResults.placements = assignPlacements(finalScores);
        ui.displayPlacements(episodeResults.placements, phaseSubheader, resultsContainer);
        ui.updateAdvanceButton('Watch The Lip Sync', advanceButton, restartButton);
    } else {
        ui.promptForCustomPlacements(finalScores, phaseSubheader, resultsContainer, advanceButton, handleCustomPlacementsSelection, currentCast.length);
    }
}

function runLipSyncPhase() {
    episodePhase = 'lipsync';
    ui.switchView(simulationView, bodyContainer, episodePhase);

    if (gameMode === 'standard') {
        eliminatedQueens = [];
        const bottomQueens = episodeResults.placements.filter(r => r.placement === 'BTM');
        episodeResults.lipSyncSong = lipsyncSongs[Math.floor(Math.random() * lipsyncSongs.length)];

        if (bottomQueens.length < 2) {
            const sortedCastByScore = [...finalScores].sort((a, b) => a.totalScore - b.totalScore);
            eliminatedQueens.push(bottomQueens.length > 0 ? bottomQueens[0].queen : sortedCastByScore[0].queen);
            const loserPlacement = episodeResults.placements.find(p => p.queen.id === eliminatedQueens[0].id);
            if (loserPlacement) loserPlacement.placement = 'ELIM';
            handlePostLipSync();
            return;
        }

        const [q1Result, q2Result] = bottomQueens.map(p => finalScores.find(s => s.queen.id === p.queen.id));
        
        const q1Score = q1Result.queen.stats.lipsync * 10 + Math.random() * 25; 
        const q2Score = q2Result.queen.stats.lipsync * 10 + Math.random() * 25;

        if (doubleSashayCount < 1 && q1Score < 30 && q2Score < 30 && Math.random() < 0.1) {
            eliminatedQueens = [q1Result.queen, q2Result.queen];
            doubleSashayCount++;
            episodeResults.placements.find(p => p.queen.id === q1Result.queen.id).placement = 'ELIM';
            episodeResults.placements.find(p => p.queen.id === q2Result.queen.id).placement = 'ELIM';
        } else if (doubleShantayCount < 2 && (q1Score > 95 && q2Score > 95) && Math.random() < 0.2) {
            doubleShantayCount++;
            episodeResults.placements.find(p => p.queen.id === q1Result.queen.id).placement = 'BTM2';
            episodeResults.placements.find(p => p.queen.id === q2Result.queen.id).placement = 'BTM2';
        } else {
            const q1LipSyncs = q1Result.queen.trackRecord.filter(p => p === 'BTM' || p === 'BTM2').length;
            const q2LipSyncs = q2Result.queen.trackRecord.filter(p => p === 'BTM' || p === 'BTM2').length;
            const q1TrackRecordScore = calculateTrackRecordScore(q1Result.queen);
            const q2TrackRecordScore = calculateTrackRecordScore(q2Result.queen);

            const finalLipSyncScore1 = (q1Score * 1.0) + (q1TrackRecordScore * 0.5) - (q1LipSyncs * 15);
            const finalLipSyncScore2 = (q2Score * 1.0) + (q2TrackRecordScore * 0.5) - (q2LipSyncs * 15);

            let winner, loser;

            if (q1LipSyncs >= 2 && finalLipSyncScore2 > finalLipSyncScore1) {
                winner = q2Result; loser = q1Result;
            } else if (q2LipSyncs >= 2 && finalLipSyncScore1 > finalLipSyncScore2) {
                winner = q1Result; loser = q2Result;
            } else if (q1LipSyncs >= 2 && finalLipSyncScore1 > finalLipSyncScore2 && (finalLipSyncScore1 - finalLipSyncScore2 < 20)) {
                winner = q2Result; loser = q1Result;
            } else if (q2LipSyncs >= 2 && finalLipSyncScore2 > finalLipSyncScore1 && (finalLipSyncScore2 - finalLipSyncScore1 < 20)) {
                winner = q1Result; loser = q2Result;
            } else {
                winner = finalLipSyncScore1 >= finalLipSyncScore2 ? q1Result : q2Result;
                loser = finalLipSyncScore1 < finalLipSyncScore2 ? q1Result : q2Result;
            }

            eliminatedQueens.push(loser.queen);
            episodeResults.placements.find(p => p.queen.id === winner.queen.id).placement = 'BTM2';
            episodeResults.placements.find(p => p.queen.id === loser.queen.id).placement = 'ELIM';
        }
        handlePostLipSync();
    } else {
        handlePostLipSync();
    }
}

function handlePostLipSync() {
    ui.displayLipSyncResults(episodeResults, eliminatedQueens, phaseSubheader, resultsContainer);
    ui.updateAdvanceButton('View Track Record', advanceButton, restartButton);
}

function runTrackRecordPhase() {
    episodePhase = 'trackRecord';
    ui.switchView(simulationView, bodyContainer, episodePhase);

    episodeResults.placements.forEach(p => {
        const queenInFullCast = fullCast.find(q => q.id === p.queen.id);
        if (queenInFullCast) {
            queenInFullCast.trackRecord[episodeNumber - 1] = p.placement;
        }
    });

    if (eliminatedQueens.length > 0) {
        eliminatedQueens.forEach(elimQueen => {
            const elimQueenInFullCast = fullCast.find(q => q.id === elimQueen.id);
            if (elimQueenInFullCast) {
                elimQueenInFullCast.eliminated = true;
                elimQueenInFullCast.epElim = episodeNumber;
            }
        });
        currentCast = currentCast.filter(q => !eliminatedQueens.some(eq => eq.id === q.id));
    }
    
    currentCast.forEach(q => {
        const queenInFullCast = fullCast.find(fq => fq.id === q.id);
        if (queenInFullCast && !queenInFullCast.trackRecord[episodeNumber - 1]) {
            queenInFullCast.trackRecord[episodeNumber - 1] = 'SAFE';
        }
    });

    ui.displayTrackRecord(fullCast, shuffledChallenges, resultsContainer, calculateTrackRecordScore);
    const buttonText = currentCast.length <= 4 ? 'Start The Finale!' : 'Next Episode';
    ui.updateAdvanceButton(buttonText, advanceButton, restartButton);
}


function runFinalePerformancePhase() {
    episodePhase = 'finale';
    ui.switchView(simulationView, bodyContainer, episodePhase);
    episodeHeader.textContent = 'The Grand Finale';
    phaseSubheader.textContent = 'For the crown, the queens must write, record, and perform their own verse in a rumix of a RuPaul classic!';

    episodeResults.finalePerformance = currentCast.map(q => {
        const stats = q.stats;
        const overallStat = (stats.runway + stats.acting + stats.dance) / 3;
        const score = (overallStat * 10) + (Math.random() * 20);
        return { queen: q, score: score };
    }).sort((a, b) => b.score - a.score);

    resultsContainer.innerHTML = `<div class="text-center p-8"><p class="text-2xl font-display tracking-widest">The final queens have performed... the judges are making their final decision!</p></div>`;

    if (gameMode === 'standard') {
        ui.updateAdvanceButton('See The Top 2', advanceButton, restartButton);
    } else {
        ui.promptForTop2(episodeResults.finalePerformance, phaseSubheader, resultsContainer, advanceButton, handleTop2Selection, calculateTrackRecordScore);
    }
}

function runFinaleTop2Phase() {
    episodePhase = 'finaleTop2';
    const finaleScores = currentCast.map(queen => {
        const trackRecordScore = calculateTrackRecordScore(queen);
        const perfScore = episodeResults.finalePerformance.find(r => r.queen.id === queen.id).score;
        const maxPerfScore = Math.max(...episodeResults.finalePerformance.map(r => r.score));
        const normalizedPerf = (perfScore / maxPerfScore) * 100;
        const maxTrackRecord = Math.max(...currentCast.map(q => calculateTrackRecordScore(q)));
        const normalizedTrack = maxTrackRecord > 0 ? (trackRecordScore / maxTrackRecord) * 100 : 0;
        
        const totalScore = (normalizedTrack * 0.7) + (normalizedPerf * 0.3);
        
        return { queen, totalScore, trackRecordScore };
    }).sort((a, b) => b.totalScore - a.totalScore);

    top2 = [finaleScores[0], finaleScores[1]];
    const eliminated = currentCast.filter(q => !top2.some(t => t.queen.id === q.id));
    
    eliminated.forEach(elimQueen => {
        const queenInFullCast = fullCast.find(q => q.id === elimQueen.id);
        if (queenInFullCast) {
            queenInFullCast.trackRecord.push('ELIM');
            queenInFullCast.eliminated = true;
            queenInFullCast.epElim = episodeNumber;
        }
    });

    ui.displayTop2Results(top2, eliminated, resultsContainer);
    ui.updateAdvanceButton('Lip Sync For The Crown!', advanceButton, restartButton);
}

function runLipsyncForTheCrownPhase() {
    episodePhase = 'lipsyncForTheCrown';

    if (gameMode === 'standard') {
        const [q1, q2] = top2;
        const finalScore1 = (calculateTrackRecordScore(q1.queen) * 0.8) + (q1.queen.stats.lipsync * 0.2);
        const finalScore2 = (calculateTrackRecordScore(q2.queen) * 0.8) + (q2.queen.stats.lipsync * 0.2);
        const winner = finalScore1 >= finalScore2 ? q1.queen : q2.queen;
        const runnerUp = finalScore1 < finalScore2 ? q1.queen : q2.queen;
        handleWinnerCrowning(winner, runnerUp);
    } else {
        const [q1, q2] = top2.map(t => t.queen);
        const score1 = q1.stats.lipsync * 10 + Math.random() * 25;
        const score2 = q2.stats.lipsync * 10 + Math.random() * 25;
        ui.promptForWinnerCrown(q1, q2, score1, score2, phaseSubheader, resultsContainer, advanceButton, handleWinnerCrowning, calculateTrackRecordScore);
    }
}

function handleWinnerCrowning(winner, runnerUp) {
    const winnerInFull = fullCast.find(q => q.id === winner.id);
    const runnerUpInFull = fullCast.find(q => q.id === runnerUp.id);
    if (winnerInFull) winnerInFull.trackRecord.push('WINNER');
    if (runnerUpInFull) runnerUpInFull.trackRecord.push('RUNNER-UP');

    ui.displayWinner(winner, runnerUp, resultsContainer);
    ui.showRestartButton(advanceButton, restartButton, () => {
        ui.displayTrackRecord(fullCast, shuffledChallenges, resultsContainer, calculateTrackRecordScore, true);
    });
}


// =================================================================================
// 6. MAMA PAO MODE - CALLBACK HANDLERS
// =================================================================================

function handleCustomPlacementsSelection(topIds, bottomIds) {
    episodeResults.userTops = finalScores.filter(s => topIds.includes(s.queen.id));
    episodeResults.userBottoms = finalScores.filter(s => bottomIds.includes(s.queen.id));
    ui.promptForWinner(episodeResults.userTops, phaseSubheader, resultsContainer, advanceButton, handleWinnerSelection);
}

function handleWinnerSelection(winnerId) {
    episodeResults.placements = [];
    episodeResults.userTops.forEach(s => {
        const placement = s.queen.id === winnerId ? 'WIN' : 'HIGH';
        episodeResults.placements.push({ queen: s.queen, placement });
    });

    if (currentCast.length <= 5) {
        episodeResults.userBottoms.forEach(s => {
            episodeResults.placements.push({ queen: s.queen, placement: 'BTM' });
        });
        ui.promptForLipSyncWinner(episodeResults, finalScores, fullCast, phaseSubheader, resultsContainer, advanceButton, handleLipSyncDecision);
    } else {
        ui.promptForBottoms(episodeResults.userBottoms, phaseSubheader, resultsContainer, advanceButton, handleBottomSelection);
    }
}

function handleBottomSelection(safeId) {
    episodeResults.userBottoms.forEach(s => {
        const placement = s.queen.id === safeId ? 'LOW' : 'BTM';
        episodeResults.placements.push({ queen: s.queen, placement });
    });
    ui.promptForLipSyncWinner(episodeResults, finalScores, fullCast, phaseSubheader, resultsContainer, advanceButton, handleLipSyncDecision);
}

function handleLipSyncDecision(decision) {
    eliminatedQueens = decision.eliminated || [];
    episodeResults.placements.forEach(p => {
        if (decision.shantay) {
            if (p.placement === 'BTM') p.placement = 'BTM2';
        } else if (decision.sashay) {
            if (p.placement === 'BTM') p.placement = 'ELIM';
        } else if (decision.winner && decision.loser) {
            if (p.queen.id === decision.winner.id) p.placement = 'BTM2';
            if (p.queen.id === decision.loser.id) p.placement = 'ELIM';
        }
    });
    runLipSyncPhase();
}

function handleTop2Selection(selectedIds) {
    episodePhase = 'finaleTop2'; 

    top2 = currentCast
        .filter(q => selectedIds.includes(q.id))
        .map(queen => ({ queen, trackRecordScore: calculateTrackRecordScore(queen) }));
    const eliminated = currentCast.filter(q => !selectedIds.includes(q.id));
    
    eliminated.forEach(elimQueen => {
        const queenInFullCast = fullCast.find(q => q.id === elimQueen.id);
        if (queenInFullCast) {
            queenInFullCast.trackRecord.push('ELIM');
            queenInFullCast.eliminated = true;
            queenInFullCast.epElim = episodeNumber;
        }
    });

    ui.displayTop2Results(top2, eliminated, resultsContainer);
    ui.updateAdvanceButton('Lip Sync For The Crown!', advanceButton, restartButton);
}


// =================================================================================
// 7. INITIALIZATION
// =================================================================================

window.addEventListener('load', () => {
    standardModeBtn.addEventListener('click', () => selectMode('standard'));
    mamapaoModeBtn.addEventListener('click', () => selectMode('mamapao'));
    ui.populateQueenGrid(queens, queenGrid, toggleQueenSelection);
    startButton.addEventListener('click', () => { if (!startButton.disabled) startCompetition(); });
    advanceButton.addEventListener('click', advanceEpisode);
    restartButton.addEventListener('click', () => window.location.reload());
    ui.updateSelectionUI(selectedCast, castList, castPlaceholder, castCounter, startButton, instructions, MIN_CAST_SIZE, MAX_CAST_SIZE);
    ui.switchView(menuView, bodyContainer, episodePhase);
});

