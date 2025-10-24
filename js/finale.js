// =================================================================================
// FINALE MODULE (finale.js)
// Handles the phase-by-phase flow for the finale.
// =================================================================================

import * as ui from './ui.js';
import { gameState } from './state.js';
import { calculateTrackRecordScore } from './utils.js';
import * as mamaPao from './mamaPao.js';

// DOM Element References
let bodyContainer, simulationView, advanceButton, restartButton, episodeHeader, phaseSubheader, resultsContainer;

/**
 * Initializes the module with necessary DOM elements from game.js.
 */
export function init(elements) {
    bodyContainer = elements.bodyContainer;
    simulationView = elements.simulationView;
    advanceButton = elements.advanceButton;
    restartButton = elements.restartButton;
    episodeHeader = elements.episodeHeader;
    phaseSubheader = elements.phaseSubheader;
    resultsContainer = elements.resultsContainer;
}

// --- Finale Functions (Shared) ---

export function runFinalePerformancePhase() {
    gameState.episodePhase = 'finale';
    ui.switchView(simulationView, bodyContainer, gameState.episodePhase);
    episodeHeader.textContent = 'The Grand Finale';
    phaseSubheader.textContent = 'For the crown, the queens must write, record, and perform their own verse in a rumix of a RuPaul classic!';
    
    // Calculate finale performance scores
    gameState.episodeResults.finalePerformance = gameState.currentCast.map(q => {
        const stats = q.stats;
        const overallStat = (stats.runway + stats.acting + stats.dance) / 3;
        return { queen: q, score: (overallStat * 10) + (Math.random() * 20) };
    }).sort((a, b) => b.score - a.score);
    
    resultsContainer.innerHTML = `<div class="text-center p-8"><p class="text-2xl font-display tracking-widest">The final queens have performed... the judges are making their final decision!</p></div>`;
    
    if (gameState.gameMode === 'standard') {
        ui.updateAdvanceButton('See The Top 2', advanceButton, restartButton);
    } else {
        ui.promptForTop2(gameState.episodeResults.finalePerformance, phaseSubheader, resultsContainer, advanceButton, mamaPao.handleTop2Selection, calculateTrackRecordScore);
    }
}

export function runFinaleTop2Phase() {
    gameState.episodePhase = 'finaleTop2';
    
    // Standard mode logic
    if (gameState.gameMode === 'standard') {
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
    }
    // Note: In Mama Pao mode, gameState.finalists is already set by handleTop2Selection

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

export function runLipsyncForTheCrownPhase() {
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
export function handleWinnerCrowning(winner, runnersUp) { // runnersUp is now an array
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
