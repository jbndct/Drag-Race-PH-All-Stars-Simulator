// --- DATA ---
// Image URLs have been added to each queen object
const queens = [
     // S1 with Images
    { id: 'brigiding', name: 'Brigiding', season: 1, image: 'https://static.wikia.nocookie.net/logosrupaulsdragrace/images/a/a5/BrigidingDRP1MiniPromo.jpg', stats: { runway: 7, comedy: 7, acting: 7, dance: 8, design: 5, lipsync: 8 } },
    { id: 'corazon', name: 'Corazon', season: 1, image: 'https://static.wikia.nocookie.net/logosrupaulsdragrace/images/7/71/CorazonDRP1MiniPromo.jpg', stats: { runway: 6, comedy: 5, acting: 6, dance: 6, design: 8, lipsync: 7 } },
    { id: 'eva_le_queen', name: 'Eva Le Queen', season: 1, image: 'https://static.wikia.nocookie.net/logosrupaulsdragrace/images/3/3b/EvaLeQueenDRP1MiniPromo.jpg', stats: { runway: 8, comedy: 9, acting: 8, dance: 6, design: 7, lipsync: 7 } },
    { id: 'gigi_era', name: 'Gigi Era', season: 1, image: 'https://static.wikia.nocookie.net/logosrupaulsdragrace/images/c/c5/GigiEraDRP1MiniPromo.jpg', stats: { runway: 6, comedy: 6, acting: 7, dance: 7, design: 5, lipsync: 9 } },
    { id: 'lady_morgana', name: 'Lady Morgana', season: 1, image: 'https://static.wikia.nocookie.net/logosrupaulsdragrace/images/6/62/LadyMorganaDRP1MiniPromo.jpg', stats: { runway: 5, comedy: 8, acting: 7, dance: 6, design: 6, lipsync: 7 } },
    { id: 'marina_summers', name: 'Marina Summers', season: 1, image: 'https://static.wikia.nocookie.net/logosrupaulsdragrace/images/a/a2/MarinaSummersDRP1MiniPromo.jpg', stats: { runway: 9, comedy: 6, acting: 7, dance: 9, design: 9, lipsync: 8 } },
    { id: 'minty_fresh', name: 'Minty Fresh', season: 1, image: 'https://static.wikia.nocookie.net/logosrupaulsdragrace/images/2/25/MintyFreshDRP1MiniPromo.jpg', stats: { runway: 9, comedy: 7, acting: 7, dance: 8, design: 7, lipsync: 9 } },
    { id: 'precious_paula_nicole', name: 'Precious Paula Nicole', season: 1, image: 'https://static.wikia.nocookie.net/logosrupaulsdragrace/images/0/0f/PreciousPaulaNicoleDRP1MiniPromo.jpg', stats: { runway: 8, comedy: 8, acting: 9, dance: 7, design: 7, lipsync: 10 } },
    { id: 'prince', name: 'Prince', season: 1, image: 'https://static.wikia.nocookie.net/logosrupaulsdragrace/images/e/ec/PrinceDRP1MiniPromo.jpg', stats: { runway: 7, comedy: 5, acting: 6, dance: 6, design: 5, lipsync: 7 } },
    { id: 'turing', name: 'Turing', season: 1, image: 'https://static.wikia.nocookie.net/logosrupaulsdragrace/images/1/1e/TuringDRP1MiniPromo.jpg', stats: { runway: 7, comedy: 7, acting: 8, dance: 9, design: 6, lipsync: 8 } },
    { id: 'vinas_deluxe', name: 'Viñas DeLuxe', season: 1, image: 'https://static.wikia.nocookie.net/logosrupaulsdragrace/images/6/64/Vi%C3%B1asDeLuxeDRPHSR1CastMug.jpg', stats: { runway: 8, comedy: 10, acting: 8, dance: 7, design: 7, lipsync: 8 } },
    { id: 'xilhouete', name: 'Xilhouete', season: 1, image: 'https://static.wikia.nocookie.net/logosrupaulsdragrace/images/2/2e/XilhoueteDRP1MiniPromo.jpg', stats: { runway: 9, comedy: 8, acting: 8, dance: 7, design: 9, lipsync: 8 } },

    // S2 with Images
    { id: 'arizona_brandy', name: 'Arizona Brandy', season: 2, image: 'https://static.wikia.nocookie.net/logosrupaulsdragrace/images/9/95/ArizonaBrandyDRPHSR1CastMug.jpg', stats: { runway: 7, comedy: 9, acting: 8, dance: 7, design: 7, lipsync: 9 } },
    { id: 'astrid_mercury', name: 'Astrid Mercury', season: 2, image: 'https://static.wikia.nocookie.net/logosrupaulsdragrace/images/e/e6/AstridMercuryDRPH2MiniPromo.jpg', stats: { runway: 7, comedy: 6, acting: 7, dance: 8, design: 6, lipsync: 7 } },
    { id: 'bernie', name: 'Bernie', season: 2, image: 'https://static.wikia.nocookie.net/logosrupaulsdragrace/images/4/48/BernieDRPHSR1CastMug.jpg', stats: { runway: 9, comedy: 8, acting: 9, dance: 8, design: 8, lipsync: 8 } },
    { id: 'captivating_katkat', name: 'Captivating Katkat', season: 2, image: 'https://static.wikia.nocookie.net/logosrupaulsdragrace/images/2/23/CaptivatingKatkatDRPH2MiniPromo.jpg', stats: { runway: 9, comedy: 8, acting: 7, dance: 9, design: 7, lipsync: 10 } },
    { id: 'deedee_marie_holliday', name: 'DeeDee Marié Holliday', season: 2, image: 'https://static.wikia.nocookie.net/logosrupaulsdragrace/images/d/d5/DeeDeeMari%C3%A9HollidayDRPH2MiniPromo.jpg', stats: { runway: 8, comedy: 7, acting: 7, dance: 8, design: 7, lipsync: 6 } },
    { id: 'hana_beshie', name: 'Hana Beshie', season: 2, image: 'https://static.wikia.nocookie.net/logosrupaulsdragrace/images/5/57/HanaBeshieDRPH2MiniPromo.jpg', stats: { runway: 6, comedy: 8, acting: 7, dance: 7, design: 6, lipsync: 8 } },
    { id: 'm1ss_jade_so', name: 'M1ss Jade So', season: 2, image: 'https://static.wikia.nocookie.net/logosrupaulsdragrace/images/4/4a/M1ssJadeSoDRPH2MiniPromo.jpg', stats: { runway: 9, comedy: 7, acting: 8, dance: 8, design: 9, lipsync: 9 } },
    { id: 'matilduh', name: 'Matilduh', season: 2, image: 'https://static.wikia.nocookie.net/logosrupaulsdragrace/images/7/71/MatilduhDRPH2MiniPromo.jpg', stats: { runway: 7, comedy: 7, acting: 6, dance: 7, design: 7, lipsync: 7 } },
    { id: 'nicole_pardaux', name: 'Nicole Pardaux', season: 2, image: 'https://static.wikia.nocookie.net/logosrupaulsdragrace/images/7/79/NicolePardauxDRPH2MiniPromo.jpg', stats: { runway: 8, comedy: 6, acting: 6, dance: 7, design: 6, lipsync: 5 } },
    { id: 'ov_cunt', name: 'ØV Cünt', season: 2, image: 'https://static.wikia.nocookie.net/logosrupaulsdragrace/images/6/60/%C3%98VC%C3%BCntDRPH2MiniPromo.jpg', stats: { runway: 10, comedy: 6, acting: 7, dance: 8, design: 9, lipsync: 9 } },
    { id: 'tiny_deluxe', name: 'Tiny DeLuxe', season: 2, image: 'https://static.wikia.nocookie.net/logosrupaulsdragrace/images/e/e1/TinyDeluxeDRPH2MiniPromo.jpg', stats: { runway: 6, comedy: 7, acting: 7, dance: 7, design: 6, lipsync: 6 } },
    { id: 'veruschka_levels', name: 'Veruschka Levels', season: 2, image: 'https://static.wikia.nocookie.net/logosrupaulsdragrace/images/d/d4/VeruschkaLevelsDRPH2MiniPromo.jpg', stats: { runway: 8, comedy: 7, acting: 8, dance: 7, design: 7, lipsync: 6 } },

    // S3 with Images
    { id: 'maxie', name: 'Maxie', image: 'https://static.wikia.nocookie.net/logosrupaulsdragrace/images/8/85/MaxieDRPH3MiniPromo.jpg/revision/latest/scale-to-width-down/1000?cb=20240802141402', stats: { runway: 9, comedy: 10, acting: 9, dance: 7, design: 8, lipsync: 6 } },
    { id: 'khianna', name: 'Khianna', season: 3, image: 'https://static.wikia.nocookie.net/logosrupaulsdragrace/images/6/6c/KhiannaDRPHSR1CastMug.jpg', stats: { runway: 8, comedy: 7, acting: 8, dance: 8, design: 7, lipsync: 8 } },
    { id: 'angel', name: 'Angel', season: 3, image: 'https://static.wikia.nocookie.net/logosrupaulsdragrace/images/3/34/AngelDRPH3MiniPromo.jpg', stats: { runway: 7, comedy: 6, acting: 7, dance: 9, design: 9, lipsync: 9 } },
    { id: 'tita_baby', name: 'Tita Baby', season: 3, image: 'https://static.wikia.nocookie.net/logosrupaulsdragrace/images/4/47/TitaBabyDRPH3MiniPromo.jpg', stats: { runway: 7, comedy: 8, acting: 8, dance: 7, design: 7, lipsync: 8 } },
    { id: 'zymba_ding', name: 'Zymba Ding', season: 3, image: 'https://static.wikia.nocookie.net/logosrupaulsdragrace/images/7/7b/ZymbaDingDRPH3MiniPromo.jpg', stats: { runway: 8, comedy: 7, acting: 7, dance: 9, design: 8, lipsync: 7 } },
    { id: 'myx_chanel', name: 'Myx Chanel', season: 3, image: 'https://static.wikia.nocookie.net/logosrupaulsdragrace/images/5/55/MyxChanelDRPH3MiniPromo.jpg', stats: { runway: 9, comedy: 8, acting: 7, dance: 7, design: 8, lipsync: 8 } },
    { id: 'popstar_bench', name: 'Popstar Bench', season: 3, image: 'https://static.wikia.nocookie.net/logosrupaulsdragrace/images/6/6b/PopstarBenchDRPH3MiniPromo.jpg', stats: { runway: 7, comedy: 7, acting: 7, dance: 8, design: 6, lipsync: 8 } },
    { id: 'john_fedellaga', name: 'John Fedellaga', season: 3, image: 'https://static.wikia.nocookie.net/logosrupaulsdragrace/images/2/27/JohnFedellagaDRPH3MiniPromo.jpg', stats: { runway: 8, comedy: 8, acting: 8, dance: 7, design: 8, lipsync: 6 } },
    { id: 'j_quinn', name: 'J Quinn', season: 3, image: 'https://static.wikia.nocookie.net/logosrupaulsdragrace/images/f/f9/JQuinnDRPH3MiniPromo.jpg', stats: { runway: 7, comedy: 6, acting: 6, dance: 7, design: 7, lipsync: 8 } },
    { id: 'yudipota', name: 'Yudipota', season: 3, image: 'https://static.wikia.nocookie.net/logosrupaulsdragrace/images/6/68/YudipotaDRPH3MiniPromo.jpg', stats: { runway: 8, comedy: 8, acting: 8, dance: 8, design: 8, lipsync: 8 } },
    { id: 'versex', name: 'Versex', season: 3, image: 'https://static.wikia.nocookie.net/logosrupaulsdragrace/images/f/f2/VersexDRPH3MiniPromo.jpg', stats: { runway: 7, comedy: 6, acting: 6, dance: 7, design: 7, lipsync: 5 } },
];

const challenges = [ { name: "Snatch Game", primaryStat: 'comedy', intro: "The queens must impersonate celebrities in the legendary Snatch Game!" }, { name: "The Rusical", primaryStat: 'dance', intro: "It's time for the Rusical! The queens must sing, dance, and act their hearts out." }, { name: "Girl Groups", primaryStat: 'dance', intro: "Pop star fantasies come alive as the queens form two rival girl groups." }, { name: "Acting Challenge", primaryStat: 'acting', intro: "The queens star in a new teleserye, but who will steal the scene?" }, { name: "Improv", primaryStat: 'comedy', intro: "Queens must think on their feet in a hilarious improv challenge." }, { name: "Sewing", primaryStat: 'design', intro: "Using unconventional materials, the queens must create a look from scratch." }, { name: "The Ball", primaryStat: 'design', intro: "The queens must serve three distinct looks, including one they make themselves, in the legendary Ball." }, { name: "Makeover", primaryStat: 'design', intro: "The queens give drag makeovers to some very special guests!" }, { name: "Talent Show", primaryStat: 'acting', intro: "In the grand premiere, the queens must showcase their unique talents." }, { name: "Roast", primaryStat: 'comedy', intro: "The library is open! The queens must roast the judges and each other." }, ];
const runwayThemes = ["Filipiniana Extravaganza", "Pearls & Perlas", "Mythical Creatures", "Jeepney Realness", "Divas of the Decades", "Horror-scope", "Terno-dactyl", "Flower Power", "Miss Universe Couture", "Intergalactic Drag", "Aswang Chic"];
const lipsyncSongs = [
    "'Sirena' by Gloc-9",
    "'Upuan' by Gloc-9", 
    "'Tala' by Sarah Geronimo", 
    "'Kilometro' by Sarah Geronimo", 
    "'Nosi Balasi' by Sampaguita", 
    "'Rampa' by Vice Ganda", 
    "'Amakabogera' by Maymay Entrata",
    "'Halik' by Aegis",
    "'Basang Basa sa Ulan' by Aegis",
    "'Luha' by Aegis",
    "'Gento' by SB19",
    "'Spageti Song' by Sexbomb Girls",
    "'Bakit Papa?' by Sexbomb Girls",
    "'Dadalhin' by Regine Velasquez",
    "'On The Wings of Love' by Regine Velasquez",
    "'Sundo' by Imago",
    "'Torete' by Moonstar88",
    "'Ikot-Ikot' by Sarah Geronimo",
    "'Paubaya' by Moira Dela Torre",
    "'Araw-Araw' by Ben&Ben",
    "'Karera' by BINI",
    "'Your Love' by Alamid",
    "'Ako'y Maghihintay' by Jolina Magdangal",
    "'Chinito' by Yeng Constantino",
    "'Pop Off Ate!' from DRPH S1",
    "'BOOGSH!' from DRPH S2",
    "'Bongga Ka 'Day' by Hotdog",
    "'Please, Please, Please' by Sabrina Carpenter"
];
const critiques = {
    comedy: { 
        high: ["'s comedic timing was impeccable, leaving the judges in stitches.", "'s celebrity impersonation was spot-on and hilariously funny.", "delivered a knockout performance, with jokes that consistently landed.", "was a comedic genius, their performance was pure gold."], 
        mid: ["had some funny moments, but the performance was a bit inconsistent.", "took a safe approach that didn't quite stand out.", "'s character was interesting, but needed more punchlines.", "got a few chuckles, but didn't fully commit to the character."], 
        low: ["'s jokes failed to land, resulting in some awkward silences.", "struggled to find the humor in their character.", "'s performance felt under-rehearsed and missed the mark.", "was a comedy catastrophe, it was hard to watch."] 
    },
    dance: { 
        high: ["set the stage on fire with their sharp choreography and star quality.", "was a true standout, hitting every beat with precision and energy.", "commanded the stage and proved they are a true dancing diva.", "moved like a seasoned professional, a joy to watch."], 
        mid: ["kept up with the choreography but didn't have a standout moment.", "was solid in the group, but got a little lost in the background.", "showed potential but needed a bit more polish in their moves.", "did the moves correctly, but lacked a bit of passion."], 
        low: ["was visibly struggling with the choreography.", "seemed to be a step behind the other queens.", "lacked the energy the performance needed, and it showed.", "looked stiff and uncomfortable on the main stage."] 
    },
    acting: { 
        high: ["delivered a powerful and believable performance, stealing every scene they were in.", "showcased incredible range and made a memorable character choice.", "was a natural, bringing humor and heart to their role.", "deserves an award for that performance, truly captivating."], 
        mid: ["had their moments but sometimes faded into the background.", "made safe choices that didn't allow their full potential to shine.", "was professional but didn't take enough risks to stand out.", "was believable, but the performance was forgettable."], 
        low: ["'s performance felt flat and one-note.", "seemed to forget their lines and struggled with their character.", "overacted and their performance felt more like a caricature.", "gave a wooden performance that brought the whole scene down."] 
    },
    design: { 
        high: ["constructed a breathtaking garment that looked like it came from a professional designer.", "'s look was creative, well-executed, and told a clear story.", "showed incredible skill, transforming unconventional materials into a high-fashion look.", "created a masterpiece, a true work of art."], 
        mid: ["'s garment was a good idea but the execution could have been cleaner.", "created a solid look, but it wasn't a showstopper.", "played it safe with a simple silhouette that was well-made but unexciting.", "the look is fine, but it's not fashion."], 
        low: ["'s garment looked unfinished, with messy hemlines and a confusing silhouette.", "struggled with construction, and the final garment was not flattering.", "had a concept that was better in theory than in execution.", "it's a piece of fabric... with other pieces of fabric glued to it."] 
    },
    runway: { 
        high: ["stomped the runway with confidence, selling every inch of their breathtaking look.", "served a look that was pure high fashion and perfectly on theme.", "presented a creative and polished look that left the judges gagged.", "owned the runway tonight, a true supermodel."], 
        mid: ["'s runway was nice, but it didn't leave a lasting impression.", "had a good look, but it felt like something we've seen before.", "looked polished, but the look was a little safe for this stage of the competition.", "the look is beautiful, but is it drag?"], 
        low: ["'s runway presentation was underwhelming and the garment was ill-fitting.", "missed the mark on the theme, presenting a confusing look.", "had an interesting idea for the runway, but the execution was sloppy.", "it's a no from us. What were they thinking?"] 
    }
};
function generateCritique(queen, stat, score) { const level = score > 75 ? 'high' : score > 40 ? 'mid' : 'low'; const options = critiques[stat][level]; const critiqueText = options[Math.floor(Math.random() * options.length)]; const separator = critiqueText.startsWith("'") ? "" : " "; return queen.name + separator + critiqueText; }

// --- STATE & DOM ELEMENTS ---
let gameMode = 'standard', selectedCast = [], currentCast = [], fullCast = [], shuffledChallenges = [], top2 = [], episodeNumber = 1, episodePhase = 'performance', episodeResults = {}, finalScores = [], eliminatedQueen = null;
const MAX_CAST_SIZE = 15, MIN_CAST_SIZE = 8;
const bodyContainer = document.getElementById('body-container'), menuView = document.getElementById('menu-view'), selectionView = document.getElementById('selection-view'), simulationView = document.getElementById('simulation-view');
const standardModeBtn = document.getElementById('standard-mode-btn'), mamapaoModeBtn = document.getElementById('mamapao-mode-btn'), queenGrid = document.getElementById('queen-grid'), castList = document.getElementById('cast-list'), castCounter = document.getElementById('cast-counter'), castPlaceholder = document.getElementById('cast-placeholder'), startButton = document.getElementById('start-competition-button'), instructions = document.getElementById('instructions'), episodeHeader = document.getElementById('episode-header'), phaseSubheader = document.getElementById('phase-subheader'), resultsContainer = document.getElementById('results-container'), advanceButton = document.getElementById('advance-button'), restartButton = document.getElementById('restart-button');

// --- CORE & UI LOGIC ---
function switchView(viewToShow) {
    [menuView, selectionView, simulationView].forEach(v => v.classList.add('hidden', 'opacity-0'));
    viewToShow.classList.remove('hidden');
    setTimeout(() => viewToShow.classList.remove('opacity-0'), 50);
    let bg = 'var(--bg-image-selection)';
    if (viewToShow === simulationView) {
        const phaseToBg = { 'performance': 'var(--bg-image-challenge)', 'placements': 'var(--bg-image-runway)', 'lipsync': 'var(--bg-image-lipsync)', 'trackRecord': 'var(--bg-image-selection)', 'finale': 'var(--bg-image-finale)' };
        bg = phaseToBg[episodePhase] || 'var(--bg-image-challenge)';
    }
    bodyContainer.style.backgroundImage = bg;
}
function selectMode(mode) { gameMode = mode; switchView(selectionView); }
function startCompetition() { fullCast = selectedCast.map(q => ({ ...q, trackRecord: [], eliminated: false })); currentCast = [...fullCast]; episodeNumber = 1; shuffledChallenges = [...challenges].sort(() => 0.5 - Math.random()); runEpisode(); }
function runEpisode() {
    episodePhase = 'performance';
    switchView(simulationView);
    const challenge = shuffledChallenges[episodeNumber - 1]; 
    episodeHeader.textContent = `Episode ${episodeNumber}: ${challenge.name}`; 
    phaseSubheader.innerHTML = `<p class="max-w-2xl mx-auto">${challenge.intro}</p>`; 
    finalScores = currentCast.map(q => { const perfScore = (q.stats[challenge.primaryStat] * 5) + (Math.random() * 50); const runwayScore = (q.stats.runway * 5) + (Math.random() * 50); const totalScore = (perfScore * 0.75) + (runwayScore * 0.25); return { queen: q, totalScore, perfScore, runwayScore, critiques: {} }; }).sort((a, b) => b.totalScore - a.totalScore); 
    finalScores.forEach(s => { s.critiques.performance = generateCritique(s.queen, challenge.primaryStat, s.perfScore); s.critiques.runway = generateCritique(s.queen, 'runway', s.runwayScore); }); 
    displayAllCritiques(finalScores); 
    advanceButton.textContent = 'Proceed to Judging'; 
    advanceButton.classList.remove('hidden'); 
    restartButton.classList.add('hidden');
}
function advanceEpisode() {
    switch (episodePhase) {
        case 'performance': runJudgingPhase(); break;
        case 'placements': 
             if (gameMode === 'mamapao') {
                runTrackRecordPhase();
            } else {
                runLipSyncPhase();
            }
            break;
        case 'lipsync': runTrackRecordPhase(); break;
        case 'trackRecord': if (currentCast.length <= 4) { episodePhase = 'finale'; runFinalePerformancePhase(); } else { episodeNumber++; runEpisode(); } break;
        case 'finale': runFinaleTop2Phase(); break;
        case 'finaleTop2': runLipsyncForTheCrownPhase(); break;
    }
}
function runJudgingPhase() { 
    episodePhase = 'placements'; 
    switchView(simulationView); 
    if (gameMode === 'standard') { 
        episodeResults.placements = assignPlacements(finalScores); 
        displayPlacements(episodeResults.placements); 
        advanceButton.textContent = 'Watch The Lip Sync'; 
    } else { 
        promptForWinner(finalScores); 
    } 
}
function runLipSyncPhase() {
    episodePhase = 'lipsync'; 
    switchView(simulationView);
    phaseSubheader.textContent = `Lip Sync For Your Life!`; 
    const bottomQueens = episodeResults.placements.filter(r => r.placement === 'BTM'); 
    episodeResults.lipSyncSong = lipsyncSongs[Math.floor(Math.random() * lipsyncSongs.length)];
    if (bottomQueens.length < 2) { 
        const sortedCastByScore = [...finalScores].sort((a,b) => a.totalScore - b.totalScore);
        eliminatedQueen = bottomQueens.length > 0 ? bottomQueens[0].queen : sortedCastByScore[0].queen;
        handlePostLipSync(null, eliminatedQueen); 
        return; 
    }
    const [q1Result, q2Result] = bottomQueens.map(p => finalScores.find(s => s.queen.id === p.queen.id));
    const q1Score = q1Result.queen.stats.lipsync * 10 + Math.random() * 15; const q2Score = q2Result.queen.stats.lipsync * 10 + Math.random() * 15; 
    const winner = q1Score >= q2Score ? q1Result : q2Result; const loser = q1Score < q2Score ? q1Result : q2Result; 
    eliminatedQueen = loser.queen; 
    const winnerPlacement = episodeResults.placements.find(p => p.queen.id === winner.queen.id);
    const loserPlacement = episodeResults.placements.find(p => p.queen.id === loser.queen.id);
    if(winnerPlacement) winnerPlacement.placement = 'BTM2';
    if(loserPlacement) loserPlacement.placement = 'ELIM';

    handlePostLipSync(winner.queen, loser.queen);
}
function handlePostLipSync(winner, loser) { 
    displayLipSyncResults(winner, loser, episodeResults.lipSyncSong);
    advanceButton.classList.remove('hidden'); 
    advanceButton.textContent = 'View Track Record'; 
}
function runTrackRecordPhase() {
    episodePhase = 'trackRecord'; 
    switchView(simulationView);
    phaseSubheader.textContent = `Season Progress`; 
    
    currentCast.forEach(q => {
        const queenInFullCast = fullCast.find(fq => fq.id === q.id);
        const alreadyHasPlacement = episodeResults.placements.some(p => p.queen.id === q.id);
        if (queenInFullCast && !alreadyHasPlacement) {
             episodeResults.placements.push({ queen: q, placement: 'SAFE' });
        }
    });

    episodeResults.placements.forEach(p => { 
        const queenInFullCast = fullCast.find(q => q.id === p.queen.id); 
        if (queenInFullCast && queenInFullCast.trackRecord.length < episodeNumber) { 
            queenInFullCast.trackRecord.push(p.placement); 
        } 
    }); 
    const elimQueenInFullCast = fullCast.find(q => q.id === eliminatedQueen.id); 
    if (elimQueenInFullCast) { 
        elimQueenInFullCast.trackRecord[episodeNumber - 1] = 'ELIM';
        elimQueenInFullCast.eliminated = true; 
    } 
    currentCast = fullCast.filter(q => !q.eliminated);
    displayTrackRecord(); 
    advanceButton.textContent = currentCast.length <= 4 ? 'Start The Finale!' : 'Next Episode';
    advanceButton.classList.remove('hidden');
}
function promptForWinner(scores) {
    const deliberationTexts = ["The judges were blown away by the top queens.", "It was a tough decision, but these queens rose to the top.", "These queens absolutely slayed the challenge."];
    phaseSubheader.textContent = "Mama Pao's Deliberations: The Tops"; 
    const topQueens = scores.slice(0, 3); 
    let html = `<div class="text-center mb-6"><h3 class="text-2xl font-display tracking-widest text-pink-400">${deliberationTexts[Math.floor(Math.random() * deliberationTexts.length)]}</h3><p class="text-gray-300">Based on their critiques, you must choose a winner.</p></div><div class="space-y-3">`; 
    topQueens.forEach(s => { html += `<button class="secondary-button w-full p-4 rounded-lg text-left" data-winner-id="${s.queen.id}"><p class="font-bold text-lg">${s.queen.name}</p><p class="text-sm mt-2"><span class="font-semibold text-blue-400">Challenge:</span> ${s.critiques.performance}</p><p class="text-sm mt-1"><span class="font-semibold text-pink-400">Runway:</span> ${s.critiques.runway}</p></button>`; }); 
    html += `</div>`; 
    resultsContainer.innerHTML = html; 
    resultsContainer.querySelectorAll('button').forEach(btn => btn.addEventListener('click', () => handleWinnerSelection(btn.dataset.winnerId, scores))); 
    advanceButton.classList.add('hidden'); 
}
function handleWinnerSelection(winnerId, scores) { 
    episodeResults.placements = []; 
    scores.slice(0, 3).forEach(s => { const placement = s.queen.id === winnerId ? 'WIN' : 'HIGH'; episodeResults.placements.push({ queen: s.queen, placement }); }); 
    promptForBottoms(scores); 
}
function promptForBottoms(scores) {
    const deliberationTexts = ["Unfortunately, three queens failed to impress.", "These queens found themselves at the bottom of the pack.", "For these three queens, the critiques were harsh."];
    phaseSubheader.textContent = "Mama Pao's Deliberations: The Bottoms"; 
    const bottomQueens = scores.slice(-3); 
    let html = `<div class="text-center mb-6"><h3 class="text-2xl font-display tracking-widest text-pink-400">${deliberationTexts[Math.floor(Math.random() * deliberationTexts.length)]}</h3><p class="text-gray-300">You must save one from the lip sync.</p></div><div class="space-y-3">`; 
    bottomQueens.forEach(s => { html += `<button class="secondary-button w-full p-4 rounded-lg text-left" data-safe-id="${s.queen.id}"><p class="font-bold text-lg">${s.queen.name}</p><p class="text-sm mt-2"><span class="font-semibold text-blue-400">Challenge:</span> ${s.critiques.performance}</p><p class="text-sm mt-1"><span class="font-semibold text-pink-400">Runway:</span> ${s.critiques.runway}</p></button>`; }); 
    html += `</div>`; 
    resultsContainer.innerHTML = html; 
    resultsContainer.querySelectorAll('button').forEach(btn => btn.addEventListener('click', () => handleBottomSelection(btn.dataset.safeId, scores))); 
}
function handleBottomSelection(safeId, scores) { 
    scores.slice(-3).forEach(s => { const placement = s.queen.id === safeId ? 'LOW' : 'BTM'; episodeResults.placements.push({ queen: s.queen, placement }); }); 
    episodeResults.lipSyncSong = lipsyncSongs[Math.floor(Math.random() * lipsyncSongs.length)];
    promptForLipSyncWinner(); 
}
function formatTrackRecordPills(trackRecord) {
    if (!trackRecord || trackRecord.length === 0) return '<p class="text-xs text-gray-400">No track record yet.</p>';
    return `<div class="flex flex-wrap gap-1 mt-2">${trackRecord.map(p => `<span class="track-record-pill placement-${p}">${p}</span>`).join('')}</div>`;
}
function promptForLipSyncWinner() {
    const bottomQueens = episodeResults.placements.filter(p => p.placement === 'BTM').map(p => finalScores.find(s => s.queen.id === p.queen.id)); 
    if (bottomQueens.length < 2) {
        eliminatedQueen = bottomQueens[0]?.queen || finalScores[finalScores.length - 1].queen;
        const loserPlacement = episodeResults.placements.find(p => p.queen.id === eliminatedQueen.id);
        if(loserPlacement) loserPlacement.placement = 'ELIM';
        runTrackRecordPhase();
        return;
    }
    const [s1, s2] = bottomQueens; 
    const song = episodeResults.lipSyncSong;
    let html = `<div class="text-center mb-6"><h3 class="text-2xl font-display tracking-widest text-pink-400">Two queens stand before me.</h3><p class="text-gray-300">They will lip sync to ${song}. Based on their passion, performance, and track record, you decide who stays.</p></div><div class="grid grid-cols-1 md:grid-cols-2 gap-4">`; 
    const createButton = (s) => {
        const fullQueenData = fullCast.find(q => q.id === s.queen.id);
        return `<button class="secondary-button w-full p-4 rounded-lg text-left flex flex-col justify-between" data-winner-id="${s.queen.id}">
                    <div>
                        <p class="text-xl font-bold">${s.queen.name}</p>
                        <div class="text-sm mt-2">
                            <p><span class="font-semibold">Lip Sync Stat:</span> ${s.queen.stats.lipsync}/10</p>
                            <p class="mt-2"><span class="font-semibold">This Week's Critique:</span> ${s.critiques.performance}</p>
                        </div>
                    </div>
                    <div class="mt-3">
                        <p class="font-semibold text-sm">Season Track Record:</p>
                        ${formatTrackRecordPills(fullQueenData.trackRecord)}
                    </div>
                </button>`;
    }
    html += createButton(s1); html += createButton(s2); html += `</div>`; 
    resultsContainer.innerHTML = html; 
    resultsContainer.querySelectorAll('button').forEach(btn => btn.addEventListener('click', () => { 
        resultsContainer.querySelectorAll('button').forEach(b => b.disabled = true);
        const winnerId = btn.dataset.winnerId; 
        const winner = winnerId === s1.queen.id ? s1.queen : s2.queen; 
        const loser = winnerId === s1.queen.id ? s2.queen : s1.queen; 
        eliminatedQueen = loser;
        const winnerPlacement = episodeResults.placements.find(p => p.queen.id === winner.id);
        const loserPlacement = episodeResults.placements.find(p => p.queen.id === loser.id);
        if(winnerPlacement) winnerPlacement.placement = 'BTM2';
        if(loserPlacement) loserPlacement.placement = 'ELIM';
        runTrackRecordPhase();
    })); 
    advanceButton.classList.add('hidden');
}
function displayAllCritiques(scores) { 
    const theme = runwayThemes[Math.floor(Math.random() * runwayThemes.length)]; 
    let html = `<div class="text-center mb-6"><h3 class="text-2xl font-display tracking-widest text-pink-400">Runway Theme: ${theme}</h3><p class="text-gray-300">The judges have watched the performances and seen the runways. Here are their thoughts...</p></div>`; 
    html += '<div class="space-y-4">'; 
    scores.forEach(s => { const scoreLevel = s.totalScore > 75 ? 'good' : s.totalScore > 40 ? 'safe' : 'bad'; html += `<div class="critique-card critique-${scoreLevel} bg-black/50 p-4 rounded-lg"><p class="font-bold text-lg">${s.queen.name}</p><p class="text-sm mt-2"><span class="font-semibold text-blue-400">Challenge:</span> ${s.critiques.performance}</p><p class="text-sm mt-1"><span class="font-semibold text-pink-400">Runway:</span> ${s.critiques.runway}</p></div>`; }); 
    html += '</div>'; 
    resultsContainer.innerHTML = html;
}
function assignPlacements(results) { 
    const len = results.length; if (len === 0) return []; 
    return results.map((r, i) => { let placement; if (i === 0) placement = 'WIN'; else if (len > 5 && i <= 2) placement = 'HIGH'; else if (i >= len - 2) placement = 'BTM'; else if (len > 4 && i === len - 3) placement = 'LOW'; else placement = 'SAFE'; return { queen: r.queen, placement: placement }; }); 
}
function displayPlacements(placements) {
    const deliberationTexts = ["After careful deliberation...", "The judges have made some tough decisions...", "The panel has spoken..."];
    phaseSubheader.textContent = "The Judges have made their decisions..."; 
    let html = '<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">'; 
    placements.sort((a, b) => { const order = { 'WIN': 0, 'HIGH': 1, 'SAFE': 2, 'LOW': 3, 'BTM': 4, 'ELIM': 5, 'BTM2': 4 }; return order[a.placement] - order[b.placement]; }).forEach(({queen, placement}) => { const placementText = placement; const winClass = placement === 'WIN' ? 'placement-WIN-card' : ''; const winImgClass = placement === 'WIN' ? 'placement-WIN-img' : ''; html += `<div class="bg-black/50 p-3 rounded-lg text-center ${winClass} transition-all duration-500"><img src="${queen.image}" onerror="this.onerror=null;this.src='https://placehold.co/150x150/1F2937/EC4899?text=${encodeURIComponent(queen.name.replace(/\s+/g, '\n'))}';" class="w-24 h-24 object-cover rounded-full mx-auto border-4 border-gray-600 ${winImgClass}"><p class="font-bold text-lg mt-2">${queen.name}</p><p class="font-display text-2xl tracking-widest text-pink-400">${placementText}</p></div>`; }); 
    resultsContainer.innerHTML = `<div class="text-center mb-4"><p class="text-lg italic text-gray-300">${deliberationTexts[Math.floor(Math.random() * deliberationTexts.length)]}</p></div>` + html + `</div>`;
}
function displayLipSyncResults(winner, loser, song) {
    if (!winner) { 
        resultsContainer.innerHTML = `<div class="text-center space-y-4 max-w-3xl mx-auto"><h2 class="font-display text-5xl tracking-widest">A FATEFUL DECISION</h2><p class="text-lg">Due to the results of the challenge, there is no lip sync this week.</p><p class="text-gray-300 italic text-lg">The judges have decided that one queen's time has come to an end.</p><div class="flex justify-center items-center gap-4 md:gap-8 py-8"><div class="text-center"><img src="${loser.image}" onerror="this.onerror=null;this.src='https://placehold.co/150x150/1F2937/EC4899?text=${encodeURIComponent(loser.name.replace(/\s+/g, '\n'))}';" class="w-32 h-32 object-cover rounded-full mx-auto border-4 border-red-500 placement-ELIM-img"><p class="font-bold text-xl mt-2">${loser.name}</p></div></div><p class="font-display text-3xl mt-2 text-red-400">${loser.name}, sashay away.</p></div>`; 
        return; 
    } 
    const narratives = [
        `Both queens gave it their all, but ${winner.name}'s passion and precision on stage gave her the edge. She truly embodied the spirit of the song.`,
        `It was a lip sync for the ages! In the end, ${winner.name}'s star quality was simply undeniable.`,
        `${loser.name} put up a valiant fight, but ${winner.name} channeled the song's energy and left it all on the stage.`
    ];
    resultsContainer.innerHTML = `<div class="text-center space-y-4 max-w-3xl mx-auto"><h2 class="font-display text-5xl tracking-widest">LIP SYNC FOR YOUR LIFE</h2><p class="text-lg">The bottom two queens must perform ${song}!</p><div class="flex justify-center items-center gap-4 md:gap-8 py-8"><div class="text-center"><img src="${winner.image}" onerror="this.onerror=null;this.src='https://placehold.co/150x150/1F2937/EC4899?text=${encodeURIComponent(winner.name.replace(/\s+/g, '\n'))}';" class="w-32 h-32 object-cover rounded-full mx-auto border-4 border-green-400 placement-WIN-img"><p class="font-bold text-xl mt-2">${winner.name}</p></div><p class="font-display text-6xl text-pink-500">VS</p><div class="text-center"><img src="${loser.image}" onerror="this.onerror=null;this.src='https://placehold.co/150x150/1F2937/EC4899?text=${encodeURIComponent(loser.name.replace(/\s+/g, '\n'))}';" class="w-32 h-32 object-cover rounded-full mx-auto border-4 border-red-500 placement-ELIM-img"><p class="font-bold text-xl mt-2">${loser.name}</p></div></div><p class="text-gray-300 italic text-lg">"${narratives[Math.floor(Math.random() * narratives.length)]}"</p><p class="font-display text-4xl text-green-400 pt-4">Shantay, you stay, ${winner.name}.</p><p class="font-display text-3xl mt-2 text-red-400">${loser.name}, sashay away.</p></div>`; 
}
function calculateTrackRecordScore(queen) { const placementScores = { 'WINNER': 6, 'RUNNER-UP': 5, 'WIN': 5, 'HIGH': 4, 'SAFE': 3, 'LOW': 2, 'BTM2': 1, 'ELIM': 0 }; return queen.trackRecord.reduce((acc, placement) => acc + (placementScores[placement] || 0), 0); }
function displayTrackRecord(isFinale = false) {
    const placementOrder = { 'WINNER': -2, 'RUNNER-UP': -1, 'WIN': 0, 'HIGH': 1, 'SAFE': 2, 'LOW': 3, 'BTM2': 4, 'ELIM': 5 };
    const sortedCast = [...fullCast].sort((a, b) => {
        if (a.eliminated && !b.eliminated) return 1;
        if (!a.eliminated && b.eliminated) return -1;
        if (a.eliminated && b.eliminated) { return b.trackRecord.length - a.trackRecord.length; }
        const lastEpisodeIndex = a.trackRecord.length - 1;
        if (lastEpisodeIndex < 0) return 0;
        const placementA = a.trackRecord[lastEpisodeIndex];
        const placementB = b.trackRecord[lastEpisodeIndex];
        return (placementOrder[placementA] ?? 99) - (placementOrder[placementB] ?? 99);
    });
    
    let episodesToShow = Math.max(...fullCast.map(q => q.trackRecord.length));
    if (episodesToShow <= 0 && fullCast.length > 0) episodesToShow = episodeNumber;
    
    let tableHTML = `<div class="overflow-x-auto"><table class="w-full text-xs md:text-sm track-record-table bg-black/50"><thead><tr><th class="text-left sticky left-0 bg-gray-900/80 z-10">Queen</th>`; 
    for (let i = 0; i < episodesToShow; i++) { 
        if(i < shuffledChallenges.length) {
            const challengeName = (shuffledChallenges[i]?.name || `Ep ${i+1}`).split(' ').join('<br>'); 
            tableHTML += `<th><div class="flex flex-col items-center"><span>Ep ${i + 1}</span><span class="font-normal text-gray-400 text-xs">${challengeName}</span></div></th>`; 
        } else {
             tableHTML += `<th><div class="flex flex-col items-center"><span>Finale</span><span class="font-normal text-gray-400 text-xs">Winner</span></div></th>`;
        }
    } 
    tableHTML += `</tr></thead><tbody>`; 
    sortedCast.forEach(queen => { 
        tableHTML += `<tr class="${queen.eliminated && !isFinale ? 'opacity-50' : ''}"><td class="text-left font-bold sticky left-0 bg-gray-800/80 z-10">${queen.name}</td>`; 
        for (let i = 0; i < episodesToShow; i++) { 
            const placement = queen.trackRecord[i] || ''; 
            tableHTML += `<td class="placement-${placement}">${placement}</td>`; 
        } 
        tableHTML += `</tr>`; 
    }); 
    tableHTML += `</tbody></table></div>`; 
    
    if (isFinale) {
        resultsContainer.innerHTML += tableHTML;
    } else {
        resultsContainer.innerHTML = tableHTML;
    }
}
function runFinalePerformancePhase() {
    episodePhase = 'finale'; 
    switchView(simulationView); 
    episodeHeader.textContent = 'The Grand Finale'; 
    phaseSubheader.textContent = 'For the crown, the queens must write, record, and perform their own verse in a rumix of a RuPaul classic!'; 
    episodeResults.finalePerformance = currentCast.map(q => { const stats = q.stats; const overallStat = (stats.runway + stats.acting + stats.dance) / 3; const score = (overallStat * 10) + (Math.random() * 20); return { queen: q, score: score }; }).sort((a, b) => b.score - a.score); 
    if(gameMode === 'standard'){ advanceEpisode(); } else { promptForTop2(); } 
}
function runFinaleTop2Phase(){
    episodePhase = 'finaleTop2'; 
    phaseSubheader.textContent = 'Choosing the Top 2'; 
    const finaleScores = currentCast.map(queen => { const trackRecordScore = calculateTrackRecordScore(queen); const perfScore = episodeResults.finalePerformance.find(r => r.queen.id === queen.id).score; const maxPerfScore = Math.max(...episodeResults.finalePerformance.map(r => r.score)); const normalizedPerf = (perfScore / maxPerfScore) * 100; const maxTrackRecord = Math.max(...currentCast.map(q => calculateTrackRecordScore(q))); const normalizedTrack = maxTrackRecord > 0 ? (trackRecordScore / maxTrackRecord) * 100 : 0; const totalScore = (normalizedTrack * 0.5) + (normalizedPerf * 0.5); return { queen, totalScore, trackRecordScore }; }).sort((a, b) => b.totalScore - a.totalScore); 
    top2 = [finaleScores[0], finaleScores[1]]; 
    const eliminated = currentCast.filter(q => !top2.some(t => t.queen.id === q.id)); 
    displayTop2Results(top2, eliminated); 
    advanceButton.textContent = 'Lip Sync For The Crown!';
}
function promptForTop2() {
    let html = `<div class="text-center mb-6"><h3 class="text-2xl font-display tracking-widest text-pink-400">Four Queens, one crown.</h3><p class="text-gray-300">Based on their final performance and their journey so far, choose your Top 2.</p></div><div class="space-y-3">`; 
    let selectedTop2 = []; 
    episodeResults.finalePerformance.forEach(s => { html += `<button class="secondary-button w-full p-4 rounded-lg text-left" data-top2-id="${s.queen.id}"><div class="flex justify-between items-center"><span class="text-lg font-bold">${s.queen.name}</span><div><span class="text-sm text-gray-400">Finale Perf: ${s.score.toFixed(0)}</span><span class="text-sm text-gray-400 ml-2">Track Record: ${calculateTrackRecordScore(s.queen)}</span></div></div></button>`; }); 
    html += `</div>`; resultsContainer.innerHTML = html; 
    resultsContainer.querySelectorAll('button').forEach(btn => btn.addEventListener('click', (e) => { e.currentTarget.classList.toggle('selected'); const queenId = e.currentTarget.dataset.top2Id; if(selectedTop2.includes(queenId)){ selectedTop2 = selectedTop2.filter(id => id !== queenId); } else if (selectedTop2.length < 2) { selectedTop2.push(queenId); } if(selectedTop2.length === 2) { const topQueens = currentCast.filter(q => selectedTop2.includes(q.id)); const elimQueens = currentCast.filter(q => !selectedTop2.includes(q.id)); top2 = topQueens.map(q => ({queen: q, trackRecordScore: calculateTrackRecordScore(q)})); displayTop2Results(top2, elimQueens); advanceButton.classList.remove('hidden'); advanceButton.textContent = 'Lip Sync For The Crown!'; episodePhase = 'finaleTop2'; } })); 
    advanceButton.classList.add('hidden');
}
function displayTop2Results(top2, eliminated) { 
    resultsContainer.innerHTML = `<div class="text-center space-y-4 max-w-2xl mx-auto"><p class="text-2xl font-display tracking-widest">Based on the final performance and season-long track record, the Top 2 queens are...</p><div class="p-4 rounded-lg bg-green-900/50 text-3xl font-display tracking-widest">${top2[0].queen.name}</div><div class="p-4 rounded-lg bg-green-900/50 text-3xl font-display tracking-widest">${top2[1].queen.name}</div><p class="text-xl pt-4">This means, ${eliminated.map(q=>q.name).join(' and ')}, I'm sorry my dears but this is not your time. Sashay away.</p></div>`;
}
function runLipsyncForTheCrownPhase() { 
    episodePhase = 'lipsyncForTheCrown'; 
    phaseSubheader.textContent = 'The Final Showdown'; 
    const [q1, q2] = top2; 
    const q1LipSync = q1.queen.stats.lipsync * 10 + Math.random() * 25; const q2LipSync = q2.queen.stats.lipsync * 10 + Math.random() * 25; 
    if(gameMode === 'standard'){ 
        const maxLipSync = Math.max(q1LipSync, q2LipSync); const normalizedLipSync1 = maxLipSync > 0 ? (q1LipSync / maxLipSync) * 100 : 0; const normalizedLipSync2 = maxLipSync > 0 ? (q2LipSync / maxLipSync) * 100 : 0; 
        const maxTrackRecord = Math.max(q1.trackRecordScore, q2.trackRecordScore); const normalizedTrack1 = maxTrackRecord > 0 ? (q1.trackRecordScore / maxTrackRecord) * 100 : 0; const normalizedTrack2 = maxTrackRecord > 0 ? (q2.trackRecordScore / maxTrackRecord) * 100 : 0; 
        const finalScore1 = (normalizedTrack1 * 0.8) + (normalizedLipSync1 * 0.2); const finalScore2 = (normalizedTrack2 * 0.8) + (normalizedLipSync2 * 0.2); 
        const winner = finalScore1 >= finalScore2 ? q1.queen : q2.queen; const runnerUp = finalScore1 < finalScore2 ? q1.queen : q2.queen; 
        displayWinner(winner, runnerUp); 
    } else { 
        promptForWinnerCrown(q1.queen, q2.queen, q1LipSync, q2LipSync); 
    }
}
function promptForWinnerCrown(q1, q2, score1, score2){
    let html = `<div class="text-center mb-6"><h3 class="text-3xl font-display tracking-widest text-pink-400">The time has come... to lip sync... for the CROWN!</h3><p class="text-gray-300">Who delivered the winning performance?</p></div><div class="grid grid-cols-1 md:grid-cols-2 gap-4">`; 
    const createButton = (q, score) => `<button class="secondary-button w-full p-4 rounded-lg" data-winner-id="${q.id}"><p class="text-2xl font-display tracking-wider">${q.name}</p><div class="text-sm mt-2 text-left"><p><span class="font-semibold">Lip Sync Performance Score:</span> ${score.toFixed(0)}</p><p><span class="font-semibold">Final Track Record:</span> ${calculateTrackRecordScore(q)}</p></div></button>`; 
    html += createButton(q1, score1); html += createButton(q2, score2); html += `</div>`; 
    resultsContainer.innerHTML = html; 
    resultsContainer.querySelectorAll('button').forEach(btn => btn.addEventListener('click', () => { const winnerId = btn.dataset.winnerId; const winner = winnerId === q1.id ? q1 : q2; const runnerUp = winnerId === q1.id ? q2 : q1; displayWinner(winner, runnerUp); })); 
    advanceButton.classList.add('hidden');
}
function displayWinner(winner, runnerUp) { 
    // Update track records for finalists
    const winnerInCast = fullCast.find(q => q.id === winner.id);
    const runnerUpInCast = fullCast.find(q => q.id === runnerUp.id);
    const otherFinalists = fullCast.filter(q => q.trackRecord.length === episodeNumber && q.id !== winner.id && q.id !== runnerUp.id);
    
    winnerInCast.trackRecord.push('WINNER');
    runnerUpInCast.trackRecord.push('RUNNER-UP');
    otherFinalists.forEach(q => q.trackRecord.push('ELIM'));

    let winnerHtml = `<div class="text-center space-y-4 max-w-2xl mx-auto"><p class="text-2xl font-display tracking-widest">Ladies, the decision is final...</p><p class="text-3xl font-display tracking-widest">The next Drag Race Philippines Superstar is...</p><div class="py-8"><p class="text-7xl md:text-8xl font-display tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-500 animate-pulse">${winner.name}</p></div><p class="text-3xl font-display tracking-widest">Condragulations, you're a winner, baby!</p><p class="text-xl pt-4">And to our runner-up, ${runnerUp.name}, you are and will always be a star. Now, prance, my queen!</p></div> <hr class="my-8 border-gray-600">`;
    
    resultsContainer.innerHTML = winnerHtml;
    displayTrackRecord(true); // Show final track record
    
    advanceButton.classList.add('hidden'); 
    restartButton.classList.remove('hidden'); 
}
function updateSelectionUI() { 
    castList.innerHTML = ''; 
    castPlaceholder.style.display = selectedCast.length === 0 ? 'block' : 'none'; 
    selectedCast.forEach(q => { const li = document.createElement('div'); li.className = 'flex items-center bg-gray-800/80 p-2 rounded-lg'; li.innerHTML = `<img src="${q.image}" onerror="this.onerror=null;this.src='https://placehold.co/40x40/1F2937/EC4899?text=${encodeURIComponent(q.name.split(' ').map(n=>n[0]).join(''))}';" class="w-8 h-8 object-cover rounded-full mr-3"><span class="font-bold text-sm">${q.name}</span>`; castList.appendChild(li); }); 
    castCounter.textContent = `Selected: ${selectedCast.length} / ${MAX_CAST_SIZE}`; 
    const size = selectedCast.length; 
    startButton.disabled = !(size >= MIN_CAST_SIZE && size <= MAX_CAST_SIZE); 
    instructions.textContent = startButton.disabled ? (size < MIN_CAST_SIZE ? `Select at least ${MIN_CAST_SIZE - size} more queen(s).` : `Select between ${MIN_CAST_SIZE} and ${MAX_CAST_SIZE} queens.`) : 'Your cast is ready!'; 
    document.querySelectorAll('.queen-card').forEach(c => c.classList.toggle('selected', selectedCast.some(q => q.id === c.dataset.id))); 
}
function toggleQueenSelection(queen) { 
    const i = selectedCast.findIndex(q => q.id === queen.id); 
    if (i > -1) selectedCast.splice(i, 1); 
    else if (selectedCast.length < MAX_CAST_SIZE) selectedCast.push(queen); 
    updateSelectionUI(); 
}

// --- INITIALIZATION ---
window.addEventListener('load', () => {
    standardModeBtn.addEventListener('click', () => selectMode('standard'));
    mamapaoModeBtn.addEventListener('click', () => selectMode('mamapao'));
    
    const sortedQueens = queens.sort((a,b) => (a.season - b.season) || a.name.localeCompare(b.name));
    let currentSeason = 0;
    sortedQueens.forEach(q => {
        if(q.season !== currentSeason) { 
            currentSeason = q.season; 
            const h = document.createElement('div'); 
            h.className = 'col-span-full text-center text-pink-400 font-display text-2xl py-2 tracking-widest'; 
            h.textContent = `Season ${currentSeason}`; 
            queenGrid.appendChild(h); 
        }
        const card = document.createElement('div'); 
        card.className = 'queen-card bg-gray-800/80 rounded-lg p-2 text-center cursor-pointer border-2 border-transparent'; 
        card.dataset.id = q.id; 
        card.innerHTML = `<img src="${q.image}" onerror="this.onerror=null;this.src='https://placehold.co/150x150/1F2937/EC4899?text=${encodeURIComponent(q.name.replace(/\s+/g, '\n'))}';" class="w-full h-auto aspect-square object-cover rounded-md"><p class="mt-2 text-xs font-bold truncate">${q.name}</p>`; 
        card.addEventListener('click', () => toggleQueenSelection(q)); 
        queenGrid.appendChild(card);
    });
    
    startButton.addEventListener('click', () => { if (!startButton.disabled) { switchView(simulationView); startCompetition(); } });
    advanceButton.addEventListener('click', advanceEpisode);
    restartButton.addEventListener('click', () => window.location.reload());

    updateSelectionUI();
    switchView(menuView);
});

