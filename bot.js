const Discord = require('discord.js'),
client = new Discord.Client();
express = require("express"),
prefix = 'nrj!',
app = express(),
yt = require("nrj542/youtube-plugin"),
youtube_plugin = new yt(),
AuthDetails = require("nrj542/auth.json"),
Music = require("nrj542/Music.js"),
ffmpeg = require("ffmpeg"),
moment = require("moment");
music = new Music(),
opts = {
	maxResults: 3,
	key: AuthDetails.youtube_api_key
};

client.on('ready' , () => {
	var memberCount = client.users.size;
var servercount = client.guilds.size;
    var servers = client.guilds.array().map(g => g.name).join(',');
	console.log('-----------------------------------Radio NRJ--------------------------------'.error)
	console.log("[!]Bot: Musique".error + "\n[!]Le préfix actuelle: ".warn + "nrj!" + "\n[!]Nombre de membres: ".help + memberCount + "\n[!]Nombre de serveurs: ".debug + servercount + "\n[!]Nom des servers :".data + servers)
	console.log('--------------------------------------------------------------------------'.error)
})//le lancement du bot

client.on("message", message => {
  const messagec = message.content;
if (message.content === prefix +'setgame'){
 if(message.author.id !=="175656408459640832")return;
 message.reply("**Le jeu vient d'être changé!**");
  client.user.setGame(`la radio NRJ`)
}})


client.on('message', message => {
if (message.content.startsWith(prefix + 'nrj')) {
  if (message.member.voiceChannel) {
    message.member.voiceChannel.join()
      .then(connection => {
        const dispatcher = connection.playStream('http://cdn.nrjaudio.fm/audio1/fr/30001/mp3_128.mp3?origine=fluxradios');
        const embed = new Discord.RichEmbed()
        .setColor(0xDC143C)
        .setTimestamp()
        .addField(':radio: | En lecture...', "Radio NRJ")
        .setFooter(`Radio lancée par: ${message.author.username}`)// CORRIGE STP :'   C'EST QUOI QUE TU VEUT QUE JE CORRIGE J'te montre
        message.channel.sendEmbed(embed)
      })
      .catch(console.log);
  } else {
    const embed = new Discord.RichEmbed()
    .setColor(0xDC143C)
    .setTimestamp()
    .addField(':radio: | Avant de mettre NRJ...', "Rejoigniez un channel vocal!")
    .setFooter(`Radio lancée par : ${message.author.username}`)
    message.channel.sendEmbed(embed)
  }
}
})

client.on('message', message => {
if(message.content === prefix + "stop"){
  if(client.voiceChannel)
    return message.channel.sendMessage("Je ne suis pas dans un channel vocal.");
let voiceChannel = message.member.voiceChannel;
voiceChannel.leave()
};
})


app.listen(AuthDetails.port);
client.login(process.env.BOT_TOKEN)
