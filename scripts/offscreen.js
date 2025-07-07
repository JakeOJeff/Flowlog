let audio = new Audio("assets/music/peace.mp3");
audio.loop = true;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "play-audio") {
    audio.play();
  } else if (request.type === "stop-audio") {
    audio.pause();
  }
});
