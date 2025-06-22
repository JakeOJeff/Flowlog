function openTab(evt, tabName) {

    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");

    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }


    // Get all elements with class="tablinks" and remove "active"

    tablinks = document.getElementsByClassName("tablinks");

    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }


    // Show the current tab, and add "active" class to the button that opened the tab
    document.getElementById(tabName).style.display = "flex"; // Starting with Capitals
    evt.currentTarget.className += " active";
}

document.addEventListener("DOMContentLoaded", () => {
    // Get all elements with class="tablinks" and add click event listener
    const flowButton = document.getElementById("flow");
    const moodButton = document.getElementById("mood");
    const logButton = document.getElementById("log");
    const profileButton = document.getElementById("profile");

    flowButton.addEventListener("click", (evt) => openTab(evt, "Flow"));
    moodButton.addEventListener("click", (evt) => openTab(evt, "Mood"));
    logButton.addEventListener("click", (evt) => openTab(evt, "Log"));
    profileButton.addEventListener("click", (evt) => openTab(evt, "Profile"));
    // Open the default tab
    if (flowButton) {
        flowButton.click(); // Simulate click to open the Flow tab by default
    }

});