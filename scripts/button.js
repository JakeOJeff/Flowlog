let mus1 = "/assets/imgs/music.png";
let mus2 = "/assets/imgs/music2.png";
let username = "";

document.addEventListener("DOMContentLoaded", () => {



  const musicButton = document.getElementById("musicButton");
  const audio = document.getElementById("audio");
  const startButton = document.getElementById("startButton");


  if (musicButton && audio) {
    musicButton.addEventListener("click", () => {
      if (audio.paused) {
        audio.play();
        musicButton.src = mus1;
          chrome.runtime.sendMessage({ type: "play-audio" });
      } else {
        audio.pause();
        musicButton.src = mus2;
      }
    });
  }

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
