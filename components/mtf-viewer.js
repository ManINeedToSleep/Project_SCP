/**
 * SCP Foundation - Mobile Task Force Viewer Component
 * Custom element for displaying detailed MTF information
 */

class MTFViewer extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.mtfId = null;
        this.mtfData = null;
    }

    static get observedAttributes() {
        return ['mtf-id'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'mtf-id' && newValue !== oldValue) {
            this.mtfId = newValue;
            this.loadMTFData();
        }
    }

    connectedCallback() {
        this.render();
        if (this.mtfId) {
            this.loadMTFData();
        }
    }

    async loadMTFData() {
        if (!this.mtfId) return;
        
        // Try to load from a JSON file
        try {
            const response = await fetch(`/data/mtf/${this.mtfId}.json`);
            if (response.ok) {
                this.mtfData = await response.json();
                this.render();
            } else {
                // If we don't have real data, create a placeholder
                this.createPlaceholderData();
                this.render();
            }
        } catch (error) {
            console.error("Error loading MTF data:", error);
            this.createPlaceholderData();
            this.render();
        }
    }

    createPlaceholderData() {
        // Generate placeholder data based on the ID
        const idParts = this.mtfId.split('-');
        const designation = idParts[0] ? idParts[0].toUpperCase() : 'MTF';
        
        // Create the phonetic alphabet nickname if not provided in the ID
        let nickname = '';
        if (idParts.length > 1 && idParts[1]) {
            nickname = `"${this.capitalizeFirstLetter(idParts[1])}"`;
        } else {
            // Generate a random nickname if none provided
            const adjectives = ['Red', 'Silent', 'Shadow', 'Iron', 'Night', 'Hidden', 'Last', 'Alpha', 'Omega'];
            const nouns = ['Hammer', 'Watch', 'Shield', 'Hunters', 'Guardians', 'Protocol', 'Hand', 'Eye', 'Sentinels'];
            
            nickname = `"${adjectives[Math.floor(Math.random() * adjectives.length)]} ${nouns[Math.floor(Math.random() * nouns.length)]}"`;
        }
        
        // Generate realistic Greek letter designation if not in ID
        let greekLetter = '';
        if (!designation.match(/^[A-Za-z]+-\d+$/)) {
            const greekLetters = ['Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon', 'Zeta', 'Eta', 'Theta', 'Iota', 'Kappa', 'Lambda', 'Mu', 'Nu', 'Xi', 'Omicron', 'Pi', 'Rho', 'Sigma', 'Tau', 'Upsilon', 'Phi', 'Chi', 'Psi', 'Omega'];
            greekLetter = greekLetters[Math.floor(Math.random() * greekLetters.length)];
        } else {
            greekLetter = designation;
        }
        
        // Random number for designation
        const number = Math.floor(Math.random() * 20) + 1;
        
        this.mtfData = {
            id: `${greekLetter}-${number}`,
            name: nickname,
            fullDesignation: `Mobile Task Force ${greekLetter}-${number} ${nickname}`,
            status: Math.random() > 0.2 ? 'Active' : 'Decommissioned',
            establishedDate: this.getRandomDate(false),
            commander: this.generateRandomName(),
            commanderRank: this.getRandomRank(),
            personnelCount: Math.floor(Math.random() * 30) + 5,
            specialization: 'Information temporarily classified',
            description: 'Complete documentation unavailable. File access is restricted pending operational security review.',
            operationalHistory: 'Operational history data is currently being compiled and verified for accuracy.',
            equipment: ['Standard field gear', 'Mission-specific equipment (details classified)'],
            relatedSCPs: ['Information restricted'],
            missionTypes: ['Containment', 'Recovery', 'Surveillance'],
            notableOperations: [
                {
                    name: 'Operation REDACTED',
                    date: this.getRandomDate(true),
                    outcome: 'Classified',
                    description: 'Details pending declassification review.'
                }
            ]
        };
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    getRandomDate(recent = false) {
        const end = new Date();
        const start = recent ? 
            new Date(end.getFullYear() - 1, 0, 1) : 
            new Date(end.getFullYear() - 30, 0, 1);
        
        const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
        
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    }

    generateRandomName() {
        const firstNames = ['James', 'John', 'Robert', 'Michael', 'William', 'David', 'Richard', 'Joseph', 'Thomas', 'Charles', 'Mary', 'Patricia', 'Jennifer', 'Linda', 'Elizabeth', 'Susan', 'Jessica', 'Sarah', 'Karen', 'Nancy'];
        const lastNames = ['Smith', 'Johnson', 'Williams', 'Jones', 'Brown', 'Miller', 'Davis', 'Garcia', 'Rodriguez', 'Wilson', 'Martinez', 'Anderson', 'Taylor', 'Thomas', 'Hernandez', 'Moore', 'Martin', 'Jackson', 'Thompson', 'White'];
        
        return `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`;
    }

    getRandomRank() {
        const ranks = ['Captain', 'Major', 'Colonel', 'Lieutenant Colonel', 'Commander', 'Director'];
        return ranks[Math.floor(Math.random() * ranks.length)];
    }

    renderError(message) {
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    font-family: monospace;
                    color: var(--main-color, #80FF80);
                    background-color: var(--background-color, #131);
                    padding: 20px;
                }
                
                .error {
                    color: #F44336;
                    text-align: center;
                    padding: 20px;
                    border: 1px solid #F44336;
                }
            </style>
            <div class="error">
                <h3>[ERROR]</h3>
                <p>${message}</p>
            </div>
        `;
    }

    render() {
        // Add styles for the component
        const styles = `
            :host {
                display: block;
                font-family: monospace;
                color: var(--main-color, #80FF80);
                background-color: var(--background-color, #131);
                padding: 20px;
                overflow-y: auto;
                text-align: left;
            }
            
            .loading {
                text-align: center;
                padding: 20px;
            }
            
            .mtf-header {
                text-align: center;
                margin-bottom: 20px;
                padding-bottom: 10px;
                border-bottom: 1px solid var(--main-color, #80FF80);
            }
            
            .mtf-designation {
                font-size: 1.5em;
                margin-bottom: 5px;
            }
            
            .mtf-name {
                font-size: 1.2em;
                margin-bottom: 15px;
            }
            
            .status-badge {
                display: inline-block;
                padding: 5px 10px;
                margin: 10px 0;
                border: 1px solid var(--main-color, #80FF80);
                text-transform: uppercase;
                font-size: 0.9em;
                letter-spacing: 1px;
            }
            
            .status-active {
                border-color: #32cd32;
                color: #32cd32;
            }
            
            .status-inactive, .status-decommissioned {
                border-color: #dc143c;
                color: #dc143c;
            }
            
            .mtf-insignia {
                max-width: 200px;
                max-height: 200px;
                margin: 0 auto 20px;
                display: block;
                border: 1px solid var(--main-color, #80FF80);
            }
            
            .section {
                margin: 20px 0;
                background-color: rgba(0, 0, 0, 0.3);
                border-left: 3px solid var(--main-color, #80FF80);
                padding: 15px;
                border-radius: 0 4px 4px 0;
            }
            
            .section-title {
                font-size: 1.1em;
                margin-bottom: 10px;
                padding-bottom: 5px;
                border-bottom: 1px solid rgba(128, 255, 128, 0.3);
            }
            
            .section-content {
                line-height: 1.5;
            }
            
            .info-table {
                width: 100%;
                border-collapse: collapse;
                margin-bottom: 15px;
            }
            
            .info-table td {
                padding: 8px;
                vertical-align: top;
            }
            
            .info-table td:first-child {
                width: 40%;
                opacity: 0.8;
            }
            
            .info-table tr:nth-child(even) {
                background-color: rgba(0, 0, 0, 0.2);
            }
            
            .operation {
                margin: 15px 0;
                padding: 10px;
                background-color: rgba(0, 0, 0, 0.2);
                border-left: 2px solid #4169e1;
                border-radius: 0 2px 2px 0;
            }
            
            .operation-name {
                color: #4169e1;
                margin-bottom: 5px;
                font-weight: bold;
            }
            
            .operation-meta {
                display: flex;
                justify-content: space-between;
                margin-bottom: 10px;
                font-size: 0.9em;
                opacity: 0.8;
            }
            
            ul {
                padding-left: 20px;
                margin: 10px 0;
            }
            
            li {
                margin-bottom: 5px;
            }
            
            .clearance-warning {
                text-align: center;
                color: #ff6347;
                margin: 20px 0;
                padding: 10px;
                border: 1px solid #ff6347;
            }
            
            @media (max-width: 768px) {
                :host {
                    padding: 10px;
                }
                
                .mtf-designation {
                    font-size: 1.3em;
                }
                
                .section {
                    padding: 10px;
                }
                
                .info-table td {
                    display: block;
                    width: 100%;
                }
                
                .info-table td:first-child {
                    width: 100%;
                    font-weight: bold;
                    padding-bottom: 0;
                }
            }
        `;

        // If no MTF data is loaded yet, show loading
        if (!this.mtfData) {
            this.shadowRoot.innerHTML = `
                <style>${styles}</style>
                <div class="loading">
                    <p>Loading MTF data...</p>
                    <div class="loading-bar"></div>
                </div>
            `;
            return;
        }

        // Main HTML template
        let html = `
            <style>${styles}</style>
            <div class="mtf-container">
                <div class="mtf-header">
                    <div class="mtf-designation">${this.mtfData.id || 'Unknown MTF'}</div>
                    <div class="mtf-name">${this.mtfData.name || ''}</div>`;
        
        // Add insignia if available
        if (this.mtfData.insignia) {
            html += `<img src="${this.mtfData.insignia}" alt="${this.mtfData.id}" class="mtf-insignia">`;
        }

        // Add status badge
        const statusClass = this.mtfData.status && this.mtfData.status.toLowerCase().includes('active') ? 
            'status-active' : 'status-inactive';
        
        html += `
                    <div class="status-badge ${statusClass}">
                        ${this.mtfData.status || 'Unknown Status'}
                    </div>
                </div>`;

        // Check if user has appropriate clearance
        const userClearance = (typeof scpDatabase !== 'undefined') ? 
            parseInt(scpDatabase.getUserClearance().replace('Level ', '')) : 5;
        const requiredClearance = 2; // Assume MTF info requires at least Level 2
        
        if (userClearance < requiredClearance) {
            html += `
                <div class="clearance-warning">
                    <h3>[INSUFFICIENT CLEARANCE]</h3>
                    <p>Your current clearance level (Level ${userClearance}) is insufficient to view Mobile Task Force information.</p>
                    <p>Required clearance: Level ${requiredClearance}</p>
                    <p>This access attempt has been logged.</p>
                </div>`;
        } else {
            // Overview Section
            html += `
                <div class="section">
                    <div class="section-title">OVERVIEW</div>
                    <div class="section-content">
                        <table class="info-table">
                            <tr>
                                <td>Full Designation</td>
                                <td>${this.mtfData.fullDesignation || this.mtfData.id}</td>
                            </tr>
                            <tr>
                                <td>Status</td>
                                <td>${this.mtfData.status || 'Unknown'}</td>
                            </tr>
                            <tr>
                                <td>Established</td>
                                <td>${this.mtfData.establishedDate || 'Unknown'}</td>
                            </tr>
                            <tr>
                                <td>Current Commander</td>
                                <td>${this.mtfData.commanderRank || ''} ${this.mtfData.commander || 'Classified'}</td>
                            </tr>
                            <tr>
                                <td>Personnel Count</td>
                                <td>${this.mtfData.personnelCount || 'Classified'}</td>
                            </tr>
                            <tr>
                                <td>Specialization</td>
                                <td>${this.mtfData.specialization || 'Classified'}</td>
                            </tr>
                        </table>
                    </div>
                </div>`;
            
            // Description Section
            if (this.mtfData.description) {
                html += `
                    <div class="section">
                        <div class="section-title">DESCRIPTION</div>
                        <div class="section-content">
                            <p>${this.mtfData.description}</p>
                        </div>
                    </div>`;
            }
            
            // Operational History if available
            if (this.mtfData.operationalHistory) {
                html += `
                    <div class="section">
                        <div class="section-title">OPERATIONAL HISTORY</div>
                        <div class="section-content">
                            <p>${this.mtfData.operationalHistory}</p>
                        </div>
                    </div>`;
            }
            
            // Equipment Section
            if (this.mtfData.equipment && this.mtfData.equipment.length > 0) {
                html += `
                    <div class="section">
                        <div class="section-title">EQUIPMENT & RESOURCES</div>
                        <div class="section-content">
                            <ul>`;
                
                this.mtfData.equipment.forEach(item => {
                    html += `<li>${item}</li>`;
                });
                
                html += `</ul></div></div>`;
            }
            
            // Related SCPs Section
            if (this.mtfData.relatedSCPs && this.mtfData.relatedSCPs.length > 0) {
                html += `
                    <div class="section">
                        <div class="section-title">RELATED SCPs</div>
                        <div class="section-content">
                            <ul>`;
                
                this.mtfData.relatedSCPs.forEach(scp => {
                    html += `<li>${scp}</li>`;
                });
                
                html += `</ul></div></div>`;
            }
            
            // Mission Types Section
            if (this.mtfData.missionTypes && this.mtfData.missionTypes.length > 0) {
                html += `
                    <div class="section">
                        <div class="section-title">MISSION TYPES</div>
                        <div class="section-content">
                            <ul>`;
                
                this.mtfData.missionTypes.forEach(type => {
                    html += `<li>${type}</li>`;
                });
                
                html += `</ul></div></div>`;
            }
            
            // Notable Operations Section
            if (this.mtfData.notableOperations && this.mtfData.notableOperations.length > 0) {
                html += `
                    <div class="section">
                        <div class="section-title">NOTABLE OPERATIONS</div>
                        <div class="section-content">`;
                
                this.mtfData.notableOperations.forEach(op => {
                    html += `
                        <div class="operation">
                            <div class="operation-name">${op.name}</div>
                            <div class="operation-meta">
                                <span>Date: ${op.date || 'Classified'}</span>
                                <span>Outcome: ${op.outcome || 'Unknown'}</span>
                            </div>
                            <div>${op.description || 'No description available'}</div>
                        </div>`;
                });
                
                html += `</div></div>`;
            }
        }
        
        html += `</div>`;
        this.shadowRoot.innerHTML = html;
    }
}

// Define the custom element
customElements.define('mtf-viewer', MTFViewer); 