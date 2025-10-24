// =================================================================================
// SIMULATION MODULE (simulation.js)
// Handles all core game logic, calculations, and simulations.
// Does not interact with the UI.
// =================================================================================

import { lipsyncSongs } from './data.js';
import { gameState } from './state.js';
import { generateCritique, calculateTrackRecordScore } from './utils.js';

/**
 * Calculates the performance and runway scores for all current queens.
 * @param {object} challenge - The current episode's challenge.
 * @returns {Array<object>} An array of queen score objects, sorted by totalScore.
 */
export function runEpisodeCalculations(challenge) {
    const finalScores = gameState.currentCast.map(q => {
        const lipsyncCount = q.trackRecord.filter(p => p === 'BTM' || p === 'BTM2').length;
        const fatiguePenalty = lipsyncCount * 5;
        const perfScore = (q.stats[challenge.primaryStat] * 5) + (Math.random() * 65);
        const runwayScore = (q.stats.runway * 5) + (Math.random() * 65);
        let totalScore = (perfScore * 0.75) + (runwayScore * 0.25) - fatiguePenalty;
        return { queen: q, totalScore, perfScore, runwayScore, critiques: {} };
    }).sort((a, b) => b.totalScore - a.totalScore);

    finalScores.forEach(s => {
        s.critiques.performance = generateCritique(s.queen, challenge.primaryStat, s.perfScore);
        s.critiques.runway = generateCritique(s.queen, 'runway', s.runwayScore);
    });
    
    return finalScores;
}

/**
 * Assigns placements (WIN, HIGH, SAFE, etc.) based on sorted scores.
 * @param {Array<object>} results - The sorted array of queen score objects.
 * @returns {Array<object>} An array of placement objects ({ queen, placement }).
 */
export function calculatePlacements(results) {
    const len = results.length;
    if (len === 0) return [];
    const placements = [];
    const scoreDifference = results[0].totalScore - results[1].totalScore;

    // Check for double win
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

    // Special logic for 5-queen episode
    if (len === 5) {
        return results.map((r, i) => {
            if (i === 0) return { queen: r.queen, placement: 'WIN' };
            if (i <= 2) return { queen: r.queen, placement: 'HIGH' };
            return { queen: r.queen, placement: 'BTM' };
        });
    }

    // Standard placements
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

/**
 * Calculates the result of the "Lip Sync For Your Life".
 * @returns {object} An object containing { placements, eliminatedQueens }.
 */
export function calculateLipSyncResult() {
    let eliminatedQueens = [];
    let placements = [...gameState.episodeResults.placements];
    
    const bottomQueens = placements.filter(r => r.placement === 'BTM');

    if (bottomQueens.length < 2) {
        // Not enough queens for a LSFYL (e.g., 5-queen episode)
        const sortedCastByScore = [...gameState.finalScores].sort((a, b) => a.totalScore - b.totalScore);
        const elimQueen = bottomQueens.length > 0 ? bottomQueens[0].queen : sortedCastByScore[0].queen;
        eliminatedQueens.push(elimQueen);
        
        const loserPlacement = placements.find(p => p.queen.id === elimQueen.id);
        if (loserPlacement) loserPlacement.placement = 'ELIM';

    } else {
        // Standard LSFYL
        const [q1Result, q2Result] = bottomQueens.map(p => gameState.finalScores.find(s => s.queen.id === p.queen.id));
        const q1Score = q1Result.queen.stats.lipsync * 10 + Math.random() * 25;
        const q2Score = q2Result.queen.stats.lipsync * 10 + Math.random() * 25;

        // Check for Double Sashay
        if (gameState.doubleSashayCount < 1 && q1Score < 30 && q2Score < 30 && Math.random() < 0.1) {
            eliminatedQueens = [q1Result.queen, q2Result.queen];
            gameState.doubleSashayCount++;
            placements.forEach(p => { if (p.queen.id === q1Result.queen.id || p.queen.id === q2Result.queen.id) p.placement = 'ELIM'; });
        
        // Check for Double Shantay
        } else if (gameState.doubleShantayCount < 2 && (q1Score > 95 && q2Score > 95) && Math.random() < 0.2) {
            gameState.doubleShantayCount++;
            placements.forEach(p => { if (p.queen.id === q1Result.queen.id || p.queen.id === q2Result.queen.id) p.placement = 'BTM2'; });
        
        // Standard elimination
        } else {
            const q1LipSyncs = q1Result.queen.trackRecord.filter(p => p === 'BTM' || p === 'BTM2').length;
            const q2LipSyncs = q2Result.queen.trackRecord.filter(p => p === 'BTM' || p === 'BTM2').length;
            
            const finalLipSyncScore1 = (q1Score * 1.0) + (calculateTrackRecordScore(q1Result.queen) * 0.5) - (q1LipSyncs * 15);
            const finalLipSyncScore2 = (q2Score * 1.0) + (calculateTrackRecordScore(q2Result.queen) * 0.5) - (q2LipSyncs * 15);
            
            let winner, loser;
            
            // Fatigue/Track Record logic
            if ((q1LipSyncs >= 2 && finalLipSyncScore1 - finalLipSyncScore2 < 20) || (q2LipSyncs >= 2 && finalLipSyncScore2 > finalLipSyncScore1)) { 
                winner = q2Result; 
                loser = q1Result; 
            } else if ((q2LipSyncs >= 2 && finalLipSyncScore2 - finalLipSyncScore1 < 20) || (q1LipSyncs >= 2 && finalLipSyncScore1 > finalLipSyncScore2)) { 
                winner = q1Result; 
                loser = q2Result; 
            } else { 
                // Standard result
                winner = finalLipSyncScore1 >= finalLipSyncScore2 ? q1Result : q2Result; 
                loser = finalLipSyncScore1 < finalLipSyncScore2 ? q1Result : q2Result; 
            }
            
            eliminatedQueens.push(loser.queen);
            placements.find(p => p.queen.id === winner.queen.id).placement = 'BTM2';
            placements.find(p => p.queen.id === loser.queen.id).placement = 'ELIM';
        }
    }
    
    return { placements, eliminatedQueens };
}

/**
 * Calculates the random lip sync song for the episode.
 */
export function getLipSyncSong() {
    const randomSong = lipsyncSongs[Math.floor(Math.random() * lipsyncSongs.length)];
    return {
        lipSyncSong: randomSong.name,
        lipSyncType: randomSong.type,
    };
}
