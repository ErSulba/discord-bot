const fs = require('fs');
const path = require('path');
const express = require('express');
const {
  Client,
  GatewayIntentBits,
  PermissionsBitField
} = require('discord.js');

const configPath = path.join(__dirname, 'config.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

function saveConfig() {
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
}

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

const PORT = process.env.PORT || 3000;

app.get('/api/config', (req, res) => {
  res.json({
    prefix: config.prefix,
    role: config.permissions.setprefix
  });
});

app.post('/api/prefix', (req, res) => {
  const { prefix } = req.body;
  if (!prefix) return res.status(400).send('Missing prefix');
  config.prefix = prefix;
  saveConfig();
  res.send('Prefix updated');
});

app.post('/api/permissions', (req, res) => {
  const { role } = req.body;
  if (!role) return res.status(400).send('Missing role');
  config.permissions.setprefix = role;
  saveConfig();
  res.send('Permissions updated');
});

app.listen(PORT, () => {
  console.log(`Dashboard available on port ${PORT}`);
});

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('messageCreate', message => {
  if (!message.content.startsWith(config.prefix) || message.author.bot) return;

  const args = message.content.slice(config.prefix.length).trim().split(/\s+/);
  const command = args.shift().toLowerCase();

  switch (command) {
    case 'ping':
      message.reply('pong');
      break;
    case 'serverinfo':
      message.channel.send(`Server: ${message.guild.name}\nChannel: ${message.channel.name}`);
      break;
    case 'setprefix':
      if (
        !message.member.permissions.has(PermissionsBitField.Flags.Administrator) &&
        !message.member.roles.cache.some(r => r.name === config.permissions.setprefix)
      ) {
        return message.reply('You lack permission to change the prefix.');
      }
      if (!args[0]) return message.reply('Please provide a new prefix.');
      config.prefix = args[0];
      saveConfig();
      message.reply(`Prefix updated to ${config.prefix}`);
      break;
    default:
      break;
  }
});
client.login(process.env.BOT_TOKEN);

