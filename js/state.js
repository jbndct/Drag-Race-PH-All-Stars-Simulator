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
