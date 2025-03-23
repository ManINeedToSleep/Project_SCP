/**
 * Terminal Typer Component
 * A custom element that simulates terminal typing effect
 */

class TerminalTyper extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        
        // Default properties
        this._text = '';
        this._speed = 50; // milliseconds per character
        this._cursor = true;
        this._delay = 0; // delay before typing starts
        this._complete = false;
        this._paused = false;
        this._htmlMode = false; // Whether to parse as HTML
        this._textNodes = [];
        
        // Create a temporary element for HTML parsing
        this._tempElement = document.createElement('div');
        
        // Bind methods
        this._typeText = this._typeText.bind(this);
    }

    static get observedAttributes() {
        return ['text', 'speed', 'cursor', 'delay', 'instant', 'html-mode'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue) return;
        
        switch (name) {
            case 'text':
                this._text = newValue || '';
                break;
            case 'speed':
                this._speed = parseInt(newValue) || 50;
                break;
            case 'cursor':
                this._cursor = newValue !== 'false';
                break;
            case 'delay':
                this._delay = parseInt(newValue) || 0;
                break;
            case 'html-mode':
                this._htmlMode = newValue === 'true';
                break;
            case 'instant':
                if (newValue === 'true') {
                    this._complete = true;
                    this.render();
                }
                break;
        }
    }

    connectedCallback() {
        this.render();
        if (!this._complete) {
            setTimeout(() => {
                this._typeText();
            }, this._delay);
        }
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    font-family: monospace;
                    color: var(--main-color, #80FF80);
                    width: 100%;
                    margin-bottom: 20px; /* Add default bottom margin to all components */
                }
                .cursor {
                    display: inline-block;
                    width: 0.6em;
                    height: 1.2em;
                    background-color: var(--main-color, #80FF80);
                    animation: blink 1s infinite;
                    vertical-align: text-bottom;
                    margin-left: 2px;
                    box-shadow: 0 0 8px var(--main-color, #80FF80);
                }
                @keyframes blink {
                    0%, 49% { opacity: 1; }
                    50%, 100% { opacity: 0; }
                }
                .typed-text {
                    white-space: pre-wrap;
                    display: block;
                    max-width: 100%;
                    line-height: 1.5; /* Improve line spacing */
                }
                blockquote {
                    background-color: rgba(0, 0, 0, 0.5);
                    border: double 3px var(--main-color, #80FF80);
                    width: 80%;
                    max-width: 875px;
                    margin: 30px auto;
                    padding: 20px;
                    display: block;
                    box-shadow: 0 0 10px rgba(128, 255, 128, 0.3);
                }
                ul {
                    padding-left: 20px;
                    text-align: left;
                    margin: 15px 0;
                }
                li {
                    margin-bottom: 10px;
                    list-style-type: disc;
                }
                a {
                    color: var(--main-color, #80FF80);
                    text-decoration: none;
                    display: inline-block;
                    padding: 10px 25px;
                    border: 1px solid var(--main-color, #80FF80);
                    transition: all 0.3s ease;
                    box-shadow: 0 0 5px rgba(128, 255, 128, 0.3);
                    margin-top: 20px;
                    font-size: 1.1em;
                }
                a:hover {
                    color: var(--hover-text-color, #131);
                    background-color: var(--main-color, #80FF80);
                    transform: translateY(-2px);
                    box-shadow: 0 0 15px rgba(128, 255, 128, 0.6);
                }
                a:hover::before {
                    content: "> ";
                }
                hr {
                    border-color: var(--main-color, #80FF80);
                    opacity: 0.5;
                    margin: 20px 0;
                }
                p {
                    margin: 15px 0;
                    line-height: 1.6;
                }
                span {
                    display: inline;
                }
                .container {
                    margin: 0 15px;
                    text-align: left;
                }
                @media (max-width: 1024px) {
                    blockquote {
                        width: 90%;
                    }
                }
                @keyframes textGlow {
                    0% { text-shadow: 0 0 4px rgba(128, 255, 128, 0.3); }
                    50% { text-shadow: 0 0 8px rgba(128, 255, 128, 0.5); }
                    100% { text-shadow: 0 0 4px rgba(128, 255, 128, 0.3); }
                }
                .completed {
                    animation: textGlow 3s infinite ease-in-out;
                }
            </style>
            <span class="typed-text ${this._complete ? 'completed' : ''}">${this._complete ? this._getContent() : ''}</span>
            ${this._cursor && !this._complete ? '<span class="cursor"></span>' : ''}
        `;
    }

    _getContent() {
        if (this._htmlMode) {
            return this._text;
        } else {
            return this._escapeHtml(this._text);
        }
    }

    _escapeHtml(html) {
        this._tempElement.textContent = html;
        return this._tempElement.innerHTML;
    }

    _extractTextNodes(element, textNodes = []) {
        if (!element) return textNodes;
        
        for (let node of element.childNodes) {
            if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
                textNodes.push({
                    node: node,
                    text: node.textContent,
                    currentLength: 0
                });
            } else if (node.nodeType === Node.ELEMENT_NODE) {
                this._extractTextNodes(node, textNodes);
            }
        }
        
        return textNodes;
    }

    _typeText() {
        if (this._paused || this._complete) return;
        
        const typedTextElement = this.shadowRoot.querySelector('.typed-text');
        
        if (this._htmlMode) {
            // Only set up the HTML content once
            if (!typedTextElement.innerHTML) {
                typedTextElement.innerHTML = this._text;
                
                // Now that the DOM is loaded, extract all text nodes for typing animation
                this._textNodes = this._extractTextNodes(typedTextElement);
                
                // Hide all text initially
                this._textNodes.forEach(textNodeInfo => {
                    textNodeInfo.node.textContent = '';
                });
                
                // Start typing the first node
                this._typeNextCharacter();
            }
        } else {
            // For plain text mode, type character by character
            const currentTextLength = typedTextElement.textContent.length;
            
            if (currentTextLength < this._text.length) {
                typedTextElement.textContent += this._text[currentTextLength];
                setTimeout(this._typeText, this._speed);
            } else {
                this._complete = true;
                typedTextElement.classList.add('completed');
                this.dispatchEvent(new CustomEvent('typing-complete'));
                this.render();
            }
        }
    }
    
    _typeNextCharacter() {
        if (this._paused || this._complete) return;
        
        // Find the current text node to type
        const currentNodeInfo = this._textNodes.find(nodeInfo => 
            nodeInfo.currentLength < nodeInfo.text.length
        );
        
        if (currentNodeInfo) {
            // Type the next character
            currentNodeInfo.currentLength++;
            currentNodeInfo.node.textContent = currentNodeInfo.text.substring(0, currentNodeInfo.currentLength);
            
            // Schedule the next character
            setTimeout(() => this._typeNextCharacter(), this._speed);
        } else {
            // All nodes are typed
            this._complete = true;
            const typedTextElement = this.shadowRoot.querySelector('.typed-text');
            typedTextElement.classList.add('completed');
            this.dispatchEvent(new CustomEvent('typing-complete'));
            this.render();
        }
    }

    /**
     * Start or resume typing
     */
    start() {
        if (!this._complete && this._paused) {
            this._paused = false;
            this._typeText();
        }
    }

    /**
     * Pause typing
     */
    pause() {
        this._paused = true;
    }

    /**
     * Reset and start over
     */
    reset() {
        const typedTextElement = this.shadowRoot.querySelector('.typed-text');
        typedTextElement.textContent = '';
        typedTextElement.classList.remove('completed');
        this._complete = false;
        this._paused = false;
        this._textNodes = [];
        this.render();
        setTimeout(() => {
            this._typeText();
        }, this._delay);
    }

    /**
     * Instantly complete typing
     */
    complete() {
        this._complete = true;
        const typedTextElement = this.shadowRoot.querySelector('.typed-text');
        typedTextElement.classList.add('completed');
        this.render();
        this.dispatchEvent(new CustomEvent('typing-complete'));
    }

    /**
     * Change the text to be typed
     * @param {string} text - The new text
     * @param {boolean} reset - Whether to reset and start typing again
     */
    setText(text, reset = true) {
        this._text = text;
        if (reset) {
            this.reset();
        }
    }
}

// Register the custom element
customElements.define('terminal-typer', TerminalTyper); 