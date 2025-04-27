# PookieBot

A Discord bot built with discord.js that provides various interactive commands and features.

## Description

PookieBot is a Discord bot designed to enhance server interaction with various commands and features. The bot is built using Node.js and the discord.js library.

## Features

The bot includes several commands:
- `/ping` - Check bot's latency
- `/info` - Get information about the bot
- `/say` - Make the bot say something
- `/tease` - Interactive teasing command
- `/sensual-speeds` - Speed-related interactive command
- `/cumcountdown` - Start a countdown timer
- `/extcumcountdown` - Extended countdown timer

## Technical Details

- Built with Node.js and discord.js v14
- Uses a modular command and event handler system
- Implements modern Discord interaction features
- Utilizes environment variables for secure configuration

## Prerequisites

- Node.js (Latest LTS version recommended)
- Discord Bot Token
- Discord Developer Application setup

## Installation

1. Clone the repository:
```bash
git clone [repository-url]
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your Discord bot token:
```env
TOKEN=your_discord_bot_token_here
```

4. Start the bot:
```bash
npm run bot
```

## Project Structure

```
PookieBot/
├── src/
│   ├── commands/         # Command files
│   ├── events/          # Event handler files
│   ├── index.js         # Main bot file
│   └── register-commands.js  # Command registration
├── package.json
└── README.md
```

## Dependencies

- discord.js: ^14.17.3
- dotenv: ^16.4.7
- nodemon: ^3.1.9
- @cloudflare/wrangler: ^1.21.0

## License

This project is licensed under the ISC License.

## Authors

- PookieBotTeam

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. 