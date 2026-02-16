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
                body {
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 0;
                    background-color: #f4f4f4;
                }
                header {
                    background-color: #ff5500;
                    color: white;
                    padding: 20px;
                    text-align: center;
                }
                .container {
                    max-width: 900px;
                    margin: 20px auto;
                    background: white;
                    border-radius: 8px;
                    overflow: hidden;
                    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
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
                    color: #333;
                }
                .song-info p {
                    margin: 0;
                    color: #777;
                }
                footer {
                    text-align: center;
                    padding: 10px 20px;
                    background-color: #222;
                    color: white;
                }
                audio {
                    width: 100%;
                    margin-top: 10px;
                }
            </style>
        </head>
        <body>
            <header>
                <h1>your way to heaven - Manara project </h1>
                <p></p>
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
            </script>
        </body>
        </html>
    `);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
