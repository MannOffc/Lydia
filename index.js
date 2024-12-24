require('./lib/configs')
const {
  Telegraf,
  Context
} = require('telegraf')

const handler = require('./handler');

const bot = new Telegraf(global.botTelegram)
const start = async () => {
    bot.on('callback_query', async (lydia) => {
        console.log(lydia)
        action = lydia.callbackQuery.data.split(' ')
        args = action
        user_id = Number(action[1])
        if (lydia.callbackQuery.from.id != user_id) return lydia.answerCbQuery('Uppss... this button not for you!', {
            show_alert: true
        })
    })
    bot.on('message', async (lydia) => {
        handler(lydia, bot)
    })

    bot.launch({
        dropPendingUpdates: true
    })

    bot.telegram.getMe().then((getme) => {
        console.table({
            "Bot Name": getme.first_name,
            "Username": "@" + getme.username,
            "ID": getme.id,
            "Link": `https://t.me/${getme.username}`,
            "Author": "https://t.me/MannRzyne"
        })
    })
}

start()

process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))