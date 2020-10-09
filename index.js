/* eslint-disable indent */
/* eslint-disable semi */
/* eslint-disable space-in-parens */
/* eslint-disable quotes */
/* eslint-disable no-trailing-spaces */
const fs = require('fs');
const Discord = require('discord.js');
// const osmosis = require('osmosis');
const { prefix, token } = require('./config.json');

const client = new Discord.Client();
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);

	client.commands.set(command.name, command);
}

client.once('ready', () => {
	console.log('Бот работает.');
});

client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

	if (command === 'изи?') {
		message.channel.send('изи изи изи изи изи чел.');
	} else if (command === 'инфа') {
		message.channel.send('Я пешка Макса.');
	} else if (command === 'чтозначит') {
		if (!args.length) {
			return message.channel.send(`Хоть что-то написал бы, ${message.author}.`);
		} else if (args[0] === 'паша') {
			return message.channel.send('Пешка.');
		} else if (args[0] === 'макс') {
			return message.channel.send('Крут.');
		}
    
		message.channel.send(`Возможно... ${args[0]}.`);
	} else if (command === 'сервер') {
		message.channel.send(`Название сервера: ${message.guild.name}\nУчастники: ${message.guild.memberCount}`);
	} else if (command === 'пнуть') {
		if (!message.mentions.users.size) {
			return message.reply('пингани сначала чувака, не?');
		}
        
		const taggedUser = message.mentions.users.first();
    
		message.channel.send(`Ты пнул ${taggedUser.username}, меня не обманешь.`);
		
	} else if (command === 'аватар') {
		if (!message.mentions.users.size) {
			return message.channel.send(`Твой аватар: <${message.author.displayAvatarURL({ format: "png", dynamic: true })}>`);
		}
    
		const avatarList = message.mentions.users.map(user => {
			return `Аватар ${user.username}: <${user.displayAvatarURL({ format: "png", dynamic: true })}>`;
		});
    
		message.channel.send(avatarList);
	} else if (command === 'чистка') {
		const amount = parseInt(args[0]) + 1;
    
		if (isNaN(amount)) {
			return message.reply('это не похоже на число, знаешь ли.');
		} else if (amount <= 1 || amount > 100) {
			return message.reply('тебе нужно ввести число больше 1, но меньше 100 (иначе я просто сдохну).');
		}
		message.channel.bulkDelete(amount, true).catch(err => {
			console.error(err);
			message.channel.send('Какая-то ошибка с чисткой сообщений...');
        });
	} else if (command === 'арт') {
		message.channel.send("Да.", {files: [""]})
		/* let savedData = []
		osmosis
			.get('').find('#body')
			.set({'title': ['#site-title']})
			.set({'images': ['#image @src']})
			.log(console.log)
			.data(function(data) {
				console.log(data);
				savedData.push(data)
			})
			.done(function() {
				fs.writeFile('data.json', JSON.stringify( savedData, null, 4), function(err) {
					if(err) console.error(err);
					else console.log('Сохранено.');
					fs.readFile('data.json', 'utf8', function(err, contents) {
						console.log(contents);
					});
				})
			}); */
    } else if (command === 'голосование') {
		message.react('752810772236599356');
	}
	
});
client.on('guildMemberRemove', member => {
	console.log(`${member.user.tag} пропал с сервера... Но по своей ли воле?`);
});
client.login(token);