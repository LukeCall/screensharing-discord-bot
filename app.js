const discord = require('discord.js');
const client = new discord.Client();
const command = require('./modules/commands.js');
const moment = require('moment');

client.on('ready', () => {
    console.log('Connected.')
    client.user.setActivity('>hangout', { type: 'WATCHING' })
});

client.on('message', (msg) => {
    if (msg.author.bot) return;
    command(msg)
});

client.on('messageReactionAdd', (reaction, user) => {
    let embed;
    const then = moment();
    if (reaction.message.guild === null && reaction.message.author.username === client.user.username && !user.bot) {
        if (reaction.emoji.name === "👍") {
            const name = reaction.message.createdTimestamp.toString().substring(0, 9) + '-hangout';
            let found = false;
            client.guilds.forEach((guild) => {
                if (!found) {
                    if (guild.channels.find(channel => channel.name === name) !== null) {
                        found = true;
                        const voice = guild.channels.find(channel => channel.name === name).id;
                        const url = `https://discordapp.com/channels/${guild.id}/${voice}`;
                        guild.members.get(user.id).setVoiceChannel(guild.channels.find(channel => channel.name === name).id);
                        guild.channels.find(channel => channel.name === name).overwritePermissions(user, { // Pass 'UserResolvable' type thing as described in Wiki!
                            VIEW_CHANNEL: true
                        });
                        reaction.message.delete();
                        reaction.message.channel.send('Accepting...').then(m => {
                            embed = new discord.RichEmbed()
                                .setDescription(`Click [here](${url}) to join the hangout.`)
                                .setColor(0x59b1ff)
                                .setFooter(`${moment() - then}ms Latency`)
                                .setTimestamp(new Date());
                            m.edit({embed});
                        })
                    }
                }
            })
        } else if (reaction.emoji.name === "👎") {
            reaction.message.delete();
        }
    }
});

client.on('voiceStateUpdate', (then, now) => {
    if ((now.voiceChannel !== then.voiceChannel || now.voiceChannel !== undefined) && then.voiceChannel.name.substring(9) === '-hangout') {
        if (then.voiceChannel.members.size < 1) {
            then.voiceChannel.delete()
        }
    }
});

client.login('NTUzNzI3NTc4MDcwOTc0NDY0.XKwhqA.zKGGNcrw_hHccwGsEhQkPFYQ4C4');

module.exports = client;