const Discord = require('discord.js');
const fs = require('fs')
const bot = new Discord.Client();
const auth = require('./auth.json')
const ytdl = require('ytdl-core');
let clips = require('./clips.json')
const streamOptions = { seek: 0, volume: 1 };


bot.login(auth.token);

bot.on('message', message => {

  let msg = message.content
  let sender = message.member
  let channel = message.member.voiceChannel

  if (!message.guild) return;

  if (msg === '.join') {
    if (channel) {
      channel.join()
      .catch(error => {
        // be surprised because my code doesnt have errors
        message.react('❗')
      })
      setTimeout(() => message.react('😩'), 0)
      setTimeout(() => message.react('🍆'), 500)
      setTimeout(() => message.react('💦'), 1000)
    } else {
      message.reply('You need to join a voice channel first!');
    }
  }

  if (msg.startsWith('.')) {
    for (let name in clips) {
      if (msg.includes(name)) {
        channel.join()
          .then(connection => {
            const stream = ytdl(clips[name].url, { filter : 'audioonly'});
            const dispatcher = connection.playStream(stream, streamOptions);
          })
      }
    }

    if (msg.startsWith('.addclip')) {

      let msgArray = msg.split(' ')

      // Has minimum # of arguments
      if (msgArray.length >= 3) {

        // First argument will be clip name, which has an object assigned to it
        // containing relevant info | url | begin time | end time |
        clips[msgArray[1]] = {}
        clips[msgArray[1]].url = msgArray[2]
        // Has additional args | begin time |
        if (msgArray.length >=4) {
         clips[msgArray[1]].begin = msgArray[3]
          // Has additional args | end time |
          if (msgArray.length >=5) {
            clips[msgArray[1]].end = msgArray[4]
          }
        }

        fs.writeFile("./clips.json", JSON.stringify(clips), function(err) {
          if (err) { // if (false) {
              console.log(err);
          }
        });      
      }
    }
  }

  if (msg === '.leave') {
    channel.leave()
  }
});
