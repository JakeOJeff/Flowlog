function getLevel(count) {
  if (count >= 8) return "level-4";
  if (count >= 5) return "level-3";
  if (count >= 2) return "level-2";
  if (count >= 1) return "level-1";
  return "";
}

document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("grid");

  chrome.storage.local.get("stats", (data) => {
    const stats = data.stats || {};
    const today = new Date();

    for (let i = 0; i < 49; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const key = date.toISOString().split("T")[0];
      const count = stats[key] || 0;

      const box = document.createElement("div");
      box.className = `box ${getLevel(count)}`;
      box.title = `${key}: ${count} task(s)`;
      grid.prepend(box); // newest to the right
    }
  });
});
