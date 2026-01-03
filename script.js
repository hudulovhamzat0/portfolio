document.addEventListener('DOMContentLoaded', () => {
    const terminalContent = document.getElementById('terminal-content');
    let currentLine = document.getElementById('current-line');
    let commandHistory = [];
    let historyIndex = -1;
    let currentCommand = '';

const commands = {
    'help': () => {
        return `Available commands:
help        - Show this help menu
clear       - Clear terminal
ls          - List files
tree        - Show directory tree
pwd         - Print working directory
whoami     - Show current user
uname       - System information
neofetch   - System info
cat         - Read file
echo        - Print text
date        - Show date
uptime     - System uptime
history    - Command history
top        - Process viewer
man         - Manual pages
sudo       - Try root access
github     - Open GitHub
instagram  - Open Instagram
discord    - Open Discord
socials    - Show social links`;
    },

    'ls': () => `projects  scripts  README.md  portfolio.txt`,

    'tree': () => {
        return `.
├── projects
│   ├── linux-monitor
│   └── terminal-portfolio
├── scripts
│   └── deploy.sh
├── README.md
└── portfolio.txt`;
    },

    'pwd': () => `/home/guest`,

    'whoami': () => `guest`,

    'uname': () => `Linux hudulOS 6.8.0 x86_64 GNU/Linux`,

    'neofetch': () => `
      /\\_/\\
     ( o.o )   guest@hudulOS
      > ^ <    -------------
OS: Debian 13 
Kernel: 6.8.0
Shell: websh
User: guest
Terminal: terminal
CPU: Intel Core i7-9700K
Memory: 3.2GB / 16GB
RAM: 16GB
    `,

    'cat': (args) => {
        if (!args) return 'cat: missing file operand';

        if (args === 'README.md') {
            return `Welcome.
This is Hudul's terminal portfolio.
Access level: guest`;
        }

        if (args === 'portfolio.txt') {
            return `Projects:
- Spotify Wallpaper
- Linux Monitor
- Terminal Portfolio`;
        }

        return `cat: ${args}: No such file`;
    },

    'echo': (args) => args || '',

    'date': () => new Date().toString(),

    'uptime': () => `up 4 days, 2 hours, 11 minutes`,

    'history': () => {
        return `1 ls
2 pwd
3 whoami
4 neofetch
5 cat README.md`;
    },

    'top': () => {
        return `PID   USER   CPU%  MEM%  COMMAND
1023  root   12.3  4.1   systemd
1337  guest  5.4   1.2   websh
2048  guest  2.1   0.8   terminal`;
    },

    'man': (args) => {
        if (!args) return 'man: missing command';
        return `No manual entry for ${args}`;
    },

    'sudo': () => {
        return `guest is not in the sudoers file.
This incident will be reported.`;
    },

    'clear': () => {
        terminalContent.innerHTML = `
            <div class="line">
                <span class="prompt">guest@hudulOS:~%></span>
                <span class="command" id="current-line" contenteditable="true"></span>
            </div>
        `;
        currentLine = terminalContent.querySelector('#current-line');
        currentLine.focus();
        return null;
    },

    'github': () => {
        window.open('https://github.com/hudulovhamzat0', '_blank');
        return 'Opening GitHub...';
    },

    'instagram': () => {
        window.open('https://instagram.com/hudulovhamzat', '_blank');
        return 'Opening Instagram...';
    },

    'discord': () => {
        window.open('https://discord.com/users/YOUR_DISCORD_ID', '_blank');
        return 'Opening Discord...';
    },

    'socials': () => {
        return `GitHub    → github.com/hudulovhamzat0
Instagram → instagram.com/hudulovhamzat
Discord   → discord.com/users/YOUR_DISCORD_ID`;
    }
};




    terminalContent.addEventListener('click', () => {
        currentLine.focus();
    });

    document.addEventListener('keydown', (e) => {
        if (!terminalContent.contains(document.activeElement)) return;

        switch(e.key) {
            case 'Enter':
                e.preventDefault();
                processCommand();
                break;
            case 'Backspace':
                if (currentCommand.length > 0) {
                    currentCommand = currentCommand.slice(0, -1);
                    updateCurrentLine();
                }
                e.preventDefault();
                break;
            case 'ArrowUp':
                navigateHistory('up');
                e.preventDefault();
                break;
            case 'ArrowDown':
                navigateHistory('down');
                e.preventDefault();
                break;  
            default:
                if (e.key.length === 1 && !e.ctrlKey && !e.altKey && !e.metaKey) {
                    currentCommand += e.key;
                    updateCurrentLine();
                    e.preventDefault();
                }
        }
    });

    function processCommand() {
        const cmd = currentCommand.trim().toLowerCase();
        
        if (cmd === 'clear') {
            commands['clear']();
        } else {
            const commandDiv = document.createElement('div');
            commandDiv.className = 'line';
            commandDiv.innerHTML = `<span class="prompt">hudul@guest:~%></span><span class="command-text">${currentCommand}</span>`;
            
            const lastLine = terminalContent.lastElementChild;
            terminalContent.removeChild(lastLine);
            
            terminalContent.appendChild(commandDiv);

            if (currentCommand.trim()) {
                const output = document.createElement('div');
                output.className = 'output';

                if (commands[cmd]) {
                    const result = commands[cmd]();
                    if (result !== null) {
                        output.textContent = result;
                        terminalContent.appendChild(output);
                    }
                } else {
                    output.textContent = `'${currentCommand}' is not recognized as an internal or external command.`;
                    terminalContent.appendChild(output);
                }
            }

            const newLine = document.createElement('div');
            newLine.className = 'line';
            newLine.innerHTML = `
                <span class="prompt">hudul@guest:~%</span>
                <span class="command" id="current-line" contenteditable="true"></span>
            `;
            terminalContent.appendChild(newLine);
        }

        if (currentCommand.trim()) {
            commandHistory.push(currentCommand);
            historyIndex = commandHistory.length;
        }

        currentCommand = '';
        currentLine = terminalContent.querySelector('#current-line');
        currentLine.focus();
        
        terminalContent.scrollTop = terminalContent.scrollHeight;
    }

    function updateCurrentLine() {
        if (currentLine) {
            currentLine.textContent = currentCommand;
        }
    }

    function navigateHistory(direction) {
        if (commandHistory.length === 0) return;

        if (direction === 'up') {
            historyIndex = Math.max(0, historyIndex - 1);
        } else {
            historyIndex = Math.min(commandHistory.length, historyIndex + 1);
        }

        currentCommand = historyIndex < commandHistory.length ? commandHistory[historyIndex] : '';
        updateCurrentLine();
    }
});
