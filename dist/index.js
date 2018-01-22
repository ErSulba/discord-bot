'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _discord = require('discord.js');

var _discord2 = _interopRequireDefault(_discord);

var _config = require('./config.json');

var _config2 = _interopRequireDefault(_config);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// const Discord = require('discord.js');
var client = new _discord2.default.Client();
var owner = process.env.OWNER_ID;

client.on('ready', function () {
    console.log('I am ready!');
});

client.on('message', function (message) {
    var args = message.content.slice(_config2.default.prefix.length).trim().split(/ +/g);
    var command = args.shift().toLowerCase();

    if (!command || message.author.bot) return;

    if (command === 'ping') {
        message.reply('pong');
    }

    if (command === "asl") {
        var _args = _slicedToArray(args, 3),
            age = _args[0],
            sex = _args[1],
            location = _args[2];

        message.reply('Hello ' + message.author.username + ', i see you are ' + age + ' year old ' + sex + ' from ' + location);
    }
    //Here im trying to joke
    if (message.content === 'tu eres marisco') {
        message.reply('mas marisco sereis vos');
    }

    /* here we change the configuration of the bot */
    if (message.content.startsWith(_config2.default.prefix + "prefix")) {
        // Gets the prefix from the command (eg. "!prefix +" it will take the "+" from it)
        var newPrefix = message.content.split(" ").slice(1, 2)[0];
        // change the configuration in memory
        _config2.default.prefix = newPrefix;

        // Now we have to save the file.
        _fs2.default.writeFile("./config.json", JSON.stringify(_config2.default), function (err) {
            return console.error;
        });
    }
});

// THIS  MUST  BE  THIS  WAY
client.login('Mzk5NDA4MjIxNzAzNTAzODc0.DTMrww.jNNkTWBt40SKsFqDAbLjoxujB7g');