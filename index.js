const TelegtamApi = require('node-telegram-bot-api');

const {gameOptions, againOptions} = require('./option')

const token = '6802223478:AAEosO4id3Z5ZsZzPualMrMhboG_UxYbnUE';

const bot = new TelegtamApi(token, {polling: true});

const chats = {}



const startGame = chatId => {
    bot.sendMessage(chatId, 'Я загадал число, а ты угадай какое')
    const randomNumber = Math.floor(Math.random() * 10);
    chats[chatId] = randomNumber;
    bot.sendMessage(chatId, 'Отгадывай', gameOptions);
}

const start = () => {
    bot.setMyCommands([
        {command: '/start', description: 'Начать'},
        {command: '/info', description: 'Информация об аккаунте'},
        {command: '/game', description: 'Угадай число'},
        
    ])
    
    bot.on('message', msg => {
        const text = msg.text;
        const chatId = msg.chat.id;
    
        if(text === '/start'){
            bot.sendSticker(chatId, 'https://chpic.su/_data/stickers/k/KotMishaa/KotMishaa_001.webp?v=1702221305')
            return bot.sendMessage(chatId, `Здравствуйте`)
        } 
        if(text === '/info'){
            if(msg.from.last_name != null){
                return bot.sendMessage(chatId, `Тебя зовут ${msg.from.first_name} ${msg.from.last_name} `)
            } if(msg.from.last_name == null)
                return bot.sendMessage(chatId, `Тебя зовут ${msg.from.first_name}`)
    
        }
        if(text === '/game'){
            return startGame(chatId)
        }
        else{
            return bot.sendMessage(chatId, 'Я тебя не понимаю')
        }
        }
    )

    bot.on('callback_query', msg =>{
        const data = msg.data;
        const chatId = msg.message.chat.id;
        if(data === '/again'){
            return startGame(chatId)
        }
        if(data === chats[chatId]){
            return bot.sendMessage(chatId, `Ты угадал, это было ${chats[chatId]}`, againOptions)
        } else{
            return bot.sendMessage(chatId, `Ты не угадал, это было ${chats[chatId]}`, againOptions)
        }
    })
}

start();