let mus1 = "/assets/imgs/music.png";
let mus2 = "/assets/imgs/music2.png";
let username = "";

document.addEventListener("DOMContentLoaded", () => {
  const startButton = document.getElementById("startButton");


  const musicButton = document.getElementById("musicButton");

  let isPlaying = false;

  chrome.runtime.sendMessage({ type: "get-music-state" }, (response) => {
    isPlaying = response.playing;
    musicButton.src = isPlaying ? mus1 : mus2;
  });
  if (musicButton && audio) {
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
  isPlaying = !isPlaying;

  const signupSubtext = document.getElementById("signupSubtext");
  if (signupSubtext) {
    chrome.storage.local.get("savedName", (data) => {
      if (data.savedName) {
        document.getElementById("signupSubtext").textContent = "Welcome, " + data.savedName + "!";
        username = data.savedName;
      }
    });
  }
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
          window.location.href = "/welcome/index.html";
        }
      });
    });
  }
});
