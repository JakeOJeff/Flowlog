let mus1 = "/assets/imgs/music.png";
let mus2 = "/assets/imgs/music2.png";
let username = "";
let welcomePromptLoaded = false;

document.addEventListener("DOMContentLoaded", () => {
  const welcomePrompt = document.getElementById("welcomePrompt");
  const welcomeHeader = document.getElementById("welcomeHeader");
  const startButton = document.getElementById("startButton");
  const musicButton = document.getElementById("musicButton");
  const nicknameInput = document.getElementById("nickname");
  const signupSubtext = document.getElementById("signupSubtext");
  const startFlowingButton = document.getElementById("startFlowingButton");

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

      chrome.storage.local.remove("savedName", () => {
    console.log("Name cleared!");
  });

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

  if (startButton && nicknameInput) {
    startButton.addEventListener("click", () => {
      const inputName = nicknameInput.value.trim();
      const name = inputName || username;

      if (name !== "") {
        chrome.storage.local.set({ savedName: name }, () => {
          if (signupSubtext) {
            signupSubtext.textContent = "Welcome, " + name + "!";
          }
          welcomeHeader.classList.add("fade-out-up");
          startButton.classList.add("fade-out-up");
          nicknameInput.classList.add("fade-out-up");
          signupSubtext.classList.add("fade-out-up");
        setTimeout(() => {
        window.location.href = "/pages/welcome/index.html";
      }, 600);
        });
      }
    });
  }

  if (startFlowingButton) {
    startFlowingButton.addEventListener("click", () => {
        startFlowingButton.classList.add("fade-out-up");
        welcomePrompt.classList.add("fade-out-up");
        musicButton.classList.add("fade-out-up");
      setTimeout(() => {
        window.location.href = "/pages/main/index.html";
      }, 600); 
    });
  }

  
});
