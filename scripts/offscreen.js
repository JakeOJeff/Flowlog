const audio = document.getElementById("bgm");

chrome.runtime.onMessage.addListener((msg) => {
  if (msg.type === "start-music") {
    audio.play();
  } else if (msg.type === "pause-music") {
    audio.pause();
  }
});
