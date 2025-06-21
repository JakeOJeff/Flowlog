let mus1 = "/assets/imgs/music.png";
let mus2 = "/assets/imgs/music2.png";
let username = "";
let welcomePromptLoaded = false;

document.addEventListener("DOMContentLoaded", () => {
  const welcomePrompt = document.getElementById("welcomePrompt");
  const startButton = document.getElementById("startButton");
  const musicButton = document.getElementById("musicButton");
  const nicknameInput = document.getElementById("nickname");
  const signupSubtext = document.getElementById("signupSubtext");

  let isPlaying = false;

  // Set welcome prompt if available
  if (welcomePrompt && !welcomePromptLoaded) {
    chrome.storage.local.get("savedName", (data) => {
      if (data.savedName) {
        username = data.savedName;
        welcomePrompt.textContent = "What are you up to today " + username + "!";
        welcomePromptLoaded = true;
      }
    });
  }

  //     chrome.storage.local.remove("savedName", () => {
  //   console.log("Name cleared!");
  // });

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

  // Start button (used on the name input screen)
  if (startButton && nicknameInput) {
    startButton.addEventListener("click", () => {
      const inputName = nicknameInput.value.trim();
      const name = inputName || username;

      if (name !== "") {
        chrome.storage.local.set({ savedName: name }, () => {
          if (signupSubtext) {
            signupSubtext.textContent = "Welcome, " + name + "!";
          }
          window.location.href = "/pages/welcome/index.html";
        });
      }
    });
  }
});
