document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("timerModal");
  const openBtn = document.getElementById("viewMoreItems");
  const closeBtn = document.getElementById("closeModal");
  const timerList = document.getElementById("timerList");

  openBtn.addEventListener("click", () => {
    loadTimers();
    modal.style.display = "block";
  });

  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });

  function loadTimers() {
    timerList.innerHTML = ""; // clear existing
    chrome.storage.local.get("timers", (data) => {
      const timers = data.timers || [];
      if (timers.length === 0) {
        timerList.innerHTML = "<p>No past timers.</p>";
        return;
      }
      timers.forEach((entry) => {
        const item = document.createElement("div");
        item.className = "timer-item";
        item.textContent = entry; // or `${entry.duration} - ${entry.label}` if structured
        timerList.appendChild(item);
      });
    });
  }
});
