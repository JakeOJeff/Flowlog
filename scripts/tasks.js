document.addEventListener("DOMContentLoaded", () => {
  const taskInput = document.getElementById("taskInput");
  const addTaskBtn = document.getElementById("addTaskBtn");
  const taskList = document.getElementById("taskList");

  function loadTasks() {
    chrome.storage.local.get("tasks", (data) => {
      const tasks = data.tasks || [];
      const container = document.getElementById("taskContainer");
      container.innerHTML = "";

      tasks.forEach((task, index) => {
        // CARD DIV
        const card = document.createElement("div");
        card.className = `task-card `;
        // card.className = `task-card ${getLevel(task.count || 0)}`;

        const infoBox = document.createElement("div");

        const title = document.createElement("h3");
        title.textContent = task.text;

        const dateText = document.createElement("p");
        dateText.textContent = `Created: ${task.date || "Unavailable"}`;

        // CARD -> BUTTONS DIV
        const buttonsBox = document.createElement("div");
        buttonsBox.className = "task-buttons ";

        const doBtn = document.createElement("button");
        doBtn.textContent = "Do Task";
        doBtn.className = "mainButton"
        doBtn.addEventListener("click", () => addTaskCount(index))

        const repeatBtn = document.createElement("button");
        repeatBtn.textContent = task.repeat ? "Repeating" : "Repeat";
        repeatBtn.className = task.repeat ? "mainButton mainButton-enabled" : "mainButton"
        repeatBtn.addEventListener("click", () => toggleRepeat(index));

        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove"
        removeBtn.className = "mainButton"
        removeBtn.addEventListener("click", () => removeTask(index));


        // CARD -> COUNTS BOX DIV
        const countsBox = document.createElement("div");
        countsBox.className = "";

        // const countsText = document.createElement("p");
        // countsText.className = "tasks-count-label"
        // countsText.textContent = task.count 

        const countsImage = document.createElement("div");
        countsImage.className = "tasks-filler-box"
        countsImage.backgroundColor = `${getLevel(task.count || 0)}`


        infoBox.appendChild(title);
        infoBox.appendChild(dateText);

        buttonsBox.appendChild(doBtn);

        // countsBox.appendChild(countsText)
        countsBox.appendChild(countsImage)
        buttonsBox.appendChild(repeatBtn);
        buttonsBox.appendChild(removeBtn);

        card.appendChild(infoBox);
        card.appendChild(buttonsBox);
        card.appendChild(countsBox);
        container.appendChild(card);

      });



    })
  }

  function removeTask(index) {
    chrome.storage.local.get("tasks", (data) => {
      const tasks = data.tasks || [];
      if (index >= 0 && index < tasks.length) {
        tasks.splice(index, 1);
        chrome.storage.local.set({ tasks }, loadTasks);
      }
    });
  }

  function toggleRepeat(index) {
    chrome.storage.local.get("tasks", (data) => {
      const tasks = data.tasks || [];
      if (index >= 0 && index < tasks.length) {
        tasks[index].repeat = !tasks[index].repeat;
        chrome.storage.local.set({ tasks }, loadTasks);
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
  function handleAddTask() {
    const text = taskInput.value.trim();
    if (text === "") return;
    if (text.length > 25) {
      alert("Task text is too long! Please limit it to 25 characters.");
      return;
    }
    chrome.storage.local.get("tasks", (data) => {
      const tasks = data.tasks || [];
      const today = new Date().toISOString().split("T")[0];
      tasks.push({ text, selected: false, count: 1, repeat: false, date: today });
      chrome.storage.local.set({ tasks }, () => {
        taskInput.value = "";
        loadTasks();
      });
    });
  }



  function cleanUpTasks() {
    chrome.storage.local.get("tasks", (data) => {
      const today = new Date().toISOString().split("T")[0];
      const updated = (data.tasks || []).map(task => {
        if (task.date !== today) {
          if (task.repeat) {
            task.count = 0;
            task.date = today;
            return task;
          }
          return null;
        }
        return task;
      }).filter(Boolean);

      chrome.storage.local.set({ tasks: updated }, loadTasks);
    });
  }


    // Button click
  addTaskBtn.addEventListener("click", handleAddTask);

  // Enter key press in input
  taskInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      handleAddTask();
    }
  });

  cleanUpTasks();
  loadTasks();

});
