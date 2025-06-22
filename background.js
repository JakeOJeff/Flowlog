let audio = new Audio("/assets/music/peace.mp3");
audio.loop = true;

let isPlaying = false;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "play-audio") {
    audio.play();
    isPlaying = true;
  } else if (request.type === "stop-audio") {
    audio.pause();
    isPlaying = false;
  } else if (request.type === "get-music-state") {
    sendResponse({ playing: isPlaying });
  }

  if (request.type === "askGemini") {
    fetchGeminiResponse(request.prompt).then((reply) => {
      sendResponse({ reply });
    });
    return true;
  }
});
