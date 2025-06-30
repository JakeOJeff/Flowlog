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
        li.className = `${getLevel(task.count || 0)}`;
        li.addEventListener("click", () => addTaskCount(index));

        const buttonsDiv = document.createElement("div");
        buttonsDiv.className = "log-buttons-container";
        const removeBtn = document.createElement("button");
        removeBtn.textContent = "X"; // Cross symbol
        removeBtn.className = "remove-btn";
        removeBtn.addEventListener("click", () => {
          removeTask(index);   // Call your remove function
        });

        const repeatBtn = document.createElement("button");
        repeatBtn.textContent = "O"; // Repeat symbol
        repeatBtn.className = `${task.repeat ? "repeat-btn repeat-btn-enabled" : "repeat-btn"}`;
        repeatBtn.addEventListener("click", () => {
          toggleRepeat(index);   // Call your repeat function
        });
        buttonsDiv.appendChild(li);
        buttonsDiv.appendChild(repeatBtn);
        buttonsDiv.appendChild(removeBtn);
        taskList.appendChild(buttonsDiv);

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

  function addTaskCount(index) {
    chrome.storage.local.get("tasks", (data) => {
      const tasks = data.tasks || [];
      tasks[index].count = tasks[index].count || 0;
      tasks[index].count++;
      console.log(`Added task ${index}: now count = ${tasks[index].count}`); // ✅ DEBUG

      if (tasks[index].count >= 1) {
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
    if (text.length > 25) {
      alert("Task text is too long! Please limit it to 25 characters.");
      return;
    }
    chrome.storage.local.get("tasks", (data) => {
      const tasks = data.tasks || [];
      tasks.push({ text, selected: false, count: 1, repeat: false });
      chrome.storage.local.set({ tasks }, () => {
        taskInput.value = "";
        loadTasks();
      });
    });
  });

  loadTasks();
});
