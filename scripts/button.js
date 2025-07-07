
let username = "";
let welcomePromptLoaded = false;

document.addEventListener("DOMContentLoaded", () => {
  const welcomePrompt = document.getElementById("welcomePrompt");
  const welcomeHeader = document.getElementById("welcomeHeader");
  const startButton = document.getElementById("startButton");
  const nicknameInput = document.getElementById("nickname");
  const signupSubtext = document.getElementById("signupSubtext");
  const startFlowingButton = document.getElementById("startFlowingButton");
  
  
  


  // Set welcome prompt if available
  if (welcomePrompt && !welcomePromptLoaded) {
    chrome.storage.local.get("savedName", (data) => {
      if (data.savedName) {
        username = data.savedName;
        welcomePrompt.textContent = "What are you up to today " + username + "!";
        welcomePromptLoaded = true;
      }
    });
    
  }
  

  if (startButton && nicknameInput) {
    startButton.addEventListener("click", () => {
      const inputName = nicknameInput.value.trim();
      const name = inputName || username;

      if (name !== "") {
        chrome.storage.local.set({ savedName: name }, () => {
          if (signupSubtext) {
            signupSubtext.textContent = "Welcome, " + name + "!";
          }
          welcomeHeader.classList.add("fade-out-up");
          startButton.classList.add("fade-out-up");
          nicknameInput.classList.add("fade-out-up");
          signupSubtext.classList.add("fade-out-up");
        setTimeout(() => {
        window.location.href = "/pages/welcome/index.html";
      }, 600);
        });
      }
    });
  }

  if (startFlowingButton) {
    startFlowingButton.addEventListener("click", () => {
        startFlowingButton.classList.add("fade-out-up");
        welcomePrompt.classList.add("fade-out-up");
        //musicButton.classList.add("fade-out-up");
      setTimeout(() => {
        window.location.href = "/pages/main/index.html";
      }, 600); 
    });
  }

  
});
