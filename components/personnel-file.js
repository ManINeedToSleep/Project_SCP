/**
 * SCP Foundation - Personnel File Component
 * Custom element for displaying detailed personnel information
 */

class PersonnelFile extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.personnelId = null;
        this.personnelData = null;
    }

    static get observedAttributes() {
        return ['personnel-id'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'personnel-id' && newValue !== oldValue) {
            this.personnelId = newValue;
            this.loadPersonnelData();
        }
    }

    connectedCallback() {
        this.render();
        if (this.personnelId) {
            this.loadPersonnelData();
        }
    }

    async loadPersonnelData() {
        if (!this.personnelId) return;
        
        // First try to load from PersonnelDataStore if available
        if (typeof PersonnelDataStore !== 'undefined') {
            this.personnelData = getPersonnelById(this.personnelId);
            if (this.personnelData) {
                this.render();
                return;
            }
        }
        
        // Then try to load from the scpDatabase
        if (typeof scpDatabase !== 'undefined') {
            this.personnelData = scpDatabase.getPersonnel(this.personnelId);
            if (this.personnelData) {
                this.render();
                return;
            }
        }

        // If data isn't in either source, try to fetch from a JSON file
        try {
            const response = await fetch(`/data/personnel/${this.personnelId}.json`);
            if (response.ok) {
                this.personnelData = await response.json();
                this.render();
            } else {
                // If we don't have real data, create a placeholder
                this.createPlaceholderData();
                this.render();
            }
        } catch (error) {
            console.error("Error loading personnel data:", error);
            this.createPlaceholderData();
            this.render();
        }
    }

    createPlaceholderData() {
        // Generate placeholder data based on the ID
        const idParts = this.personnelId.split('_');
        const title = idParts[0] ? idParts[0].toUpperCase() : 'Agent';
        const lastName = idParts[1] ? idParts[1].charAt(0).toUpperCase() + idParts[1].slice(1) : 'Unknown';
        
        this.personnelData = {
            id: `P-${Math.floor(10000 + Math.random() * 90000)}`,
            name: `${title} ${lastName}`,
            position: this.getRandomPosition(title),
            department: this.getRandomDepartment(),
            clearanceLevel: `Level ${Math.floor(Math.random() * 5) + 1}`,
            status: Math.random() > 0.2 ? 'Active' : 'Inactive',
            specialization: 'Data unavailable',
            biography: 'Complete biography unavailable. Personnel file is being updated.',
            photo: null,
            notes: [
                {
                    date: this.getRandomDate(),
                    author: 'System',
                    content: 'This is a placeholder file. Complete data will be available after next database update.'
                }
            ],
            incidents: [],
            assignments: [
                {
                    date: this.getRandomDate(true),
                    description: 'Current assignment information is classified.'
                }
            ]
        };
    }

    getRandomPosition(title) {
        const positions = {
            'DR': ['Senior Researcher', 'Lead Researcher', 'Project Head', 'Research Director'],
            'AGENT': ['Field Agent', 'Special Operative', 'Containment Specialist', 'Security Personnel'],
            'DIRECTOR': ['Site Director', 'Department Head', 'O5 Liaison', 'Facility Administrator'],
            'RESEARCHER': ['Junior Researcher', 'Associate Researcher', 'Research Assistant', 'Lab Technician'],
            'SECURITY': ['Security Officer', 'Guard', 'MTF Member', 'Containment Officer']
        };
        
        const defaultPositions = ['Staff Member', 'Specialist', 'Analyst', 'Consultant'];
        const options = positions[title.toUpperCase()] || defaultPositions;
        
        return options[Math.floor(Math.random() * options.length)];
    }

    getRandomDepartment() {
        const departments = [
            'Research & Development',
            'Containment',
            'Security',
            'Medical',
            'Analytics',
            'MTF Operations',
            'Administration'
        ];
        
        return departments[Math.floor(Math.random() * departments.length)];
    }

    getRandomDate(recent = false) {
        const end = new Date();
        const start = recent ? 
            new Date(end.getFullYear() - 1, 0, 1) : 
            new Date(end.getFullYear() - 10, 0, 1);
        
        const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
        
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
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
            
            .personnel-header {
                text-align: center;
                margin-bottom: 20px;
                padding-bottom: 10px;
                border-bottom: 1px solid var(--main-color, #80FF80);
                display: flex;
                flex-direction: column;
                align-items: center;
            }
            
            .personnel-name {
                font-size: 1.5em;
                margin-bottom: 5px;
            }
            
            .personnel-id {
                font-size: 1.1em;
                margin-bottom: 10px;
                opacity: 0.8;
            }
            
            .personnel-position {
                font-size: 1.2em;
                margin-bottom: 10px;
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
            
            .status-inactive {
                border-color: #dc143c;
                color: #dc143c;
            }
            
            .personnel-photo {
                max-width: 150px;
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
            
            .info-grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
                gap: 10px;
                margin-bottom: 15px;
            }
            
            .info-item {
                padding: 8px;
                background-color: rgba(0, 0, 0, 0.2);
                border-radius: 3px;
            }
            
            .info-label {
                font-size: 0.9em;
                opacity: 0.8;
                margin-bottom: 5px;
            }
            
            .note {
                margin: 10px 0;
                padding: 10px;
                background-color: rgba(0, 0, 0, 0.2);
                border-left: 2px solid #ffa500;
                border-radius: 0 2px 2px 0;
            }
            
            .note-header {
                display: flex;
                justify-content: space-between;
                margin-bottom: 5px;
                font-size: 0.9em;
                opacity: 0.8;
            }
            
            .incident {
                margin: 15px 0;
                padding: 10px;
                background-color: rgba(220, 20, 60, 0.1);
                border-left: 2px solid #dc143c;
                border-radius: 0 2px 2px 0;
            }
            
            .incident-title {
                color: #dc143c;
                margin-bottom: 5px;
                font-weight: bold;
            }
            
            .assignment {
                margin: 10px 0;
                padding: 10px;
                background-color: rgba(0, 0, 0, 0.2);
                border-left: 2px solid #4169e1;
                border-radius: 0 2px 2px 0;
            }
            
            .assignment-date {
                color: #4169e1;
                margin-bottom: 5px;
                font-size: 0.9em;
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
                
                .personnel-name {
                    font-size: 1.3em;
                }
                
                .section {
                    padding: 10px;
                }
                
                .info-grid {
                    grid-template-columns: 1fr;
                }
            }
        `;

        // If no personnel data is loaded yet, show loading
        if (!this.personnelData) {
            this.shadowRoot.innerHTML = `
                <style>${styles}</style>
                <div class="loading">
                    <p>Loading personnel data...</p>
                    <div class="loading-bar"></div>
                </div>
            `;
            return;
        }

        // Main HTML template
        let html = `
            <style>${styles}</style>
            <div class="personnel-container">
                <div class="personnel-header">
                    <div class="personnel-name">${this.personnelData.name}</div>
                    <div class="personnel-id">ID: ${this.personnelData.id}</div>
                    <div class="personnel-position">${this.personnelData.position}</div>`;
        
        // Add photo if available
        if (this.personnelData.photo) {
            html += `<img src="${this.personnelData.photo}" alt="${this.personnelData.name}" class="personnel-photo">`;
        }

        // Add status badge
        const statusClass = this.personnelData.status.toLowerCase().includes('active') ? 
            'status-active' : 'status-inactive';
        
        html += `
                    <div class="status-badge ${statusClass}">
                        ${this.personnelData.status}
                    </div>
                </div>`;

        // Check if user has appropriate clearance
        const userClearance = (typeof scpDatabase !== 'undefined') ? 
            parseInt(scpDatabase.getUserClearance().replace('Level ', '')) : 5;
        const requiredClearance = 2; // Assume personnel files require at least Level 2
        
        if (userClearance < requiredClearance) {
            html += `
                <div class="clearance-warning">
                    <h3>[INSUFFICIENT CLEARANCE]</h3>
                    <p>Your current clearance level (Level ${userClearance}) is insufficient to view personnel files.</p>
                    <p>Required clearance: Level ${requiredClearance}</p>
                    <p>This access attempt has been logged.</p>
                </div>`;
        } else {
            // Basic Information Section
            html += `
                <div class="section">
                    <div class="section-title">BASIC INFORMATION</div>
                    <div class="section-content">
                        <div class="info-grid">
                            <div class="info-item">
                                <div class="info-label">Department</div>
                                <div>${this.personnelData.department}</div>
                            </div>
                            <div class="info-item">
                                <div class="info-label">Clearance Level</div>
                                <div>${this.personnelData.clearanceLevel}</div>
                            </div>
                            <div class="info-item">
                                <div class="info-label">Specialization</div>
                                <div>${this.personnelData.specialization}</div>
                            </div>
                        </div>
                    </div>
                </div>`;
            
            // Biography Section
            if (this.personnelData.biography) {
                html += `
                    <div class="section">
                        <div class="section-title">BIOGRAPHY</div>
                        <div class="section-content">
                            <p>${this.personnelData.biography}</p>
                        </div>
                    </div>`;
            }
            
            // Notes Section
            if (this.personnelData.notes && this.personnelData.notes.length > 0) {
                html += `
                    <div class="section">
                        <div class="section-title">PERSONNEL NOTES</div>
                        <div class="section-content">`;
                
                this.personnelData.notes.forEach(note => {
                    html += `
                        <div class="note">
                            <div class="note-header">
                                <span>${note.author || 'Unknown'}</span>
                                <span>${note.date || 'Date not recorded'}</span>
                            </div>
                            <div>${note.content}</div>
                        </div>`;
                });
                
                html += `</div></div>`;
            }
            
            // Incidents Section
            if (this.personnelData.incidents && this.personnelData.incidents.length > 0) {
                html += `
                    <div class="section">
                        <div class="section-title">INCIDENT INVOLVEMENT</div>
                        <div class="section-content">`;
                
                this.personnelData.incidents.forEach(incident => {
                    html += `
                        <div class="incident">
                            <div class="incident-title">${incident.title || 'Incident Record'}</div>
                            <div class="incident-date">${incident.date || 'Date not recorded'}</div>
                            <div>${incident.description || 'No description available'}</div>
                        </div>`;
                });
                
                html += `</div></div>`;
            }
            
            // Assignments Section
            if (this.personnelData.assignments && this.personnelData.assignments.length > 0) {
                html += `
                    <div class="section">
                        <div class="section-title">ASSIGNMENTS</div>
                        <div class="section-content">`;
                
                this.personnelData.assignments.forEach(assignment => {
                    html += `
                        <div class="assignment">
                            <div class="assignment-date">${assignment.date || 'Date not recorded'}</div>
                            <div>${assignment.description || 'No description available'}</div>
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
customElements.define('personnel-file', PersonnelFile); 