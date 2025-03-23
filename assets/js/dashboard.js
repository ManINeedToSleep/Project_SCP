// SCP Foundation - Dashboard JavaScript

// Sample data for testing - In a real application, this would come from a server/API
const scpData = [
    {
        id: "SCP-173",
        name: "The Sculpture",
        objectClass: "Euclid",
        containmentLevel: 2,
        description: "The statue is constructed from concrete and rebar with traces of Krylon brand spray paint...",
        briefing: "SCP-173 is animate and extremely hostile. Object cannot move while within direct line of sight...",
        clearanceRequired: "Level 2"
    },
    {
        id: "SCP-096",
        name: "The Shy Guy",
        objectClass: "Euclid",
        containmentLevel: 3,
        description: "A humanoid creature that measures approximately 2.38 meters in height...",
        briefing: "SCP-096 is normally extremely docile. However, when someone views its face...",
        clearanceRequired: "Level 3"
    },
    {
        id: "SCP-049",
        name: "Plague Doctor",
        objectClass: "Euclid",
        containmentLevel: 2,
        description: "A humanoid entity that appears to be wearing the garments of a medieval plague doctor...",
        briefing: "SCP-049 is capable of causing death through physical contact...",
        clearanceRequired: "Level 2"
    },
    {
        id: "SCP-682",
        name: "Hard-to-Destroy Reptile",
        objectClass: "Keter",
        containmentLevel: 5,
        description: "A large, vaguely reptile-like creature of unknown origin...",
        briefing: "SCP-682 is extremely hostile to all forms of life and has expressed desire to kill all life...",
        clearanceRequired: "Level 4"
    },
    {
        id: "SCP-106",
        name: "The Old Man",
        objectClass: "Keter",
        containmentLevel: 4,
        description: "An elderly humanoid with a general appearance of advanced decomposition...",
        briefing: "SCP-106 causes a 'corrosion' effect in all solid matter it touches...",
        clearanceRequired: "Level 3"
    },
    {
        id: "SCP-1048",
        name: "Builder Bear",
        objectClass: "Keter",
        containmentLevel: 3,
        description: "A teddy bear able to move of its own accord...",
        briefing: "SCP-1048 is capable of constructing crude replicas of itself using various materials...",
        clearanceRequired: "Level 2"
    },
    {
        id: "SCP-3008",
        name: "A Perfectly Normal, Regular Old IKEA",
        objectClass: "Euclid",
        containmentLevel: 3,
        description: "A retail store that has shown spatial properties inconsistent with normal environments...",
        briefing: "The internal space of SCP-3008 appears to be significantly larger than its external dimensions...",
        clearanceRequired: "Level 2"
    },
    {
        id: "SCP-999",
        name: "The Tickle Monster",
        objectClass: "Safe",
        containmentLevel: 1,
        description: "A large, amorphous, gelatinous mass of translucent orange slime...",
        briefing: "SCP-999 is completely harmless and seems to enjoy the company of humans...",
        clearanceRequired: "Level 1"
    }
];

// Sample personnel data
const personnelData = [
    {
        id: "P-10294",
        name: "Dr. Samantha Carter",
        position: "Senior Researcher",
        department: "Research",
        clearanceLevel: "Level 4",
        status: "Active",
        specialization: "Biological anomalies, Containment procedures",
        clearanceRequired: "Level 3"
    },
    {
        id: "P-45632",
        name: "Agent Michael Torres",
        position: "Field Agent",
        department: "Mobile Task Force Epsilon-11",
        clearanceLevel: "Level 3",
        status: "Active",
        specialization: "Combat, Retrieval operations",
        clearanceRequired: "Level 2"
    },
    {
        id: "P-20183",
        name: "Dr. James Wilson",
        position: "Research Director",
        department: "Research",
        clearanceLevel: "Level 5",
        status: "Active",
        specialization: "Theoretical physics, Reality bending phenomena",
        clearanceRequired: "Level 4"
    },
    {
        id: "P-67129",
        name: "Security Officer Alex Mercer",
        position: "Senior Guard",
        department: "Security",
        clearanceLevel: "Level 2",
        status: "Active",
        specialization: "Perimeter security, Containment protocols",
        clearanceRequired: "Level 1"
    },
    {
        id: "P-83021",
        name: "Dr. Elizabeth Chen",
        position: "Containment Specialist",
        department: "Containment",
        clearanceLevel: "Level 4",
        status: "Active",
        specialization: "Keter-class containment, Emergency protocols",
        clearanceRequired: "Level 3"
    }
];

// Sample MTF data
const mtfData = [
    {
        id: "alpha-1",
        designation: "Alpha-1",
        name: "Red Right Hand",
        specialization: "Direct action on behalf of the O5 Council",
        status: "Active", 
        clearanceRequired: "Level 4"
    },
    {
        id: "epsilon-11",
        designation: "Epsilon-11",
        name: "Nine-Tailed Fox",
        specialization: "Security and containment of Foundation facilities during breach events",
        status: "Active",
        clearanceRequired: "Level 3"
    },
    {
        id: "nu-7",
        designation: "Nu-7",
        name: "Hammer Down",
        specialization: "Heavy combat operations against Groups of Interest and SCPs",
        status: "Active",
        clearanceRequired: "Level 3"
    },
    {
        id: "beta-7",
        designation: "Beta-7",
        name: "Maz Hatters",
        specialization: "Hazardous materials and anomalies",
        status: "Active",
        clearanceRequired: "Level 2"
    },
    {
        id: "delta-5",
        designation: "Delta-5",
        name: "Front Runners",
        specialization: "Reconnaissance and advance scouting",
        status: "Active",
        clearanceRequired: "Level 2"
    }
];

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
    
    // Load SCPs based on user's clearance level
    loadSCPs(auth.clearanceLevel);
    
    // Load personnel based on user's clearance level
    loadPersonnel(auth.clearanceLevel);
    
    // Load MTFs based on user's clearance level
    loadMTFs(auth.clearanceLevel);
    
    // Set up navigation
    setupNavigation();
    
    // Setup modal close buttons
    setupModals();
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

// Load SCPs based on user's clearance level
function loadSCPs(clearanceLevel) {
    const scpTableBody = document.getElementById('scp-table-body');
    if (!scpTableBody) return;
    
    // Clear existing content
    scpTableBody.innerHTML = '';
    
    // Get numeric level from string (e.g., "Level 3" -> 3)
    const userLevel = parseInt(clearanceLevel.replace('Level ', ''));
    
    // Filter SCPs based on user's clearance level
    const accessibleSCPs = scpData.filter(scp => {
        const requiredLevel = parseInt(scp.clearanceRequired.replace('Level ', ''));
        return userLevel >= requiredLevel;
    });
    
    // Display message if no SCPs are accessible
    if (accessibleSCPs.length === 0) {
        scpTableBody.innerHTML = `
            <tr>
                <td colspan="5" class="info">No SCP entries available for your clearance level.</td>
            </tr>
        `;
        return;
    }
    
    // Create table rows for each accessible SCP
    accessibleSCPs.forEach(scp => {
        const row = document.createElement('tr');
        
        // Determine class for object class display
        const classColorClass = `class-${scp.objectClass.toLowerCase()}`;
        
        row.innerHTML = `
            <td>${scp.id}</td>
            <td>${scp.name}</td>
            <td class="${classColorClass}">${scp.objectClass}</td>
            <td>${scp.clearanceRequired}</td>
            <td>
                <button class="view-button" data-scp-id="${scp.id}">View File</button>
            </td>
        `;
        
        scpTableBody.appendChild(row);
    });
    
    // Add event listeners to view buttons
    document.querySelectorAll('.view-button[data-scp-id]').forEach(button => {
        button.addEventListener('click', function() {
            const scpId = this.getAttribute('data-scp-id');
            openSCPModal(scpId);
        });
    });
}

// Load personnel based on user's clearance level
function loadPersonnel(clearanceLevel) {
    const personnelTableBody = document.getElementById('personnel-table-body');
    if (!personnelTableBody) return;
    
    // Clear existing content
    personnelTableBody.innerHTML = '';
    
    // Get numeric level from string (e.g., "Level 3" -> 3)
    const userLevel = parseInt(clearanceLevel.replace('Level ', ''));
    
    // Use PersonnelDataStore if available, otherwise fall back to sample data
    let accessiblePersonnel = [];
    
    if (typeof PersonnelDataStore !== 'undefined') {
        // Use getPersonnelByClearance function from personnel-data.js
        accessiblePersonnel = getPersonnelByClearance(userLevel);
    } else {
        // Fall back to sample data if PersonnelDataStore is not available
        accessiblePersonnel = personnelData.filter(person => {
            const requiredLevel = parseInt(person.clearanceRequired.replace('Level ', ''));
            return userLevel >= requiredLevel;
        });
    }
    
    // Display message if no personnel are accessible
    if (accessiblePersonnel.length === 0) {
        personnelTableBody.innerHTML = `
            <tr>
                <td colspan="5" class="info">No personnel files available for your clearance level.</td>
            </tr>
        `;
        return;
    }
    
    // Create table rows for each accessible personnel
    accessiblePersonnel.forEach(person => {
        const row = document.createElement('tr');
        
        // Determine status class
        const statusClass = `status-${person.status.toLowerCase()}`;
        
        row.innerHTML = `
            <td>${person.id}</td>
            <td>${person.name}</td>
            <td>${person.position}</td>
            <td class="${statusClass}">${person.status}</td>
            <td>
                <button class="view-button" data-personnel-id="${person.id}">View File</button>
            </td>
        `;
        
        personnelTableBody.appendChild(row);
    });
    
    // Add event listeners to view buttons
    document.querySelectorAll('.view-button[data-personnel-id]').forEach(button => {
        button.addEventListener('click', function() {
            const personnelId = this.getAttribute('data-personnel-id');
            openPersonnelModal(personnelId);
        });
    });
}

// Load MTFs based on user's clearance level
function loadMTFs(clearanceLevel) {
    const mtfTableBody = document.getElementById('mtf-table-body');
    if (!mtfTableBody) return;
    
    // Clear existing content
    mtfTableBody.innerHTML = '';
    
    // Get numeric level from string (e.g., "Level 3" -> 3)
    const userLevel = parseInt(clearanceLevel.replace('Level ', ''));
    
    // Filter MTFs based on user's clearance level
    const accessibleMTFs = mtfData.filter(mtf => {
        const requiredLevel = parseInt(mtf.clearanceRequired.replace('Level ', ''));
        return userLevel >= requiredLevel;
    });
    
    // Display message if no MTFs are accessible
    if (accessibleMTFs.length === 0) {
        mtfTableBody.innerHTML = `
            <tr>
                <td colspan="5" class="info">No MTF entries available for your clearance level.</td>
            </tr>
        `;
        return;
    }
    
    // Create table rows for each accessible MTF
    accessibleMTFs.forEach(mtf => {
        const row = document.createElement('tr');
        
        // Determine class for status display
        const statusColorClass = `status-${mtf.status.toLowerCase()}`;
        
        row.innerHTML = `
            <td>${mtf.designation}</td>
            <td>"${mtf.name}"</td>
            <td>${mtf.specialization}</td>
            <td class="${statusColorClass}">${mtf.status}</td>
            <td>
                <button class="view-button" data-mtf-id="${mtf.id}">View File</button>
            </td>
        `;
        
        mtfTableBody.appendChild(row);
    });
    
    // Add event listeners to view buttons
    document.querySelectorAll('.view-button[data-mtf-id]').forEach(button => {
        button.addEventListener('click', function() {
            const mtfId = this.getAttribute('data-mtf-id');
            openMTFModal(mtfId);
        });
    });
}

// Setup navigation between sections
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.dashboard-section');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('data-target');
            
            // Hide all sections
            sections.forEach(section => {
                section.style.display = 'none';
            });
            
            // Show target section
            document.getElementById(targetId).style.display = 'block';
            
            // Update active nav link
            navLinks.forEach(navLink => {
                navLink.classList.remove('active-nav');
            });
            this.classList.add('active-nav');
        });
    });
    
    // Set default active section
    navLinks[0].click();
}

// Setup modal functionality
function setupModals() {
    // Setup SCP modal close button
    const scpCloseButton = document.getElementById('close-scp-modal');
    if (scpCloseButton) {
        scpCloseButton.addEventListener('click', function() {
            closeModal('scp-modal');
        });
    }
    
    // Setup personnel modal close button
    const personnelCloseButton = document.getElementById('close-personnel-modal');
    if (personnelCloseButton) {
        personnelCloseButton.addEventListener('click', function() {
            closeModal('personnel-modal');
        });
    }
    
    // Setup MTF modal close button
    const mtfCloseButton = document.getElementById('close-mtf-modal');
    if (mtfCloseButton) {
        mtfCloseButton.addEventListener('click', function() {
            closeModal('mtf-modal');
        });
    }
    
    // Close modals when clicking outside content
    window.addEventListener('click', function(e) {
        const scpModal = document.getElementById('scp-modal');
        const personnelModal = document.getElementById('personnel-modal');
        const mtfModal = document.getElementById('mtf-modal');
        
        if (e.target === scpModal) {
            closeModal('scp-modal');
        }
        
        if (e.target === personnelModal) {
            closeModal('personnel-modal');
        }
        
        if (e.target === mtfModal) {
            closeModal('mtf-modal');
        }
    });
}

// Open SCP modal with specific SCP data
function openSCPModal(scpId) {
    // Find the SCP data
    const scp = scpData.find(s => s.id === scpId);
    if (!scp) return;
    
    // Get the SCP viewer element
    const scpViewer = document.querySelector('scp-viewer');
    if (scpViewer) {
        // Set the SCP ID attribute to load data
        scpViewer.setAttribute('scp-id', scpId);
    }
    
    // Open the modal
    openModal('scp-modal');
}

// Open personnel modal with specific personnel data
function openPersonnelModal(personnelId) {
    // Get the personnel file element
    const personnelFile = document.querySelector('personnel-file');
    if (personnelFile) {
        // Set the personnel ID attribute to load data
        personnelFile.setAttribute('personnel-id', personnelId);
    }
    
    // Open the modal
    openModal('personnel-modal');
}

// Open MTF modal with specific MTF data
function openMTFModal(mtfId) {
    // Get the MTF viewer element
    const mtfViewer = document.querySelector('mtf-viewer');
    if (mtfViewer) {
        // Set the MTF ID attribute to load data
        mtfViewer.setAttribute('mtf-id', mtfId);
    }
    
    // Open the modal
    openModal('mtf-modal');
}

// Function to handle logout
function logout() {
    // Call the handleLogout function from scp-core.js
    handleLogout();
} 