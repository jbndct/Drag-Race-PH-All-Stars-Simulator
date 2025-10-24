// =================================================================================
// GAME MODULE (game.js)
// Handles the core game logic, state machine, and initialization.
// Acts as the "conductor" for all other modules.
// =================================================================================

import { queens, challenges } from './data.js';
import * as ui from './ui.js';
import { gameState, constants, resetState, saveGameState, loadGameState, checkForSavedGame, clearSavedGame } from './state.js';
import { calculateTrackRecordScore } from './utils.js';
import * as simulation from './simulation.js';
import * as stdEpisode from './standardEpisode.js';
import * as finale from './finale.js';
import * as mamaPao from './mamaPao.js';

// DOM Element References
const bodyContainer = document.getElementById('body-container');
const menuView = document.getElementById('menu-view');
const standardModeBtn = document.getElementById('standard-mode-btn'); 
const mamapaoModeBtn = document.getElementById('mamapao-mode-btn');
const loadGameBtn = document.getElementById('load-game-btn'); // Add this
const saveGameBtn = document.getElementById('save-game-btn'); // Add this
const queenGrid = document.getElementById('queen-grid');            
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

// --- INITIALIZATION ---

/**
 * Bundles DOM elements to pass to other modules.
 */
const domElements = {
    bodyContainer,
    simulationView,
    advanceButton,
    restartButton,
    episodeHeader,
    phaseSubheader,
    resultsContainer,
};

/**
 * Initializes all imported modules with necessary DOM elements.
 */
function initModules() {
    stdEpisode.init(domElements);
    finale.init(domElements);
    mamaPao.init(domElements);
}

// --- SETUP & NAVIGATION ---

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

// --- EPISODE & STATE MACHINE ---

/**
 * Runs the calculations for a new episode and starts the first phase.
 */
export function runEpisode() {
    const challenge = gameState.shuffledChallenges[(gameState.episodeNumber - 1) % gameState.shuffledChallenges.length];

    // 1. Run Calculations
    gameState.finalScores = simulation.runEpisodeCalculations(challenge);
    
    // 2. Display Header
    ui.switchView(simulationView, bodyContainer, 'judgesCritiques');
    ui.displayEpisodeHeader(gameState.episodeNumber, challenge, episodeHeader, phaseSubheader);

    // 3. Start Phase Flow
    if (gameState.gameMode === 'standard') {
        // Standard Mode: Calculate placements and song now
        gameState.episodeResults.placements = simulation.calculatePlacements(gameState.finalScores);
        gameState.episodeResults.safeQueens = gameState.episodeResults.placements
            .filter(p => p.placement === 'SAFE')
            .map(p => p.queen);
        
        const { lipSyncSong, lipSyncType } = simulation.getLipSyncSong();
        gameState.episodeResults.lipSyncSong = lipSyncSong;
        gameState.episodeResults.lipSyncType = lipSyncType;
        
        // Start the first scene
        stdEpisode.runJudgesCritiquesPhase();

    } else { 
        // Mama Pao Mode: Prompt for placements
        gameState.episodePhase = 'placements';
        ui.promptForCustomPlacements(gameState.finalScores, phaseSubheader, resultsContainer, advanceButton, mamaPao.handleCustomPlacementsSelection, gameState.currentCast.length);
    }
}

/**
 * The main "Conductor" function.
 * Called when the "Advance" button is clicked.
 */
export function advanceEpisode() {
    ui.stopAllAnimations();

    // This state machine just calls the correct "scene" function from the other modules.
    switch (gameState.episodePhase) {
        case 'judgesCritiques':
            stdEpisode.runSafetyCeremonyPhase();
            break;
        case 'safetyCeremony':
            ui.revealAllSafeQueens(gameState.episodeResults.safeQueens, phaseSubheader);
            gameState.episodePhase = 'gatheringLineup';
            ui.updateAdvanceButton("See Tops & Bottoms", advanceButton, restartButton);
            break;
        case 'gatheringLineup':
            stdEpisode.runTopsAndBottomsCritiquesPhase();
            break;
        case 'gatherTopsAndBottoms':
            stdEpisode.runTopsAndBottomsCritiquesPhase();
            break;
        case 'topsAndBottomsCritiques':
            stdEpisode.runTopsRevealPhase();
            break;
        case 'topsReveal':
            stdEpisode.runWinnerRevealPhase();
            break;
        case 'winnerReveal':
            stdEpisode.runBottomsRevealPhase();
            break;
        case 'bottomsReveal':
            stdEpisode.runLowRevealPhase();
            break;
        case 'lowReveal':
            stdEpisode.runLipSyncPhase();
            break;
        case 'lipsync':
            runLipSyncResultPhase(); // Logic phase, handled in game.js
            break;
        case 'lipsyncResult':
            stdEpisode.runTrackRecordPhase(); // Shared phase
            break;
        case 'trackRecord':
            stdEpisode.runNextPhase(); // Decides if finale or next episode
            break;
        
        // Finale Phases
        case 'finale':
            finale.runFinaleTop2Phase();
            break;
        case 'finaleTop2':
            finale.runLipsyncForTheCrownPhase();
            break;
    }
}

/**
 * Runs the lip sync *calculation* and then displays the *result*.
 * This is a logic/controller function, not just a UI phase.
 */
function runLipSyncResultPhase() {
    gameState.episodePhase = 'lipsyncResult';
    
    // 1. Get calculation results from simulation module
    const { placements, eliminatedQueens } = simulation.calculateLipSyncResult();

    // 2. Update state
    gameState.episodeResults.placements = placements;
    gameState.eliminatedQueens = eliminatedQueens;

    // 3. Display results
    ui.displayLipSyncResults(gameState.episodeResults, gameState.eliminatedQueens, phaseSubheader, resultsContainer);
    ui.updateAdvanceButton('View Track Record', advanceButton, restartButton);
}

function rehydrateUI() {
    const { episodePhase, finalScores, episodeResults, currentCast, fullCast, shuffledChallenges, episodeNumber, eliminatedQueens } = gameState;

    const challenge = shuffledChallenges[(episodeNumber - 1) % shuffledChallenges.length];
    ui.displayEpisodeHeader(episodeNumber, challenge, episodeHeader, phaseSubheader);

    // A big switch to restore the view for any given phase
    switch(episodePhase) {
        case 'placements': // This is the Mama Pao prompt screen
            ui.promptForCustomPlacements(finalScores, phaseSubheader, resultsContainer, advanceButton, mamaPao.handleCustomPlacementsSelection, currentCast.length);
            break;
        case 'judgesCritiques':
            stdEpisode.runJudgesCritiquesPhase();
            break;
        case 'safetyCeremony':
        case 'gatheringLineup':
            stdEpisode.runSafetyCeremonyPhase();
            break;
        case 'gatherTopsAndBottoms':
            stdEpisode.runGatherTopsAndBottomsPhase();
            break;
        case 'topsAndBottomsCritiques':
            stdEpisode.runTopsAndBottomsCritiquesPhase();
            break;
        case 'topsReveal':
            stdEpisode.runTopsRevealPhase();
            break;
        case 'winnerReveal':
            stdEpisode.runWinnerRevealPhase();
            break;
        case 'bottomsReveal':
            stdEpisode.runBottomsRevealPhase();
            break;
        case 'lowReveal':
            stdEpisode.runLowRevealPhase();
            break;
        case 'lipsync':
            stdEpisode.runLipSyncPhase();
            break;
        case 'lipsyncResult':
            ui.displayLipSyncResults(episodeResults, eliminatedQueens, phaseSubheader, resultsContainer);
            ui.updateAdvanceButton('View Track Record', advanceButton, restartButton);
            break;
        case 'trackRecord':
            ui.displayTrackRecord(fullCast, shuffledChallenges, resultsContainer, calculateTrackRecordScore);
            const buttonText = currentCast.length <= 4 ? 'Start The Finale!' : 'Next Episode';
            ui.updateAdvanceButton(buttonText, advanceButton, restartButton);
            break;
        case 'finale':
            finale.runFinalePerformancePhase();
            break;
        case 'finaleTop2':
            finale.runFinaleTop2Phase();
            break;
        case 'lipsyncForTheCrown':
            finale.runLipsyncForTheCrownPhase();
            break;
        // Note: Mama Pao's interactive phases aren't included as they require user input to proceed
    }

    ui.switchView(simulationView, bodyContainer, episodePhase);
}

// --- APP ENTRY POINT ---

window.addEventListener('load', () => {
    // Initialize all modules
    initModules();

    // Check for a saved game and show the button if it exists
    if (checkForSavedGame()) {
        loadGameBtn.classList.remove('hidden');
    }

    // --- Event Listeners ---
    standardModeBtn.addEventListener('click', () => selectMode('standard'));
    mamapaoModeBtn.addEventListener('click', () => selectMode('mamapao'));

    // Load Game button
    loadGameBtn.addEventListener('click', () => {
        if (loadGameState()) {
            rehydrateUI();
        } else {
            alert("Failed to load saved game. The file might be corrupted.");
        }
    });

    // Save Game button
    saveGameBtn.addEventListener('click', () => {
        if (saveGameState()) {
            // Give user feedback
            saveGameBtn.textContent = "Saved!";
            setTimeout(() => { saveGameBtn.textContent = "Save Game"; }, 1500);
        } else {
            alert("Could not save the game.");
        }
    });

    ui.populateQueenGrid(queens, queenGrid, toggleQueenSelection);
    startButton.addEventListener('click', () => { if (!startButton.disabled) startCompetition(); });
    advanceButton.addEventListener('click', advanceEpisode);

    // Modify the restart button to also clear the saved game
    restartButton.addEventListener('click', () => {
        if (confirm("Are you sure you want to start a new season? Your saved progress will be deleted.")) {
            clearSavedGame();
            window.location.reload();
        }
    });

    // Initial UI setup
    ui.updateSelectionUI(gameState.selectedCast, castList, castPlaceholder, castCounter, startButton, instructions, constants.MIN_CAST_SIZE, constants.MAX_CAST_SIZE);
    ui.switchView(menuView, bodyContainer, gameState.episodePhase);
});