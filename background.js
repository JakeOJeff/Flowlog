async function ensureOffscreen() {
  if (await chrome.offscreen.hasDocument()) return;
  await chrome.offscreen.createDocument({
    url: 'offscreen.html',
    reasons: [chrome.offscreen.Reason.AUDIO_PLAYBACK],
    justification: 'Play background music for mood tracker extension'
  });
}

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  if (request.type === "ensure-offscreen") {
    await ensureOffscreen();
    sendResponse({ success: true });
  }
});
