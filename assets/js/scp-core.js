// SCP Foundation Core JavaScript
// Contains global functionality for the SCP Foundation web application

// Theme configurations
const themes = {
    default: {
        mainColor: "#80FF80", // Green
        backgroundColor: "#131", // Dark green
        hoverTextColor: "#131",
        hoverBackgroundColor: "#90EE90",
        backgroundGradient: "radial-gradient(ellipse 1000% 100% at 50% 90%, transparent, #121)",
        scanlineGradient: "linear-gradient(to bottom, rgba(56, 112, 82,0), rgba(56, 112, 82,0.1))"
    },
    night: {
        mainColor: "#FFD700", // Gold
        backgroundColor: "#000", // Black
        hoverTextColor: "#000",
        hoverBackgroundColor: "#FFC107",
        backgroundGradient: "radial-gradient(ellipse 1000% 100% at 50% 90%, transparent, #000)",
        scanlineGradient: "linear-gradient(to bottom, rgba(112, 112, 56,0), rgba(112, 112, 56,0.1))"
    },
    ice: {
        mainColor: "#ADD8E6", // Light blue
        backgroundColor: "#222", // Dark background
        hoverTextColor: "#222",
        hoverBackgroundColor: "#87CEEB",
        backgroundGradient: "radial-gradient(ellipse 1000% 100% at 50% 90%, transparent, #113)",
        scanlineGradient: "linear-gradient(to bottom, rgba(56, 56, 112,0), rgba(56, 56, 112,0.1))"
    },
    danger: {
        mainColor: "#FF4500", // Red
        backgroundColor: "#2A0A0A", // Dark red
        hoverTextColor: "#2A0A0A",
        hoverBackgroundColor: "#FF6347",
        backgroundGradient: "radial-gradient(ellipse 1000% 100% at 50% 90%, transparent, #311)",
        scanlineGradient: "linear-gradient(to bottom, rgba(112, 56, 56,0), rgba(112, 56, 56,0.1))"
    },
    galaxy: {
        mainColor: "#DA70D6", // Purple
        backgroundColor: "#000", // Black
        hoverTextColor: "#000",
        hoverBackgroundColor: "#BA55D3",
        backgroundGradient: "radial-gradient(ellipse 1000% 100% at 50% 90%, transparent, #202)",
        scanlineGradient: "linear-gradient(to bottom, rgba(112, 56, 112,0), rgba(112, 56, 112,0.1))"
    }
};

// Apply a theme to the document
function applyTheme(themeName) {
    const theme = themes[themeName] || themes.default;
    
    // Set CSS variables
    document.documentElement.style.setProperty('--main-color', theme.mainColor);
    document.documentElement.style.setProperty('--background-color', theme.backgroundColor);
    document.documentElement.style.setProperty('--hover-text-color', theme.hoverTextColor);
    document.documentElement.style.setProperty('--hover-background-color', theme.hoverBackgroundColor);
    document.documentElement.style.setProperty('--background-gradient', theme.backgroundGradient);
    document.documentElement.style.setProperty('--scanline-gradient', theme.scanlineGradient);
    
    // Save theme choice to localStorage
    localStorage.setItem('scp-theme', themeName);
}

// Load saved theme or default
function loadSavedTheme() {
    const savedTheme = localStorage.getItem('scp-theme');
    if (savedTheme && themes[savedTheme]) {
        applyTheme(savedTheme);
    } else {
        applyTheme('default');
    }
}

// Handle loading screen functionality
function setupLoadingScreen(duration = 3000) {
    const loadingScreen = document.getElementById('loading-screen');
    const mainContent = document.getElementById('main-content');
    
    if (!loadingScreen || !mainContent) return;
    
    // Show loading screen, hide main content
    loadingScreen.style.display = 'block';
    mainContent.style.display = 'none';
    
    // After duration, hide loading screen and show main content
    setTimeout(() => {
        loadingScreen.style.display = 'none';
        mainContent.style.display = 'block';
        mainContent.classList.add('fade-in');
    }, duration);
    
    // Allow skipping the loading screen with any key
    document.addEventListener('keydown', function skipLoading(e) {
        loadingScreen.style.display = 'none';
        mainContent.style.display = 'block';
        mainContent.classList.add('fade-in');
        document.removeEventListener('keydown', skipLoading);
    });
}

// Authentication simulation
function simulateAuth() {
    return {
        personnelId: localStorage.getItem('scp-personnel-id') || "Unknown",
        clearanceLevel: localStorage.getItem('scp-clearance-level') || "Level 1",
        department: localStorage.getItem('scp-department') || "General",
        isLoggedIn: localStorage.getItem('scp-auth') === 'true'
    };
}

// Handle login
function handleLogin(personnelId, accessCode) {
    // In a real application, this would validate against a backend
    // For now, we'll accept any input and simulate successful login
    
    // Simple validation
    if (!personnelId || !accessCode) {
        return { success: false, message: "Personnel ID and Access Code are required." };
    }
    
    // Store auth info in localStorage
    localStorage.setItem('scp-auth', 'true');
    localStorage.setItem('scp-personnel-id', personnelId);
    
    // Assign random clearance level for demo
    const clearanceLevels = ["Level 1", "Level 2", "Level 3", "Level 4", "Level 5"];
    const clearance = clearanceLevels[Math.floor(Math.random() * 3) + 1]; // Random level 2-4
    localStorage.setItem('scp-clearance-level', clearance);
    
    // Assign random department
    const departments = ["Research", "Containment", "Security", "Administration", "Field"];
    const department = departments[Math.floor(Math.random() * departments.length)];
    localStorage.setItem('scp-department', department);
    
    return { 
        success: true, 
        personnelId: personnelId,
        clearanceLevel: clearance,
        department: department
    };
}

// Handle logout
function handleLogout() {
    localStorage.removeItem('scp-auth');
    localStorage.removeItem('scp-personnel-id');
    localStorage.removeItem('scp-clearance-level');
    localStorage.removeItem('scp-department');
    
    // Redirect to login page
    window.location.href = '/templates/pages/login.html';
}

// Modal handler for SCP and Personnel viewers
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'flex';
        modal.classList.add('fade-in');
        
        // Prevent body scrolling when modal is open
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        
        // Restore body scrolling
        document.body.style.overflow = 'auto';
    }
}

// Toggle Sound Effects (placeholder, would require audio implementation)
function toggleSound() {
    const soundEnabled = localStorage.getItem('scp-sound-enabled') === 'true';
    localStorage.setItem('scp-sound-enabled', (!soundEnabled).toString());
    return !soundEnabled;
}

// Handle settings dropdown toggle
function toggleSettings() {
    const dropdown = document.getElementById('settings-dropdown');
    if (dropdown) {
        dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
    }
}

// Initialize all theme-related functionality
function initThemeUI() {
    // Apply saved theme
    loadSavedTheme();
    
    // Set up theme modal functionality if present
    const themeModal = document.getElementById('theme-modal');
    const themeButton = document.getElementById('theme-button');
    const closeThemeButton = document.getElementById('close-theme-modal');
    
    if (themeModal && themeButton) {
        themeButton.addEventListener('click', () => {
            themeModal.style.display = 'flex';
            themeModal.classList.add('fade-in');
        });
    }
    
    if (themeModal && closeThemeButton) {
        closeThemeButton.addEventListener('click', () => {
            themeModal.style.display = 'none';
        });
    }
    
    // Set up all theme option buttons
    document.querySelectorAll('.theme-option').forEach(option => {
        option.addEventListener('click', () => {
            const theme = option.getAttribute('data-theme');
            if (theme) {
                applyTheme(theme);
                if (themeModal) themeModal.style.display = 'none';
            }
        });
    });
}

// Document ready function
function docReady(fn) {
    if (document.readyState === "complete" || document.readyState === "interactive") {
        setTimeout(fn, 1);
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}

// Initialize everything when document is ready
docReady(() => {
    // Load saved theme
    loadSavedTheme();
    
    // Set up theme UI
    initThemeUI();
    
    // Setup settings dropdown toggle if present
    const settingsIcon = document.getElementById('settings-icon');
    if (settingsIcon) {
        settingsIcon.addEventListener('click', toggleSettings);
    }
    
    // Close settings when clicking elsewhere
    document.addEventListener('click', (e) => {
        const dropdown = document.getElementById('settings-dropdown');
        const settingsIcon = document.getElementById('settings-icon');
        
        if (dropdown && settingsIcon && 
            !dropdown.contains(e.target) && 
            e.target !== settingsIcon) {
            dropdown.style.display = 'none';
        }
    });
    
    // Setup loading screen if present
    setupLoadingScreen();
}); 