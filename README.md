# kn11space-discord-bot

## Settings up the bot (linux + pm2)

1. First at all, install reqs:
    * Node.js v16.6.0+
    * npm that matches your node version
    * pm2
2. Copying this repo on your machine:
    * I'm recommending doing all this stuff in your /home dir
    ```bash
    git clone https://github.com/vo1ter/kn11space-discord-bot
    ```
3. Installing node.js packages
    ```bash
    cd kn11-space-discord-bot
    npm i
    ```
4. Creating config file:
    ```json
    {
        "token": "* your bot token from https://discord.com/developers *",
        "devGuildId": "* your testing guild id *",
        "clientId": "* your application id from Discord Developer Portal *"
    }
    ```
5. Deploying commands:
    ```bash
    node deploy-commands.js
    ```
6. Launching your bot with pm2:
    ```bash
    pm2 start bot.js
    ```
6. Done!

## ToDo
- [ ] Unban
- [ ] Schedule for all days
- [ ] User info