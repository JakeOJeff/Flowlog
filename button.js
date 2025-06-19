let mus1 = "assets/music.png";
let mus2 = "assets/music2.png";

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
});
