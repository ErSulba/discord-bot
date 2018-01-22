import Discord from 'discord.js'
import config from './config.json'
import fs from 'fs'


// const Discord = require('discord.js');
const client = new Discord.Client();
const owner = process.env.OWNER_ID;


client.on('ready', () => {
    console.log('I am ready!');
});

client.on('message', message => {
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if (!command || message.author.bot) return;

    if (command === 'ping') {
    	message.reply('pong');
    }

    if (command === "asl") {
        let [age, sex, location] = args;
        message.reply(`Hello ${message.author.username}, i see you are ${age} year old ${sex} from ${location}`);
      }
    //Here im trying to joke
    if (message.content === 'tu eres marisco') {
      message.reply('mas marisco sereis vos')
    }

    /* here we change the configuration of the bot */
    if(message.content.startsWith(config.prefix + "prefix")) {
        // Gets the prefix from the command (eg. "!prefix +" it will take the "+" from it)
        let newPrefix = message.content.split(" ").slice(1, 2)[0];
        // change the configuration in memory
        config.prefix = newPrefix;

        // Now we have to save the file.
        fs.writeFile("./config.json", JSON.stringify(config), (err) => console.error);
      }
});

// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);