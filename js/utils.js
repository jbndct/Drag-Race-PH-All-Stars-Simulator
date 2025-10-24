// =================================================================================
// UTILS MODULE (utils.js)
// Contains helper functions for the application.
// =================================================================================

import { critiques } from './data.js';

export function generateCritique(queen, stat, score) {
    const level = score > 75 ? 'high' : score > 40 ? 'mid' : 'low';
    const options = critiques[stat][level];
    const critiqueText = options[Math.floor(Math.random() * options.length)];
    const separator = critiqueText.startsWith("'") ? "" : " ";
    return queen.name + separator + critiqueText;
}

export function calculateTrackRecordScore(queen) {
    const placementScores = { 'WINNER': 10, 'RUNNER-UP': 8, 'WIN': 5, 'HIGH': 4, 'SAFE': 3, 'LOW': 2, 'BTM2': 1, 'BTM': 1, 'ELIM': 0 };
    return queen.trackRecord.reduce((acc, placement) => acc + (placementScores[placement] || 0), 0);
}