// =================================================================================
// MAMA PAO MODULE (mamaPao.js)
// Handles all specific logic and callbacks for Mama Pao Mode.
// =================================================================================

import * as ui from './ui.js';
import { gameState } from './state.js';
import { calculateTrackRecordScore } from './utils.js';
import { getLipSyncSong } from './simulation.js';

// DOM Element References
let bodyContainer, simulationView, advanceButton, restartButton, phaseSubheader, resultsContainer;

/**
 * Initializes the module with necessary DOM elements from game.js.
 */
export function init(elements) {
    bodyContainer = elements.bodyContainer;
    simulationView = elements.simulationView;
    advanceButton = elements.advanceButton;
    restartButton = elements.restartButton;
    phaseSubheader = elements.phaseSubheader;
    resultsContainer = elements.resultsContainer;
}

// --- MAMA PAO MODE - CALLBACK HANDLERS ---

export function handleCustomPlacementsSelection(topIds, bottomIds) {
    gameState.episodeResults.userTops = gameState.finalScores.filter(s => topIds.includes(s.queen.id));
    gameState.episodeResults.userBottoms = gameState.finalScores.filter(s => bottomIds.includes(s.queen.id));
    ui.promptForWinner(gameState.episodeResults.userTops, phaseSubheader, resultsContainer, advanceButton, handleWinnerSelection, gameState.fullCast);
}

export function handleWinnerSelection(winnerIds) {
    gameState.episodeResults.placements = [];
    
    // Assign placements for Tops and Highs
    gameState.episodeResults.userTops.forEach(s => {
        const placement = winnerIds.includes(s.queen.id) ? 'WIN' : 'HIGH';
        gameState.episodeResults.placements.push({ queen: s.queen, placement });
    });
    
    // Get Lip Sync song
    const { lipSyncSong, lipSyncType } = getLipSyncSong();
    gameState.episodeResults.lipSyncSong = lipSyncSong;
    gameState.episodeResults.lipSyncType = lipSyncType;
    
    // Handle bottoms
    if (gameState.currentCast.length <= 5) {
        // 5 queens left: All non-winners are bottoms
        gameState.episodeResults.userBottoms.forEach(s => {
            gameState.episodeResults.placements.push({ queen: s.queen, placement: 'BTM' });
        });
        ui.promptForLipSyncWinner(gameState.episodeResults, gameState.finalScores, gameState.fullCast, phaseSubheader, resultsContainer, advanceButton, handleLipSyncDecision);
    } else {
        // More than 5 queens: Prompt to save one (LOW)
        ui.promptForBottoms(gameState.episodeResults.userBottoms, phaseSubheader, resultsContainer, advanceButton, handleBottomSelection, gameState.fullCast);
    }
}

export function handleBottomSelection(safeId) {
    // Assign placements for Lows and Bottoms
    gameState.episodeResults.userBottoms.forEach(s => {
        const placement = s.queen.id === safeId ? 'LOW' : 'BTM';
        gameState.episodeResults.placements.push({ queen: s.queen, placement });
    });
    
    // Proceed to lip sync decision
    ui.promptForLipSyncWinner(gameState.episodeResults, gameState.finalScores, gameState.fullCast, phaseSubheader, resultsContainer, advanceButton, handleLipSyncDecision);
}

export function handleLipSyncDecision(decision) {
    gameState.eliminatedQueens = decision.eliminated || [];
    
    // Update placements based on Mama Pao's decision
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
    
    // Set phase and display results
    gameState.episodePhase = 'lipsyncResult';
    ui.switchView(simulationView, bodyContainer, 'lipsync');
    ui.displayLipSyncResults(gameState.episodeResults, gameState.eliminatedQueens, phaseSubheader, resultsContainer);
    ui.updateAdvanceButton('View Track Record', advanceButton, restartButton);
}

/**
 * MODIFIED: This is the callback from the new promptForTop2.
 * It receives an array of 2-4 selected IDs.
 */
export function handleTop2Selection(selectedIds) {
    // This function is now just a callback that triggers the next phase in game.js
    // We set the finalists here.
    gameState.finalists = gameState.currentCast
        .filter(q => selectedIds.includes(q.id))
        .map(queen => ({ queen, trackRecordScore: calculateTrackRecordScore(queen) }));
    
    // Manually advance to the next phase by calling the game controller's function
    // This is a bit of a pattern break, but necessary since it's a user-driven action.
    // A more advanced solution would use custom events.
    document.getElementById('advance-button').click();
}