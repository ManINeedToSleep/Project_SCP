/**
 * SCP Foundation Database Loader
 * Responsible for dynamically loading SCP data from JSON files
 */

class SCPDatabase {
    constructor() {
        this.scps = {};
        this.personnel = {};
        this.clearanceLevels = {
            "Level 1": { description: "Confidential", allowedSCPs: ["Safe"] },
            "Level 2": { description: "Restricted", allowedSCPs: ["Safe", "Euclid"] },
            "Level 3": { description: "Secret", allowedSCPs: ["Safe", "Euclid", "Keter"] },
            "Level 4": { description: "Top Secret", allowedSCPs: ["Safe", "Euclid", "Keter", "Thaumiel"] },
            "Level 5": { description: "O5 Command", allowedSCPs: ["Safe", "Euclid", "Keter", "Thaumiel", "Apollyon"] }
        };
        this.userClearance = "Level 1";
    }

    /**
     * Initialize the database by loading all SCP and personnel data
     */
    async initialize() {
        try {
            // Check for stored user clearance level
            const storedClearance = localStorage.getItem('clearanceLevel');
            if (storedClearance) {
                this.userClearance = storedClearance;
            }
            
            // Check for user clearance in session storage (from login)
            const authData = JSON.parse(sessionStorage.getItem('scp_auth') || '{}');
            if (authData && authData.clearanceLevel) {
                this.userClearance = authData.clearanceLevel;
            }

            // Load SCP data
            await this.loadSCPData();
            
            // Load Personnel data
            await this.loadPersonnelData();
            
            console.log("SCP Database initialized successfully");
            return true;
        } catch (error) {
            console.error("Error initializing SCP Database:", error);
            return false;
        }
    }

    /**
     * Load SCP data from SCPDataStore in scp-data.js
     */
    async loadSCPData() {
        try {
            // Check if SCPDataStore is available (from scp-data.js)
            if (typeof SCPDataStore !== 'undefined') {
                // Convert SCPDataStore data format to our internal format
                for (const scpId in SCPDataStore) {
                    const scpData = SCPDataStore[scpId];
                    const normalizedId = scpId.toLowerCase().replace(/[- ]/g, '');
                    
                    this.scps[normalizedId] = {
                        item: scpData.id || scpId,
                        object_class: scpData.objectClass || "Unknown",
                        containment_procedures: scpData.specialContainmentProcedures || "",
                        description: scpData.description || "",
                        clearance_required: scpData.clearanceRequired || "Level 1"
                    };
                }
                console.log(`Loaded ${Object.keys(this.scps).length} SCPs from SCPDataStore`);
            } else {
                // Fallback to loading from JSON files
                const scpIds = ['scp049', 'scp096', 'scp173'];
                
                for (const id of scpIds) {
                    try {
                        const response = await fetch(`/data/scps/${id}.json`);
                        if (response.ok) {
                            const data = await response.json();
                            this.scps[id] = data;
                        }
                    } catch (error) {
                        console.error(`Error loading ${id} data:`, error);
                    }
                }
            }
        } catch (error) {
            console.error("Error in loadSCPData:", error);
        }
    }

    /**
     * Load personnel data from JSON files
     */
    async loadPersonnelData() {
        try {
            // Check if PersonnelDataStore is available (from personnel-data.js)
            if (typeof PersonnelDataStore !== 'undefined') {
                // Convert PersonnelDataStore data format to our internal format
                for (const personnelId in PersonnelDataStore) {
                    const personnelData = PersonnelDataStore[personnelId];
                    this.personnel[personnelId.toLowerCase()] = personnelData;
                }
                console.log(`Loaded ${Object.keys(this.personnel).length} personnel from PersonnelDataStore`);
                return;
            }
            
            // Fallback to loading from JSON files
            const personnelIds = ['dr_bright', 'dr_clef'];
            
            for (const id of personnelIds) {
                try {
                    const response = await fetch(`/data/personnel/${id}.json`);
                    if (response.ok) {
                        const data = await response.json();
                        this.personnel[id] = data;
                    }
                } catch (error) {
                    console.error(`Error loading ${id} data:`, error);
                }
            }
        } catch (error) {
            console.error("Error in loadPersonnelData:", error);
        }
    }

    /**
     * Get SCP data by ID
     * @param {string} scpId - The ID of the SCP (e.g., 'scp096')
     * @returns {Object|null} - The SCP data or null if not found
     */
    getSCP(scpId) {
        return this.scps[scpId] || null;
    }

    /**
     * Get all SCPs that the user has clearance to access
     * @returns {Array} - Array of SCP objects
     */
    getAccessibleSCPs() {
        const clearanceInfo = this.clearanceLevels[this.userClearance];
        if (!clearanceInfo) return [];
        
        // Get user clearance level as a number (e.g., "Level 4" -> 4)
        const userClearanceLevel = parseInt(this.userClearance.replace('Level ', ''));
        
        return Object.values(this.scps).filter(scp => {
            // Check if object class is allowed by clearance level
            const objectClassAllowed = clearanceInfo.allowedSCPs.includes(scp.object_class);
            
            // If clearance_required is available, check it as well
            if (scp.clearance_required) {
                const requiredLevel = parseInt(scp.clearance_required.replace('Level ', ''));
                return objectClassAllowed && userClearanceLevel >= requiredLevel;
            }
            
            // If no specific clearance_required, just check object class
            return objectClassAllowed;
        });
    }

    /**
     * Get personnel data by ID
     * @param {string} personnelId - The ID of the personnel (e.g., 'dr_bright')
     * @returns {Object|null} - The personnel data or null if not found
     */
    getPersonnel(personnelId) {
        return this.personnel[personnelId] || null;
    }

    /**
     * Set user clearance level
     * @param {string} level - The clearance level to set
     * @returns {boolean} - Success or failure
     */
    setUserClearance(level) {
        if (this.clearanceLevels[level]) {
            this.userClearance = level;
            localStorage.setItem('clearanceLevel', level);
            return true;
        }
        return false;
    }

    /**
     * Get current user clearance level
     * @returns {string} - The current clearance level
     */
    getUserClearance() {
        return this.userClearance;
    }

    /**
     * Check if user has access to a specific SCP
     * @param {string} scpId - The ID of the SCP
     * @returns {boolean} - Whether the user has access
     */
    hasAccessToSCP(scpId) {
        const scp = this.getSCP(scpId);
        if (!scp) return false;
        
        const clearanceInfo = this.clearanceLevels[this.userClearance];
        if (!clearanceInfo) return false;
        
        // Get user clearance level as a number (e.g., "Level 4" -> 4)
        const userClearanceLevel = parseInt(this.userClearance.replace('Level ', ''));
        
        // Check if object class is allowed by clearance level
        const objectClassAllowed = clearanceInfo.allowedSCPs.includes(scp.object_class);
        
        // If clearance_required is available, check it as well
        if (scp.clearance_required) {
            const requiredLevel = parseInt(scp.clearance_required.replace('Level ', ''));
            return objectClassAllowed && userClearanceLevel >= requiredLevel;
        }
        
        // If no specific clearance_required, just check object class
        return objectClassAllowed;
    }
}

// Create a global instance of the database
const scpDatabase = new SCPDatabase();

// Initialize the database when the DOM is loaded
document.addEventListener('DOMContentLoaded', async () => {
    await scpDatabase.initialize();
    
    // Dispatch event when database is ready
    const event = new CustomEvent('scpDatabaseReady');
    document.dispatchEvent(event);
}); 