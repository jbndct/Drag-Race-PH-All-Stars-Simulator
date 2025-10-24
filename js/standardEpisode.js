// =================================================================================
// STANDARD EPISODE MODULE (standardEpisode.js)
// Handles the phase-by-phase flow for a standard episode.
// =================================================================================

import * as ui from './ui.js';
import { gameState } from './state.js';
import { runEpisode } from './game.js'; // Import main game loop
import { runFinalePerformancePhase } from './finale.js';
import { calculateTrackRecordScore } from './utils.js';

// DOM Element References
// Note: These are passed from game.js to keep DOM access centralized
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

// --- Standard Mode Functions ---

export function runJudgesCritiquesPhase() {
    gameState.episodePhase = 'judgesCritiques';
    ui.displayJudgesCritiques(gameState.finalScores, phaseSubheader, resultsContainer);
    ui.updateAdvanceButton("Begin The Ceremony", advanceButton, restartButton);
}

export function runSafetyCeremonyPhase() {
    // If few queens or no safe queens, skip straight to the lineup
    if (gameState.currentCast.length <= 6 || gameState.episodeResults.safeQueens.length === 0) {
        gameState.episodePhase = 'gatheringLineup'; // Set the *next* phase
        ui.displayGatheringScreen(gameState.episodeResults.placements, phaseSubheader, resultsContainer); // Display the content for this phase
        ui.updateAdvanceButton("Proceed to Critiques", advanceButton, restartButton); // Update the button text
        return; 
    }
    // Otherwise, show the normal safety ceremony screen
    gameState.episodePhase = 'safetyCeremony';
    ui.displaySafetyCeremony(gameState.currentCast, phaseSubheader, resultsContainer);
    ui.updateAdvanceButton('Reveal Safe Queens', advanceButton, restartButton);
}

export function runGatherTopsAndBottomsPhase() {
    gameState.episodePhase = 'gatherTopsAndBottoms'; // Set phase *when displaying* the lineup
    ui.displayGatheringScreen(gameState.episodeResults.placements, phaseSubheader, resultsContainer);
    ui.updateAdvanceButton("Proceed to Critiques", advanceButton, restartButton); // Button for next step
}


export function runTopsAndBottomsCritiquesPhase() {
    gameState.episodePhase = 'topsAndBottomsCritiques';
    ui.displayTopsAndBottomsCritiques(gameState.finalScores, gameState.episodeResults.placements, phaseSubheader, resultsContainer);
    ui.updateAdvanceButton("Judges' Deliberations", advanceButton, restartButton);
}
export function runTopsRevealPhase() {
    gameState.episodePhase = 'topsReveal';
    ui.displayTops(gameState.episodeResults.placements, phaseSubheader, resultsContainer);
    ui.updateAdvanceButton("Announce The Winner", advanceButton, restartButton);
}
export function runWinnerRevealPhase() {
    gameState.episodePhase = 'winnerReveal';
    ui.revealWinner(gameState.episodeResults.placements, phaseSubheader, resultsContainer);
    ui.updateAdvanceButton("Reveal The Bottoms", advanceButton, restartButton);
}
export function runBottomsRevealPhase() {
    gameState.episodePhase = 'bottomsReveal';
    ui.displayBottoms(gameState.episodeResults.placements, phaseSubheader, resultsContainer);
    ui.updateAdvanceButton("Save A Queen", advanceButton, restartButton);
}
export function runLowRevealPhase() {
    gameState.episodePhase = 'lowReveal';
    ui.revealLow(gameState.episodeResults.placements, phaseSubheader, resultsContainer);
    ui.updateAdvanceButton("Lip Sync For Your Life!", advanceButton, restartButton);
}
export function runLipSyncPhase() {
    gameState.episodePhase = 'lipsync';
    ui.switchView(simulationView, bodyContainer, gameState.episodePhase);
    ui.displayLipSyncMatchup(gameState.episodeResults, phaseSubheader, resultsContainer);
    ui.updateAdvanceButton("See The Results", advanceButton, restartButton);
}

// -- Shared Function --
export function runTrackRecordPhase() {
    gameState.episodePhase = 'trackRecord';
    ui.switchView(simulationView, bodyContainer, gameState.episodePhase);
    
    // Update track records in fullCast
    gameState.episodeResults.placements.forEach(p => {
        const queenInFullCast = gameState.fullCast.find(q => q.id === p.queen.id);
        if (queenInFullCast) queenInFullCast.trackRecord[gameState.episodeNumber - 1] = p.placement;
    });
    
    // Handle eliminations
    if (gameState.eliminatedQueens.length > 0) {
        gameState.eliminatedQueens.forEach(elimQueen => {
            const elimQueenInFullCast = gameState.fullCast.find(q => q.id === elimQueen.id);
            if (elimQueenInFullCast) {
                elimQueenInFullCast.eliminated = true;
                elimQueenInFullCast.epElim = gameState.episodeNumber;
            }
        });
        // Filter currentCast for the next episode
        gameState.currentCast = gameState.currentCast.filter(q => !gameState.eliminatedQueens.some(eq => eq.id === q.id));
    }
    
    // Fill in 'SAFE' for any remaining queens who didn't get a placement
    gameState.currentCast.forEach(q => {
        const queenInFullCast = gameState.fullCast.find(fq => fq.id === q.id);
        if (queenInFullCast && !queenInFullCast.trackRecord[gameState.episodeNumber - 1]) {
            queenInFullCast.trackRecord[gameState.episodeNumber - 1] = 'SAFE';
        }
    });

    // Display the updated track record
    ui.displayTrackRecord(gameState.fullCast, gameState.shuffledChallenges, resultsContainer, calculateTrackRecordScore);
    
    const buttonText = gameState.currentCast.length <= 4 ? 'Start The Finale!' : 'Next Episode';
    ui.updateAdvanceButton(buttonText, advanceButton, restartButton);
}

export function runNextPhase() {
    if (gameState.currentCast.length <= 4) {
        gameState.episodePhase = 'finale';
        gameState.episodeNumber++;
        runFinalePerformancePhase();
    } else {
        gameState.episodeNumber++;
        runEpisode(); // Call the main game loop
    }
}