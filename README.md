# SCP Foundation Access Portal

A web-based interactive project themed around the SCP Foundation universe. This project simulates an access portal to the SCP Foundation's database, featuring realistic terminal interfaces, personnel records, and SCP object files.

## Overview

The SCP Foundation Access Portal provides an immersive experience that simulates accessing a secure database of anomalous objects and entities. The interface features:

- Terminal-based login system with simulated security protocols
- Dynamic display of SCP entries based on user clearance level
- Personnel file management and viewing
- Interactive terminal console with simulated file system
- Atmospheric design with multiple theme options

## Features

### Security Clearance System
- Users are assigned random clearance levels (1-5) upon login
- Access to SCP entries and personnel files is restricted based on clearance
- Higher clearance levels reveal more sensitive information

### SCP Database
- Detailed SCP entries with containment procedures, descriptions, and incident reports
- Object class visualization (Safe, Euclid, Keter, etc.)
- Secure viewing interface with appropriate warnings and notices

### Personnel Files
- View detailed records of Foundation personnel
- Information includes biography, psychological profiles, notable incidents, and achievements
- Access restricted by security clearance

### Terminal Console
- Fully interactive command-line interface
- Simulated file system with Foundation-themed content
- Built-in commands including help, ls, cat, man, whoami, and more

### Visual Themes
- Multiple visual themes to customize the experience
- Terminal-like interface with scanlines and visual effects
- Dynamic typing animations for authentic terminal feel

## Project Structure

```
Project_SCP/
├── assets/              # Static assets
│   ├── css/             # Stylesheets
│   ├── images/          # Images and icons
│   └── js/              # JavaScript files
├── components/          # Web components
│   ├── personnel-file.js    # Personnel file viewer component
│   ├── scp-viewer.js        # SCP entry viewer component  
│   ├── terminal-console.js  # Terminal console component
│   └── terminal-typer.js    # Text typing animation component
├── data/                # Data repositories
│   ├── personnel-data.js    # Personnel information
│   └── scp-data.js          # SCP entries
└── templates/           # HTML templates
    └── pages/               # Page templates
        ├── dashboard.html   # Main dashboard
        ├── login.html       # Authentication page
        └── terminal.html    # Terminal interface
```

## Usage

1. Open the `index.html` file to start your SCP Foundation experience
2. Login with the following credentials:
   - Username: `Dr.Bright963`
   - Password: `DrBr1ght1sC00L`
3. Navigate through the dashboard to access SCP files, personnel records, or the terminal
4. Use the settings icon to change visual themes

## Terminal Commands

The terminal interface supports a variety of commands:

- `help` - Display available commands
- `ls` - List available files
- `cat [filename]` - Display file contents
- `status` - Display system status information
- `protocol [name]` - View protocol information
- `whoami` - Display current user information
- `date` - Display current date and time
- `clear` - Clear the terminal screen
- `logout` or `exit` - Exit the terminal

## Important Files

The system provides access to several key files:

- `about.txt` - Information about the SCP Foundation terminal system
- `clearance.txt` - Details on security clearance levels
- `protocols.txt` - Information on Foundation protocols
- `help.txt` - List of available commands
- `history.txt` - Command history log

## Themes

- **Default** - Classic green terminal interface
- **Night** - Blue text on black background
- **Ice** - Light blue interface with dark background
- **Demon** - Red theme for emergency protocols
- **Galaxy** - Purple interface for an otherworldly experience

## Security Clearance Levels

- **Level 1: Confidential** - Access to Safe class SCPs only
- **Level 2: Restricted** - Access to Safe and Euclid class SCPs
- **Level 3: Secret** - Access to Safe, Euclid, and Keter class SCPs
- **Level 4: Top Secret** - Access to most SCPs including Thaumiel class
- **Level 5: O5 Command** - Unrestricted access to all Foundation data

## Credits

This project is based on the SCP Foundation creative fiction writing project (http://www.scpwiki.com/).

The SCP Foundation and all related concepts are licensed under Creative Commons Attribution-ShareAlike 3.0 (CC BY-SA 3.0).

This is a fan project and is not officially affiliated with or endorsed by the SCP Foundation.

## Future Development Plans

- Expanded SCP database with more entries
- Additional terminal commands and functionality
- Mobile-responsive design improvements
- More interactive elements and animations
- Expanded lore and Foundation documents
- Dedicated pages for individual SCP entries with full documentation
- Comprehensive MTF (Mobile Task Force) profile pages
- Detailed Personnel dossier pages with complete career history
- Fully functional terminal interface with expanded command set and filesystem
- Interactive containment breach simulation events
