// scripts/router.js
chrome.storage.local.get("savedName", (data) => {
  if (data.savedName) {
        location.replace("/pages/main/index.html");
    // location.replace("/pages/new/index.html");

    // location.replace("/pages/welcome/index.html");
  } else {
    location.replace("/pages/new/index.html");
  }
});
