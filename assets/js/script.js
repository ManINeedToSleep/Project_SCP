/**
 * SCP Foundation - Main JavaScript
 * Handles common functionality across the site 
 */

let web_location = window.location.href


document.addEventListener("DOMContentLoaded", function() {
    var loadingScreen = document.getElementById('loading-screen');
    var mainContent = document.getElementById('main-content');
    
    if (loadingScreen && mainContent) {
        setTimeout(function() {
            loadingScreen.style.display = 'none'; // Hide the loading screen
            mainContent.style.display = 'block';  // Show the main content
        }, 5000); // 5 seconds delay
    }
});

document.addEventListener("DOMContentLoaded", function() {
    var loadingScreen = document.getElementById('other-screen');
    var mainContent = document.getElementById('main-content');
    
    if (loadingScreen && mainContent) {
        setTimeout(function() {
            loadingScreen.style.display = 'none'; // Hide the loading screen
            mainContent.style.display = 'block';  // Show the main content
        }, 0);
    }
});

document.addEventListener("DOMContentLoaded", function() {
    //reapply themes to other webpages
    console.log(localStorage.getItem("selectedTheme"))
    if (web_location != "http://127.0.0.1:5501/mainpage.html") {
        applyTheme(localStorage.getItem("selectedTheme"));
    }
    
});

// Tied to HTML Login and User Password Change
const validateLogin = (event) => {
    event.preventDefault(); // Prevent form submission

    const username = document.getElementById('username');
    const password = document.getElementById('password');
    const errorMessage = document.getElementById('error-message');

    if (!username || !password) return;

    // Get credentials from localStorage or use default ones
    const correctUsername = localStorage.getItem('username') || 'Dr.Bright963';
    const correctPassword = localStorage.getItem('password') || 'DrBr1ght1sC00L';

    if (username.value === correctUsername && password.value === correctPassword) {
        window.location.href = 'mainpage.html'; // Redirect to main page
    } else {
        if (errorMessage) errorMessage.style.display = 'block'; // Show error message
    }
};

// Gear icon click event
document.addEventListener("DOMContentLoaded", function() {
    const gearIcon = document.getElementById('gear-icon');
    const dropdown = document.getElementById('dropdown');

    if (gearIcon && dropdown) {
        gearIcon.addEventListener('click', () => {
            dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none'; // Toggle dropdown visibility
        });

        // Hide dropdown if clicked outside
        document.addEventListener('click', (event) => {
            if (!gearIcon.contains(event.target) && !dropdown.contains(event.target)) {
                dropdown.style.display = 'none'; // Hide dropdown
            }
        });
    }
});

// Theme selection functionality
document.addEventListener("DOMContentLoaded", function() {
    const themeButton = document.getElementById('theme-button');
    const themeModal = document.getElementById('theme-modal');
    const themeOptions = document.querySelectorAll('.theme-option');

    // Load theme from localStorage
    const storedTheme = localStorage.getItem("selectedTheme");
    if (storedTheme) {
        applyTheme(storedTheme);
    }
    
    if (themeButton && themeModal) {
        themeButton.addEventListener('click', function() {
            themeModal.style.display = 'flex'; // Show modal
        });
    }
    
    if (themeOptions.length > 0 && themeModal) {
        themeOptions.forEach(option => {
            option.addEventListener("click", () => {
                applyTheme(option.getAttribute("data-theme"));
                themeModal.style.display = "none"; // Hide modal after selection
            });
        });
    }
});

document.addEventListener("DOMContentLoaded", function() {
    if (web_location != "http://127.0.0.1:5501/SCP096.html") {
        const notesToggle = document.getElementById('notes-toggle');
        const notesList = document.getElementById('notes-list');

        if (notesToggle && notesList) {
            notesToggle.addEventListener('click', function() {
                if (notesList.style.display === 'none') {
                    notesList.style.display = 'block'; // Show the notes list
                } else {
                    notesList.style.display = 'none'; // Hide the notes list
                }
            });
        }
    }
});

// Simulate authentication
function simulateAuth() {
    // Check for existing auth data in session storage
    const authData = JSON.parse(sessionStorage.getItem('scp_auth') || '{}');
    
    // Return default values if no auth data exists
    if (!authData.isLoggedIn) {
        // Create random personnel ID if none exists
        const personnelId = 'P-' + Math.floor(10000 + Math.random() * 90000);
        
        // Default values
        return {
            isLoggedIn: true,
            name: 'Researcher',
            personnelId: personnelId,
            clearanceLevel: 'Level 4',
            department: 'Research',
            loginTime: new Date().toISOString()
        };
    }
    
    return authData;
}

// Handle logout
function handleLogout() {
    // Clear auth data from session storage
    sessionStorage.removeItem('scp_auth');
    
    // Redirect to login page
    window.location.href = "/templates/pages/login.html";
}

// Handle login
function handleLogin(username, password, clearanceLevel) {
    // In a real application, this would verify credentials against a server
    // Here we just simulate a successful login
    
    // Create a personnel ID based on the username
    const personnelId = 'P-' + Math.floor(10000 + Math.random() * 90000);
    
    // Create auth data
    const authData = {
        isLoggedIn: true,
        name: username || 'Researcher',
        personnelId: personnelId,
        clearanceLevel: clearanceLevel || 'Level 4',
        department: 'Research',
        loginTime: new Date().toISOString()
    };
    
    // Store auth data in session storage
    sessionStorage.setItem('scp_auth', JSON.stringify(authData));
    
    // Return success
    return true;
}

// Apply theme function for consistent themes across pages
function applyTheme(theme) {
    const root = document.documentElement;
    
    // Store the theme preference
    localStorage.setItem('selectedTheme', theme);
    
    // Apply theme-specific CSS variables
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
            root.style.setProperty('--main-color', '#00CFFF');
            root.style.setProperty('--background-color', '#001');
            root.style.setProperty('--hover-text-color', '#001');
            root.style.setProperty('--hover-background-color', '#00CFFF');
            root.style.setProperty('--background-gradient', 'radial-gradient(ellipse 1000% 100% at 50% 90%, transparent, #001)');
            break;
            
        case 'ice':
            root.style.setProperty('--main-color', '#AADEE6');
            root.style.setProperty('--background-color', '#0A1D29');
            root.style.setProperty('--hover-text-color', '#0A1D29');
            root.style.setProperty('--hover-background-color', '#AADEE6');
            root.style.setProperty('--background-gradient', 'radial-gradient(ellipse 1000% 100% at 50% 90%, transparent, #071520)');
            break;
            
        case 'demon':
            root.style.setProperty('--main-color', '#FF5050');
            root.style.setProperty('--background-color', '#240000');
            root.style.setProperty('--hover-text-color', '#240000');
            root.style.setProperty('--hover-background-color', '#FF5050');
            root.style.setProperty('--background-gradient', 'radial-gradient(ellipse 1000% 100% at 50% 90%, transparent, #1A0000)');
            break;
            
        case 'galaxy':
            root.style.setProperty('--main-color', '#C576F6');
            root.style.setProperty('--background-color', '#12001F');
            root.style.setProperty('--hover-text-color', '#12001F');
            root.style.setProperty('--hover-background-color', '#C576F6');
            root.style.setProperty('--background-gradient', 'radial-gradient(ellipse 1000% 100% at 50% 90%, transparent, #0C0017)');
            break;
    }
}

// Load saved theme on page load
document.addEventListener('DOMContentLoaded', function() {
    const savedTheme = localStorage.getItem('selectedTheme');
    if (savedTheme) {
        applyTheme(savedTheme);
    }
    
    // Check for login status
    const auth = simulateAuth();
    
    // If on login page and already logged in, redirect to dashboard
    if (window.location.href.includes('login.html') && auth.isLoggedIn) {
        window.location.href = "/templates/pages/dashboard.html";
    }
    
    // If not on login page and not logged in, redirect to login
    if (!window.location.href.includes('login.html') && !auth.isLoggedIn) {
        window.location.href = "/templates/pages/login.html";
    }
});

// Load the current username for reference and set up event handlers
document.addEventListener("DOMContentLoaded", function() {
    const newUsernameField = document.getElementById('new-username');
    if (newUsernameField) {
        const storedUsername = localStorage.getItem('username') || 'Dr.Bright963';
        newUsernameField.value = storedUsername;
    }
    
    const changeForm = document.getElementById('credentials-form');
    if (changeForm) {
        changeForm.addEventListener('submit', changeCredentials);
    }
});

function changeCredentials(event) {
    event.preventDefault();

    const newUsername = document.getElementById('new-username');
    const newPassword = document.getElementById('new-password');
    const errorMessage = document.getElementById('error-message');
    const confirmationMessage = document.getElementById('confirmation-message');

    if (!newUsername || !newPassword) return false;

    // Check for minimum 4 characters
    if (newUsername.value.length < 4 || newPassword.value.length < 4) {
        if (errorMessage) errorMessage.style.display = 'block';
        if (confirmationMessage) confirmationMessage.style.display = 'none';
        return false;
    }

    // Save credentials if valid
    localStorage.setItem('username', newUsername.value);
    localStorage.setItem('password', newPassword.value);

    if (errorMessage) errorMessage.style.display = 'none';
    if (confirmationMessage) confirmationMessage.style.display = 'block';
}
