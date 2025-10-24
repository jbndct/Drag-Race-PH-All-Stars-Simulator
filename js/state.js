// =================================================================================
// STATE MODULE (state.js)
// Manages the application's state.
// =================================================================================

export let gameState = {
    gameMode: 'standard',
    selectedCast: [],
    currentCast: [],
    fullCast: [],
    shuffledChallenges: [],
    finalists: [], // Renamed from top2
    episodeNumber: 1,
    episodePhase: 'judgesCritiques',
    episodeResults: {},
    finalScores: [],
    eliminatedQueens: [],
    doubleShantayCount: 0,
    doubleSashayCount: 0,
};

export const constants = {
    MAX_CAST_SIZE: 20,
    MIN_CAST_SIZE: 6,
};

export function resetState() {
    gameState.gameMode = 'standard';
    gameState.selectedCast = [];
    gameState.currentCast = [];
    gameState.fullCast = [];
    gameState.shuffledChallenges = [];
    gameState.finalists = []; // Renamed from top2
    gameState.episodeNumber = 1;
    gameState.episodePhase = 'judgesCritiques';
    gameState.episodeResults = {};
    gameState.finalScores = [];
    gameState.eliminatedQueens = [];
    gameState.doubleShantayCount = 0;
    gameState.doubleSashayCount = 0;
}

/**
 * Saves the current gameState to localStorage.
 */
export function saveGameState() {
    try {
        const stateToSave = JSON.stringify(gameState);
        localStorage.setItem('dragRaceAllStarsSave', stateToSave);
        console.log('Game state saved!');
        return true;
    } catch (e) {
        console.error("Could not save game state:", e);
        return false;
    }
}

/**
 * Loads the gameState from localStorage.
 * @returns {boolean} True if a saved state was successfully loaded, false otherwise.
 */
export function loadGameState() {
    const savedState = localStorage.getItem('dragRaceAllStarsSave');
    if (savedState) {
        try {
            const loadedState = JSON.parse(savedState);
            // Overwrite the existing gameState with the loaded data
            Object.assign(gameState, loadedState);
            console.log('Game state loaded!');
            return true;
        } catch (e) {
            console.error("Could not load game state:", e);
            return false;
        }
    }
    return false;
}

/**
 * Checks if a saved game exists in localStorage.
 * @returns {boolean}
 */
export function checkForSavedGame() {
    return localStorage.getItem('dragRaceAllStarsSave') !== null;
}

/**
 * Deletes the saved game from localStorage.
 */
export function clearSavedGame() {
    localStorage.removeItem('dragRaceAllStarsSave');
    console.log('Saved game cleared!');
}