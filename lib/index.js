'use strict';

const fs      = require('fs');
const ytdl = require('ytdl-core');
const Clapp   = require('./modules/clapp-discord');
const cfg     = require('../config.js');
const pkg     = require('../package.json');
const Discord = require('discord.js');
const bot     = new Discord.Client();


var app = new Clapp.App({
  name: cfg.name,
  desc: pkg.description,
  prefix: cfg.prefix,
  version: pkg.version,
  onReply: (msg, context) => {
    // Fired when input is needed to be shown to the user.

    context.msg.reply('\n' + msg).then(bot_response => {
      if (cfg.deleteAfterReply.enabled) {
        context.msg.delete(cfg.deleteAfterReply.time)
          .then(msg => console.log(`Deleted message from ${msg.author}`))
          .catch(console.log);
        bot_response.delete(cfg.deleteAfterReply.time)
          .then(msg => console.log(`Deleted message from ${msg.author}`))
          .catch(console.log);
      }
    });
  }
});

// Load every command in the commands folder
fs.readdirSync('./lib/commands/').forEach(file => {
  app.addCommand(require("./commands/" + file));
});

bot.on('message', msg => {
   var server = msg.channel.guild;
      var channels = msg.channel.guild.channels;
//console.log(channels);
    //  var input = msg.content.toUpperCase();
  /*  var server = msg.channel.server;
   // var roles = msg.channel.server.roles;
    var user = msg.author;
    var role;
    var roleName = msg.content.split(" "); 
    var channels = msg.channel.server.channels;
    var channel;
    var reserved;    */
  // Fired when someone sends a message
    if (msg.content === 'lmao') {
    // send "pong" to the same channel.
    msg.channel.sendMessage('lmao xDDD lmao rofl muted kid');
  } else if (msg.content === 'weh') {
    // send "pong" to the same channel.
    msg.channel.sendMessage('hey demirjian whats up');
  }
 else if (msg.content === 'WAH') {
    // send "pong" to the same channel.
    msg.channel.sendMessage('QUACK QUACK QUACK FUCK YOU');
  }else if (msg.content === 'fanx') {
    // send "pong" to the same channel.
    msg.channel.sendMessage('GO FANX YOURSELF LMAO MUTED KID');
  } else if (msg.content === "duckymcjoin") {
   // msg.channel.guild.
 var chnnl = msg.channel.guild.channels.filter(g => {
    return g.type == 'voice' && g.name == 'DotA Call';
  }).first();;

     //channel = channels.get("name", "World of Warcraft");
    // console.log(chnnl.find('name', 'DotA Call'));
            //bot.joinVoiceChannel(channel);
            chnnl.join();

var voicecurrent = bot.voiceConnections.first();
 console.log(voicecurrent);
                  //var connection = client.internal.voiceConnection;

/*
.then(connection => {
     console.log('playing');
    connection.playFile('./quack.mp3');
   })
   .catch(err => console.log(err));
*/

  
  }else if (msg.content === "dude you should leave") {
   // msg.channel.guild.
msg.channel.sendMessage('really??? fine dude fuck you');

 var chnnl = msg.channel.guild.channels.filter(g => {
    return g.type == 'voice' && g.name == 'DotA Call';
  }).first();;

     //channel = channels.get("name", "World of Warcraft");
    // console.log(chnnl.find('name', 'DotA Call'));
            //bot.joinVoiceChannel(channel);
            chnnl.leave();
  
  }else if (msg.content.includes("REE")){

 var chnnl = msg.channel.guild.channels.filter(g => {
    return g.type == 'voice' && g.name == 'DotA Call';
  }).first();;

     //channel = channels.get("name", "World of Warcraft");
    // console.log(chnnl.find('name', 'DotA Call'));
            //bot.joinVoiceChannel(channel);
            /*
            chnnl.join().then(connection => {
              console.log(chnnl);
   const dispatcher = connection.playFile('C:/discordbot/lib/quack.mp3');
 })

*/
const streamOptions = { seek: 0, volume: 0.2 };
chnnl.join()
 .then(connection => {
   const stream = ytdl('https://www.youtube.com/watch?v=7cmexEZGQbs', {filter : 'audioonly'});
   const dispatcher = connection.playStream(stream, streamOptions);
 })
/*
       if (voicecurrent) {

       
      // ...tell the user that you will play the file...
      msg.channel.sendMessage('lul');
      // ...get the voice connection that is currently active...
    //  var connection = bot.voiceConnections;
      // ...get the path from which to load the file (the hardcoded directory
      // concatenated with the argument to the command)...
     // var filePath = LOADDIR + rest
      // ...and play the file
      var file = 'C:/discordbot/lib/quack.mp3';
      
      voicecurrent.playFile(file);

    }
 */
  chnnl.leave();
  }else if (msg.content === "!mmr"){

  msg.channel.sendMessage('"mmr means nothing" -2k player');

  }else if (msg.content.includes("quack")){

 var chnnl = msg.channel.guild.channels.filter(g => {
    return g.type == 'voice' && g.name == 'DotA Call';
  }).first();;

     //channel = channels.get("name", "World of Warcraft");
    // console.log(chnnl.find('name', 'DotA Call'));
            //bot.joinVoiceChannel(channel);
            /*
            chnnl.join().then(connection => {
              console.log(chnnl);
   const dispatcher = connection.playFile('C:/discordbot/lib/quack.mp3');
 })

*/
const streamOptions = { seek: 0, volume: 0.4 };
chnnl.join()
 .then(connection => {
   const stream = ytdl('https://www.youtube.com/watch?v=aFQoM1JhzQY', {filter : 'audioonly'});
   const dispatcher = connection.playStream(stream, streamOptions);
 })
/*
       if (voicecurrent) {

       
      // ...tell the user that you will play the file...
      msg.channel.sendMessage('lul');
      // ...get the voice connection that is currently active...
    //  var connection = bot.voiceConnections;
      // ...get the path from which to load the file (the hardcoded directory
      // concatenated with the argument to the command)...
     // var filePath = LOADDIR + rest
      // ...and play the file
      var file = 'C:/discordbot/lib/quack.mp3';
      
      voicecurrent.playFile(file);

    }
 */
 chnnl.leave();
}
  if (app.isCliSentence(msg.content)) {
    app.parseInput(msg.content, {
      msg: msg
      // Keep adding properties to the context as you need them
    });
  }
});

bot.login(cfg.token).then(() => {
  console.log('Running!');
});
