// SCP Foundation - Terminal Page JavaScript

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    const auth = simulateAuth();
    if (!auth.isLoggedIn) {
        // Redirect to login page if not logged in
        window.location.href = "/templates/pages/login.html";
        return;
    }
    
    // Display user information
    displayUserInfo(auth);
    
    // Set up the terminal
    setupTerminal(auth);
});

// Display user information in the header
function displayUserInfo(auth) {
    const userInfoElement = document.getElementById('user-info');
    if (userInfoElement) {
        userInfoElement.innerHTML = `
            <strong>ID:</strong> ${auth.personnelId} | 
            <strong>Clearance:</strong> ${auth.clearanceLevel} | 
            <strong>Department:</strong> ${auth.department}
        `;
    }
}

// Setup the terminal with user-specific data
function setupTerminal(auth) {
    const terminal = document.querySelector('terminal-console');
    if (!terminal) return;
    
    // Set the user for the terminal
    terminal.setAttribute('user', auth.personnelId);
    terminal.setAttribute('clearance', auth.clearanceLevel);
    
    // Add some specialized files based on the user's department and clearance
    if (auth.department === "Research") {
        terminal.addFile("research_notes.txt", "RESEARCH NOTES: Current experiments with SCP-914 show promising results. Further testing required.", "Level 2");
    }
    
    if (auth.department === "Security") {
        terminal.addFile("security_protocols.txt", "SECURITY ALERT: MTF Epsilon-11 has been dispatched to Site-19 due to containment breach.", "Level 2");
    }
    
    if (auth.department === "Containment") {
        terminal.addFile("containment_status.txt", "CONTAINMENT UPDATE: SCP-106 successfully recontained using the Femur Breaker procedure.", "Level 3");
    }
    
    if (auth.department === "Administration") {
        terminal.addFile("budget_report.txt", "BUDGET REPORT: Funds for Site-19 have been increased by 15% following recent containment breaches.", "Level 3");
    }
    
    const clearanceLevel = parseInt(auth.clearanceLevel.replace("Level ", ""));
    
    // Add classified documents based on clearance level
    if (clearanceLevel >= 3) {
        terminal.addFile("incident_report_096.txt", "INCIDENT REPORT: Four personnel deceased after accidental viewing of SCP-096's face. New containment procedures implemented.", "Level 3");
    }
    
    if (clearanceLevel >= 4) {
        terminal.addFile("overseer_directive.txt", "OVERSEER DIRECTIVE: All information regarding SCP-001 proposals is to remain strictly classified.", "Level 4");
        terminal.addFile("ethics_committee.txt", "ETHICS COMMITTEE RULING: Termination of D-Class personnel after monthly cycle is suspended indefinitely.", "Level 4");
    }
}

// Function to handle terminal page navigation
function navigateToDashboard() {
    window.location.href = "/templates/pages/dashboard.html";
}

// Function to handle logout
function logout() {
    // Call the handleLogout function from scp-core.js
    handleLogout();
} 