let mus1 = "/assets/imgs/music.png";
let mus2 = "/assets/imgs/music2.png";
    var date = new Date();
    const timeOfDay = ["Good morning", "Good afternoon", "Good evening", "Good night"];

document.addEventListener("DOMContentLoaded", () => {
  const musicButton = document.getElementById("musicButton");
  let isPlaying = false;
// Load music state and update icon
  if (musicButton) {
    chrome.runtime.sendMessage({ type: "get-music-state" }, (response) => {
      if (response && typeof response.playing !== "undefined") {
        isPlaying = response.playing;
        musicButton.src = isPlaying ? mus1 : mus2;
      } else {
        isPlaying = false;
        musicButton.src = mus2;
      }
    });

    musicButton.addEventListener("click", () => {
      isPlaying = !isPlaying;
      musicButton.src = isPlaying ? mus1 : mus2;
      chrome.runtime.sendMessage({ type: isPlaying ? "play-audio" : "stop-audio" });
    });
  }


      chrome.storage.local.get("savedName", (data) => {
        if (data.savedName) {
            var current_hour = date.getHours();
            document.getElementById('welcomeMessage').textContent = `${timeOfDay[Math.floor(current_hour / 6)]}, ${data.savedName} 👋` 
        }
    });
});