let mus1 = '/assets/imgs/music.png';
let mus2 = '/assets/imgs/music2.png';
var date = new Date();
const timeOfDay =
  ['Good morning', 'Good afternoon', 'Good evening', 'Good night'];

document.addEventListener("DOMContentLoaded", function () {
  const musicButton = document.getElementById('musicButton');
  const userTaskInfo = document.getElementById('userTaskInfo');
  const streakElement = document.getElementById('streak');
  const mostProductiveTaskElement = document.getElementById('mostProductiveTask');


  let totalTasks = 0;
  let totalDays = 0;
  let buildUserData = '';
  let isPlaying = false;
  let streak = 0;
  let currentStreak = 0;
  let mostProductiveTaskCount = 0;
  let mostProductiveTaskName = '';

  // Music button setup
  if (musicButton) {
    chrome.runtime.sendMessage({ type: 'get-music-state' }, (response) => {
      if (response && typeof response.playing !== 'undefined') {
        isPlaying = response.playing;
        musicButton.src = isPlaying ? mus1 : mus2;
      } else {
        isPlaying = false;
        musicButton.src = mus2;
      }
    });

    musicButton.addEventListener('click', () => {
      isPlaying = !isPlaying;
      musicButton.src = isPlaying ? mus1 : mus2;
      chrome.runtime.sendMessage({ type: isPlaying ? 'play-audio' : 'stop-audio' });
    });
  }

  // Load user name and tasks, then update DOM
  chrome.storage.local.get(['savedName', 'tasks', 'streak', 'mostProductiveTaskCount', 'mostProductiveTaskName'], (data) => {
    const name = data.savedName || 'User';
    buildUserData = name;

    const current_hour = new Date().getHours(); // You had `date.getHours()` but `date` wasn't defined
    const timeOfDay = ["Night", "Morning", "Afternoon", "Evening"]; // Assuming this array exists
    document.getElementById('welcomeMessage').textContent =
      `${timeOfDay[Math.floor(current_hour / 6)]}, ${name} 👋`;

    const tasks = data.tasks || [];
    for (let i = 0; i < 29 * 7; i++){
      const task =tasks[i];

      if (task && task.count > 0) {
        currentStreak++;
        totalTasks += task.count;
        totalDays++;
        if ( task.count > mostProductiveTaskCount) {
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

    buildUserData += ` : ${totalTasks} tasks done (${totalDays} days)`;


    if (streakElement) {
      streakElement.textContent = `Streak: ${streak} days`;
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
