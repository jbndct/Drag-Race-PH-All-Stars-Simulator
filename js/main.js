// =================================================================================
// MAIN MODULE (main.js)
// Initializes the application and sets up event listeners.
// =================================================================================

import { queens } from './data.js';
import * as ui from './ui.js';
import { selectMode, toggleQueenSelection, startCompetition, advanceEpisode } from './game.js';
import { gameState, constants } from './state.js';

// DOM Element References
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
const menuView = document.getElementById('menu-view');
const bodyContainer = document.getElementById('body-container');


window.addEventListener('load', () => {
    standardModeBtn.addEventListener('click', () => selectMode('standard'));
    mamapaoModeBtn.addEventListener('click', () => selectMode('mamapao'));
    ui.populateQueenGrid(queens, queenGrid, toggleQueenSelection);
    startButton.addEventListener('click', () => { if (!startButton.disabled) startCompetition(); });
    advanceButton.addEventListener('click', advanceEpisode);
    restartButton.addEventListener('click', () => window.location.reload());
    ui.updateSelectionUI(gameState.selectedCast, castList, castPlaceholder, castCounter, startButton, instructions, constants.MIN_CAST_SIZE, constants.MAX_CAST_SIZE);
    ui.switchView(menuView, bodyContainer, gameState.episodePhase);
});