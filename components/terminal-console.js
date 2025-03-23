/**
 * Terminal Console Component
 * A custom element that simulates an interactive terminal console
 */

class TerminalConsole extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        
        // Default properties
        this._prompt = '> ';
        this._history = [];
        this._historyIndex = -1;
        this._commands = {
            'help': this._helpCommand.bind(this),
            'clear': this._clearCommand.bind(this),
            'ls': this._lsCommand.bind(this),
            'cat': this._catCommand.bind(this),
            'man': this._manCommand.bind(this),
            'echo': this._echoCommand.bind(this),
            'whoami': this._whoamiCommand.bind(this),
            'access': this._accessCommand.bind(this),
            'date': this._dateCommand.bind(this),
            'exit': this._exitCommand.bind(this)
        };
        
        // File system simulation
        this._filesystem = {
            'README.txt': 'Welcome to the SCP Foundation Terminal System.\nType "help" for a list of available commands.',
            'ACCESS_CODES.txt': '[ACCESS DENIED] - Clearance level insufficient for this operation.',
            'EMERGENCY.txt': 'In case of containment breach, follow Protocol 096-Alpha.'
        };
        
        // Bind methods
        this._handleKeyDown = this._handleKeyDown.bind(this);
        this._handleEnter = this._handleEnter.bind(this);
    }

    static get observedAttributes() {
        return ['prompt', 'welcome-message', 'auto-focus'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue) return;
        
        switch (name) {
            case 'prompt':
                this._prompt = newValue || '> ';
                break;
            case 'welcome-message':
                this._welcomeMessage = newValue;
                break;
            case 'auto-focus':
                this._autoFocus = newValue !== 'false';
                break;
        }
    }

    connectedCallback() {
        this.render();
        
        // Set up event listeners
        const inputElement = this.shadowRoot.querySelector('.input');
        inputElement.addEventListener('keydown', this._handleKeyDown);
        
        // Add custom commands if defined
        if (this.hasAttribute('commands')) {
            try {
                const customCommands = JSON.parse(this.getAttribute('commands'));
                for (const cmd in customCommands) {
                    if (typeof window[customCommands[cmd]] === 'function') {
                        this._commands[cmd] = window[customCommands[cmd]].bind(this);
                    }
                }
            } catch (e) {
                console.error('Error parsing custom commands:', e);
            }
        }
        
        // Display welcome message
        if (this._welcomeMessage) {
            this._addOutput(this._welcomeMessage);
        } else {
            this._addOutput('SCP Foundation Terminal System v3.7.1');
            this._addOutput('CLASSIFIED - AUTHORIZED PERSONNEL ONLY');
            this._addOutput('Type "help" for available commands.');
        }
        
        // Auto focus input
        if (this._autoFocus !== false) {
            setTimeout(() => inputElement.focus(), 100);
        }
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    width: 100%;
                    height: 100%;
                    font-family: monospace;
                    color: var(--main-color, #80FF80);
                    background-color: var(--background-color, #131);
                    padding: 0.5rem;
                    box-sizing: border-box;
                    overflow: hidden;
                }
                .terminal {
                    width: 100%;
                    height: 100%;
                    overflow-y: auto;
                    display: flex;
                    flex-direction: column;
                }
                .output {
                    flex-grow: 1;
                    white-space: pre-wrap;
                    overflow-wrap: break-word;
                    margin-bottom: 0.5rem;
                }
                .prompt-container {
                    display: flex;
                    align-items: baseline;
                }
                .prompt {
                    margin-right: 0.5rem;
                }
                .input {
                    background: transparent;
                    border: none;
                    outline: none;
                    color: var(--main-color, #80FF80);
                    font-family: monospace;
                    font-size: 1em;
                    caret-color: var(--main-color, #80FF80);
                    flex-grow: 1;
                }
                .output-line {
                    margin: 0.2rem 0;
                    animation: fade-in 0.15s ease-in-out;
                }
                .error {
                    color: #FF5555;
                }
                .success {
                    color: #55FF55;
                }
                .warning {
                    color: #FFFF55;
                }
                .info {
                    color: #5555FF;
                }
                .command {
                    font-weight: bold;
                }
                @keyframes fade-in {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                .ascii-art {
                    white-space: pre;
                    font-family: monospace;
                    line-height: 1.2;
                    margin: 0.5rem 0;
                }
                table {
                    border-collapse: collapse;
                    margin: 0.5rem 0;
                }
                th, td {
                    padding: 0.3rem 0.6rem;
                    text-align: left;
                    border: 1px solid var(--main-color, #80FF80);
                }
                th {
                    background-color: rgba(128, 255, 128, 0.1);
                }
                .blink {
                    animation: blink 1s infinite;
                }
                @keyframes blink {
                    0%, 49% { opacity: 1; }
                    50%, 100% { opacity: 0; }
                }
            </style>
            <div class="terminal">
                <div class="output"></div>
                <div class="prompt-container">
                    <span class="prompt">${this._prompt}</span>
                    <input type="text" class="input" spellcheck="false">
                </div>
            </div>
        `;
    }

    _handleKeyDown(event) {
        const inputElement = this.shadowRoot.querySelector('.input');
        
        switch (event.key) {
            case 'Enter':
                event.preventDefault();
                this._handleEnter();
                break;
            case 'ArrowUp':
                event.preventDefault();
                if (this._historyIndex < this._history.length - 1) {
                    this._historyIndex++;
                    inputElement.value = this._history[this._history.length - 1 - this._historyIndex];
                    // Move cursor to end
                    setTimeout(() => {
                        inputElement.selectionStart = inputElement.selectionEnd = inputElement.value.length;
                    }, 0);
                }
                break;
            case 'ArrowDown':
                event.preventDefault();
                if (this._historyIndex > 0) {
                    this._historyIndex--;
                    inputElement.value = this._history[this._history.length - 1 - this._historyIndex];
                } else if (this._historyIndex === 0) {
                    this._historyIndex = -1;
                    inputElement.value = '';
                }
                break;
            case 'Tab':
                event.preventDefault();
                this._handleTabCompletion();
                break;
        }
    }

    _handleEnter() {
        const inputElement = this.shadowRoot.querySelector('.input');
        const command = inputElement.value.trim();
        
        if (command) {
            // Add to history
            this._history.push(command);
            this._historyIndex = -1;
            
            // Display command
            this._addOutput(`${this._prompt}${command}`, 'command');
            
            // Process command
            this._processCommand(command);
            
            // Clear input
            inputElement.value = '';
        }
    }

    _handleTabCompletion() {
        const inputElement = this.shadowRoot.querySelector('.input');
        const input = inputElement.value;
        
        // Simple command completion
        const matchingCommands = Object.keys(this._commands).filter(cmd => cmd.startsWith(input));
        
        if (matchingCommands.length === 1) {
            inputElement.value = matchingCommands[0] + ' ';
        } else if (matchingCommands.length > 1 && input) {
            this._addOutput(`${this._prompt}${input}`, 'command');
            this._addOutput(matchingCommands.join('  '));
        }
    }

    _processCommand(commandLine) {
        const args = commandLine.split(' ');
        const command = args.shift().toLowerCase();
        
        if (this._commands[command]) {
            this._commands[command](args);
        } else {
            this._addOutput(`Command not found: ${command}`, 'error');
        }
    }

    _addOutput(text, className = '') {
        const outputElement = this.shadowRoot.querySelector('.output');
        const line = document.createElement('div');
        line.className = `output-line ${className}`;
        line.textContent = text;
        outputElement.appendChild(line);
        
        // Scroll to bottom
        outputElement.scrollTop = outputElement.scrollHeight;
        
        return line;
    }

    /* Built-in commands */

    _helpCommand(args) {
        if (args.length > 0) {
            this._manCommand(args);
            return;
        }
        
        this._addOutput('Available commands:');
        this._addOutput('  help           - Display this help information');
        this._addOutput('  clear          - Clear the terminal screen');
        this._addOutput('  ls             - List files in the current directory');
        this._addOutput('  cat [file]     - Display contents of a file');
        this._addOutput('  man [command]  - Display manual for a command');
        this._addOutput('  echo [text]    - Display text');
        this._addOutput('  whoami         - Display current user information');
        this._addOutput('  access [level] - Attempt to change access level');
        this._addOutput('  date           - Display current date and time');
        this._addOutput('  exit           - Exit the terminal');
        this._addOutput('');
        this._addOutput('Type "man [command]" for detailed information about a specific command.');
    }

    _clearCommand() {
        const outputElement = this.shadowRoot.querySelector('.output');
        outputElement.innerHTML = '';
    }

    _lsCommand() {
        // Table header
        let output = '<table><tr><th>Filename</th><th>Size</th><th>Last Modified</th></tr>';
        
        // File entries
        for (const filename in this._filesystem) {
            const size = this._filesystem[filename].length;
            const date = new Date().toISOString().split('T')[0];
            output += `<tr><td>${filename}</td><td>${size} bytes</td><td>${date}</td></tr>`;
        }
        
        output += '</table>';
        
        const line = this._addOutput('');
        line.innerHTML = output;
    }

    _catCommand(args) {
        if (args.length === 0) {
            this._addOutput('Usage: cat [filename]', 'error');
            return;
        }
        
        const filename = args[0];
        
        if (this._filesystem[filename]) {
            this._addOutput(this._filesystem[filename]);
        } else {
            this._addOutput(`File not found: ${filename}`, 'error');
        }
    }

    _manCommand(args) {
        if (args.length === 0) {
            this._addOutput('Usage: man [command]', 'error');
            return;
        }
        
        const command = args[0];
        
        switch (command) {
            case 'help':
                this._addOutput('NAME\n    help - display help information\n\nSYNOPSIS\n    help [command]\n\nDESCRIPTION\n    Display information about available commands.\n    If a command is specified, show detailed help for that command.');
                break;
            case 'clear':
                this._addOutput('NAME\n    clear - clear the terminal screen\n\nSYNOPSIS\n    clear\n\nDESCRIPTION\n    Clear the terminal screen, removing all previous output.');
                break;
            case 'ls':
                this._addOutput('NAME\n    ls - list directory contents\n\nSYNOPSIS\n    ls\n\nDESCRIPTION\n    List files in the current directory.');
                break;
            case 'cat':
                this._addOutput('NAME\n    cat - concatenate and display files\n\nSYNOPSIS\n    cat [file]\n\nDESCRIPTION\n    Display the contents of specified file.');
                break;
            case 'echo':
                this._addOutput('NAME\n    echo - display a line of text\n\nSYNOPSIS\n    echo [text]\n\nDESCRIPTION\n    Display the text provided as argument.');
                break;
            case 'whoami':
                this._addOutput('NAME\n    whoami - display current user\n\nSYNOPSIS\n    whoami\n\nDESCRIPTION\n    Display information about the current user.');
                break;
            case 'access':
                this._addOutput('NAME\n    access - change access level\n\nSYNOPSIS\n    access [level]\n\nDESCRIPTION\n    Attempt to change your access level. Requires proper authorization.');
                break;
            case 'date':
                this._addOutput('NAME\n    date - display the current date and time\n\nSYNOPSIS\n    date\n\nDESCRIPTION\n    Display the current system date and time.');
                break;
            case 'exit':
                this._addOutput('NAME\n    exit - exit the terminal\n\nSYNOPSIS\n    exit\n\nDESCRIPTION\n    Exit the current terminal session.');
                break;
            default:
                this._addOutput(`No manual entry for ${command}`, 'error');
        }
    }

    _echoCommand(args) {
        this._addOutput(args.join(' '));
    }

    _whoamiCommand() {
        const username = localStorage.getItem('username') || 'Dr.Bright963';
        const clearance = scpDatabase ? scpDatabase.getUserClearance() : 'Level 1';
        
        this._addOutput(`Username: ${username}`);
        this._addOutput(`Clearance: ${clearance}`);
        this._addOutput(`Terminal: SCiPNET-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`);
        this._addOutput(`Location: Site-${Math.floor(Math.random() * 100)}`);
    }

    _accessCommand(args) {
        if (!args.length) {
            this._addOutput('Usage: access [level]', 'error');
            return;
        }
        
        const level = args[0].toLowerCase();
        
        if (!level.startsWith('level')) {
            this._addOutput('Invalid level format. Use "Level X" where X is 1-5.', 'error');
            return;
        }
        
        const levelNum = parseInt(level.replace('level', ''));
        
        if (isNaN(levelNum) || levelNum < 1 || levelNum > 5) {
            this._addOutput('Invalid level. Access levels range from 1 to 5.', 'error');
            return;
        }
        
        // Simple "hacking" mini-game - user needs to enter the correct passcode
        this._addOutput(`Attempting to elevate to Level ${levelNum}...`, 'info');
        
        if (levelNum > 2) {
            this._addOutput('NOTICE: Elevated access requires proper authorization codes.', 'warning');
            setTimeout(() => {
                const authCode = prompt(`Enter authorization code for Level ${levelNum}:`);
                
                // Check for the correct authorization code (this is a simplified version)
                if (authCode === `scp-${levelNum}000`) {
                    if (scpDatabase) {
                        scpDatabase.setUserClearance(`Level ${levelNum}`);
                        this._addOutput(`Access granted. You now have Level ${levelNum} clearance.`, 'success');
                    } else {
                        this._addOutput('Database connection error. Try again later.', 'error');
                    }
                } else {
                    this._addOutput('Invalid authorization code. Access denied.', 'error');
                    this._addOutput('This incident has been logged.', 'warning');
                }
            }, 1000);
        } else {
            // Lower levels don't need authorization
            if (scpDatabase) {
                scpDatabase.setUserClearance(`Level ${levelNum}`);
                this._addOutput(`Access granted. You now have Level ${levelNum} clearance.`, 'success');
            } else {
                this._addOutput('Database connection error. Try again later.', 'error');
            }
        }
    }

    _dateCommand() {
        const now = new Date();
        this._addOutput(`Current date: ${now.toDateString()}`);
        this._addOutput(`Current time: ${now.toTimeString().split(' ')[0]}`);
    }

    _exitCommand() {
        this._addOutput('Exiting terminal...');
        
        setTimeout(() => {
            // Dispatch custom event
            this.dispatchEvent(new CustomEvent('terminal-exit'));
            
            // Remove terminal
            const terminal = this.shadowRoot.querySelector('.terminal');
            terminal.style.display = 'none';
        }, 1000);
    }

    /* Public methods */

    /**
     * Write text to the terminal
     * @param {string} text - Text to write
     * @param {string} className - Optional CSS class to apply
     * @returns {HTMLElement} The created output line element
     */
    write(text, className = '') {
        return this._addOutput(text, className);
    }

    /**
     * Clear the terminal
     */
    clear() {
        this._clearCommand();
    }

    /**
     * Focus the input
     */
    focus() {
        const inputElement = this.shadowRoot.querySelector('.input');
        inputElement.focus();
    }

    /**
     * Add a custom command
     * @param {string} name - Command name
     * @param {Function} handler - Command handler function
     */
    addCommand(name, handler) {
        if (typeof handler === 'function') {
            this._commands[name] = handler;
        }
    }

    /**
     * Add a file to the file system
     * @param {string} filename - Name of the file
     * @param {string} content - File content
     */
    addFile(filename, content) {
        this._filesystem[filename] = content;
    }

    // Function to set up SCP-related commands
    setupSCPCommands() {
        // ... existing code ...
    }

    // Function to set up personnel-related commands
    setupPersonnelCommands() {
        // Get the terminal instance
        const terminal = document.getElementById('terminal');
        if (!terminal) return;
        
        // Command to view personnel files
        terminal.addCommand('personnel', function(args) {
            if (args.length === 0) {
                this._addOutput('Usage: personnel [personnel-id]', 'error');
                this._addOutput('Example: personnel P-10294');
                return;
            }
            
            // Parse personnel ID
            let personnelId = args[0].toUpperCase();
            
            // Add prefix if not present
            if (!personnelId.startsWith('P-') && /^\d+$/.test(personnelId)) {
                personnelId = 'P-' + personnelId;
            }
            
            // Try to retrieve personnel data
            let personnelData = null;
            
            // Check PersonnelDataStore first (from personnel-data.js)
            if (typeof PersonnelDataStore !== 'undefined') {
                personnelData = PersonnelDataStore[personnelId];
            }
            
            // If we couldn't find the personnel data
            if (!personnelData) {
                this._addOutput(`No data found for Personnel ID: ${personnelId}`, 'error');
                this._addOutput('The file may not exist or you may not have sufficient clearance.', 'warning');
                return;
            }
            
            // Check user clearance
            const userClearance = typeof scpDatabase !== 'undefined' ? 
                scpDatabase.getUserClearance() : 'Level 1';
                
            const requiredClearance = personnelData.clearanceRequired || 'Level 1';
            
            if (!terminal.checkClearance(requiredClearance, userClearance)) {
                this._addOutput(`[ACCESS DENIED] - Personnel File: ${personnelId}`, 'error');
                this._addOutput(`Your clearance level (${userClearance}) is insufficient.`, 'error');
                this._addOutput(`Required clearance: ${requiredClearance}`, 'warning');
                this._addOutput('This access attempt has been logged.', 'warning');
                return;
            }
            
            // Format and display the personnel data
            this._addOutput('');
            this._addOutput(`=== PERSONNEL FILE: ${personnelId} ===`, 'info');
            this._addOutput('');
            
            // Basic information
            this._addOutput(`Name: ${personnelData.name}`);
            this._addOutput(`Position: ${personnelData.position}`);
            this._addOutput(`Department: ${personnelData.department}`);
            this._addOutput(`Clearance Level: ${personnelData.clearanceLevel}`);
            this._addOutput(`Status: ${personnelData.status}`, personnelData.status === 'Active' ? 'success' : 'error');
            this._addOutput(`Specialization: ${personnelData.specialization}`);
            this._addOutput('');
            
            // Display biography if available
            if (personnelData.biography) {
                this._addOutput('Biography:', 'info');
                this._addOutput(personnelData.biography.trim());
                this._addOutput('');
            }
            
            // Display description if available
            if (personnelData.description) {
                this._addOutput('Description:', 'info');
                this._addOutput(personnelData.description.trim());
                this._addOutput('');
            }
            
            // Display psychological profile if available
            if (personnelData.psychologicalProfile) {
                this._addOutput('Psychological Profile:', 'info');
                this._addOutput(personnelData.psychologicalProfile.trim());
                this._addOutput('');
            }
            
            // Display notable incidents if available
            if (personnelData.notableIncidents && personnelData.notableIncidents.length > 0) {
                this._addOutput('Notable Incidents:', 'info');
                personnelData.notableIncidents.forEach(incident => {
                    this._addOutput(`[${incident.date}] ${incident.incident}`, 'warning');
                    this._addOutput(incident.description);
                    this._addOutput('');
                });
            }
            
            // Display achievements if available
            if (personnelData.achievements && personnelData.achievements.length > 0) {
                this._addOutput('Achievements:', 'info');
                personnelData.achievements.forEach(achievement => {
                    this._addOutput(`[${achievement.date}] ${achievement.description}`, 'success');
                });
                this._addOutput('');
            }
            
            // Display notes if available
            if (personnelData.notes && personnelData.notes.length > 0) {
                this._addOutput('Personnel Notes:', 'info');
                personnelData.notes.forEach(note => {
                    this._addOutput(`[${note.date}] ${note.author}:`, 'warning');
                    this._addOutput(note.content);
                    this._addOutput('');
                });
            }
            
            this._addOutput(`=== END OF FILE ===`, 'info');
        });
        
        // Alias 'staff' command to 'personnel'
        terminal.addCommand('staff', function(args) {
            this.executeCommand(`personnel ${args.join(' ')}`);
        });
        
        // Command to list all personnel
        terminal.addCommand('list-personnel', function() {
            this._addOutput('Retrieving accessible personnel records...', 'info');
            
            let accessiblePersonnel = [];
            
            // Get user clearance
            const userClearance = typeof scpDatabase !== 'undefined' ? 
                parseInt(scpDatabase.getUserClearance().replace('Level ', '')) : 1;
            
            // Check PersonnelDataStore
            if (typeof PersonnelDataStore !== 'undefined') {
                for (const key in PersonnelDataStore) {
                    const person = PersonnelDataStore[key];
                    const requiredClearance = parseInt((person.clearanceRequired || 'Level 1').replace('Level ', ''));
                    
                    if (requiredClearance <= userClearance) {
                        accessiblePersonnel.push(person);
                    }
                }
            }
            
            if (accessiblePersonnel.length === 0) {
                this._addOutput('No personnel records accessible for your clearance level.', 'warning');
                return;
            }
            
            // Display results in a table format
            this._addOutput(`Found ${accessiblePersonnel.length} accessible personnel records:`, 'success');
            
            // Create a table
            this._addTable(
                ['ID', 'Name', 'Position', 'Department', 'Status'],
                accessiblePersonnel.map(person => [
                    person.id,
                    person.name,
                    person.position,
                    person.department,
                    person.status
                ])
            );
            
            this._addOutput('\nUse "personnel [id]" to display detailed information.');
        });
    }

    // Function to set up MTF-related commands
    setupMTFCommands() {
        // Get the terminal instance
        const terminal = document.getElementById('terminal');
        if (!terminal) return;
        
        // Command to view MTF information
        terminal.addCommand('mtf', function(args) {
            if (args.length === 0) {
                this._addOutput('Usage: mtf [designation]', 'error');
                this._addOutput('Example: mtf epsilon-11');
                return;
            }
            
            // Parse the MTF designation
            let mtfId = args[0].toLowerCase();
            
            // Look for the MTF in mtfData (from dashboard.js)
            let mtfData = null;
            
            if (typeof mtfData !== 'undefined') {
                mtfData = mtfData.find(mtf => 
                    mtf.id.toLowerCase() === mtfId || 
                    mtf.designation.toLowerCase() === mtfId ||
                    mtf.name.toLowerCase().includes(mtfId)
                );
            }
            
            // Fallback to hardcoded MTF data if not found
            if (!mtfData) {
                // Common MTFs
                const commonMTFs = {
                    'alpha-1': {
                        id: 'alpha-1',
                        designation: 'Alpha-1',
                        name: 'Red Right Hand',
                        specialization: 'Direct action on behalf of the O5 Council',
                        status: 'Active', 
                        clearanceRequired: 'Level 4'
                    },
                    'epsilon-11': {
                        id: 'epsilon-11',
                        designation: 'Epsilon-11',
                        name: 'Nine-Tailed Fox',
                        specialization: 'Security and containment of Foundation facilities during breach events',
                        status: 'Active',
                        clearanceRequired: 'Level 3'
                    },
                    'nu-7': {
                        id: 'nu-7',
                        designation: 'Nu-7',
                        name: 'Hammer Down',
                        specialization: 'Heavy combat operations against Groups of Interest and SCPs',
                        status: 'Active',
                        clearanceRequired: 'Level 3'
                    },
                    'beta-7': {
                        id: 'beta-7',
                        designation: 'Beta-7',
                        name: 'Maz Hatters',
                        specialization: 'Hazardous materials and anomalies',
                        status: 'Active',
                        clearanceRequired: 'Level 2'
                    }
                };
                
                // Try to find in fallback data
                for (const key in commonMTFs) {
                    if (key === mtfId || 
                        commonMTFs[key].designation.toLowerCase() === mtfId || 
                        commonMTFs[key].name.toLowerCase().includes(mtfId)) {
                        mtfData = commonMTFs[key];
                        break;
                    }
                }
            }
            
            // If we couldn't find the MTF data
            if (!mtfData) {
                this._addOutput(`No data found for MTF: ${mtfId}`, 'error');
                this._addOutput('The MTF file may not exist or you may not have sufficient clearance.', 'warning');
                return;
            }
            
            // Check user clearance
            const userClearance = typeof scpDatabase !== 'undefined' ? 
                scpDatabase.getUserClearance() : 'Level 1';
                
            const requiredClearance = mtfData.clearanceRequired || 'Level 2';
            
            if (!terminal.checkClearance(requiredClearance, userClearance)) {
                this._addOutput(`[ACCESS DENIED] - MTF File: ${mtfData.designation}`, 'error');
                this._addOutput(`Your clearance level (${userClearance}) is insufficient.`, 'error');
                this._addOutput(`Required clearance: ${requiredClearance}`, 'warning');
                this._addOutput('This access attempt has been logged.', 'warning');
                return;
            }
            
            // Format and display the MTF data
            this._addOutput('');
            this._addOutput(`=== MOBILE TASK FORCE: ${mtfData.designation} ===`, 'info');
            this._addOutput('');
            
            // Basic information
            this._addOutput(`Designation: ${mtfData.designation}`);
            this._addOutput(`Codename: "${mtfData.name}"`);
            this._addOutput(`Status: ${mtfData.status}`, mtfData.status === 'Active' ? 'success' : 'error');
            this._addOutput(`Specialization: ${mtfData.specialization}`);
            this._addOutput(`Clearance Required: ${mtfData.clearanceRequired}`);
            
            // Additional fields if available
            if (mtfData.commander) {
                this._addOutput(`Commander: ${mtfData.commander}`);
            }
            
            if (mtfData.personnelCount) {
                this._addOutput(`Personnel: ${mtfData.personnelCount}`);
            }
            
            this._addOutput('');
            
            // Display operations if available
            if (mtfData.notableOperations && mtfData.notableOperations.length > 0) {
                this._addOutput('Notable Operations:', 'info');
                mtfData.notableOperations.forEach(op => {
                    this._addOutput(`[${op.date}] ${op.name}`, 'warning');
                    this._addOutput(op.description || 'No details available.');
                    this._addOutput('');
                });
            }
            
            this._addOutput(`=== END OF FILE ===`, 'info');
        });
        
        // Command to list all MTFs
        terminal.addCommand('list-mtf', function() {
            this._addOutput('Retrieving accessible Mobile Task Force records...', 'info');
            
            // Get user clearance
            const userClearance = typeof scpDatabase !== 'undefined' ? 
                parseInt(scpDatabase.getUserClearance().replace('Level ', '')) : 1;
            
            // Common MTFs with different clearance levels
            const mtfList = [
                {
                    designation: 'Alpha-1',
                    name: 'Red Right Hand',
                    specialization: 'Direct action on behalf of the O5 Council',
                    status: 'Active',
                    clearanceRequired: 'Level 4'
                },
                {
                    designation: 'Beta-7',
                    name: 'Maz Hatters',
                    specialization: 'Hazardous materials and anomalies',
                    status: 'Active',
                    clearanceRequired: 'Level 2'
                },
                {
                    designation: 'Epsilon-11',
                    name: 'Nine-Tailed Fox',
                    specialization: 'Security and containment of Foundation facilities during breach events',
                    status: 'Active',
                    clearanceRequired: 'Level 3'
                },
                {
                    designation: 'Eta-10',
                    name: 'See No Evil',
                    specialization: 'Investigation of visual cognitohazards and memetic agents',
                    status: 'Active',
                    clearanceRequired: 'Level 3'
                },
                {
                    designation: 'Gamma-5',
                    name: 'Red Herrings',
                    specialization: 'Undercover investigations of GoI activity',
                    status: 'Active',
                    clearanceRequired: 'Level 3'
                },
                {
                    designation: 'Lambda-4',
                    name: 'Birdwatchers',
                    specialization: 'Observation and tracking of airborne anomalies',
                    status: 'Active',
                    clearanceRequired: 'Level 2'
                },
                {
                    designation: 'Nu-7',
                    name: 'Hammer Down',
                    specialization: 'Heavy combat operations against Groups of Interest and SCPs',
                    status: 'Active',
                    clearanceRequired: 'Level 3'
                },
                {
                    designation: 'Omega-12',
                    name: 'Achilles\' Heels',
                    specialization: 'Neutralization of reality-bending anomalies',
                    status: 'Active',
                    clearanceRequired: 'Level 5'
                },
            ];
            
            // Filter by clearance level
            const accessibleMTFs = mtfList.filter(mtf => {
                const requiredClearance = parseInt((mtf.clearanceRequired || 'Level 1').replace('Level ', ''));
                return requiredClearance <= userClearance;
            });
            
            if (accessibleMTFs.length === 0) {
                this._addOutput('No MTF records accessible for your clearance level.', 'warning');
                return;
            }
            
            // Display results in a table format
            this._addOutput(`Found ${accessibleMTFs.length} accessible MTF records:`, 'success');
            
            // Create a table
            this._addTable(
                ['Designation', 'Name', 'Specialization', 'Status'],
                accessibleMTFs.map(mtf => [
                    mtf.designation,
                    `"${mtf.name}"`,
                    mtf.specialization,
                    mtf.status
                ])
            );
            
            this._addOutput('\nUse "mtf [designation]" to display detailed information.');
        });
    }

    // Function to set up system-related commands
    setupSystemCommands() {
        // Get the terminal instance
        const terminal = document.getElementById('terminal');
        if (!terminal) return;
        
        // Status command
        terminal.addCommand('status', function() {
            // Get user data
            const userData = {
                username: 'Researcher',
                id: 'P-' + Math.floor(10000 + Math.random() * 90000),
                clearanceLevel: 'Level 1',
                department: 'Research'
            };
            
            // Try to get from session storage
            const authData = JSON.parse(sessionStorage.getItem('scp_auth') || '{}');
            if (authData && authData.name) {
                userData.username = authData.name;
            }
            if (authData && authData.clearanceLevel) {
                userData.clearanceLevel = authData.clearanceLevel;
            }
            if (authData && authData.personnelId) {
                userData.id = authData.personnelId;
            }
            if (authData && authData.department) {
                userData.department = authData.department;
            }
            
            // System info
            const systemInfo = {
                version: '3.8.2',
                buildDate: '2023-11-03',
                uptime: this._formatUptime(new Date() - window.startTime || 0),
                location: `Site-${Math.floor(Math.random() * 100)}`,
                securityStatus: Math.random() > 0.95 ? 'COMPROMISED' : 'SECURE'
            };
            
            this._addOutput('=== SYSTEM STATUS ===', 'info');
            this._addOutput('');
            
            // User information
            this._addOutput('USER INFORMATION:', 'info');
            this._addOutput(`Name: ${userData.username}`);
            this._addOutput(`ID: ${userData.id}`);
            this._addOutput(`Department: ${userData.department}`);
            this._addOutput(`Clearance: ${userData.clearanceLevel}`);
            this._addOutput('');
            
            // System information
            this._addOutput('SYSTEM INFORMATION:', 'info');
            this._addOutput(`SCiPNET Version: ${systemInfo.version} (Build ${systemInfo.buildDate})`);
            this._addOutput(`System Uptime: ${systemInfo.uptime}`);
            this._addOutput(`Terminal Location: ${systemInfo.location}`);
            this._addOutput(`Security Status: ${systemInfo.securityStatus}`, 
                systemInfo.securityStatus === 'SECURE' ? 'success' : 'error');
            this._addOutput('');
            
            // SCP database status
            this._addOutput('DATABASE STATUS:', 'info');
            
            if (typeof scpDatabase !== 'undefined') {
                this._addOutput('SCP Database: Connected', 'success');
                if (typeof scpDatabase.scps === 'object') {
                    const scpCount = Object.keys(scpDatabase.scps).length;
                    this._addOutput(`SCP Records: ${scpCount}`);
                }
            } else {
                this._addOutput('SCP Database: Disconnected', 'error');
            }
            
            if (typeof PersonnelDataStore !== 'undefined') {
                this._addOutput('Personnel Database: Connected', 'success');
                if (typeof PersonnelDataStore === 'object') {
                    const personnelCount = Object.keys(PersonnelDataStore).length;
                    this._addOutput(`Personnel Records: ${personnelCount}`);
                }
            } else {
                this._addOutput('Personnel Database: Disconnected', 'error');
            }
            
            if (typeof mtfData !== 'undefined') {
                this._addOutput('MTF Database: Connected', 'success');
            } else {
                this._addOutput('MTF Database: Limited Connectivity', 'warning');
            }
            
            this._addOutput('');
            
            // Active alerts
            const alerts = [];
            if (systemInfo.securityStatus !== 'SECURE') {
                alerts.push({
                    type: 'SECURITY BREACH',
                    details: 'System security compromised. Investigation in progress.',
                    level: 'error'
                });
            }
            
            if (Math.random() > 0.7) {
                alerts.push({
                    type: 'MAINTENANCE',
                    details: 'Scheduled maintenance in progress. Some systems may be temporarily unavailable.',
                    level: 'warning'
                });
            }
            
            if (Math.random() > 0.9) {
                alerts.push({
                    type: 'CONTAINMENT BREACH',
                    details: 'Minor containment breach reported in Sector-' + 
                        String.fromCharCode(65 + Math.floor(Math.random() * 26)) + 
                        '. Security teams deployed.',
                    level: 'error'
                });
            }
            
            if (alerts.length > 0) {
                this._addOutput('ACTIVE ALERTS:', 'warning');
                alerts.forEach(alert => {
                    this._addOutput(`[${alert.type}] ${alert.details}`, alert.level);
                });
            } else {
                this._addOutput('ACTIVE ALERTS: None', 'success');
            }
            
            this._addOutput('');
            this._addOutput('=== END OF STATUS REPORT ===', 'info');
        });
        
        // Helper function to format uptime
        terminal._formatUptime = function(milliseconds) {
            const seconds = Math.floor(milliseconds / 1000);
            const minutes = Math.floor(seconds / 60);
            const hours = Math.floor(minutes / 60);
            const days = Math.floor(hours / 24);
            
            const remainingHours = hours % 24;
            const remainingMinutes = minutes % 60;
            const remainingSeconds = seconds % 60;
            
            let uptime = '';
            if (days > 0) uptime += `${days}d `;
            if (remainingHours > 0 || days > 0) uptime += `${remainingHours}h `;
            if (remainingMinutes > 0 || remainingHours > 0 || days > 0) uptime += `${remainingMinutes}m `;
            uptime += `${remainingSeconds}s`;
            
            return uptime;
        };
        
        // Protocol command
        terminal.addCommand('protocol', function(args) {
            if (args.length === 0) {
                this._addOutput('Usage: protocol [name]', 'error');
                this._addOutput('Example: protocol gamma');
                this._addOutput('Available protocols: alpha, beta, gamma, delta, epsilon, omega');
                return;
            }
            
            const protocolName = args[0].toLowerCase();
            
            // Protocol definitions
            const protocols = {
                'alpha': {
                    name: 'ALPHA Protocol',
                    description: 'Standard containment procedures for Safe-class anomalies.',
                    details: `
ALPHA Protocol is the Foundation's standard containment procedure for Safe-class anomalies. It involves:

1. Initial containment assessment to verify Safe classification
2. Establishment of appropriate physical containment (minimum: locked room or storage container)
3. Regular monitoring schedule (typically weekly or monthly)
4. Testing authorization from Level 2+ personnel
5. Breach response teams of 2-5 personnel with standard equipment

ALPHA Protocol is designed for minimal resource allocation while maintaining secure containment. Most Safe-class anomalies can be effectively contained with these measures.`,
                    clearanceRequired: 'Level 1'
                },
                'beta': {
                    name: 'BETA Protocol',
                    description: 'Enhanced security measures for Euclid-class anomalies.',
                    details: `
BETA Protocol implements enhanced security measures for Euclid-class anomalies. This protocol includes:

1. Dedicated containment cells with anomaly-specific reinforcement
2. Active monitoring systems (24/7 surveillance)
3. At least two redundant containment mechanisms
4. Regular testing only with Level 3+ approval
5. Breach response teams of 5-10 personnel with specialized equipment
6. Monthly containment revisions based on observed behavior

BETA Protocol acknowledges the unpredictable nature of Euclid-class anomalies and implements precautionary measures to mitigate potential containment failures.`,
                    clearanceRequired: 'Level 2'
                },
                'gamma': {
                    name: 'GAMMA Protocol',
                    description: 'Hostile organism containment for biological anomalies.',
                    details: `
GAMMA Protocol is designed specifically for hostile biological anomalies regardless of their object class. Key components include:

1. Biologically secure containment chambers with negative pressure
2. Triple-layered containment barriers (physical, chemical, biological)
3. Sterilization procedures for all materials entering or exiting containment
4. Mandatory quarantine procedures for exposed personnel
5. Specialized breach response teams with biohazard equipment
6. Termination protocols if containment is compromised beyond Level 2
7. Genetic samples maintained in at least three separate secure facilities

GAMMA Protocol prioritizes preventing biological contamination above all other concerns, including the preservation of the specimen if necessary.`,
                    clearanceRequired: 'Level 2'
                },
                'delta': {
                    name: 'DELTA Protocol',
                    description: 'Cognitohazard containment procedures.',
                    details: `
DELTA Protocol addresses the containment of cognitohazards, memetic agents, and infohazards. Implementation includes:

1. Information quarantine measures (encryption, redaction, symbol substitution)
2. Anti-memetic countermeasures built into containment documentation
3. Personnel rotation schedules to limit exposure
4. Specialized training for containment personnel
5. Amnestic treatments as standard procedure after exposure
6. Reality anchors for higher-level cognitohazards
7. Trained counter-memetic specialists on call for containment breaches

DELTA Protocol recognizes that traditional physical containment is insufficient for anomalies that operate through information transfer.`,
                    clearanceRequired: 'Level 3'
                },
                'epsilon': {
                    name: 'EPSILON Protocol',
                    description: 'Reality-altering anomaly procedures.',
                    details: `
EPSILON Protocol is implemented for reality-bending or spatially-anomalous entities. This protocol includes:

1. Scranton Reality Anchors as primary containment
2. Kant counters for continuous monitoring of reality stability
3. Spatial isolation measures (minimum 100m exclusion zone)
4. Hume field stabilizers at containment boundaries
5. Reality baseline calibration every 6 hours
6. Emergency reality restructuring procedures (O5 authorization required)
7. Specialized MTF response teams with reality-stabilizing equipment

EPSILON Protocol's primary goal is to isolate and neutralize any reality-altering effects from extending beyond containment boundaries.`,
                    clearanceRequired: 'Level 4'
                },
                'omega': {
                    name: 'OMEGA Protocol',
                    description: 'XK-class end-of-world scenario procedures.',
                    details: `
OMEGA Protocol is activated during XK-class end-of-world scenarios. Components include:

[ACCESS DENIED: LEVEL 5 CLEARANCE REQUIRED FOR COMPLETE PROTOCOL DETAILS]

Basic overview (Level 4 clearance):
1. Activation requires O5 Council majority vote
2. Implementation of Site Omega emergency relocation procedures
3. Deployment of specialized MTF units for specific XK scenarios
4. Authorized use of Thaumiel-class anomalies for containment
5. SCP Foundation continuity of operations guidelines

OMEGA Protocol represents the Foundation's last line of defense against existential threats to humanity.`,
                    clearanceRequired: 'Level 4'
                }
            };
            
            // Check if protocol exists
            if (!protocols[protocolName]) {
                this._addOutput(`Protocol not found: ${protocolName}`, 'error');
                this._addOutput('Available protocols: alpha, beta, gamma, delta, epsilon, omega');
                return;
            }
            
            const protocol = protocols[protocolName];
            
            // Check user clearance
            const userClearance = typeof scpDatabase !== 'undefined' ? 
                scpDatabase.getUserClearance() : 'Level 1';
                
            if (!terminal.checkClearance(protocol.clearanceRequired, userClearance)) {
                this._addOutput(`[ACCESS DENIED] - ${protocol.name}`, 'error');
                this._addOutput(`Your clearance level (${userClearance}) is insufficient.`, 'error');
                this._addOutput(`Required clearance: ${protocol.clearanceRequired}`, 'warning');
                this._addOutput('This access attempt has been logged.', 'warning');
                return;
            }
            
            // Display protocol information
            this._addOutput('');
            this._addOutput(`=== ${protocol.name.toUpperCase()} ===`, 'info');
            this._addOutput('');
            this._addOutput(`Description: ${protocol.description}`);
            this._addOutput(`Clearance Required: ${protocol.clearanceRequired}`);
            this._addOutput('');
            this._addOutput('Details:', 'info');
            this._addOutput(protocol.details.trim());
            this._addOutput('');
            this._addOutput('=== END OF PROTOCOL DOCUMENTATION ===', 'info');
        });
        
        // Simulate breach command (for fun)
        terminal.addCommand('breach', function(args) {
            // Get a random SCP to breach
            const scpNumbers = ['173', '106', '096', '682', '049', '3008', '939', '079'];
            const scpNumber = args.length > 0 ? args[0].replace(/\D/g, '') : 
                scpNumbers[Math.floor(Math.random() * scpNumbers.length)];
            
            this._addOutput(`[SIMULATION MODE]`, 'warning');
            this._addOutput(`Simulating containment breach for SCP-${scpNumber}...`, 'warning');
            
            // Start the simulation sequence
            setTimeout(() => {
                this._addOutput('');
                this._addOutput(`⚠️ WARNING: CONTAINMENT BREACH DETECTED ⚠️`, 'error');
                this._addOutput(`SCP-${scpNumber} HAS BREACHED CONTAINMENT`, 'error');
                this._addOutput('');
                this._addOutput('BREACH LOCATION: SECTOR-' + 
                    String.fromCharCode(65 + Math.floor(Math.random() * 26)));
                this._addOutput('FACILITY LOCKDOWN INITIATED');
                this._addOutput('EMERGENCY PROTOCOLS ACTIVATED');
                
                // Dispatch MTF after a delay
                setTimeout(() => {
                    this._addOutput('');
                    this._addOutput('MOBILE TASK FORCE EPSILON-11 "NINE-TAILED FOX" HAS BEEN DISPATCHED');
                    this._addOutput('ALL PERSONNEL ARE ADVISED TO REMAIN IN SECURE LOCATIONS');
                    this._addOutput('');
                    
                    // Progress updates
                    const updates = [
                        { message: 'MTF E-11 has entered the facility', delay: 3000 },
                        { message: `MTF reports visual contact with SCP-${scpNumber}`, delay: 5000 },
                        { message: 'Engagement in progress...', delay: 4000 },
                        { message: 'Multiple casualties reported', delay: 3000 },
                        { message: `SCP-${scpNumber} has been successfully recontained`, delay: 6000 }
                    ];
                    
                    let currentDelay = 0;
                    updates.forEach(update => {
                        currentDelay += update.delay;
                        setTimeout(() => {
                            this._addOutput(`[SIMULATION UPDATE] ${update.message}`);
                            
                            // Final message after all updates
                            if (update === updates[updates.length - 1]) {
                                setTimeout(() => {
                                    this._addOutput('');
                                    this._addOutput('CONTAINMENT BREACH SIMULATION COMPLETE', 'success');
                                    this._addOutput('SIMULATION END');
                                    this._addOutput('');
                                }, 1000);
                            }
                        }, currentDelay);
                    });
                    
                }, 3000);
            }, 2000);
        });
        
        // Whoami command
        terminal.addCommand('whoami', function() {
            // Get user data
            const userData = {
                username: 'Researcher',
                id: 'P-' + Math.floor(10000 + Math.random() * 90000),
                clearanceLevel: 'Level 1',
                department: 'Research',
                site: 'Site-' + Math.floor(Math.random() * 100),
                terminal: 'TERM-' + Math.floor(Math.random() * 10000).toString().padStart(4, '0')
            };
            
            // Try to get from session storage
            const authData = JSON.parse(sessionStorage.getItem('scp_auth') || '{}');
            if (authData && authData.name) {
                userData.username = authData.name;
            }
            if (authData && authData.clearanceLevel) {
                userData.clearanceLevel = authData.clearanceLevel;
            }
            if (authData && authData.personnelId) {
                userData.id = authData.personnelId;
            }
            if (authData && authData.department) {
                userData.department = authData.department;
            }
            
            this._addOutput(`Username: ${userData.username}`);
            this._addOutput(`ID: ${userData.id}`);
            this._addOutput(`Clearance: ${userData.clearanceLevel}`);
            this._addOutput(`Department: ${userData.department}`);
            this._addOutput(`Location: ${userData.site}`);
            this._addOutput(`Terminal: ${userData.terminal}`);
        });
        
        // Date command
        terminal.addCommand('date', function() {
            const now = new Date();
            this._addOutput(`Current date: ${now.toDateString()}`);
            this._addOutput(`Current time: ${now.toTimeString().split(' ')[0]}`);
        });
        
        // Dashboard command
        terminal.addCommand('dashboard', function() {
            this._addOutput('Redirecting to dashboard interface...');
            setTimeout(() => {
                window.location.href = "dashboard.html";
            }, 1000);
        });
        
        // Logout/exit command
        terminal.addCommand('logout', function() {
            this._addOutput('Logging out...');
            setTimeout(() => {
                window.location.href = "login.html";
            }, 1000);
        });
        
        // Alias exit to logout
        terminal.addCommand('exit', function() {
            this.executeCommand('logout');
        });
    }
}

// Register the custom element
customElements.define('terminal-console', TerminalConsole); 