/**
 * SCP Foundation - SCP Viewer Component
 * Custom element for displaying detailed SCP information
 */

class SCPViewer extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.scpId = null;
        this.scpData = null;
    }

    static get observedAttributes() {
        return ['scp-id'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'scp-id' && newValue !== oldValue) {
            this.scpId = newValue;
            this.loadSCPData();
        }
    }

    connectedCallback() {
        this.render();
        if (this.scpId) {
            this.loadSCPData();
        }
    }

    async loadSCPData() {
        if (!this.scpId) return;

        // Try to load from SCPDataStore first (from scp-data.js)
        if (typeof SCPDataStore !== 'undefined') {
            // Look for the SCP in the data store - try different formats
            for (const key in SCPDataStore) {
                if (key.toLowerCase().replace(/[- ]/g, '') === this.scpId.toLowerCase()) {
                    this.scpData = SCPDataStore[key];
                    this.render();
                    return;
                }
            }
        }

        // If not found in SCPDataStore, try the scpDatabase
        if (typeof scpDatabase !== 'undefined') {
            this.scpData = scpDatabase.getSCP(this.scpId);
            if (this.scpData) {
                this.render();
                return;
            }
        }

        // If all else fails, try to fetch from a JSON file
        try {
            const response = await fetch(`/data/scps/${this.scpId}.json`);
            if (response.ok) {
                this.scpData = await response.json();
                this.render();
            } else {
                this.renderError("SCP data not found");
            }
        } catch (error) {
            console.error("Error loading SCP data:", error);
            this.renderError("Error loading SCP data");
        }
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
                    overflow-y: auto;
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
            
            .scp-header {
                text-align: center;
                margin-bottom: 20px;
                padding-bottom: 10px;
                border-bottom: 1px solid var(--main-color, #80FF80);
            }
            
            .scp-id {
                font-size: 1.5em;
                margin-bottom: 5px;
            }
            
            .scp-name {
                font-size: 1.2em;
                margin-bottom: 10px;
            }
            
            .object-class {
                display: inline-block;
                padding: 5px 10px;
                margin: 10px 0;
                border: 1px solid var(--main-color, #80FF80);
            }
            
            .class-safe {
                border-color: #3cb371;
                color: #3cb371;
            }
            
            .class-euclid {
                border-color: #ffa500;
                color: #ffa500;
            }
            
            .class-keter {
                border-color: #ff6347;
                color: #ff6347;
            }
            
            .class-thaumiel {
                border-color: #4169e1;
                color: #4169e1;
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
                white-space: pre-line;
                line-height: 1.5;
            }
            
            .note {
                margin: 10px 0;
                padding: 10px;
                background-color: rgba(0, 0, 0, 0.2);
                border-left: 2px solid #ffa500;
                border-radius: 0 2px 2px 0;
            }
            
            .note-author {
                font-style: italic;
                color: #ffa500;
                margin-bottom: 5px;
            }
            
            .addendum {
                margin: 10px 0;
                padding: 10px;
                background-color: rgba(0, 0, 0, 0.2);
                border-left: 2px solid #4169e1;
                border-radius: 0 2px 2px 0;
            }
            
            .addendum-title {
                color: #4169e1;
                margin-bottom: 5px;
            }
            
            .clearance-warning {
                text-align: center;
                color: #ff6347;
                margin: 20px 0;
                padding: 10px;
                border: 1px solid #ff6347;
            }
            
            .thumbnail {
                max-width: 300px;
                max-height: 200px;
                margin: 0 auto 20px;
                display: block;
                border: 1px solid var(--main-color, #80FF80);
            }
            
            @media (max-width: 768px) {
                :host {
                    padding: 10px;
                }
                
                .scp-id {
                    font-size: 1.3em;
                }
                
                .section {
                    padding: 10px;
                }
            }
        `;

        // If no SCP data is loaded yet, show loading
        if (!this.scpData) {
            this.shadowRoot.innerHTML = `
                <style>${styles}</style>
                <div class="loading">
                    <p>Loading SCP data...</p>
                    <div class="loading-bar"></div>
                </div>
            `;
            return;
        }

        // Main HTML template
        let html = `
            <style>${styles}</style>
            <div class="scp-container">
                <div class="scp-header">
                    <div class="scp-id">${this.scpData.id || 'Unknown SCP'}</div>
                    <div class="scp-name">${this.scpData.name || ''}</div>`;
        
        // Add thumbnail if available
        if (this.scpData.thumbnail) {
            html += `<img src="${this.scpData.thumbnail}" alt="${this.scpData.id}" class="thumbnail">`;
        }

        // Add object class with appropriate styling
        const objectClass = this.scpData.objectClass || this.scpData.object_class || 'Unknown';
        html += `
                    <div class="object-class class-${objectClass.toLowerCase()}">
                        Object Class: ${objectClass}
                    </div>
                </div>`;

        // Check if user has appropriate clearance
        const userClearance = (typeof scpDatabase !== 'undefined') ? 
            parseInt(scpDatabase.getUserClearance().replace('Level ', '')) : 5;
        const requiredClearance = parseInt((this.scpData.clearanceRequired || 'Level 1').replace('Level ', ''));
        
        if (userClearance < requiredClearance) {
            html += `
                <div class="clearance-warning">
                    <h3>[INSUFFICIENT CLEARANCE]</h3>
                    <p>Your current clearance level (Level ${userClearance}) is insufficient to view the complete file.</p>
                    <p>Required clearance: Level ${requiredClearance}</p>
                    <p>This access attempt has been logged.</p>
                </div>`;
        } else {
            // Add special containment procedures
            if (this.scpData.specialContainmentProcedures || this.scpData.containment_procedures) {
                const procedures = this.scpData.specialContainmentProcedures || this.scpData.containment_procedures;
                html += `
                    <div class="section">
                        <div class="section-title">SPECIAL CONTAINMENT PROCEDURES</div>
                        <div class="section-content">${procedures}</div>
                    </div>`;
            }
            
            // Add description
            if (this.scpData.description) {
                html += `
                    <div class="section">
                        <div class="section-title">DESCRIPTION</div>
                        <div class="section-content">${this.scpData.description}</div>
                    </div>`;
            }
            
            // Add notes if available
            if (this.scpData.notes && this.scpData.notes.length > 0) {
                html += `
                    <div class="section">
                        <div class="section-title">RESEARCHER NOTES</div>
                        <div class="section-content">`;
                
                this.scpData.notes.forEach(note => {
                    html += `
                        <div class="note">
                            <div class="note-author">${note.author} - ${note.date}</div>
                            <div>${note.content}</div>
                        </div>`;
                });
                
                html += `</div></div>`;
            }
            
            // Add incident reports if available
            if (this.scpData.incidentReports && this.scpData.incidentReports.length > 0) {
                html += `
                    <div class="section">
                        <div class="section-title">INCIDENT REPORTS</div>
                        <div class="section-content">`;
                
                this.scpData.incidentReports.forEach(report => {
                    html += `
                        <div class="note">
                            <div class="note-author">Incident ${report.id} - ${report.date}</div>
                            <div><strong>${report.title}</strong></div>
                            <div>${report.description}</div>
                        </div>`;
                });
                
                html += `</div></div>`;
            }
            
            // Add addendums if available
            if (this.scpData.addendums && this.scpData.addendums.length > 0) {
                html += `
                    <div class="section">
                        <div class="section-title">ADDENDA</div>
                        <div class="section-content">`;
                
                this.scpData.addendums.forEach(addendum => {
                    html += `
                        <div class="addendum">
                            <div class="addendum-title">${addendum.title}</div>
                            <div>${addendum.content}</div>
                        </div>`;
                });
                
                html += `</div></div>`;
            }
            
            // Add interviews if available
            if (this.scpData.interviews && this.scpData.interviews.length > 0) {
                html += `
                    <div class="section">
                        <div class="section-title">INTERVIEW LOGS</div>
                        <div class="section-content">`;
                
                this.scpData.interviews.forEach(interview => {
                    html += `
                        <div class="addendum">
                            <div class="addendum-title">Interview with ${interview.interviewer} - ${interview.date}</div>
                            <pre>${interview.notes}</pre>
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
customElements.define('scp-viewer', SCPViewer); 