/**
 * SCP Foundation Authentication System
 * Handles user login and authentication
 */

// Known personnel credentials
const knownCredentials = {
    // Real personnel with clearance
    "O5-963": {
        id: "O5-963",
        name: "Dr. Jack Bright",
        clearanceLevel: "Level 4", 
        accessCode: "O5-963", 
        redirectUrl: "dashboard.html"
    },
    "Research Director-031": {
        id: "Research Director-031",
        name: "Dr. Alto Clef",
        clearanceLevel: "Level 4",
        accessCode: "Research Director-031",
        redirectUrl: "dashboard.html"
    }
};

// Load personnel data from JSON files
async function loadPersonnelData() {
    try {
        // Load Dr. Bright's data
        const brightResponse = await fetch('../../data/personnel/dr_bright.json');
        const brightData = await brightResponse.json();
        
        // Load Dr. Clef's data
        const clefResponse = await fetch('../../data/personnel/dr_clef.json');
        const clefData = await clefResponse.json();
        
        // Update knownCredentials with data from JSON files
        if (brightData && brightData.id && brightData.access_code) {
            knownCredentials[brightData.id] = {
                id: brightData.id,
                name: brightData.name,
                clearanceLevel: brightData.clearance_level,
                accessCode: brightData.access_code,
                redirectUrl: "dashboard.html"
            };
        }
        
        if (clefData && clefData.id && clefData.access_code) {
            knownCredentials[clefData.id] = {
                id: clefData.id,
                name: clefData.name,
                clearanceLevel: clefData.clearance_level,
                accessCode: clefData.access_code,
                redirectUrl: "dashboard.html"
            };
        }
        
        console.log("Personnel data loaded successfully");
    } catch (error) {
        console.error("Error loading personnel data:", error);
    }
}

// Authenticate user based on credentials
function authenticateUser(personnelId, accessCode) {
    // Check if personnel ID exists
    if (knownCredentials.hasOwnProperty(personnelId)) {
        const userData = knownCredentials[personnelId];
        
        // Check if access code matches
        if (userData.accessCode === accessCode) {
            // Store authentication data in session storage
            sessionStorage.setItem('scp_auth', JSON.stringify({
                id: userData.id,
                name: userData.name,
                clearanceLevel: userData.clearanceLevel,
                authenticated: true,
                timestamp: Date.now()
            }));
            
            return {
                success: true,
                redirectUrl: userData.redirectUrl,
                name: userData.name
            };
        } else {
            // Wrong access code
            return {
                success: false,
                message: "Invalid access code for personnel ID " + personnelId
            };
        }
    }
    
    // Personnel ID not found
    return {
        success: false,
        message: "Personnel ID not found in database. Please check credentials."
    };
}

// Check if user is already authenticated
function checkAuthentication() {
    const authData = sessionStorage.getItem('scp_auth');
    if (authData) {
        try {
            const auth = JSON.parse(authData);
            // Check if authentication is still valid (you could add expiration logic here)
            if (auth.authenticated && auth.timestamp) {
                return auth;
            }
        } catch (e) {
            console.error("Error parsing authentication data");
        }
    }
    return null;
}

// Handle logout
function logoutUser() {
    sessionStorage.removeItem('scp_auth');
    window.location.href = '../../index.html';
}

// Initialize authentication handlers when document is ready
document.addEventListener('DOMContentLoaded', function() {
    // Load personnel data
    loadPersonnelData();
    
    // Check if already authenticated
    const authData = checkAuthentication();
    if (authData) {
        // Already logged in - redirect to appropriate page
        if (window.location.href.includes('login.html')) {
            window.location.href = 'dashboard.html';
        }
    }
    
    // Handle login form if it exists
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const personnelId = document.getElementById('personnel-id').value;
            const accessCode = document.getElementById('access-code').value;
            
            if (personnelId && accessCode) {
                // Simulate processing
                const submitButton = e.target.querySelector('button[type="submit"]');
                submitButton.textContent = "Verifying...";
                submitButton.disabled = true;
                
                // Clear previous error messages
                const errorMessage = document.getElementById('error-message');
                if (errorMessage) {
                    errorMessage.style.display = 'none';
                }
                
                // Simulate server processing delay
                setTimeout(function() {
                    const authResult = authenticateUser(personnelId, accessCode);
                    
                    if (authResult.success) {
                        // Show success message
                        submitButton.textContent = "Authenticated!";
                        submitButton.style.backgroundColor = "var(--main-color)";
                        submitButton.style.color = "var(--background-color)";
                        
                        // Add success message
                        if (errorMessage) {
                            errorMessage.style.display = 'block';
                            errorMessage.textContent = `Authentication successful. Welcome, ${authResult.name}!`;
                            errorMessage.style.color = 'var(--main-color)';
                            errorMessage.style.borderColor = 'var(--main-color)';
                            errorMessage.style.backgroundColor = 'rgba(128, 255, 128, 0.1)';
                        }
                        
                        // Redirect after a short delay
                        setTimeout(function() {
                            window.location.href = authResult.redirectUrl;
                        }, 1500);
                    } else {
                        // Show error message
                        if (errorMessage) {
                            errorMessage.style.display = 'block';
                            errorMessage.textContent = authResult.message || "Authentication failed. Invalid credentials.";
                            errorMessage.style.color = 'var(--error-color)';
                            errorMessage.style.borderColor = 'var(--error-color)';
                            errorMessage.style.backgroundColor = 'rgba(255, 0, 0, 0.1)';
                        }
                        submitButton.textContent = "Authenticate";
                        submitButton.disabled = false;
                        
                        // Clear password field
                        document.getElementById('access-code').value = '';
                    }
                }, 1500);
            }
        });
    }
    
    // Handle logout button if it exists
    const logoutButton = document.getElementById('logout-button');
    if (logoutButton) {
        logoutButton.addEventListener('click', function(e) {
            e.preventDefault();
            logoutUser();
        });
    }
    
    // Set up terminal typers to complete sequentially
    const typers = document.querySelectorAll('terminal-typer');
    if (typers.length > 0) {
        let currentTyperIndex = 0;
        
        // Start the first typer
        typers[0].start();
        
        // Set up event listeners for completion
        typers.forEach((typer, index) => {
            typer.addEventListener('typing-complete', () => {
                currentTyperIndex++;
                
                // Start the next typer if available
                if (currentTyperIndex < typers.length) {
                    setTimeout(() => {
                        typers[currentTyperIndex].start();
                    }, 500); // Half-second pause between typers
                }
                
                // If all typing is complete, show the form
                if (currentTyperIndex >= typers.length) {
                    document.getElementById('login-section').classList.add('fade-in');
                    document.getElementById('login-section').style.display = 'block';
                }
            });
        });
    }
    
    // Skip button functionality
    const skipButton = document.getElementById('skip-intro');
    if (skipButton) {
        skipButton.addEventListener('click', () => {
            // Stop all typers and show form immediately
            typers.forEach(typer => {
                typer.complete();
            });
            
            document.getElementById('login-section').classList.add('fade-in');
            document.getElementById('login-section').style.display = 'block';
        });
    }
}); 