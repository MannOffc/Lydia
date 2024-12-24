require('./lib/configs')
const { chalk, fs, process, execSync } = require('./lib/module'),
{ watchFile, unwatchFile } = fs,
{ ai, aiSearch, facebook, eval } = require('./lib/functions');

module.exports = async (lydia, bot, command, text) => {

    const isOwner = global.info.replace("https://t.me/", '') == lydia.update.message.from.username
  
    switch (command) {
        case "tes": {
            bot.reply("Horee Bisa");
        }
        break;
        
        case "help":
        case "menu": {
            const a = ["ai", "aoyo", "leptonai", "letmegpt"],
            b = ["facebook"],
            c = [">"];
            let listMenu = "Halo kak " + bot.username + " 👋"
            listMenu += "\n\n[ List Perintah ]"
            for (let o of a) {
                listMenu += "\n/" + o
            }
            for (let o of b) {
                listMenu += "\n/" + o
            }
            for (let o of c) {
                listMenu += "\n/" + o
            }
            bot.reply(listMenu);
        }
        break;
        
        case "ai": {
            return await ai(text, bot, lydia);
        }
        break;
        
        case "aoyo":
        case "leptonai":
        case "letmegpt": {
            return await aiSearch(text, bot, command);
        }
        break;
        
        case "fb":
        case "fbdl":
        case "facebook": {
            return await facebook(text, bot, lydia);
        }
        break;
        
        case ">": {
            return await eval(text, bot, isOwner);
        }
        break
    }
}

process.on('uncaughtException', function (e) {
    console.log('Caught exception', e);
})

let file = require.resolve(__filename);
watchFile(file, () => {
    unwatchFile(file);
    console.log(chalk.redBright(`File has been changed: ${__filename}`));
    delete require.cache[file];
    require(file);
});