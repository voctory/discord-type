// setting up the script
const discord = require("./node_modules/discord.js");
const bot = new discord.Client();
const fs = require("fs");

// is typing enabled?
var typing = {};

// checking for message
bot.on("message", message => {
	if(message.author.id !== bot.user.id && message.content.startsWith("/") == false) return;
	if (typing[message.channel.id] == false && message.content.startsWith("/typing") == true) startTyping(message);
	else if (typing[message.channel.id] == undefined && message.content.startsWith("/typing") == true) startTyping(message);
	else if (message.content.startsWith("/typing") == true) stopTyping(message);
	else if (message.content.startsWith("/exit") == true) exitFunction(message);
});

// functions for typing
function startTyping(message) {
	message.channel.startTyping();
	message.edit("**Typing has been enabled.**");
	typing[message.channel.id] = true;
}

function stopTyping(message) {
	message.channel.stopTyping()
	message.edit("**Typing has been disabled.**");
	typing[message.channel.id] = false;
}

// function to exit script
function exitFunction(message) {
	message.edit("**Typing script has been stopped.**");
	setTimeout( () => { process.exit() }, 250);
}

// fired when logged in successfully
bot.on("ready", function() {
	console.log("\033c");
	console.log(`The script has been loaded.\n\nThe Typing Script:\n\n- User: ${bot.user.username}#${bot.user.discriminator}\n- User ID: ${bot.user.id}\n- Servers: ${Array.from(bot.guilds).length}`);
})

// logging in
if (JSON.parse(fs.readFileSync('./login.json', 'utf8')).token !== "<user_token_here>") bot.login(JSON.parse(fs.readFileSync('./login.json', 'utf8')).token);
else if (JSON.parse(fs.readFileSync('./login.json', 'utf8')).email !== "<user_email_here>" && JSON.parse(fs.readFileSync('./login.json', 'utf8')).password !== "<user_password_here>")bot.login(JSON.parse(fs.readFileSync('./login.json', 'utf8')).email, JSON.parse(fs.readFileSync('./login.json', 'utf8')).password);
else console.log("\033c\nYou didn't fill in the login.json file correctly!");