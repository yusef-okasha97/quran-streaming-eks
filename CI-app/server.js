const express = require("express");
const dotenv = require("dotenv");
const path = require("path");

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5050;

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>OpenMusicStream</title>
            <style>
                :root {
                    --bg-body: #f4f4f4;
                    --bg-header: #ff5500;
                    --bg-container: white;
                    --text-heading: #333;
                    --text-muted: #777;
                    --bg-footer: #222;
                    --shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                }
                body {
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 0;
                    background-color: var(--bg-body);
                    transition: background-color 0.3s ease;
                }
                header {
                    background-color: var(--bg-header);
                    color: white;
                    padding: 20px;
                    text-align: center;
                    position: relative;
                }
                .container {
                    max-width: 900px;
                    margin: 20px auto;
                    background: var(--bg-container);
                    border-radius: 8px;
                    overflow: hidden;
                    box-shadow: var(--shadow);
                    transition: background-color 0.3s ease;
                }
                .banner {
                    width: 100%;
                    height: 200px;
                    background: url('/banner.jpg') center/cover no-repeat;
                }
                .content {
                    padding: 20px;
                }
                .song {
                    display: flex;
                    align-items: center;
                    margin-bottom: 20px;
                }
                .song img {
                    width: 80px;
                    height: 80px;
                    border-radius: 50%;
                    margin-right: 15px;
                }
                .song-info {
                    flex: 1;
                }
                .song-info h3 {
                    margin: 0 0 5px;
                    color: var(--text-heading);
                }
                .song-info p {
                    margin: 0;
                    color: var(--text-muted);
                }
                footer {
                    text-align: center;
                    padding: 10px 20px;
                    background-color: var(--bg-footer);
                    color: white;
                }
                audio {
                    width: 100%;
                    margin-top: 10px;
                }
                html.dark {
                    --bg-body: #1a1a1a;
                    --bg-header: #c44a00;
                    --bg-container: #2d2d2d;
                    --text-heading: #e0e0e0;
                    --text-muted: #a0a0a0;
                    --bg-footer: #111;
                    --shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
                }
            </style>
        </head>
        <body>
            <header>
                <h1>your way to heaven - Manara project </h1>
                <div id="prayerTimer" style="position:absolute; top:20px; left:20px; padding:8px 14px; border-radius:6px; background:rgba(0,0,0,0.4); color:white; font-size:13px; text-align:left; min-width:180px;">
                    <div style="font-weight:bold;">Next Prayer: <span id="prayerName">Loading...</span></div>
                    <div style="margin-top:4px;">Time left: <span id="prayerCountdown">--:--:--</span></div>
                </div>
                <button id="themeToggle" type="button" aria-label="Toggle dark mode" style="position:absolute; top:20px; right:20px; padding:8px 14px; border:none; border-radius:6px; background:rgba(255,255,255,0.25); color:white; cursor:pointer; font-size:14px;">
                    🌙 Dark
                </button>
            </header>
            <div class="container">
                <div class="banner"></div>
                <div class="content">
                    <div class="song">
                        <img src="/song1.jpg" alt="Song 1">
                        <div class="song-info">
                            <h3>Al-Sharh</h3>
                            <p>Al-Hosary</p>
                            <audio id="audio1" controls>
                                <source src="/music.mp3" type="audio/mpeg">
                                Your browser does not support the audio element.
                            </audio>
                        </div>
                    </div>
                    <div class="song">
                        <img src="/song2.jpg" alt="Song 2">
                        <div class="song-info">
                            <h3>Fatir</h3>
                            <p>Abdul Basit</p>
                            <audio id="audio2" controls>
                                <source src="/music2.mp3" type="audio/mpeg">
                                Your browser does not support the audio element.
                            </audio>
                        </div>
                    </div>
                </div>
            </div>
            <footer>
                <p>&copy; 2025 OpenMusicStream. All rights reserved.</p>
            </footer>
            <audio id="adhanAudio" src="/adhan.mp3" preload="auto"></audio>
            <script>
                // Store reference to the audio elements
                const audio1 = document.getElementById('audio1');
                const audio2 = document.getElementById('audio2');

                // Function to stop all audios except the currently playing one
                function stopOtherAudios(currentAudio) {
                    const audios = [audio1, audio2]; // Add more if you have more audio elements
                    audios.forEach(audio => {
                        if (audio !== currentAudio) {
                            audio.pause();
                            audio.currentTime = 0; // Reset the audio to the beginning
                        }
                    });
                }

                // Event listeners for when audio plays
                audio1.addEventListener('play', () => stopOtherAudios(audio1));
                audio2.addEventListener('play', () => stopOtherAudios(audio2));

                // Dark mode
                const html = document.documentElement;
                const themeBtn = document.getElementById('themeToggle');
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                if (!localStorage.getItem('theme') && prefersDark) {
                    localStorage.setItem('theme', 'dark');
                }
                const saved = localStorage.getItem('theme');
                if (saved === 'dark') {
                    html.classList.add('dark');
                    themeBtn.textContent = '☀️ Light';
                } else {
                    html.classList.remove('dark');
                    themeBtn.textContent = '🌙 Dark';
                }
                themeBtn.addEventListener('click', () => {
                    html.classList.toggle('dark');
                    const isDark = html.classList.contains('dark');
                    localStorage.setItem('theme', isDark ? 'dark' : 'light');
                    themeBtn.textContent = isDark ? '☀️ Light' : '🌙 Dark';
                });

                // -------- Prayer countdown (Ramadan) --------
                const prayerNameEl = document.getElementById('prayerName');
                const prayerCountdownEl = document.getElementById('prayerCountdown');
                const adhanAudio = document.getElementById('adhanAudio');

                // اضبط الأوقات على مدينتك (بنظام 24 ساعة)
                const prayerSchedule = [
                    { key: 'fajr',   name: 'الفجر', time: '04:00' },
                    { key: 'dhuhr',  name: 'الظهر', time: '12:00' },
                    { key: 'asr',    name: 'العصر', time: '15:30' },
                    { key: 'maghrib',name: 'المغرب', time: '18:10' },
                    { key: 'isha',   name: 'العشاء', time: '19:30' }
                ];

                let lastPlayedKey = null;

                function getTodayPrayerDate(timeStr) {
                    const [h, m] = timeStr.split(':').map(Number);
                    const d = new Date();
                    d.setHours(h, m, 0, 0);
                    return d;
                }

                function getNextPrayer(now = new Date()) {
                    // ابحث عن أول صلاة توقيتها بعد الآن
                    for (const p of prayerSchedule) {
                        const t = getTodayPrayerDate(p.time);
                        if (t > now) return { ...p, date: t };
                    }
                    // لو خلصت اليوم، يبقى أول صلاة بكرة
                    const tomorrow = new Date(now);
                    tomorrow.setDate(tomorrow.getDate() + 1);
                    const first = prayerSchedule[0];
                    const firstDate = new Date(tomorrow);
                    const [h, m] = first.time.split(':').map(Number);
                    firstDate.setHours(h, m, 0, 0);
                    return { ...first, date: firstDate };
                }

                function formatDiff(ms) {
                    if (ms < 0) ms = 0;
                    const totalSec = Math.floor(ms / 1000);
                    const h = String(Math.floor(totalSec / 3600)).padStart(2, '0');
                    const m = String(Math.floor((totalSec % 3600) / 60)).padStart(2, '0');
                    const s = String(totalSec % 60).padStart(2, '0');
                    return h + ':' + m + ':' + s;
                }

                function startPrayerTimer() {
                    setInterval(() => {
                        const now = new Date();
                        const next = getNextPrayer(now);
                        prayerNameEl.textContent = next.name;
                        const diff = next.date - now;
                        prayerCountdownEl.textContent = formatDiff(diff);

                        // شغّل الأذان مرة واحدة عند دخول وقت الصلاة
                        if (diff <= 0 && lastPlayedKey !== next.key) {
                            if (adhanAudio) {
                                adhanAudio.currentTime = 0;
                                adhanAudio.play().catch(() => {});
                            }
                            lastPlayedKey = next.key;
                        }
                        // حضّر لصلاة جديدة لما نعدّي الوقت بفرق كبير
                        if (diff > 60 * 1000) {
                            lastPlayedKey = null;
                        }
                    }, 1000);
                }

                startPrayerTimer();
            </script>
        </body>
        </html>
    `);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
