document.addEventListener("DOMContentLoaded", function() {
    let web_location = window.location.href
    var loadingScreen = document.getElementById('loading-screen');
    var otherLoadingScreen = document.getElementById('other-screen');
    var mainContent = document.getElementById('main-content');

    if (web_location === "http://127.0.0.1:5501/index.html") {
        setTimeout(function() {
            loadingScreen.style.display = 'none'; // Hide the loading screen
            mainContent.style.display = 'block';  // Show the main content
        }, 5000); // 5 seconds delay
    }
    else {
        setTimeout(function() {
            otherLoadingScreen.style.display = 'none'; // Hide the loading screen
            mainContent.style.display = 'block';  // Show the main content
        }, 0); // 0 seconds delay
    }

    if (web_location === "http://127.0.0.1:5501/SCP096.html") {
        const notesToggle = document.getElementById('notes-toggle');
        const notesList = document.getElementById('notes-list');
    
        notesToggle.addEventListener('click', () => {
            notesList.style.display = notesList.style.display === 'none' ? 'block' : 'none'; // Toggle notes list visibility
        });
    };

    //reapply themes to other webpages
    console.log(localStorage.getItem("selectedTheme"))
    if (web_location != "http://127.0.0.1:5501/mainpage.html") {
        applyTheme(localStorage.getItem("selectedTheme"));
        themeModal.style.display = "none"; // Hide modal after selection
    }
    
});

// Tied to HTML Login
const validateLogin = (event) => {
    event.preventDefault(); // Prevent form submission

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Correct credentials
    const correctUsername = 'Dr.Bright963';
    const correctPassword = 'DrBr1ght1sC00L';

    if (username === correctUsername && password === correctPassword) {
        window.location.href = 'mainpage.html'; // Redirect to mainpage.html
    } else {
        document.getElementById('error-message').style.display = 'block'; // Show error message
    }
};

// Gear icon click event
const gearIcon = document.getElementById('gear-icon');
const dropdown = document.getElementById('dropdown');

gearIcon.addEventListener('click', () => {
    dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none'; // Toggle dropdown visibility
});

// Hide dropdown if clicked outside
document.addEventListener('click', (event) => {
    if (!gearIcon.contains(event.target) && !dropdown.contains(event.target)) {
        dropdown.style.display = 'none'; // Hide dropdown
    }
});

// Theme selection functionality
document.getElementById('theme-button').addEventListener('click', function() {
    document.getElementById('theme-modal').style.display = 'flex'; // Show modal
});

const themeModal = document.getElementById("theme-modal");
const themeButton = document.getElementById("theme-button");
const themeOptions = document.querySelectorAll(".theme-option");

// Load theme from localStorage
const storedTheme = localStorage.getItem("selectedTheme");
if (storedTheme) {
    applyTheme(storedTheme);
}

themeButton.addEventListener("click", () => {
    themeModal.style.display = "block";
});

themeOptions.forEach(option => {
    option.addEventListener("click", () => {
        //Get theme from local storage
        applyTheme(option.getAttribute("data-theme"));
        themeModal.style.display = "none"; // Hide modal after selection
    var otherScreen = document.getElementById('other-screen');

    /* 
    I have implemented two separate loading delays for the index.html and other pages 
    because they each require a loading screen. While there's likely a more efficient solution, 
    this approach ensures that each page displays the loading screen for the appropriate duration: 
    5 seconds for the index and 0 seconds for the others.
    */


    setTimeout(function() {
        loadingScreen.style.display = 'none'; // Hide the loading screen
        mainContent.style.display = 'block';  // Show the main content
    }, 5000); // 10 seconds delay

    setTimeout(function() {
        otherScreen.style.display = 'none'; // Hide the loading screen
        mainContent.style.display = 'block';  // Show the main content
    }, 0); // 0 seconds delay
});

document.addEventListener("DOMContentLoaded", function() {
    var notesToggle = document.getElementById('notes-toggle');
    var notesList = document.getElementById('notes-list');

    notesToggle.addEventListener('click', function() {
        if (notesList.style.display === 'none') {
            notesList.style.display = 'block'; // Show the notes list
        } else {
            notesList.style.display = 'none'; // Hide the notes list
        }
    });
});

function applyTheme(theme) {
    const root = document.documentElement;
    switch (theme) {
        case 'default':
            root.style.setProperty('--main-color', '#80FF80');
            root.style.setProperty('--background-color', '#131');
            root.style.setProperty('--hover-text-color', '#131');
            root.style.setProperty('--hover-background-color', '#80FF80');
            root.style.setProperty('--background-gradient', 'radial-gradient(ellipse 1000% 100% at 50% 90%, transparent, #121)');
            root.style.setProperty('--scanline-gradient', 'linear-gradient(to bottom, rgba(56, 112, 82,0), rgba(56, 112, 82,0.1))');
            break;
        case 'night':
            root.style.setProperty('--main-color', '#FFD700');
            root.style.setProperty('--background-color', '#000');
            root.style.setProperty('--hover-text-color', '#000');
            root.style.setProperty('--hover-background-color', '#FFD700');
            root.style.setProperty('--background-gradient', 'radial-gradient(ellipse 1000% 100% at 50% 90%, transparent, #222)');
            root.style.setProperty('--scanline-gradient', 'linear-gradient(to bottom, rgba(255, 215, 0, 0), rgba(255, 215, 0, 0.1))');
            break;
        case 'ice':
            root.style.setProperty('--main-color', '#ADD8E6');
            root.style.setProperty('--background-color', '#222');
            root.style.setProperty('--hover-text-color', '#222');
            root.style.setProperty('--hover-background-color', '#ADD8E6');
            root.style.setProperty('--background-gradient', 'radial-gradient(ellipse 1000% 100% at 50% 90%, transparent, #A3D6E7)');
            root.style.setProperty('--scanline-gradient', 'linear-gradient(to bottom, rgba(173, 216, 230, 0), rgba(173, 216, 230, 0.1))');
            break;
        case 'demon':
            root.style.setProperty('--main-color', '#FF4500');
            root.style.setProperty('--background-color', '#2A0A0A');
            root.style.setProperty('--hover-text-color', '#2A0A0A');
            root.style.setProperty('--hover-background-color', '#FF4500');
            root.style.setProperty('--background-gradient', 'radial-gradient(ellipse 1000% 100% at 50% 90%, transparent, #BF2A2A)');
            root.style.setProperty('--scanline-gradient', 'linear-gradient(to bottom, rgba(255, 69, 0, 0), rgba(255, 69, 0, 0.1))');
            break;
        case 'galaxy':
            root.style.setProperty('--main-color', '#DA70D6');
            root.style.setProperty('--background-color', '#000');
            root.style.setProperty('--hover-text-color', '#000');
            root.style.setProperty('--hover-background-color', '#DA70D6');
            root.style.setProperty('--background-gradient', 'radial-gradient(ellipse 1000% 100% at 50% 90%, transparent, #4B0082)');
            root.style.setProperty('--scanline-gradient', 'linear-gradient(to bottom, rgba(218, 112, 214, 0), rgba(218, 112, 214, 0.1))');
            break;
    }
    localStorage.setItem("selectedTheme", theme); // Save theme in localStorage
}

