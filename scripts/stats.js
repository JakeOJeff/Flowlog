function getLevel(count) {
  if (count >= 15) return "level-4";
  if (count >= 10) return "level-3";
  if (count >= 5) return "level-2";
  if (count >= 1) return "level-1";
  if (count === 0) return "level-0";
  return "";
}

document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("grid");

  chrome.storage.local.get("stats", (data) => {
    const stats = data.stats || {};
    const today = new Date();
    const tooltip = document.querySelector('.stats-tooltip');

    for (let i = 0; i < (29 * 7); i++) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const key = date.toISOString().split("T")[0];
      const count = stats[key] || 0;
      

      const box = document.createElement("div");
      box.addEventListener('mouseenter', () => {
        
        tooltip.textContent = `${key}: ${count} task(s)`;
        tooltip.style.display = 'block';
      });
      box.addEventListener('mouseleave', () => {
        tooltip.style.display = 'none';
      });    
      box.className = `box ${getLevel(count)}`;
      box.title = `${key}: ${count} task(s)`; //TOOLTIP
      grid.prepend(box); // newest to the right
    }
  });
});
