'use strict';

const fs      = require('fs');
const ytdl = require('ytdl-core');
const Clapp   = require('./modules/clapp-discord');
const cfg     = require('../config.js');
const pkg     = require('../package.json');
const Dota2Api = require('dota2api');
const steam = require('steam-web');
const convertor = require('steam-id-convertor');

var s = new steam({
  apiKey: 'F6A7718A78CBE85A86831C386DC8449B',
  format: 'json' //optional ['json', 'xml', 'vdf']
});


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


    if (msg.content === 'lmao') {

    msg.channel.sendMessage('lmao xDDD lmao rofl muted kid');
  } else if (msg.content === 'weh') {

    msg.channel.sendMessage('hey demirjian whats up');

  }else if (msg.content.includes('https://www.dotabuff.com/matches/')) {

    var maxdeaths = 0;
    var testindex =0;
    var feeders = [];
    var feedernames = [];
   var matchid =  msg.content.split("/");
   

      dota.getMatchDetails(matchid[4], function (err, res) {

  Object.keys(res).forEach(function(key) {
  var val = res[key];


});
 Object.keys(res.players).forEach(function(pkey) {
  var playv = res.players[pkey];

  if (playv['deaths'] >= maxdeaths){

          maxdeaths = playv['deaths'];
        }

});
 testindex = 0;
 Object.keys(res.players).forEach(function(pkey) {
    var playv = res.players[pkey];

             if (playv['deaths'] == maxdeaths){
       
          feeders.push(playv['account_id']);

        }

     });

var feedtext = JSON.stringify(feeders, null, '\t')
var index;
var result = [];
var i;
var callo;
 var randomxd = Math.random();
  for (index = 0; index < feeders.length; ++index) {
    result.push(convertor.to64(feeders[index]));
  }
  s.getPlayerSummaries({
    steamids: result,
      callback: function(err,data){
        for( i = 0; i < data.response.players.length; i++) {
          feedernames.push(data.response.players[i].personaname);
        }

      if (randomxd > 0.5){
      msg.channel.sendMessage('Biggest feedstorm was from user/s: ' + feedernames + ' with ' +maxdeaths + ' deaths!!!');
    }else{
       msg.channel.sendMessage(feedernames + " did their best to boost everyone's gameplay with "  +maxdeaths + ' deaths!!!');
    }

      }
  });

if(res.radiant_win == false){
  if (randomxd <= 0.25){
  msg.channel.sendMessage('Dire Won. Radiant are shitstains and should probably sign up for GameLeap with promo code BSJ');
}else if (randomxd > 0.25 && randomxd <= 0.5){
  msg.channel.sendMessage('Were Radiant even trying?');
} else if(randomxd > 0.5 && randomxd <= 0.75){
msg.channel.sendMessage('Looks like Dire was DDOSing Radiant. Not a whole lot they could do about that.');
}else{
  msg.channel.sendMessage('Radiant unsuccessfully implemented the Dirk Diggler feed strat');
}
}else{
    if (randomxd <= 0.25){
  msg.channel.sendMessage('Radiant Won. Dire are shitstains and should probably sign up for GameLeap with promo code BSJ');
}else if (randomxd > 0.25 && randomxd <= 0.5){
  msg.channel.sendMessage('Were Dire even trying?');
} else if(randomxd > 0.5 && randomxd <= 0.75){
msg.channel.sendMessage('Looks like Radiant was DDOSing Dire. Not a whole lot they could do about that.');
}else{
  msg.channel.sendMessage('Dire unsuccessfully implemented the Dirk Diggler feed strat');
}
}
});
  }
  else if (msg.content ==='testo'){
     var chnnl = msg.channel.guild.channels.filter(g => {
    return g.type == 'voice' && g.name == 'DotA Call';
  }).first();;
  chnnl.join().then(connection => {          
    connection.on('speaking', (user,speaking) => {
     console.log(speaking);
console.log(user);
if (user.username =="DuckyMcCrew"){
   const dispatcher = connection.playFile('C:/Users/Evan/Desktop/quack.mp3');
} 
    });
  });
}
 else if (msg.content === 'fanx') {

    console.log(msg.author);
    msg.channel.sendMessage('GO FANX YOURSELF LMAO MUTED KID');
  } else if (msg.content === "duckymcjoin") {

 var chnnl = msg.channel.guild.channels.filter(g => {
    return g.type == 'voice' && g.name == 'DotA Call';
  }).first();;

 
            chnnl.join();

var voicecurrent = bot.voiceConnections.first();
 console.log(voicecurrent);

  
  }else if (msg.content === "leave") {

msg.channel.sendMessage('really??? fine dude fuck you');

 var chnnl = msg.channel.guild.channels.filter(g => {
    return g.type == 'voice' && g.name == 'DotA Call';
  }).first();;

            chnnl.leave();
  
  }else if (msg.content.includes("REE")){

 var chnnl = msg.channel.guild.channels.filter(g => {
    return g.type == 'voice' && g.name == 'DotA Call';
  }).first();;


const streamOptions = { seek: 0, volume: 0.2 };
chnnl.join()
 .then(connection => {
   const stream = ytdl('https://www.youtube.com/watch?v=7cmexEZGQbs', {filter : 'audioonly'});
   const dispatcher = connection.playStream(stream, streamOptions);
 })

  chnnl.leave();
  }else if (msg.content.includes("mmr")){
      if(!(msg.author.bot)){
         msg.channel.sendMessage('"mmr means nothing" -2k player');
      }
 

  }else if (msg.content.includes("quack")){

 var chnnl = msg.channel.guild.channels.filter(g => {
    return g.type == 'voice' && g.name == 'DotA Call';
  }).first();;


const streamOptions = { seek: 0, volume: 0.4 };
chnnl.join()
 .then(connection => {
   const stream = ytdl('https://www.youtube.com/watch?v=aFQoM1JhzQY', {filter : 'audioonly'});
   const dispatcher = connection.playStream(stream, streamOptions);
 })

 chnnl.leave();
}else if (msg.content.includes("wah")){

 var chnnl = msg.channel.guild.channels.filter(g => {
    return g.type == 'voice' && g.name == 'DotA Call';
  }).first();;


            chnnl.join()
            .then(connection => {
             // console.log(chnnl);
   const dispatcher = connection.playFile('C:/Users/Evan/Desktop/quack.mp3');
 }).catch(console.error);




 chnnl.leave();
}else if (msg.author.username =="SuperDj"){
   var chnnl = msg.channel.guild.channels.filter(g => {
    return g.type == 'voice' && g.name == 'DotA Call';
  }).first();;
   chnnl.join()
            .then(connection => {

   const dispatcher = connection.playFile('C:/Users/Evan/Desktop/quack.mp3');
   dispatcher.on('end', () => connection.disconnect());
 }).catch(console.error);

}

  if (app.isCliSentence(msg.content)) {
    app.parseInput(msg.content, {
      msg: msg

    });
  }
});

bot.login(cfg.token).then(() => {
  console.log('Running!');
});


