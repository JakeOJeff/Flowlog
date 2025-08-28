let mus1 = '/assets/imgs/music.png';
let mus2 = '/assets/imgs/music2.png';
var date = new Date();
const timeOfDay =
  ['Good morning', 'Good afternoon', 'Good evening', 'Good night'];

document.addEventListener("DOMContentLoaded", function () {

  // IF NEED TO CLEAR DATA 
  // Clear data from chrome.storage.local

  // chrome.storage.local.clear(function () {
  //   if (chrome.runtime.lastError) {
  //     console.error("Error clearing local storage: " + chrome.runtime.lastError.message);
  //   } else {
  //     console.log("Local storage cleared successfully.");
  //   }
  // });

  // // Clear data from chrome.storage.sync
  // chrome.storage.sync.clear(function () {
  //   if (chrome.runtime.lastError) {
  //     console.error("Error clearing sync storage: " + chrome.runtime.lastError.message);
  //   } else {
  //     console.log("Sync storage cleared successfully.");
  //   }
  // });
  // localStorage.removeItem('selected-theme');
  // console.log("Theme data cleared from localStorage.");

  // END IF NEED TO CLEAR DATA

  const userTaskInfo = document.getElementById('userTaskInfo');
  const streakElement = document.getElementById('streak');
  const mostProductiveTaskElement = document.getElementById('mostProductiveTask');


  let totalTasks = 0;
  let totalDays = 0;
  let buildUserData = '';
  let streak = 0;
  let currentStreak = 0;
  let mostProductiveTaskCount = 0;
  let mostProductiveTaskName = '';

  document.getElementById("copyMeta").addEventListener("click", (e) => {
    e.preventDefault();

    chrome.storage.local.get(null, (items) => {
      console.log("Items in storage before copying:", items); // Debug

      const jsonString = JSON.stringify(items, null, 2);

      if (!jsonString || jsonString === "{}") {
        alert("No metadata found in storage!");
        return;
      }

      navigator.clipboard.writeText(jsonString).then(() => {
        alert("Metadata copied to clipboard!");
      }).catch(err => {
        console.error("Failed to copy: ", err);
        alert("Could not copy metadata.");
      });
    });
  });
  // Load user name and tasks, then update DOM
  chrome.storage.local.get(['savedName', 'tasks', 'streak', 'mostProductiveTaskCount', 'mostProductiveTaskName'], (data) => {
    const name = data.savedName || 'User';
    buildUserData = name;

    const current_hour = new Date().getHours(); // You had `date.getHours()` but `date` wasn't defined
    const timeOfDay = ["Night", "Morning", "Afternoon", "Evening"]; // Assuming this array exists
    document.getElementById('welcomeMessage').textContent =
      `${timeOfDay[Math.floor(current_hour / 6)]}, ${name} 👋`;

    const tasks = data.tasks || [];
    for (let i = 0; i < 29 * 7; i++) {
      const task = tasks[i];

      if (task && task.count > 0) {
        currentStreak++;
        totalTasks += task.count;
        totalDays++;
        if (task.count > mostProductiveTaskCount) {
          mostProductiveTaskCount = task.count;
          mostProductiveTaskName = task.text || 'No found task';
        }
      }
      else {
        currentStreak = 0;
      }

      // Max Streak encountered
      if (currentStreak > streak) {
        streak = currentStreak;
      }
    }

    chrome.storage.local.set({
      'streak': streak,
      'mostProductiveTask': mostProductiveTaskName,
      'mostProductiveTaskCount': mostProductiveTaskCount
    });
    document.querySelector('a').addEventListener('click', function (e) {
      e.preventDefault();
      window.open(this.href, '_blank');
    });

    buildUserData += ` : ${totalTasks} tasks done (${totalDays} day(s))`;


    if (streakElement) {
      streakElement.textContent = `Streak: ${streak} day(s)`;
    }
    else {
      console.error("Element with id 'streak' not found.");
    }
    if (mostProductiveTaskElement) {
      mostProductiveTaskElement.textContent = `Most Productive Task: ${mostProductiveTaskName} (${mostProductiveTaskCount} times)`;
    }
    else {
      console.error("Element with id 'mostProductiveTaskElement' not found.");
    }

    if (userTaskInfo) {
      userTaskInfo.textContent = buildUserData;
    } else {
      console.error("Element with id 'userTaskInfo' not found.");
    }
  });
});
