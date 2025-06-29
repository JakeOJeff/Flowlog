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
        const removeBtn = document.createElement("button");
        removeBtn.textContent = "×"; // Cross symbol
        removeBtn.className = "remove-btn";
        removeBtn.addEventListener("click", () => {
          removeTask(index);   // Call your remove function
        });
        li.appendChild(removeBtn);
        const repeatBtn = document.createElement("button");
        repeatBtn.textContent = "↻"; // Repeat symbol
        repeatBtn.className = "repeat-btn";
        repeatBtn.addEventListener("click", () => {
          toggleRepeat(index);   // Call your repeat function
        });
                li.appendChild(repeatBtn);
        taskList.appendChild(li);
      });
    });
  }

  function removeTask(index) {
    chrome.storage.local.get("tasks", (data) => {
      const tasks = data.tasks || [];
      if (index >= 0 && index < tasks.length){
        tasks.splice(index, 1);
        chrome.storage.local.set({tasks}, loadTasks);
      }
    });
  }

  function toggleRepeat(index) {
    chrome.storage.local.get("tasks", (data) => {
      const tasks = data.tasks || [];
      if (index >= 0 && index < tasks.length){
        tasks[index].repeat = !tasks[index].repeat;
        chrome.storage.local.set({tasks}, loadTasks);
      }
    });
  }

  function toggleTask(index) {
    chrome.storage.local.get("tasks", (data) => {
      const tasks = data.tasks || [];
      tasks[index].done = !tasks[index].done;
      console.log(`Toggled task ${index}: now done = ${tasks[index].done}`); // ✅ DEBUG

      if (tasks[index].done) {
        const today = new Date().toISOString().split("T")[0];
        chrome.storage.local.get("stats", (res) => {
          const stats = res.stats || {};
          stats[today] = (stats[today] || 0) + 1;
          chrome.storage.local.set({ stats });
        });
        setTimeout('', 5000);
        tasks[index].done = false;
      }

      chrome.storage.local.set({ tasks }, loadTasks);
    });
  }



  addTaskBtn.addEventListener("click", () => {
    const text = taskInput.value.trim();
    if (text === "") return;
    if (text.length > 25) {
      alert("Task text is too long! Please limit it to 25 characters.");
      return;
    }
    chrome.storage.local.get("tasks", (data) => {
      const tasks = data.tasks || [];
      tasks.push({ text, done: false, selected: false, count: 0, repeat: false });
      chrome.storage.local.set({ tasks }, () => {
        taskInput.value = "";
        loadTasks();
      });
    });
  });

  loadTasks();
});
