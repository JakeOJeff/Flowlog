document.addEventListener("DOMContentLoaded", () => {
  const taskInput = document.getElementById("taskInput");
  const addTaskBtn = document.getElementById("addTaskBtn");
  const taskList = document.getElementById("taskList");

  function loadTasks() {
    chrome.storage.local.get("tasks", (data) => {
      const tasks = data.tasks || [];
      taskList.innerHTML = "";
      tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.textContent = task.text;
        li.className = `${task.done ? "crossed" : ""} ${task.selected ? "selected" : ""}`.trim();
        li.addEventListener("click", () => toggleTask(index));
        taskList.appendChild(li);
      });
    });
  }

  function toggleTask(index) {
    chrome.storage.local.get("tasks", (data) => {
      const tasks = data.tasks || [];
      tasks[index].done = !tasks[index].done;

      // Track completion by day
      if (tasks[index].done) {
        const today = new Date().toISOString().split("T")[0];
        chrome.storage.local.get("stats", (res) => {
          const stats = res.stats || {};
          stats[today] = (stats[today] || 0) + 1;
          chrome.storage.local.set({ stats });
        });
      }

      chrome.storage.local.set({ tasks }, loadTasks);
    });
  }


  addTaskBtn.addEventListener("click", () => {
    const text = taskInput.value.trim();
    if (text === "") return;
    chrome.storage.local.get("tasks", (data) => {
      const tasks = data.tasks || [];
      tasks.push({ text, done: false, selected: false });
      chrome.storage.local.set({ tasks }, () => {
        taskInput.value = "";
        loadTasks();
      });
    });
  });

  loadTasks();
});
