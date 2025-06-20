async function ensureOffscreenDocument() {
  const exists = await chrome.offscreen.hasDocument();
  if (!exists) {
    await chrome.offscreen.createDocument({
      url: chrome.runtime.getURL("/offscreen.html"),
      reasons: [chrome.offscreen.Reason.AUDIO_PLAYBACK],
      justification: "Play background music while extension is open."
    });
  }
}

chrome.runtime.onMessage.addListener(async (msg, sender, sendResponse) => {
  if (msg.type === "play-audio") {
    await ensureOffscreenDocument();
    chrome.runtime.sendMessage({ type: "start-music" });
    chrome.storage.local.set({ musicPlaying: true });
  } else if (msg.type === "stop-audio") {
    chrome.runtime.sendMessage({ type: "pause-music" });
    chrome.storage.local.set({ musicPlaying: false });
  } else if (msg.type === "get-music-state") {
    chrome.storage.local.get("musicPlaying", (data) => {
      sendResponse({ playing: data.musicPlaying === true });
    });
    return true; // required to make sendResponse async
  }
});