const discord = require('discord.js');
const client = require('../app.js');

const prefix = ">";

const fs = require('fs');
client.commands = new discord.Collection();

const command_dir = fs.readdirSync('./modules/commands');

for (const file of command_dir) {
    const command = require("./commands/" + file);
    client.commands.set(command.name, command);
}

function command(msg) {
    if (!msg.content.startsWith(prefix)) return;
    const args = msg.content.slice(prefix.length).split(/ +/);
    const name = args.shift().toLowerCase();
    if (!client.commands.has(name)) return;
    const command = client.commands.get(name);
    try {
        command.execute(msg, args);
    } catch (error) {
        console.log(error);
        msg.reply("there seems to have been a problem. Sorry!")
    }
}

module.exports = command;