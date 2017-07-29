'use strict';

const fs      = require('fs');
const ytdl = require('ytdl-core');
const Clapp   = require('./modules/clapp-discord');
const cfg     = require('../config.js');
const pkg     = require('../package.json');
const Dota2Api = require('dota2api');
const steam = require('steam-web');
var btc = require('btc');
const convertor = require('steam-id-convertor');
const Mika = require("mika");


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
var mika = new Mika();

// Load every command in the commands folder
fs.readdirSync('./lib/commands/').forEach(file => {
  app.addCommand(require("./commands/" + file));
});

bot.on('message', msg => {
 var server = msg.channel.guild;
 var channels = msg.channel.guild.channels;
var wahmsg =  msg.content.split(" ");

 if (msg.content === '!price') {

     btc.price(function(err, prices){
         console.log(prices);
         msg.channel.sendMessage(prices);
     });



} //Dotabuff Link Parsing
else if (msg.content.includes('https://www.dotabuff.com/matches/')) {

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
        mika.getMatch(matchid[4]).then((match) => {
           // console.log(match.chat);
          //  console.log('split');
          //  console.log(match);
          // msg.channel.sendMessage('PMA chat highlight:  ' + feedernames + ' with ' +maxdeaths + ' deaths!!!');
           var randomProperty = function (obj) {
            var keys = Object.keys(obj)
            return obj[keys[ keys.length * Math.random() << 0]];
           };

          
           console.log(randomProperty(match.chat.key))

        }).catch((err) => console.log(err));

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
        msg.channel.sendMessage('Was Radiant even trying?');
      } else if(randomxd > 0.5 && randomxd <= 0.75){
        msg.channel.sendMessage('Looks like Dire was DDOSing Radiant. Not a whole lot they could do about that.');
      }else{
        msg.channel.sendMessage('Radiant unsuccessfully implemented the Dirk Diggler feed strat');
      }
    }else{
      if (randomxd <= 0.25){
        msg.channel.sendMessage('Radiant Won. Dire are shitstains and should probably sign up for GameLeap with promo code BSJ');
      }else if (randomxd > 0.25 && randomxd <= 0.5){
        msg.channel.sendMessage('Was Dire even trying?');
      } else if(randomxd > 0.5 && randomxd <= 0.75){
        msg.channel.sendMessage('Looks like Radiant was DDOSing Dire. Not a whole lot they could do about that.');
      }else{
        msg.channel.sendMessage('Dire unsuccessfully implemented the Dirk Diggler feed strat');
      }
    }
  });
}

else if (msg.content ==='testo'){
 var chnnl= msg.member.voiceChannel;
 if (chnnl){
   chnnl.join().then(connection => {          
    connection.on('speaking', (user,speaking) => {

     if (user.username =="DuckyMcCrew"){
       const dispatcher = connection.playFile('/root/duckymcbot/lib/quack.mp3');
     } 
   });
  });
 }
}
else if (msg.content === 'fanx') {


  msg.channel.sendMessage('GO FANX YOURSELF LMAO MUTED KID');
} else if (msg.content === "duckymcjoin") {

  var chnnl= msg.member.voiceChannel;
   if (chnnl){
 chnnl.join();

 var voicecurrent = bot.voiceConnections.first();

}

}else if (msg.content === "leave" && msg.author.username =="evenes") {

  msg.channel.sendMessage('really??? fine dude fuck you');

  var chnnl= msg.member.voiceChannel;
  if (chnnl){
  chnnl.leave();
  }
}else if (msg.content === "leave" && msg.author.username != "evenes") {

 msg.channel.sendMessage("just this once... " + msg.author.username);
   var chnnl= msg.member.voiceChannel;
  if (chnnl){
  chnnl.leave();
  }

}else if (msg.content.includes("trump") || msg.content.includes("donald")){
    var chnnl= msg.member.voiceChannel;
  if (chnnl){
 var randomxdd = Math.random();
//wah

//https://www.youtube.com/watch?v=dwWDiFpPpPY
//
const streamOptions = { seek: 0, volume: 0.5 };
if (randomxdd < 0.5){
 chnnl.join()
 .then(connection => {
   const stream = ytdl('https://www.youtube.com/watch?v=19Wpp_HQ6Dg', {filter : 'audioonly'});
   const dispatcher = connection.playStream(stream, streamOptions);
    dispatcher.on("end", end => {chnnl.leave();});
 })

 //chnnl.leave();
}else{
 chnnl.join()
 .then(connection => {
   const stream = ytdl('https://www.youtube.com/watch?v=dwWDiFpPpPY', {filter : 'audioonly'});
   const dispatcher = connection.playStream(stream, streamOptions);
   dispatcher.on("end", end => {chnnl.leave();});
 })

 //chnnl.leave();
} 
}else{
  msg.channel.sendMessage('Join a voice channel' + msg.author.username + ' ya dingus');
}

}
 else if (wahmsg[0] === '!play') {
     //var videourl =  msg.content;
     var chnnl= msg.member.voiceChannel;
     var videourl =  msg.content.split(" ");

     if (chnnl){
         if(!(typeof videourl[1] === 'undefined')){
             //  var randomxdd = Math.random();
//wahgit st

//https://www.youtube.com/watch?v=dwWDiFpPpPY
//
             const streamOptions = {seek: 0, volume: 0.5};

             chnnl.join()
                 .then(connection => {
                 const stream = ytdl(videourl[1], {filter : 'audioonly'});
             const dispatcher = connection.playStream(stream, streamOptions);
             dispatcher.on("end", end => {chnnl.leave();});
         })

             //chnnl.leave();


             //chnnl.leave();
         }else{
             msg.channel.sendMessage('Add a youtube url a space after the command you stoner');

         }
     }else{
         msg.channel.sendMessage('Join a voice channel' + msg.author.username + ' ya dingus');
     }

 } else if (msg.content.includes("quack")){

 var chnnl= msg.member.voiceChannel;
   if (chnnl){

 const streamOptions = { seek: 0, volume: 0.4 };
 chnnl.join()
 .then(connection => {
   const stream = ytdl('https://www.youtube.com/watch?v=aFQoM1JhzQY', {filter : 'audioonly'});
   const dispatcher = connection.playStream(stream, streamOptions);
   dispatcher.on("end", end => {chnnl.leave();});
 })

 chnnl.leave();
}
}
else if (msg.content.includes("!help")){

     msg.channel.sendMessage("Commands are: !play <youtubeurl> and post dotabuff too links i dunno");

}else if (msg.content.includes("list")){

 var chnnl = msg.channel.guild.channels;
  //console.log(chnnl);
 var vchnnl = chnnl.filterArray(g => {
  return g.type == 'voice';
});
 //console.log(vchnnl);
 var max;
 var x;
for (x in vchnnl){
 
  console.log(vchnnl[x]);
  if (vchnnl[x].members.size > 0){
  msg.channel.sendMessage('There are ' + vchnnl[x].members.size + ' users in ' +vchnnl[x].name );
  }
}

/*for (test in chnnl.members){
  msg.channel.sendMessage(test);+ ' : ' + chnnlsort.members.size
}*/



}
/*
else if (msg.author.username =="Birdy"){
  var voiceChannel = msg.member.voiceChannel;
  if (voiceChannel){
    voiceChannel.join().then(connection =>{const dispatcher = connection.playFile('/root/duckymcbot/lib/dissappointment.mp3');

      dispatcher.on("end", end => {voiceChannel.leave();});
    }).catch(err => console.log(err));
//Create a refrence to and play the audio file;
}
else{
  msg.channel.sendMessage('join a voice channel RIGHT FUCKING NOW I HAVE SOMETHING TO TELL YOU Birdy!!!!');
}
}*/
/*
else if (msg.author.username =="evenes"){
var voiceChannel = msg.member.voiceChannel;
if (voiceChannel){
voiceChannel.join().then(connection =>{const dispatcher = connection.playFile('/root/duckymcbot/lib/ecksdee.mp3');

dispatcher.on("end", end => {voiceChannel.leave();});
}).catch(err => console.log(err));
//Create a refrence to and play the audio file;
}
else{
  msg.channel.sendMessage('join a voice channel, idiot');
}

//Slot to wait until the audio file is done playing;


//Leave channel after audio is done playing;

//Login to the application;

}*/


if (app.isCliSentence(msg.content)) {
  app.parseInput(msg.content, {
    msg: msg

  });
}
});

bot.login(cfg.token).then(() => {
  console.log('Running!');
});


/*


Add the Discord.js dependency to the project;

var Discord = require('discord.js');
Create out client variable called bot;

var bot = new Discord.Client();
Create a Boolean variable to make sure that the system doesn't overload of requests;

var isReady = true;
Next make the function to intercept the correct message;

bot.on('message', message =>{ENTER CODE HERE});
Create an if statement to check if the message is correct & if the bot is ready;

if (isReady && message.content === 'MESSAGE'){ENTER CODE HERE}
Set the bot to unready so that it cannot process events until it finishes;

isReady = false;
Create a variable for the channel that the message-sender is currently in;

var voiceChannel = message.member.voiceChannel;
Join that channel and keep track of all errors;

voiceChannel.join().then(connection =>{ENTER CODE HERE}).catch(err => console.log(err));
Create a refrence to and play the audio file;

const dispatcher = connection.playFile('./audiofile.mp3');
Slot to wait until the audio file is done playing;

dispatcher.on("end", end => {ENTER CODE HERE});
Leave channel after audio is done playing;

voiceChannel.leave();
Login to the application;

bot.login('CLIENT TOKEN HERE');

*/