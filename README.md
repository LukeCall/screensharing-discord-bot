### Deprecated
Unfortunately this "exploit" is no longer viable and most probably patched due to it being a released feature.

### Screensharing Discord Bot
This bot was made to allow the use of a little trick found to utilise channel screen sharing without the need of a server with the functionality.

### How do I set it up?
* Download the repository and extract the files to your desired machine.
* Navigate to the [Discord Developer](https://discordapp.com/developers/applications) website and create your app.
* Once created, convert it to a bot and put your token into `app.js`.
* Run the app like any other Node JS application `npm start`.

I also should note, you can easily add any other commands to the bot as long as you have some reasonable knowledge of `NodeJS` and the `discord.js` package. Simply add a new `.js` file to the commands folder in the modules and follow the same structure as the hangout command.

For more help with `discord.js` you should visit the [documentation](https://discord.js.org/#/docs/main/stable/general/welcome).

#### Example Ping Command
```javascript
// These are not always required but can be helpful for some discord.js functions.
// In this case they're for show.
const discord = require('discord.js');
const client = require('../../app.js');

// Currently used to show the latency within embeds within this specific command.
const moment = require('moment');

module.exports = {
    // Name of the command, used for the command's alias.
    name: 'ping',
    // Description of the command, currently no use.
    description: 'Ping the bot.',
    // Executed upon the running of the command. (Args parameter includes the command as index 0)
    execute: function(msg, args) { 
        const then = moment()
        msg.channel.send('Pinging...').then(m =>{
            let embed = new discord.RichEmbed()
                .setDescription('Pong!')
                .setColor(0x59b1ff)
                .setFooter(`${moment() - then}ms Latency`)
                .setTimestamp(new Date());
            m.edit({embed});
        })
    }
};
```

### What else is there to do?
* Create a better way of storing sessions to allow inviting people after creation.
    * _Current way involves checking the timestamps of invites compared to channels._
* Some more stuff that'll eventually bug me enough to implement.

### Who do I credit?
**Myself** for converting the idea and project into a functioning NodeJS app with added security.
<br />[**Jumpz12**](https://github.com/Jumpz12) for coming up with the initial idea and creating it into a [Python app](https://github.com/Jumpz12/screenshare-discord-bot).
