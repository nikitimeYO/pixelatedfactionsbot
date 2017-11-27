const Discord = require('discord.js');
const bot = new Discord.Client();
const request = require('request');
const ms = require('./mcstat');

function commandIs(str, msg){
    return msg.content.toLowerCase().startsWith("&" + str);
}

function findWebhook(msg, desc){
    msg.channel.fetchWebhooks().then(webhook =>{
        let foundHook = webhook.find('name', 'PixelatedFactions');
        if(!foundHook){
            msg.channel.createWebhook('PixelatedFactions', 'https://cdn.discordapp.com/icons/377524183434788876/49a2f24cbad3087cdc133b7c7cc94601.png').then(webhook =>{
                sendWebhook(msg, desc, foundHook);
            })
        }else{
            sendWebhook(msg, desc, foundHook);
        }
    })
}

function sendWebhook(msg, desc, hook){
    hook.send('', {
        "username": "PixelatedFactions",
        "avatarURL": "https://cdn.discordapp.com/icons/377524183434788876/49a2f24cbad3087cdc133b7c7cc94601.png",
        "embeds": [{
            "color": parseInt('0x1AFF00'),
            "description": desc
        }]
    }).catch(error =>{
        console.log(error);
    })
    message.channel.stopTyping();
}

function embedURL(msg, url, title){
    msg.channel.send({embed:{
        title: title,
        color: 0x1AFF00,
        fields:[
            {
                name: '==============',
                value: '[Click Here!](' + url + ')',
                inLine: true
            }
        ]
    }})
}

function pluck(array){
    return array.map(function(item) {return item["name"];});
}

function hasRole(member, role){
    if(pluck(member.roles).includes(role)){
        return true;
    }else{
        return false;
    }
}

bot.on('ready', ()=> {
    console.log('Online!');
    bot.user.setGame('on Pixelated Factions');
});

bot.on('guildMemberAdd', (member)=> {
    var role = member.guild.roles.find('name', 'Pixelated Player');
    member.addRole(role);
});

bot.on('message', (message)=> {
    if(message.content.toLowerCase().startsWith('&')){
        if(message.channel.name != 'bot-commands'){
            message.delete();
            message.author.send('Please Send Your Command: ```' + message.content + '``` In The #bot-commands Channel');
        }else{
            var args = message.content.split(/[ ]+/);
            if(commandIs('test', message)){
                message.channel.startTyping();
                message.channel.send('I Am Online!');
                message.channel.stopTyping();
            }
            if(commandIs('help', message)){
                message.channel.startTyping();
                message.author.send('**Pixelated Factions Bot Help**');
                message.author.send('```&test | Tests If The Bot Is Online\n&help | Sends This DM\n&botcreator | Sends Who Created This Bot\n&serverstatus | Checks If Pixelated Factions Is Online\n&staff | Sends Pixelated Factions Staff List\n&link [server/website/store/discord] | Sends Link To Certain Place```');
                message.reply('Help Sent!');
                message.channel.stopTyping();
            }
            if(commandIs('botcreator', message)){
                message.channel.startTyping();
                if(message.author.id == '299624560788242432'){
                    message.reply('You Are My Creator!')
                    message.channel.stopTyping();
                }else{
                    message.channel.send('I Was Created By DevelopingEarth#2634');
                    message.channel.stopTyping();
                }
            }
            if(commandIs('serverstatus', message)){
                message.channel.startTyping();
                var desc = '';
                ms.init('167.114.0.96', 25587, function(result){
                    if(ms.online){
                        desc = 'Status: **Online**\nPlayers: **' + ms.current_players + '/' + ms.max_players + '**\nVersion: **' + ms.version + '**';
                    }else{
                        desc = 'Status: **Offline**';
                    }
                    findWebhook(message, desc);
                });
                message.channel.startTyping();
            }
            if(commandIs('staff', message)){
                message.channel.startTyping();
                message.author.send('**Pixelated Factions Staff List**');
                message.author.send('```Chippy#0557 | Owner\nDevelopingEarth#2634 | Co-Owner\nSweepingShoe30#9195 | Helper```');
                message.reply('Staff List Sent!')
                message.channel.stopTyping();
            }
            if(commandIs('link', message)){
                message.channel.startTyping();
                var desc = 'Incorrect Command Usage, Please Do **&help**!'
                if(args[1] == 'server'){
                    desc = '**Server IP**\nplay.pixelatedfactions.tk';
                    findWebhook(message, desc);
                }else if(args[1] == 'website'){
                    embedURL(message, 'http://www.pixelatedfactions.tk/', 'Server Website');
                }else if(args[1] == 'store'){
                    embedURL(message, 'http://buy.pixelatedfactions.tk/', 'Server Store');
                }else if(args[1] == 'discord'){
                    desc = '**Server Discord**\nhttps://discord.gg/JJNppqG';
                    findWebhook(message, desc);
                }else{
                    findWebhook(message, desc);
                }
                message.channel.stopTyping();
            }
            if(commandIs('cat', message)){
                if(args.length == 2){
                    if(args[1] > 10 || args[1] < 1){
                        message.reply('Please Do A Number Between 1-10');
                    }else{
                        i = 0;
                        while(i != args[1]){
                            message.channel.startTyping();
                            i++;
                            let url = "http://random.cat/meow";
                            request(url, function(error, response, body) {
                                if (!error && response.statusCode === 200) {
                                    var response = JSON.parse(body);
                                    message.channel.send({
                                        embed: {
                                            image: {
                                                url: response.file
                                            },
                                        }
                                    });
                                }
                            });
                            message.channel.stopTyping();
                        }
                    }
                }else{
                    message.channel.startTyping();
                    let url = "http://random.cat/meow";
                    request(url, function(error, response, body) {
                        if (!error && response.statusCode === 200) {
                            var response = JSON.parse(body);
                            message.channel.send({
                                embed: {
                                    image: {
                                        url: response.file
                                    },
                                }
                            });
                            message.channel.stopTyping();
                        }
                    });
                }
            }
            if(commandIs('dog', message)){
                if(args.length == 2){
                    if(args[1] > 10 || args[1] < 1){
                        message.reply('Please Do A Number Between 1-10');
                    }else{
                        var i = 0;
                        while(i != args[1]){
                            message.channel.startTyping();
                            i++;
                            let url = "https://dog.ceo/api/breeds/image/random";
                            request(url, function(error, response, body) {
                                if (!error && response.statusCode === 200) {
                                    var response = JSON.parse(body);
                                    message.channel.send({
                                        embed: {
                                            image: {
                                                url: response.message
                                            },
                                        }
                                    });
                                }
                            });
                            message.channel.stopTyping();
                        }
                    }
                }else{
                    message.channel.startTyping();
                    let url = "https://dog.ceo/api/breeds/image/random";
                    request(url, function(error, response, body) {
                        if (!error && response.statusCode === 200) {
                            var response = JSON.parse(body);
                            message.channel.send({
                                embed: {
                                    image: {
                                        url: response.message
                                    },
                                }
                            });
                            message.channel.stopTyping();
                        }
                    });
                }
            }
            if(commandIs('userinfo', message)){
                var desc = '';
                if(args.length != 2){
                    desc = 'Incorrect Command Usage, Please Do **&help**!';
                }else{
                    if(hasRole(message.member, 'Staff')){
                        let user = message.mentions.members.first();
                        if(user){
                            desc = 'User Info For: **' + user.displayName + '**(**' + user.id + '**)\n';
                            var userCreated = user.user.createdAt.toString().split(' ');
                            desc += 'Created At: **' + userCreated[2] + ' ' + userCreated[1] + ' ' + userCreated[3] + '**\n';
                            var joinedServer = user.joinedAt.toString().split(' ')
                            desc += 'Joined At: **' + joinedServer[2] + ' ' + joinedServer[1] + ' ' + joinedServer[3] + '**';
                        }else{
                            desc = 'User Not Found!';
                        }
                    }else{
                        desc = 'Only Staff Members Can Use This Command!';
                    }
                }
                findWebhook(message, desc);
            }
        }
    }
})

bot.login('MzgyNTc4NzkzNzY5OTkyMTkz.DPXyow.NOyMPhstP5LiYy0olUdkTq10X9I');