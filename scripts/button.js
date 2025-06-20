let mus1 = "assets/imgs/music.png";
let mus2 = "assets/imgs/music2.png";

document.addEventListener("DOMContentLoaded", () => {



  const musicButton = document.getElementById("musicButton");
  //const audio = document.getElementById("audio");

  musicButton.addEventListener("click", () => {
    musicButton.src = mus2;
    // if (audio.paused) {
    //   //audio.play();
    //   musicButton.src = mus2;
    // } else {
    //   //audio.pause();
    //   musicButton.src = mus1;
    // }
  });

  document.getElementById("startButton").addEventListener("click", () => {
    const name = document.getElementById("nickname").value;

    chrome.storage.local.set({ savedName: name }, () => {
      document.getElementById("signupSubtext").textContent = "Welcome, " + name + "!";
    });


  });
  chrome.storage.local.get("savedName", (data) => {
    if (data.savedName) {
      document.getElementById("signupSubtext").textContent = "Welcome, " + data.savedName + "!";
    }
  });
});
