'use strict';

const fs      = require('fs');
const ytdl = require('ytdl-core');
const Clapp   = require('./modules/clapp-discord');
const cfg     = require('../config.js');
const pkg     = require('../package.json');
const Dota2Api = require('dota2api');



const Discord = require('discord.js');
const bot     = new Discord.Client();

var dota = new Dota2Api('F6A7718A78CBE85A86831C386DC8449B');
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
    //https://www.dotabuff.com/matches/2847913367
  }else if (msg.content.includes('https://www.dotabuff.com/matches/')) {
    // send "pong" to the same channel.
    var maxdeaths = 0;
    var feeders = [];
   var matchid =  msg.content.split("/");
   
   //msg.channel.sendMessage(matchid[4]);
      dota.getMatchDetails(matchid[4], function (err, res) {

  Object.keys(res).forEach(function(key) {
  var val = res[key];
 // console.log(key + ': ' + val);

});
 Object.keys(res.players).forEach(function(pkey) {
  var playv = res.players[pkey];
  console.log(pkey + ': ' + playv);

  Object.keys(playv).forEach(function(p2key) {
        var playerdeets = playv[p2key];
        console.log(p2key + ': ' + playerdeets);
        if (playv['deaths'] >= maxdeaths){

          maxdeaths = playv['deaths'];
        }
    });
    Object.keys(playv).forEach(function(p2key) {
        var playerdeets = playv[p2key];
        console.log(p2key + ': ' + playerdeets);
        if (playv['deaths'] == maxdeaths){
          console.log(playv['accountid'])
          //feeders.push(playv['accountid']);
        }
    });
});
var feedtext = JSON.stringify(feeders, null, '\t')
//  console.log(res.radiant_win);
if(res.radiant_win == false){
  msg.channel.sendMessage('Dire Won. Radiant are shitstains and should probably sign up for GameLeap with promo code BSJ');
   msg.channel.sendMessage('Biggest feedstorm was from users: ' +feedtext + ' with ' +maxdeaths + ' deaths');
}else{
  msg.channel.sendMessage('Radiant Won. Dire are dogshit and should probably uninstall tbqh');
   msg.channel.sendMessage('Biggest feedstorm was from users: ' + feedtext + ' with ' +maxdeaths + ' deaths');
}
});
  }
  else if (msg.content ==='testo'){
     var chnnl = msg.channel.guild.channels.filter(g => {
    return g.type == 'voice' && g.name == 'DotA Call';
  }).first();;

      //channel = channels.get("name", "World of Warcraft");
    // console.log(chnnl.find('name', 'DotA Call'));
            //bot.joinVoiceChannel(channel);
            
  chnnl.join().then(connection => {          
    connection.on('speaking', (user,speaking) => {
     console.log(speaking);
console.log(user);
if (user.username =="DuckyMcCrew"){
   const dispatcher = connection.playFile('C:/Users/Evan/Desktop/quack.mp3');
}
      //lul
      
    });
  });
}
 else if (msg.content === 'fanx') {
    // send "pong" to the same channel.
    console.log(msg.author);
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

  
  }else if (msg.content === "leave") {
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
  }else if (msg.content.includes("mmr")){
      if(!(msg.author.bot)){
         msg.channel.sendMessage('"mmr means nothing" -2k player');
      }
 

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
}else if (msg.content.includes("wah")){

 var chnnl = msg.channel.guild.channels.filter(g => {
    return g.type == 'voice' && g.name == 'DotA Call';
  }).first();;

     //channel = channels.get("name", "World of Warcraft");
    // console.log(chnnl.find('name', 'DotA Call'));
            //bot.joinVoiceChannel(channel);
            /*
            chnnl.join().then(connection => {
  connection.on('speaking', (user, speaking) => {
    if (user.username === 'evenes'){
    const dispatcher = connection.playFile('C:/Users/Evan/Desktop/quack.mp3');
  }
    dispatcher.on('end', () => connection.disconnect());
  });
});
/**/
            chnnl.join()
            .then(connection => {
             // console.log(chnnl);
   const dispatcher = connection.playFile('C:/Users/Evan/Desktop/quack.mp3');
 }).catch(console.error);



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
}else if (msg.author.username =="SuperDj"){
   var chnnl = msg.channel.guild.channels.filter(g => {
    return g.type == 'voice' && g.name == 'DotA Call';
  }).first();;
   chnnl.join()
            .then(connection => {
             // console.log(chnnl);
   const dispatcher = connection.playFile('C:/Users/Evan/Desktop/quack.mp3');
   dispatcher.on('end', () => connection.disconnect());
 }).catch(console.error);

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
