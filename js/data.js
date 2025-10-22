// =================================================================================
// DATA MODULE (data.js)
// All static data for the application is stored and exported from here.
// =================================================================================

/**
 * Array of all competing queens with their stats and information.
 * Image URLs are sourced from the Fandom wiki's static image host or other reliable sources.
 */
export const queens = [
     // Drag Race PH Season 1
    { id: 'brigiding', name: 'Brigiding', season: 1, image: 'https://static.wikia.nocookie.net/logosrupaulsdragrace/images/a/a5/BrigidingDRP1MiniPromo.jpg', stats: { runway: 9, comedy: 7, acting: 7, dance: 9, design: 7, lipsync: 9 } },
    { id: 'corazon', name: 'Corazon', season: 1, image: 'https://static.wikia.nocookie.net/logosrupaulsdragrace/images/7/71/CorazonDRP1MiniPromo.jpg', stats: { runway: 7, comedy: 5, acting: 5, dance: 6, design: 4, lipsync: 5 } },
    { id: 'eva_le_queen', name: 'Eva Le Queen', season: 1, image: 'https://static.wikia.nocookie.net/logosrupaulsdragrace/images/3/3b/EvaLeQueenDRP1MiniPromo.jpg', stats: { runway: 8, comedy: 9, acting: 8, dance: 5, design: 7, lipsync: 7 } },
    { id: 'gigi_era', name: 'Gigi Era', season: 1, image: 'https://static.wikia.nocookie.net/logosrupaulsdragrace/images/c/c5/GigiEraDRP1MiniPromo.jpg', stats: { runway: 6, comedy: 5, acting: 7, dance: 8, design: 5, lipsync: 6 } },
    { id: 'lady_morgana', name: 'Lady Morgana', season: 1, image: 'https://static.wikia.nocookie.net/logosrupaulsdragrace/images/6/62/LadyMorganaDRP1MiniPromo.jpg', stats: { runway: 6, comedy: 9, acting: 8, dance: 7, design: 6, lipsync: 9} },
    { id: 'marina_summers', name: 'Marina Summers', season: 1, image: 'https://static.wikia.nocookie.net/logosrupaulsdragrace/images/a/a2/MarinaSummersDRP1MiniPromo.jpg', stats: { runway: 9, comedy: 8, acting: 8, dance: 9, design: 9, lipsync: 10 } },
    { id: 'minty_fresh', name: 'Minty Fresh', season: 1, image: 'https://static.wikia.nocookie.net/logosrupaulsdragrace/images/2/25/MintyFreshDRP1MiniPromo.jpg', stats: { runway: 9, comedy: 7, acting: 5, dance: 7, design: 9, lipsync: 9 } },
    { id: 'precious_paula_nicole', name: 'Precious Paula Nicole', season: 1, image: 'https://static.wikia.nocookie.net/logosrupaulsdragrace/images/0/0f/PreciousPaulaNicoleDRP1MiniPromo.jpg', stats: { runway: 8, comedy: 10, acting: 9, dance: 7, design: 7, lipsync: 10 } },
    { id: 'prince', name: 'Prince', season: 1, image: 'https://static.wikia.nocookie.net/logosrupaulsdragrace/images/e/ec/PrinceDRP1MiniPromo.jpg', stats: { runway: 7, comedy: 5, acting: 6, dance: 6, design: 5, lipsync: 6 } },
    { id: 'turing', name: 'Turing', season: 1, image: 'https://static.wikia.nocookie.net/logosrupaulsdragrace/images/1/1e/TuringDRP1MiniPromo.jpg', stats: { runway: 5, comedy: 7, acting: 8, dance: 9, design: 6, lipsync: 10 } },
    { id: 'vinas_deluxe', name: 'Viñas DeLuxe', season: 1, image: 'https://static.wikia.nocookie.net/logosrupaulsdragrace/images/6/64/Vi%C3%B1asDeLuxeDRPHSR1CastMug.jpg', stats: { runway: 8, comedy: 10, acting: 8, dance: 7, design: 7, lipsync: 9 } },
    { id: 'xilhouete', name: 'Xilhouete', season: 1, image: 'https://static.wikia.nocookie.net/logosrupaulsdragrace/images/2/2e/XilhoueteDRP1MiniPromo.jpg', stats: { runway: 8, comedy: 8, acting: 8, dance: 6, design: 8, lipsync: 7 } },

    // Drag Race PH Season 2
    { id: 'arizona_brandy', name: 'Arizona Brandy', season: 2, image: 'https://static.wikia.nocookie.net/logosrupaulsdragrace/images/9/95/ArizonaBrandyDRPHSR1CastMug.jpg', stats: { runway: 8, comedy: 10, acting: 9, dance: 7, design: 6, lipsync: 9 } },
    { id: 'astrid_mercury', name: 'Astrid Mercury', season: 2, image: 'https://static.wikia.nocookie.net/logosrupaulsdragrace/images/e/e6/AstridMercuryDRPH2MiniPromo.jpg', stats: { runway: 7, comedy: 5, acting: 5, dance: 8, design: 6, lipsync: 6 } },
    { id: 'bernie', name: 'Bernie', season: 2, image: 'https://static.wikia.nocookie.net/logosrupaulsdragrace/images/4/48/BernieDRPHSR1CastMug.jpg', stats: { runway: 10, comedy: 8, acting: 7, dance: 8, design: 8, lipsync: 9 } },
    { id: 'captivating_katkat', name: 'Captivating Katkat', season: 2, image: 'https://static.wikia.nocookie.net/logosrupaulsdragrace/images/2/23/CaptivatingKatkatDRPH2MiniPromo.jpg', stats: { runway: 9, comedy: 8, acting: 7, dance: 9, design: 7, lipsync: 8 } },
    { id: 'deedee_marie_holliday', name: 'DeeDee Marié Holliday', season: 2, image: 'https://static.wikia.nocookie.net/logosrupaulsdragrace/images/d/d5/DeeDeeMari%C3%A9HollidayDRPH2MiniPromo.jpg', stats: { runway: 8, comedy: 7, acting: 7, dance: 8, design: 7, lipsync: 6 } },
    { id: 'hana_beshie', name: 'Hana Beshie', season: 2, image: 'https://static.wikia.nocookie.net/logosrupaulsdragrace/images/5/57/HanaBeshieDRPH2MiniPromo.jpg', stats: { runway: 6, comedy: 10, acting: 10, dance: 7, design: 6, lipsync: 8 } },
    { id: 'm1ss_jade_so', name: 'M1ss Jade So', season: 2, image: 'https://static.wikia.nocookie.net/logosrupaulsdragrace/images/4/4a/M1ssJadeSoDRPH2MiniPromo.jpg', stats: { runway: 9, comedy: 8, acting: 7, dance: 8, design: 9, lipsync: 8 } },
    { id: 'matilduh', name: 'Matilduh', season: 2, image: 'https://static.wikia.nocookie.net/logosrupaulsdragrace/images/7/71/MatilduhDRPH2MiniPromo.jpg', stats: { runway: 7, comedy: 7, acting: 6, dance: 9, design: 7, lipsync: 8 } },
    { id: 'nicole_pardaux', name: 'Nicole Pardaux', season: 2, image: 'https://static.wikia.nocookie.net/logosrupaulsdragrace/images/7/79/NicolePardauxDRPH2MiniPromo.jpg', stats: { runway: 6, comedy: 6, acting: 6, dance: 7, design: 6, lipsync: 5 } },
    { id: 'ov_cunt', name: 'ØV Cünt', season: 2, image: 'https://static.wikia.nocookie.net/logosrupaulsdragrace/images/6/60/%C3%98VC%C3%BCntDRPH2MiniPromo.jpg', stats: { runway: 9, comedy: 8, acting: 8, dance: 6, design: 9, lipsync: 7 } },
    { id: 'tiny_deluxe', name: 'Tiny DeLuxe', season: 2, image: 'https://static.wikia.nocookie.net/logosrupaulsdragrace/images/e/e1/TinyDeluxeDRPH2MiniPromo.jpg', stats: { runway: 6, comedy: 7, acting: 7, dance: 7, design: 6, lipsync: 6 } },
    { id: 'veruschka_levels', name: 'Veruschka Levels', season: 2, image: 'https://static.wikia.nocookie.net/logosrupaulsdragrace/images/d/d4/VeruschkaLevelsDRPH2MiniPromo.jpg', stats: { runway: 8, comedy: 6, acting: 6, dance: 7, design: 7, lipsync: 6 } },

    // Drag Race PH Season 3
    { id: 'maxie', name: 'Maxie', season: 3, image: 'https://static.wikia.nocookie.net/logosrupaulsdragrace/images/8/85/MaxieDRPH3MiniPromo.jpg', stats: { runway: 8, comedy: 9, acting: 8, dance: 7, design: 7, lipsync: 9 } },
    { id: 'khianna', name: 'Khianna', season: 3, image: 'https://static.wikia.nocookie.net/logosrupaulsdragrace/images/6/6c/KhiannaDRPHSR1CastMug.jpg', stats: { runway: 10, comedy: 8, acting: 7, dance: 10, design: 7, lipsync: 9 } },
    { id: 'angel', name: 'Angel', season: 3, image: 'https://static.wikia.nocookie.net/logosrupaulsdragrace/images/3/34/AngelDRPH3MiniPromo.jpg', stats: { runway: 8, comedy: 10, acting: 8, dance: 9, design: 6, lipsync: 8 } },
    { id: 'tita_baby', name: 'Tita Baby', season: 3, image: 'https://static.wikia.nocookie.net/logosrupaulsdragrace/images/4/47/TitaBabyDRPH3MiniPromo.jpg', stats: { runway: 7, comedy: 9, acting: 9, dance: 6, design: 7, lipsync: 8 } },
    { id: 'zymba_ding', name: 'Zymba Ding', season: 3, image: 'https://static.wikia.nocookie.net/logosrupaulsdragrace/images/7/7b/ZymbaDingDRPH3MiniPromo.jpg', stats: { runway: 8, comedy: 7, acting: 7, dance: 9, design: 8, lipsync: 7 } },
    { id: 'myx_chanel', name: 'Myx Chanel', season: 3, image: 'https://static.wikia.nocookie.net/logosrupaulsdragrace/images/5/55/MyxChanelDRPH3MiniPromo.jpg', stats: { runway: 8, comedy: 8, acting: 7, dance: 7, design: 8, lipsync: 8 } },
    { id: 'popstar_bench', name: 'Popstar Bench', season: 3, image: 'https://static.wikia.nocookie.net/logosrupaulsdragrace/images/6/6b/PopstarBenchDRPH3MiniPromo.jpg', stats: { runway: 7, comedy: 7, acting: 7, dance: 9, design: 6, lipsync: 9 } },
    { id: 'john_fedellaga', name: 'John Fedellaga', season: 3, image: 'https://static.wikia.nocookie.net/logosrupaulsdragrace/images/2/27/JohnFedellagaDRPH3MiniPromo.jpg', stats: { runway: 8, comedy: 7, acting: 10, dance: 7, design: 8, lipsync: 6 } },
    { id: 'j_quinn', name: 'J Quinn', season: 3, image: 'https://static.wikia.nocookie.net/logosrupaulsdragrace/images/f/f9/JQuinnDRPH3MiniPromo.jpg', stats: { runway: 7, comedy: 6, acting: 6, dance: 7, design: 7, lipsync: 8 } },
    { id: 'yudipota', name: 'Yudipota', season: 3, image: 'https://static.wikia.nocookie.net/logosrupaulsdragrace/images/6/68/YudipotaDRPH3MiniPromo.jpg', stats: { runway: 10, comedy: 7, acting: 7, dance: 6, design: 8, lipsync: 6 } },
    { id: 'versex', name: 'Versex', season: 3, image: 'https://static.wikia.nocookie.net/logosrupaulsdragrace/images/f/f2/VersexDRPH3MiniPromo.jpg', stats: { runway: 10, comedy: 6, acting: 6, dance: 5, design: 8, lipsync: 5 } },

    // Drag Den Season 1
    { id: 'naia', name: 'Naia', season: 101, image: 'https://static.wikia.nocookie.net/logosrupaulsdragrace/images/8/8c/NAIADragDenS1Cast.jpg', stats: { runway: 9, comedy: 8, acting: 8, dance: 7, design: 7, lipsync: 9 } },
    { id: 'maria_cristina', name: 'Maria Cristina', season: 101, image: 'https://static.wikia.nocookie.net/logosrupaulsdragrace/images/e/e1/MariaCristinaDragDenS1Cast.jpg', stats: { runway: 8, comedy: 9, acting: 7, dance: 7, design: 6, lipsync: 8 } },
    { id: 'shewarma', name: 'Shewarma', season: 101, image: 'https://static.wikia.nocookie.net/logosrupaulsdragrace/images/d/d5/ShewarmaDragDenS1Cast.jpg', stats: { runway: 7, comedy: 10, acting: 9, dance: 6, design: 7, lipsync: 8 } },
    { id: 'pnp', name: 'Pura Luka Vega', season: 101, image: 'https://static.wikia.nocookie.net/logosrupaulsdragrace/images/7/78/PuraLukaDragDenS1Cast.jpg', stats: { runway: 10, comedy: 8, acting: 8, dance: 6, design: 9, lipsync: 7 } },
    { id: 'barbie-q', name: 'Barbie-Q', season: 101, image: 'https://static.wikia.nocookie.net/logosrupaulsdragrace/images/6/6d/Barbie-QDragDenS1Cast.png', stats: { runway: 7, comedy: 7, acting: 7, dance: 8, design: 7, lipsync: 7 } },
    { id: 'aries_night', name: 'Aries Night', season: 101, image: 'https://static.wikia.nocookie.net/logosrupaulsdragrace/images/0/01/AriesNightDragDenS1Cast.jpg', stats: { runway: 8, comedy: 6, acting: 6, dance: 7, design: 8, lipsync: 6 } },
    { id: 'lady_gagita', name: 'Lady Gagita', season: 101, image: 'https://static.wikia.nocookie.net/logosrupaulsdragrace/images/f/f3/LadyGagitaDragDenS1Cast.jpg', stats: { runway: 7, comedy: 9, acting: 8, dance: 8, design: 6, lipsync: 9 } },
    { id: 'odasha', name: 'O-A', season: 101, image: 'https://static.wikia.nocookie.net/logosrupaulsdragrace/images/c/c5/O-ADragDenS1Cast.jpg', stats: { runway: 9, comedy: 6, acting: 6, dance: 5, design: 9, lipsync: 5 } },

    // Drag Den Season 2
    { id: 'deja', name: 'Deja', season: 102, image: 'https://static.wikia.nocookie.net/logosrupaulsdragrace/images/a/a6/DejaDragDenS2CastMug.jpg', stats: { runway: 8, comedy: 7, acting: 7, dance: 9, design: 7, lipsync: 9 } },
    { id: 'mrs_tan', name: 'Mrs. Tan', season: 102, image: 'https://static.wikia.nocookie.net/logosrupaulsdragrace/images/a/a6/MrsTanDragDenS2CastMug.jpg', stats: { runway: 9, comedy: 9, acting: 8, dance: 6, design: 8, lipsync: 7 } },
    { id: 'moi', name: 'Moi', season: 102, image: 'https://static.wikia.nocookie.net/logosrupaulsdragrace/images/a/af/MoiDragDenS2CastMug.jpg', stats: { runway: 7, comedy: 10, acting: 10, dance: 7, design: 6, lipsync: 8 } },
    { id: 'russia_fox', name: 'Russia Fox', season: 102, image: 'https://static.wikia.nocookie.net/logosrupaulsdragrace/images/2/24/RussiaFoxDragDenS2CastMug.jpg', stats: { runway: 10, comedy: 7, acting: 7, dance: 7, design: 9, lipsync: 8 } },
    { id: 'feyvah_fatale', name: 'Feyvah Fatale', season: 102, image: 'https://static.wikia.nocookie.net/logosrupaulsdragrace/images/6/66/FeyvahFataleDragDenS2CastMug.jpg', stats: { runway: 8, comedy: 6, acting: 6, dance: 8, design: 7, lipsync: 7 } },
    { id: 'jean_vilogue', name: 'Jean Vilogue', season: 102, image: 'https://static.wikia.nocookie.net/logosrupaulsdragrace/images/d/d7/JeanVilogueDragDenS2CastMug.jpg', stats: { runway: 9, comedy: 8, acting: 7, dance: 7, design: 9, lipsync: 6 } },
    { id: 'margaux', name: 'Margaux', season: 102, image: 'https://static.wikia.nocookie.net/logosrupaulsdragrace/images/f/f9/MargauxDragDenS2CastMug.jpg', stats: { runway: 7, comedy: 8, acting: 9, dance: 7, design: 6, lipsync: 8 } },
    { id: 'elvira', name: 'Elvira', season: 102, image: 'https://static.wikia.nocookie.net/logosrupaulsdragrace/images/7/79/ElviraDragDenS2CastMug.jpg', stats: { runway: 6, comedy: 7, acting: 6, dance: 6, design: 7, lipsync: 5 } },
    { id: 'marlyn', name: 'Marlyn', season: 102, image: 'https://static.wikia.nocookie.net/logosrupaulsdragrace/images/8/89/MarlynDragDenS2CastMug.jpg', stats: { runway: 7, comedy: 6, acting: 7, dance: 8, design: 6, lipsync: 7 } },
    { id: 'maria_lava', name: 'Maria Lava', season: 102, image: 'https://static.wikia.nocookie.net/logosrupaulsdragrace/images/b/bd/MariaLavaDragDenS2CastMug.jpg', stats: { runway: 8, comedy: 9, acting: 8, dance: 7, design: 7, lipsync: 9 } },

    // Local Queens
    { id: 'bomba_ding', name: 'Bomba Ding', season: 200, image: 'https://m.media-amazon.com/images/M/MV5BMjdhMzhmMzUtMjhjZC00ZGI2LTljZjktNmZmNWI1YjA3MTg4XkEyXkFqcGc@._V1_.jpg', stats: { runway: 7, comedy: 7, acting: 7, dance: 7, design: 7, lipsync: 7 } }, 
    { id: 'edsa_xxtra', name: 'EDSA XXTRA', season: 200, image: 'https://scontent.fmnl13-2.fna.fbcdn.net/v/t51.82787-15/552512419_18058679477419542_1358018458248072222_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeG4YkB6JeM_XftzWWgdDQ9QAIMeOfRj-uoAgx459GP66vw9vow-8fK_jX-3OqKGhbCtjaVFvYiVpmaoKOaP0pNy&_nc_ohc=fooinYPxoZcQ7kNvwGKrSLa&_nc_oc=AdkMF8sYa-CWNGYH77SQre1U3u7diErSH5ftDUSO391Azoro3-FrgMu1_WVs1tdzRuE&_nc_zt=23&_nc_ht=scontent.fmnl13-2.fna&_nc_gid=2g_n51pfHtSwO-xmIZdp0g&oh=00_Afc1iHYWDGmb_Ps697k__7DWH9SitqHRvLPy1DrZh4SJqA&oe=68FCC4FA', stats: { runway: 6, comedy: 9, acting: 7, dance: 7, design: 6, lipsync: 8 } }, 
    { id: 'manza', name: 'Manza', season: 200, image: 'https://media.assettype.com/sunstar%2F2025-07-04%2Fy6v6civo%2F05F-INT5-1.jpg', stats: { runway: 7, comedy: 6, acting: 7, dance: 10, design: 6, lipsync: 10 } }, 
    { id: 'felicia_ding', name: 'Felicia Ding', season: 200, image: 'https://m.media-amazon.com/images/M/MV5BNGU3ZWI1ZjAtMmZmNi00M2JlLThjYWMtMTMyNDc0MDAxMjAyXkEyXkFqcGc@._V1_.jpg', stats: { runway: 7, comedy: 7, acting: 7, dance: 7, design: 7, lipsync: 7 } },
    { id: 'taylor_sheesh', name: 'Taylor Sheesh', season: 200, image: 'https://helios-i.mashable.com/imagery/articles/05MIg9F5jwimZEvebFT1Pc9/hero-image.fill.size_1200x1200.v1687545105.jpg', stats: { runway: 7, comedy: 8, acting: 7, dance: 8, design: 6, lipsync: 8 } }, 
    { id: 'miss_june', name: 'Miss June', season: 200, image: 'https://scontent.fmnl13-4.fna.fbcdn.net/v/t39.30808-6/549366222_1858140528435711_4253928844888920520_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeG5ynzvXHGSwVnUcFCw7odP8sdbkt5y8Cjyx1uS3nLwKKWgvMRXmTl3I3ShtG67rxUqbBG4z9t3DlUYoVC4j0Hd&_nc_ohc=3a3Qi9H5z6IQ7kNvwHtljMc&_nc_oc=AdkLDb3QpY6CfYCkq_AHZqemoVAfeWHaOsjqR0cRlc91CeSrW7RQ2I8uTy31rm0kH0U&_nc_zt=23&_nc_ht=scontent.fmnl13-4.fna&_nc_gid=6Ye9oeTFICkgrBaXhSOpWA&oh=00_AffeTEXoEgXYbemMciN0i6T1hsZO_8vSSxsMa8zreHJDuQ&oe=68FD76F9', stats: { runway: 7, comedy: 7, acting: 7, dance: 7, design: 7, lipsync: 7 } },
    { id: "eurekarma", name: "Eure'Karma", season: 200, image: 'https://scontent.fmnl13-1.fna.fbcdn.net/v/t39.30808-6/560413335_1217098917117795_2362059110242308305_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeGaiuNRBQIVDjD8aTk9Udd4YtFxZUW6MRxi0XFlRboxHHmOcBhypPj3viZvUBNQpaQXAyGbSbhGVEhVAuW4AbEK&_nc_ohc=W287gWkAmD8Q7kNvwH_tOJq&_nc_oc=Adkn6nxltFeiNJOroYFzLS6vlNcBtwdkuTgX1Q9wYbX1C4W68u8oB02hRhj6yEY6fCY&_nc_zt=23&_nc_ht=scontent.fmnl13-1.fna&_nc_gid=LMFlw_alHhV0JSqGMCsuUA&oh=00_AfewtwgcBCbkovoN3VOOyHlKn6BnzqIH6r100dxsNu9xkA&oe=68FD619C', stats: { runway: 7, comedy: 7, acting: 7, dance: 7, design: 7, lipsync: 7 } },
    { id: 'jamila', name: 'Jamila', season: 200, image: 'https://www.rappler.com/tachyon/2025/05/Musical-JAMILA-RIVERA-as-Maxie-Oh-2025-scaled.jpg', stats: { runway: 7, comedy: 7, acting: 7, dance: 7, design: 7, lipsync: 7 } },
    { id: 'kollide', name: 'Kollide', season: 200, image: 'https://scontent.fmnl13-4.fna.fbcdn.net/v/t39.30808-6/503588927_4028500927410651_473003080475343128_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeFVQat0J88GLXASnaOAuOUdKvPGA5ZYGW0q88YDllgZbRkX3RWSHfJhnfVrZl_hLoFx_hXAX00ar9UHskMyiDSU&_nc_ohc=qplGOehJlCQQ7kNvwGzKWwG&_nc_oc=AdnUcgaPsgy6bZ1H-gBPQerL8fIbY7QGap6nYml4GtI8xXKHiHnU93xVDrxhkrUzLbk&_nc_zt=23&_nc_ht=scontent.fmnl13-4.fna&_nc_gid=p9ucQcjSsMJue6eZcw1nfw&oh=00_AfeuYZn1bGebfP0xbSbI9PBui2YphnC_RxmZi5_3RB0vnA&oe=68FD7B9A', stats: { runway: 7, comedy: 7, acting: 7, dance: 7, design: 7, lipsync: 7 } },
    { id: 'mx_yahua', name: 'Mx. Yahua', season: 200, image: 'https://scontent.fmnl13-4.fna.fbcdn.net/v/t39.30808-6/518407771_122094076334950937_3288368327932979848_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeGecGWT1glAsM2ihv_t5rtunOiKH8CvPV6c6IofwK89XnRpNltqMV5gKyFeZVYclD4iYfRkiQjHJIrGqFDk250D&_nc_ohc=ACQO7OdhJh8Q7kNvwGnQ8aR&_nc_oc=Adka2a-47xgjayX7QqsZdbdiF2jKSjokrIuFkOwXlSPeC5UeSIevDEZCEYg5zifQYOg&_nc_zt=23&_nc_ht=scontent.fmnl13-4.fna&_nc_gid=F86Y3qiv0byekmKYSqIfTQ&oh=00_AfeDysa-ieee-4NshYdjX6mjSX0uLae35tXh2y8DBrPsMw&oe=68FD816E', stats: { runway: 7, comedy: 7, acting: 7, dance: 7, design: 7, lipsync: 7 } },
    { id: 'amazing_chalita', name: 'Amazing Chalita', season: 200, image: 'https://scontent.fmnl13-1.fna.fbcdn.net/v/t39.30808-6/499757220_9939296262773985_5155029508321769072_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=a5f93a&_nc_eui2=AeEejYjCF6DAvWvTd7yVp80clfHTJuiTYt6V8dMm6JNi3sxEIdRMqct9PpTvJeg2LSLZ8gdfPyyv_W_ITvgtLECe&_nc_ohc=e_eMREl2DzQQ7kNvwET5nuv&_nc_oc=AdmLYNmijgyj2brGcgTDbJQeO2Sh_yJWTv1fXqOu0NQDgsvT2dymNJqY5urpFa7CYHA&_nc_zt=23&_nc_ht=scontent.fmnl13-1.fna&_nc_gid=hGVbaEBP_kagUJFkldPs5A&oh=00_AffCewgy4wibq0STnPxa5ok1N4DyIqFmNdhdKmy9Ni74Vg&oe=68FCF2AB', stats: { runway: 7, comedy: 7, acting: 7, dance: 7, design: 7, lipsync: 7 } },
    { id: 'eken_matsunaga', name: 'Eken Matsunaga', season: 200, image: 'https://scontent.fmnl13-2.fna.fbcdn.net/v/t39.30808-6/472143127_9423387181007424_4261391498006145842_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=a5f93a&_nc_eui2=AeGfQe9QaZ8ttwjcgbWcWNb-x6d-5FEgH3THp37kUSAfdNQ_vNOLghzt4XcJECc_VMRyrYjM3IpVYE2NKKfIXPjB&_nc_ohc=ZZ7wfRfxWpEQ7kNvwGx3NUu&_nc_oc=AdmIMpVwLOm4VWovHfIxj06KxM3xu6QsZXkxbldQdkCyUttmgAm0yuB5JyfUPs1WY7M&_nc_zt=23&_nc_ht=scontent.fmnl13-2.fna&_nc_gid=4NIArcAu4NyodM0ccPW25g&oh=00_Affz-h1UwzH3mwjtugSseIElMhq-rfE9AQZg4gMNdKHCig&oe=68FCE80C', stats: { runway: 8, comedy: 6, acting: 7, dance: 9, design: 7, lipsync: 9 } }, 
    { id: 'diva_soria', name: 'Diva Soria', season: 200, image: 'https://thotyssey.com/wp-content/uploads/2022/04/hbs1-18.jpg', stats: { runway: 7, comedy: 7, acting: 7, dance: 7, design: 7, lipsync: 7 } },
    { id: 'maureen_biology', name: 'Maureen Biology', season: 200, image: 'https://scontent.fmnl13-2.fna.fbcdn.net/v/t51.75761-15/491463683_18040097954610377_2537941229226742593_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeFbTfYK9oWvWWNVU6x0dyhLnVAvl_WeuWmdUC-X9Z65aUYeuJUZpjBCqgsE_dorB2xBl7HeVyMmNNWbbFUFbDPf&_nc_ohc=t4btVWXGgKsQ7kNvwGMjLqA&_nc_oc=Adnuh0CRu4ICh9tQiWj_5xUvfMYWO1nmDhoNeZqFJeZkHlV-yHXRpAFyyjhSwUAhXZI&_nc_zt=23&_nc_ht=scontent.fmnl13-2.fna&_nc_gid=pXgNTfvKN8JnJDQM0PIGIw&oh=00_AffktWsn5F7i_IMjisfZjg0R__aiJECLg1vxZk_cVVD9Hg&oe=68FCEAA7', stats: { runway: 7, comedy: 7, acting: 7, dance: 7, design: 7, lipsync: 7 } },
    { id: 'salmo_nella', name: 'Salmo Nella', season: 200, image: 'https://scontent.fmnl13-2.fna.fbcdn.net/v/t39.30808-6/525797905_122238488408163042_6175491837439655693_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=a5f93a&_nc_eui2=AeEwAjEeLedF73MWfCDRRNd80fxGL2hMNGzR_EYvaEw0bDixXla-uUiL5T_h4b_yY155hBGla3OzNDaE3FNmfBZf&_nc_ohc=pPvcItKJZmQQ7kNvwGoXqTd&_nc_oc=Adnakp_6KcgvSoLxbb6M3hMoYuDlVJd6L_6RdmH2uU5pUMG_z_NOymvcd6Mh1yDr8Uw&_nc_zt=23&_nc_ht=scontent.fmnl13-2.fna&_nc_gid=gq6EZMwe5CujbjtlST6AgQ&oh=00_AfenerQtrsWOQ9agrsVYuDxGfQcQRMk3BaEBhSEVj_7u3Q&oe=68FCE3E3', stats: { runway: 6, comedy: 10, acting: 8, dance: 7, design: 6, lipsync: 8 } }

];

/**
 * Array of possible main challenges.
 */
export const challenges = [
    { name: "Snatch Game", primaryStat: 'comedy', intro: "The queens must impersonate celebrities in the legendary Snatch Game!" },
    { name: "The Rusical", primaryStat: 'dance', intro: "It's time for the Rusical! The queens must sing, dance, and act their hearts out." },
    { name: "Girl Groups", primaryStat: 'dance', intro: "Pop star fantasies come alive as the queens form two rival girl groups." },
    { name: "Acting Challenge", primaryStat: 'acting', intro: "The queens star in a new teleserye, but who will steal the scene?" },
    { name: "Improv", primaryStat: 'comedy', intro: "Queens must think on their feet in a hilarious improv challenge." },
    { name: "Sewing", primaryStat: 'design', intro: "Using unconventional materials, the queens must create a look from scratch." },
    { name: "The Ball", primaryStat: 'design', intro: "The queens must serve three distinct looks, including one they make themselves, in the legendary Ball." },
    { name: "Makeover", primaryStat: 'design', intro: "The queens give drag makeovers to some very special guests!" },
    { name: "Talent Show", primaryStat: 'acting', intro: "In the grand premiere, the queens must showcase their unique talents." },
    { name: "Roast", primaryStat: 'comedy', intro: "The library is open! The queens must roast the judges and each other." },
];

/**
 * Array of possible runway themes.
 */
export const runwayThemes = [
    "Filipiniana Extravaganza", "Pearls & Perlas", "Mythical Creatures", "Jeepney Realness",
    "Divas of the Decades", "Horror-scope", "Terno-dactyl", "Flower Power", "Miss Universe Couture",
    "Intergalactic Drag", "Aswang Chic"
];

/**
 * Array of iconic Filipino and international songs for Lip Sync For Your Life.
 */
export const lipsyncSongs = [
    { name: "'Sirena' by Gloc-9", type: "Intense Dramatic Rap" },
    { name: "'Upuan' by Gloc-9", type: "Intense Dramatic Rap" },
    { name: "'Tala' by Sarah Geronimo", type: "High-Energy Pop" },
    { name: "'Kilometro' by Sarah Geronimo", type: "High-Energy Pop" },
    { name: "'Nosi Balasi' by Sampaguita", type: "Pinoy Rock Anthem" },
    { name: "'Rampa' by Vice Ganda", type: "High-Energy Dance" },
    { name: "'Amakabogera' by Maymay Entrata", type: "Fierce Dance-Pop" },
    { name: "'Halik' by Aegis", type: "Power Ballad" },
    { name: "'Basang Basa sa Ulan' by Aegis", type: "Power Ballad" },
    { name: "'Luha' by Aegis", type: "Power Ballad" },
    { name: "'Gento' by SB19", type: "High-Energy Dance" },
    { name: "'Spageti Song' by Sexbomb Girls", type: "Campy Dance" },
    { name: "'Bakit Papa?' by Sexbomb Girls", type: "Campy Dance" },
    { name: "'Dadalhin' by Regine Velasquez", type: "Power Ballad" },
    { name: "'On The Wings of Love' by Regine Velasquez", type: "Power Ballad" },
    { name: "'Sundo' by Imago", type: "Alt-Rock Ballad" },
    { name: "'Torete' by Moonstar88", type: "Alt-Rock Ballad" },
    { name: "'Ikot-Ikot' by Sarah Geronimo", type: "Emotional Pop" },
    { name: "'Paubaya' by Moira Dela Torre", type: "Emotional Ballad" },
    { name: "'Araw-Araw' by Ben&Ben", type: "Emotional Ballad" },
    { name: "'Karera' by BINI", type: "Bubbly Pop" },
    { name: "'Your Love' by Alamid", type: "OPM Rock Ballad" },
    { name: "'Ako'y Maghihintay' by Jolina Magdangal", type: "90s Pop Ballad" },
    { name: "'Chinito' by Yeng Constantino", type: "Pop-Rock" },
    { name: "'Pop Off Ate!' from DRPH S1", type: "Fierce Performance" },
    { name: "'BOOGSH!' from DRPH S2", type: "Fierce Performance" },
    { name: "'Bongga Ka 'Day' by Hotdog", type: "OPM Disco" },
    { name: "'Please, Please, Please' by Sabrina Carpenter", type: "Sultry Pop" }
];

/**
 * Object containing templates for generating critiques based on performance level.
 */
export const critiques = {
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

