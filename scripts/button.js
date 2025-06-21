let mus1 = "/assets/imgs/music.png";
let mus2 = "/assets/imgs/music2.png";
let username = "";
let welcomePromptLoaded = false;

document.addEventListener("DOMContentLoaded", () => {

  const welcomePrompt = document.getElementById("welcomePrompt");
  if (welcomePrompt && !welcomePromptLoaded) {
    chrome.storage.local.get("savedName", (data) => {
      if (data.savedName) {
        username = data.savedName;
        if (welcomePrompt) {
          welcomePrompt.textContent = "What are you upto today " + username + "!";
          welcomePromptLoaded = true;
        }
         window.location.href = "/pages/welcome/index.html";
      }
    });
  }


  const startButton = document.getElementById("startButton");
  const musicButton = document.getElementById("musicButton");

  let isPlaying = false;

  chrome.runtime.sendMessage({ type: "get-music-state" }, (response) => {
    if (response && typeof response.playing !== "undefined") {
      isPlaying = response.playing;
      musicButton.src = isPlaying ? mus1 : mus2;
    } else {
      console.warn("No response or missing 'playing' from background script.");
      isPlaying = false;
      musicButton.src = mus2; // default to not playing
    }
  });

  if (musicButton) {
    musicButton.addEventListener("click", () => {
      if (isPlaying) {
        musicButton.src = mus1;
        isPlaying = false;
        chrome.runtime.sendMessage({ type: "play-audio" });
      } else {
        musicButton.src = mus2;
        isPlaying = true;
        chrome.runtime.sendMessage({ type: "stop-audio" });
      }
    });
  }
  //isPlaying = !isPlaying;


  //   chrome.storage.local.remove("savedName", () => {
  //   console.log("Name cleared!");
  // });

  if (startButton) {
    startButton.addEventListener("click", () => {
      const inputName = document.getElementById("nickname").value.trim();
      const name = inputName || username;

      chrome.storage.local.set({ savedName: name }, () => {
        if (name !== "") {
          document.getElementById("signupSubtext").textContent = "Welcome, " + name + "!";
          window.location.href = "/pages/welcome/index.html";
        }
      });
    });
  }
});
