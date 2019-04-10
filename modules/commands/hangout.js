const discord = require('discord.js'); // These are not always required but can be helpful for some discord.js functions.
const client = require('../../app.js'); // In this case they're for show.

const moment = require('moment'); // Currently used to show the latency within embeds within this specific command.

module.exports = {
    name: 'hangout', // Name of the command, used for the command's alias.
    description: 'Start a hangout.', // Description of the command, currently no use.
    execute: function(msg, args) { // Executed upon the running of the command. (Args parameter includes the command as index 0)
        let embed;
        const then = moment();
        msg.channel.send('Creating...').then(m =>{
            let url = `https://discordapp.com/channels/${msg.guild.id}/`;
            if (msg.member.voiceChannel !== undefined) {
                msg.guild.createChannel(`${msg.createdTimestamp.toString().substring(0, 9)}-hangout`, 'voice', [
                    {
                        id: msg.guild.id,
                        deny: ['READ_MESSAGES'],
                    },
                    {
                        id: msg.author.id,
                        allow: ['READ_MESSAGES'],
                    },
                ]).then((hangout) => {
                    msg.member.setVoiceChannel(hangout.id).then(() => {
                        url = url + hangout.id;
                        msg.member.createDM().then((channel) => {
                            channel.send('Accepting...').then(m => {
                                embed = new discord.RichEmbed()
                                    .setDescription(`Click [here](${url}) to join the hangout.`)
                                    .setColor(0x59b1ff)
                                    .setFooter(`${moment() - then}ms Latency`)
                                    .setTimestamp(new Date());
                                m.edit({embed});
                            })
                        })
                    });
                });
                msg.guild.channels.get(msg.member.voiceChannelID).members.forEach((user) => {
                    if (user !== msg.member) {
                        user.createDM().then((channel) => {
                            channel.send('Inviting...').then(m => {
                                embed = new discord.RichEmbed()
                                    .setDescription(`You were invited to a hangout, react to accept.`)
                                    .setColor(0x59b1ff)
                                    .setFooter(`${moment() - then}ms Latency`)
                                    .setTimestamp(new Date());
                                m.edit({embed});
                                m.react('👍');
                                m.react('👎');
                            })
                        })
                    }
                });
                embed = new discord.RichEmbed()
                    .setDescription(`All users in the voice channel were invited ${msg.author}.`)
                    .setColor(0x5adb51)
                    .setFooter(`${moment() - then}ms Latency`)
                    .setTimestamp(new Date());
            } else {
                embed = new discord.RichEmbed()
                    .setDescription(`You're not in a voice channel.`)
                    .setColor(0xffa13d)
                    .setFooter(`${moment() - then}ms Latency`)
                    .setTimestamp(new Date());
            }
            m.edit({embed});
        })
    }
};