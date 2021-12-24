const {Client} = require('discord.js');
const token= process.env.DISCORD_TOKEN

  const client = new Client();
client.on('ready', () => {
  console.log("THE KING HAS RISEN!")
  console.log(`Logged in as ${client.user.tag}!`);
})

client.on('message', msg => {
  switch(msg.content){
    case "owner": 
    msg.channel.send(`Owner of ${msg.guild.name}: ${msg.guild.owner}`)
    break;
    case "isBot":
    msg.channel.send(`${msg.guild.name} bot: ${client.user.tag}!`)
    break;
    default:
    break;
  }
});

client.login(token);



