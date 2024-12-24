const func = require('./lib/functions');

module.exports = async (lydia, bot) => {
    try {
        const body = lydia.message.text || lydia.message.caption || ''
        const budy = (typeof lydia.message.text == 'string' ? lydia.message.text : '')
        const isCmd = /^[°•π÷×¶∆£¢€¥®™�✓_=|~!?#/$%^&.+-,\\\©^]/.test(body)
        const prefix = isCmd ? body[0] : ''
        const command = isCmd ? body.slice(1).trim().split(' ').shift().toLowerCase() : ''
        const args = body.trim().split(/ +/).slice(1)
        const text = q = args.join(" ")
        const user_id = lydia.message.from.id + " "
        const username = lydia.message.from.username ? lydia.message.from.username : "User";
        /** const isCreator = info.owner[0].replace("https://t.me/", '') == lydia.update.message.from.username
        const isOwner = info.owner.includes("https://t.me/" + pushname) **/
        const from = lydia.message.chat.id
    
        bot.username = username
        bot.sender = from
    
        bot.reply = async (text) => {
            for (var x of func.range(0, text.length, 4096)) { //maks 4096 character, jika lebih akan eror
                return await lydia.replyWithMarkdown(text.substr(x, 4096), {
                    disable_web_page_preview: true
                })
            }
        }
    
        await require('./features')(lydia, bot, command, text)
    
    } catch (e) {
        console.log(e);
    }
}

let file = require.resolve(__filename);
watchFile(file, () => {
    unwatchFile(file);
    console.log(chalk.redBright(`File telah diubah: ${__filename}`));
    delete require.cache[file];
    require(file);
});