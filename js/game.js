// =================================================================================
// GAME MODULE (game.js)
// Handles the core game logic.
// =================================================================================

import { queens, challenges, lipsyncSongs } from './data.js';
import * as ui from './ui.js';
import { gameState, constants, resetState } from './state.js';
import { generateCritique, calculateTrackRecordScore } from './utils.js';

// DOM Element References
const bodyContainer = document.getElementById('body-container');
const menuView = document.getElementById('menu-view');
const selectionView = document.getElementById('selection-view');
const simulationView = document.getElementById('simulation-view');
const startButton = document.getElementById('start-competition-button');
const advanceButton = document.getElementById('advance-button');
const restartButton = document.getElementById('restart-button');
const castList = document.getElementById('cast-list');
const castCounter = document.getElementById('cast-counter');
const castPlaceholder = document.getElementById('cast-placeholder');
const instructions = document.getElementById('instructions');
const episodeHeader = document.getElementById('episode-header');
const phaseSubheader = document.getElementById('phase-subheader');
const resultsContainer = document.getElementById('results-container');


export function selectMode(mode) {
    gameState.gameMode = mode;
    ui.switchView(selectionView, bodyContainer, gameState.episodePhase);
}

export function toggleQueenSelection(queen) {
    const i = gameState.selectedCast.findIndex(q => q.id === queen.id);
    if (i > -1) {
        gameState.selectedCast.splice(i, 1);
    } else if (gameState.selectedCast.length < constants.MAX_CAST_SIZE) {
        gameState.selectedCast.push(queen);
    }
    ui.updateSelectionUI(gameState.selectedCast, castList, castPlaceholder, castCounter, startButton, instructions, constants.MIN_CAST_SIZE, constants.MAX_CAST_SIZE);
}

export function startCompetition() {
    gameState.fullCast = gameState.selectedCast.map(q => ({ ...q, trackRecord: [], eliminated: false, epElim: -1 }));
    gameState.currentCast = [...gameState.fullCast];
    gameState.episodeNumber = 1;
    gameState.shuffledChallenges = [...challenges].sort(() => 0.5 - Math.random());
    gameState.doubleShantayCount = 0;
    gameState.doubleSashayCount = 0;
    runEpisode();
}

function runEpisode() {
    const challenge = gameState.shuffledChallenges[(gameState.episodeNumber - 1) % gameState.shuffledChallenges.length];

    gameState.finalScores = gameState.currentCast.map(q => {
        const lipsyncCount = q.trackRecord.filter(p => p === 'BTM' || p === 'BTM2').length;
        const fatiguePenalty = lipsyncCount * 5;
        const perfScore = (q.stats[challenge.primaryStat] * 5) + (Math.random() * 65);
        const runwayScore = (q.stats.runway * 5) + (Math.random() * 65);
        let totalScore = (perfScore * 0.75) + (runwayScore * 0.25) - fatiguePenalty;
        return { queen: q, totalScore, perfScore, runwayScore, critiques: {} };
    }).sort((a, b) => b.totalScore - a.totalScore);

    gameState.finalScores.forEach(s => {
        s.critiques.performance = generateCritique(s.queen, challenge.primaryStat, s.perfScore);
        s.critiques.runway = generateCritique(s.queen, 'runway', s.runwayScore);
    });

    ui.switchView(simulationView, bodyContainer, 'judgesCritiques');
    ui.displayEpisodeHeader(gameState.episodeNumber, challenge, episodeHeader, phaseSubheader);

    if (gameState.gameMode === 'standard') {
        gameState.episodeResults.placements = assignPlacements(gameState.finalScores);
        gameState.episodeResults.safeQueens = gameState.episodeResults.placements
            .filter(p => p.placement === 'SAFE')
            .map(p => p.queen);
        const randomSong = lipsyncSongs[Math.floor(Math.random() * lipsyncSongs.length)];
        gameState.episodeResults.lipSyncSong = randomSong.name;
        gameState.episodeResults.lipSyncType = randomSong.type;
        runJudgesCritiquesPhase();
    } else { // Mama Pao Mode
        gameState.episodePhase = 'placements';
        ui.promptForCustomPlacements(gameState.finalScores, phaseSubheader, resultsContainer, advanceButton, handleCustomPlacementsSelection, gameState.currentCast.length);
    }
}

export function advanceEpisode() {
    ui.stopAllAnimations();

    switch (gameState.episodePhase) {
        case 'judgesCritiques':
            runSafetyCeremonyPhase();
            break;
        case 'safetyCeremony':
            ui.revealAllSafeQueens(gameState.episodeResults.safeQueens, phaseSubheader);
            gameState.episodePhase = 'gatheringLineup';
            ui.updateAdvanceButton("See Tops & Bottoms", advanceButton, restartButton);
            break;
        case 'gatheringLineup':
            runGatherTopsAndBottomsPhase();
            break;
        case 'gatherTopsAndBottoms':
            runTopsAndBottomsCritiquesPhase();
            break;
        case 'topsAndBottomsCritiques':
            runTopsRevealPhase();
            break;
        case 'topsReveal':
            runWinnerRevealPhase();
            break;
        case 'winnerReveal':
            runBottomsRevealPhase();
            break;
        case 'bottomsReveal':
            runLowRevealPhase();
            break;
        case 'lowReveal':
            runLipSyncPhase();
            break;
        case 'lipsync':
            runLipSyncResultPhase();
            break;
        case 'lipsyncResult':
            runTrackRecordPhase();
            break;
        case 'trackRecord':
            if (gameState.currentCast.length <= 4) {
                gameState.episodePhase = 'finale';
                gameState.episodeNumber++;
                runFinalePerformancePhase();
            } else {
                gameState.episodeNumber++;
                runEpisode();
            }
            break;
        case 'finale':
            runFinaleTop2Phase();
            break;
        case 'finaleTop2':
            runLipsyncForTheCrownPhase();
            break;
    }
}

function runJudgesCritiquesPhase() {
    gameState.episodePhase = 'judgesCritiques';
    ui.displayJudgesCritiques(gameState.finalScores, phaseSubheader, resultsContainer);
    ui.updateAdvanceButton("Begin The Ceremony", advanceButton, restartButton);
}

function runSafetyCeremonyPhase() {
    if (gameState.currentCast.length <= 6 || gameState.episodeResults.safeQueens.length === 0) {
        gameState.episodePhase = 'gatheringLineup';
        runGatherTopsAndBottomsPhase();
        return;
    }
    gameState.episodePhase = 'safetyCeremony';
    ui.displaySafetyCeremony(gameState.currentCast, phaseSubheader, resultsContainer);
    ui.updateAdvanceButton('Reveal Safe Queens', advanceButton, restartButton);
}

function runGatherTopsAndBottomsPhase() {
    gameState.episodePhase = 'gatherTopsAndBottoms';
    ui.displayGatheringScreen(gameState.episodeResults.placements, phaseSubheader, resultsContainer);
    ui.updateAdvanceButton("Proceed to Critiques", advanceButton, restartButton);
}

function runTopsAndBottomsCritiquesPhase() {
    gameState.episodePhase = 'topsAndBottomsCritiques';
    ui.displayTopsAndBottomsCritiques(gameState.finalScores, gameState.episodeResults.placements, phaseSubheader, resultsContainer);
    ui.updateAdvanceButton("Judges' Deliberations", advanceButton, restartButton);
}

function runTopsRevealPhase() {
    gameState.episodePhase = 'topsReveal';
    ui.displayTops(gameState.episodeResults.placements, phaseSubheader, resultsContainer);
    ui.updateAdvanceButton("Announce The Winner", advanceButton, restartButton);
}

function runWinnerRevealPhase() {
    gameState.episodePhase = 'winnerReveal';
    ui.revealWinner(gameState.episodeResults.placements, phaseSubheader, resultsContainer);
    ui.updateAdvanceButton("Reveal The Bottoms", advanceButton, restartButton);
}

function runBottomsRevealPhase() {
    gameState.episodePhase = 'bottomsReveal';
    ui.displayBottoms(gameState.episodeResults.placements, phaseSubheader, resultsContainer);
    ui.updateAdvanceButton("Save A Queen", advanceButton, restartButton);
}

function runLowRevealPhase() {
    gameState.episodePhase = 'lowReveal';
    ui.revealLow(gameState.episodeResults.placements, phaseSubheader, resultsContainer);
    ui.updateAdvanceButton("Lip Sync For Your Life!", advanceButton, restartButton);
}

function runLipSyncPhase() {
    gameState.episodePhase = 'lipsync';
    ui.switchView(simulationView, bodyContainer, gameState.episodePhase);
    ui.displayLipSyncMatchup(gameState.episodeResults, phaseSubheader, resultsContainer);
    ui.updateAdvanceButton("See The Results", advanceButton, restartButton);
}

function runLipSyncResultPhase() {
    gameState.episodePhase = 'lipsyncResult';
    gameState.eliminatedQueens = [];
    const bottomQueens = gameState.episodeResults.placements.filter(r => r.placement === 'BTM');
    if (bottomQueens.length < 2) {
        const sortedCastByScore = [...gameState.finalScores].sort((a, b) => a.totalScore - b.totalScore);
        gameState.eliminatedQueens.push(bottomQueens.length > 0 ? bottomQueens[0].queen : sortedCastByScore[0].queen);
        const loserPlacement = gameState.episodeResults.placements.find(p => p.queen.id === gameState.eliminatedQueens[0].id);
        if (loserPlacement) loserPlacement.placement = 'ELIM';
    } else {
        const [q1Result, q2Result] = bottomQueens.map(p => gameState.finalScores.find(s => s.queen.id === p.queen.id));
        const q1Score = q1Result.queen.stats.lipsync * 10 + Math.random() * 25;
        const q2Score = q2Result.queen.stats.lipsync * 10 + Math.random() * 25;
        if (gameState.doubleSashayCount < 1 && q1Score < 30 && q2Score < 30 && Math.random() < 0.1) {
            gameState.eliminatedQueens = [q1Result.queen, q2Result.queen];
            gameState.doubleSashayCount++;
            gameState.episodeResults.placements.forEach(p => { if (p.queen.id === q1Result.queen.id || p.queen.id === q2Result.queen.id) p.placement = 'ELIM'; });
        } else if (gameState.doubleShantayCount < 2 && (q1Score > 95 && q2Score > 95) && Math.random() < 0.2) {
            gameState.doubleShantayCount++;
            gameState.episodeResults.placements.forEach(p => { if (p.queen.id === q1Result.queen.id || p.queen.id === q2Result.queen.id) p.placement = 'BTM2'; });
        } else {
            const q1LipSyncs = q1Result.queen.trackRecord.filter(p => p === 'BTM' || p === 'BTM2').length;
            const q2LipSyncs = q2Result.queen.trackRecord.filter(p => p === 'BTM' || p === 'BTM2').length;
            const finalLipSyncScore1 = (q1Score * 1.0) + (calculateTrackRecordScore(q1Result.queen) * 0.5) - (q1LipSyncs * 15);
            const finalLipSyncScore2 = (q2Score * 1.0) + (calculateTrackRecordScore(q2Result.queen) * 0.5) - (q2LipSyncs * 15);
            let winner, loser;
            if ((q1LipSyncs >= 2 && finalLipSyncScore1 - finalLipSyncScore2 < 20) || (q2LipSyncs >= 2 && finalLipSyncScore2 > finalLipSyncScore1)) { winner = q2Result; loser = q1Result; }
            else if ((q2LipSyncs >= 2 && finalLipSyncScore2 - finalLipSyncScore1 < 20) || (q1LipSyncs >= 2 && finalLipSyncScore1 > finalLipSyncScore2)) { winner = q1Result; loser = q2Result; }
            else { winner = finalLipSyncScore1 >= finalLipSyncScore2 ? q1Result : q2Result; loser = finalLipSyncScore1 < finalLipSyncScore2 ? q1Result : q2Result; }
            gameState.eliminatedQueens.push(loser.queen);
            gameState.episodeResults.placements.find(p => p.queen.id === winner.queen.id).placement = 'BTM2';
            gameState.episodeResults.placements.find(p => p.queen.id === loser.queen.id).placement = 'ELIM';
        }
    }
    ui.displayLipSyncResults(gameState.episodeResults, gameState.eliminatedQueens, phaseSubheader, resultsContainer);
    ui.updateAdvanceButton('View Track Record', advanceButton, restartButton);
}

function runTrackRecordPhase() {
    gameState.episodePhase = 'trackRecord';
    ui.switchView(simulationView, bodyContainer, gameState.episodePhase);
    gameState.episodeResults.placements.forEach(p => {
        const queenInFullCast = gameState.fullCast.find(q => q.id === p.queen.id);
        if (queenInFullCast) queenInFullCast.trackRecord[gameState.episodeNumber - 1] = p.placement;
    });
    if (gameState.eliminatedQueens.length > 0) {
        gameState.eliminatedQueens.forEach(elimQueen => {
            const elimQueenInFullCast = gameState.fullCast.find(q => q.id === elimQueen.id);
            if (elimQueenInFullCast) {
                elimQueenInFullCast.eliminated = true;
                elimQueenInFullCast.epElim = gameState.episodeNumber;
            }
        });
        gameState.currentCast = gameState.currentCast.filter(q => !gameState.eliminatedQueens.some(eq => eq.id === q.id));
    }
    gameState.currentCast.forEach(q => {
        const queenInFullCast = gameState.fullCast.find(fq => fq.id === q.id);
        if (queenInFullCast && !queenInFullCast.trackRecord[gameState.episodeNumber - 1]) {
            queenInFullCast.trackRecord[gameState.episodeNumber - 1] = 'SAFE';
        }
    });
    ui.displayTrackRecord(gameState.fullCast, gameState.shuffledChallenges, resultsContainer, calculateTrackRecordScore);
    const buttonText = gameState.currentCast.length <= 4 ? 'Start The Finale!' : 'Next Episode';
    ui.updateAdvanceButton(buttonText, advanceButton, restartButton);
}

function runFinalePerformancePhase() {
    gameState.episodePhase = 'finale';
    ui.switchView(simulationView, bodyContainer, gameState.episodePhase);
    episodeHeader.textContent = 'The Grand Finale';
    phaseSubheader.textContent = 'For the crown, the queens must write, record, and perform their own verse in a rumix of a RuPaul classic!';
    gameState.episodeResults.finalePerformance = gameState.currentCast.map(q => {
        const stats = q.stats;
        const overallStat = (stats.runway + stats.acting + stats.dance) / 3;
        return { queen: q, score: (overallStat * 10) + (Math.random() * 20) };
    }).sort((a, b) => b.score - a.score);
    resultsContainer.innerHTML = `<div class="text-center p-8"><p class="text-2xl font-display tracking-widest">The final queens have performed... the judges are making their final decision!</p></div>`;
    if (gameState.gameMode === 'standard') {
        ui.updateAdvanceButton('See The Top 2', advanceButton, restartButton);
    } else {
        ui.promptForTop2(gameState.episodeResults.finalePerformance, phaseSubheader, resultsContainer, advanceButton, handleTop2Selection, calculateTrackRecordScore);
    }
}

function runFinaleTop2Phase() {
    gameState.episodePhase = 'finaleTop2';
    const finaleScores = gameState.currentCast.map(queen => {
        const trackRecordScore = calculateTrackRecordScore(queen);
        const perfScore = gameState.episodeResults.finalePerformance.find(r => r.queen.id === queen.id).score;
        const maxPerfScore = Math.max(...gameState.episodeResults.finalePerformance.map(r => r.score));
        const normalizedPerf = (perfScore / maxPerfScore) * 100;
        const maxTrackRecord = Math.max(...gameState.currentCast.map(q => calculateTrackRecordScore(q)));
        const normalizedTrack = maxTrackRecord > 0 ? (trackRecordScore / maxTrackRecord) * 100 : 0;
        const totalScore = (normalizedTrack * 0.7) + (normalizedPerf * 0.3);
        return { queen, totalScore, trackRecordScore };
    }).sort((a, b) => b.totalScore - a.totalScore);
    
    // Standard mode still defaults to Top 2
    gameState.finalists = [finaleScores[0], finaleScores[1]];
    
    const eliminated = gameState.currentCast.filter(q => !gameState.finalists.some(t => t.queen.id === q.id));
    eliminated.forEach(elimQueen => {
        const queenInFullCast = gameState.fullCast.find(q => q.id === elimQueen.id);
        if (queenInFullCast) {
            queenInFullCast.trackRecord.push('ELIM');
            queenInFullCast.eliminated = true;
            queenInFullCast.epElim = gameState.episodeNumber;
        }
    });
    
    // Use the renamed UI function
    ui.displayFinaleFinalists(gameState.finalists, eliminated, resultsContainer);
    ui.updateAdvanceButton('Lip Sync For The Crown!', advanceButton, restartButton);
}

function runLipsyncForTheCrownPhase() {
    gameState.episodePhase = 'lipsyncForTheCrown';
    if (gameState.gameMode === 'standard') {
        // Standard mode (Top 2)
        const [q1, q2] = gameState.finalists; // Use renamed state
        const finalScore1 = (calculateTrackRecordScore(q1.queen) * 0.8) + (q1.queen.stats.lipsync * 0.2);
        const finalScore2 = (calculateTrackRecordScore(q2.queen) * 0.8) + (q2.queen.stats.lipsync * 0.2);
        const winner = finalScore1 >= finalScore2 ? q1.queen : q2.queen;
        const runnerUp = finalScore1 < finalScore2 ? q1.queen : q2.queen;
        handleWinnerCrowning(winner, [runnerUp]); // Pass runner-up as an array
    } else {
        // Mama Pao Mode (2-4 finalists)
        const finalists = gameState.finalists.map(f => f.queen);
        // Pass all finalists to the updated prompt
        ui.promptForWinnerCrown(finalists, phaseSubheader, resultsContainer, advanceButton, handleWinnerCrowning, calculateTrackRecordScore);
    }
}

/**
 * MODIFIED: Accepts a single winner and an array of runners-up.
 */
function handleWinnerCrowning(winner, runnersUp) { // runnersUp is now an array
    const winnerInFull = gameState.fullCast.find(q => q.id === winner.id);
    if (winnerInFull) winnerInFull.trackRecord.push('WINNER');

    // Loop through all runners-up
    runnersUp.forEach(runnerUp => {
        const runnerUpInFull = gameState.fullCast.find(q => q.id === runnerUp.id);
        if (runnerUpInFull) runnerUpInFull.trackRecord.push('RUNNER-UP');
    });

    // Pass the array to the updated UI function
    ui.displayWinner(winner, runnersUp, resultsContainer);
    ui.showRestartButton(advanceButton, restartButton, () => {
        ui.displayTrackRecord(gameState.fullCast, gameState.shuffledChallenges, resultsContainer, calculateTrackRecordScore, true);
    });
}


function assignPlacements(results) {
    const len = results.length;
    if (len === 0) return [];
    const placements = [];
    const scoreDifference = results[0].totalScore - results[1].totalScore;
    if (len > 5 && scoreDifference < 1 && Math.random() < 0.25) {
        placements.push({ queen: results[0].queen, placement: 'WIN' });
        placements.push({ queen: results[1].queen, placement: 'WIN' });
        if (results[2]) placements.push({ queen: results[2].queen, placement: 'HIGH' });
        results.slice(3).forEach((r, i) => {
            const originalIndex = i + 3;
            if (originalIndex >= len - 2) placements.push({ queen: r.queen, placement: 'BTM' });
            else if (originalIndex === len - 3) placements.push({ queen: r.queen, placement: 'LOW' });
            else placements.push({ queen: r.queen, placement: 'SAFE' });
        });
        return placements;
    }
    if (len === 5) {
        return results.map((r, i) => {
            if (i === 0) return { queen: r.queen, placement: 'WIN' };
            if (i <= 2) return { queen: r.queen, placement: 'HIGH' };
            return { queen: r.queen, placement: 'BTM' };
        });
    }
    return results.map((r, i) => {
        let placement;
        if (i === 0) placement = 'WIN';
        else if (len > 5 && i <= 2) placement = 'HIGH';
        else if (i >= len - 2) placement = 'BTM';
        else if (len > 5 && i === len - 3) placement = 'LOW';
        else placement = 'SAFE';
        return { queen: r.queen, placement: placement };
    });
}
function handleCustomPlacementsSelection(topIds, bottomIds) {
    gameState.episodeResults.userTops = gameState.finalScores.filter(s => topIds.includes(s.queen.id));
    gameState.episodeResults.userBottoms = gameState.finalScores.filter(s => bottomIds.includes(s.queen.id));
    ui.promptForWinner(gameState.episodeResults.userTops, phaseSubheader, resultsContainer, advanceButton, handleWinnerSelection, gameState.fullCast);
}

function handleWinnerSelection(winnerIds) {
    gameState.episodeResults.placements = [];
    gameState.episodeResults.userTops.forEach(s => {
        const placement = winnerIds.includes(s.queen.id) ? 'WIN' : 'HIGH';
        gameState.episodeResults.placements.push({ queen: s.queen, placement });
    });
    const randomSong = lipsyncSongs[Math.floor(Math.random() * lipsyncSongs.length)];
    gameState.episodeResults.lipSyncSong = randomSong.name;
    gameState.episodeResults.lipSyncType = randomSong.type;
    if (gameState.currentCast.length <= 5) {
        gameState.episodeResults.userBottoms.forEach(s => {
            gameState.episodeResults.placements.push({ queen: s.queen, placement: 'BTM' });
        });
        ui.promptForLipSyncWinner(gameState.episodeResults, gameState.finalScores, gameState.fullCast, phaseSubheader, resultsContainer, advanceButton, handleLipSyncDecision);
    } else {
        ui.promptForBottoms(gameState.episodeResults.userBottoms, phaseSubheader, resultsContainer, advanceButton, handleBottomSelection, gameState.fullCast);
    }
}

function handleBottomSelection(safeId) {
    gameState.episodeResults.userBottoms.forEach(s => {
        const placement = s.queen.id === safeId ? 'LOW' : 'BTM';
        gameState.episodeResults.placements.push({ queen: s.queen, placement });
    });
    ui.promptForLipSyncWinner(gameState.episodeResults, gameState.finalScores, gameState.fullCast, phaseSubheader, resultsContainer, advanceButton, handleLipSyncDecision);
}

function handleLipSyncDecision(decision) {
    gameState.eliminatedQueens = decision.eliminated || [];
    gameState.episodeResults.placements.forEach(p => {
        if (p.placement === 'BTM') {
            if (decision.shantay) p.placement = 'BTM2';
            else if (decision.sashay) p.placement = 'ELIM';
            else if (decision.winner && decision.loser) {
                if (p.queen.id === decision.winner.id) p.placement = 'BTM2';
                if (p.queen.id === decision.loser.id) p.placement = 'ELIM';
            }
        }
    });
    gameState.episodePhase = 'lipsyncResult';
    ui.switchView(simulationView, bodyContainer, 'lipsync');
    ui.displayLipSyncResults(gameState.episodeResults, gameState.eliminatedQueens, phaseSubheader, resultsContainer);
    ui.updateAdvanceButton('View Track Record', advanceButton, restartButton);
}

/**
 * MODIFIED: This is the callback from the new promptForTop2.
 * It receives an array of 2-4 selected IDs.
 */
function handleTop2Selection(selectedIds) {
    gameState.episodePhase = 'finaleTop2'; 
    // Use gameState.finalists and store the selected queens
    gameState.finalists = gameState.currentCast
        .filter(q => selectedIds.includes(q.id))
        .map(queen => ({ queen, trackRecordScore: calculateTrackRecordScore(queen) }));
    
    const eliminated = gameState.currentCast.filter(q => !selectedIds.includes(q.id));
    
    eliminated.forEach(elimQueen => {
        const queenInFullCast = gameState.fullCast.find(q => q.id === elimQueen.id);
        if (queenInFullCast) {
            queenInFullCast.trackRecord.push('ELIM');
            queenInFullCast.eliminated = true;
            queenInFullCast.epElim = gameState.episodeNumber;
        }
    });
    
    // Call the renamed UI function to display 2-4 finalists
    ui.displayFinaleFinalists(gameState.finalists, eliminated, resultsContainer);
    ui.updateAdvanceButton('Lip Sync For The Crown!', advanceButton, restartButton);
}
