const { axios, execSync } = require('./module');

exports.range = (start, stop, step) {
  if (typeof stop == 'undefined') {
    stop = start;
    start = 0;
  }
  if (typeof step == 'undefined') {
    step = 1;
  }
  if ((step > 0 && start >= stop) || (step < 0 && start <= stop)) {
    return [];
  }
  var result = [];
  for (var i = start; step > 0 ? i < stop : i > stop; i += step) {
    result.push(i);
  }
  return result;
}

exports.ai = async (text, bot, lydia) => {
    if (!text) return bot.reply("Apa yang bisa aku bantu?")
    const aiSessions = lydia.ai_sessions ?? {};
    const senderId = bot.sender;

    if (!aiSessions[senderId]) {
        aiSessions[senderId] = { messages: [] };
    }

    const msgs = [
        ...aiSessions[senderId].messages,
        { content: text, role: "user" }
    ];

    const api_url = 'https://api.manaxu.my.id/api/v2/ai';
    const api_key = 'key-manaxu-free';

    axios({
        method: 'POST',
        url: api_url,
        headers: {
            'x-api-key': api_key,
            'Content-Type': 'application/json'
        },
        data: {
            model: 'llama-3.3-70b',
            logic: voldx,
            messages: msgs
        }
    })
    .then(response => {
        if (response.status === 200) {
            const result = response.data.result;
            bot.reply(result ?? "Hmm keknya ada kesalahan pada API nya");
            aiSessions[senderId].messages.push({ content: text, role: "user" });
            aiSessions[senderId].messages.push({ content: result, role: "assistant" });
            lydia.ai_sessions = aiSessions;
        } else {
            bot.reply("Kesalahan API");
        }
    }).catch(error => {
        console.error(error);
        bot.reply("Kesalahan jaringan");
    });
};

exports.eval = async (text, bot, isOwner) => {
    if (!isOwner) return
    try {
        let evaled = await eval(text)
        if (typeof evaled !== 'string') evaled = util.inspect(evaled)
        bot.reply(evaled)
    } catch (err) {
        bot.reply(String(err))
    }
}

exports.aiSearch = async (text, bot, command) => {
    if (!text) return m.reply("Masukan teks!");
    axios({
        method: 'POST',
        url: 'https://api.manaxu.my.id/api/ai/search',
        headers: {
            'x-api-key': 'key-manaxu-free',
            'Content-Type': 'application/json'
        },
        data: {
            question: text,
            model: command
        }
    })
    .then(_ => {
        bot.reply(_.data.result);
    })
    .catch(e => {
        bot.reply(e.message);
        console.error(e);
    });
}

exports.facebook = async (text, bot, lydia) => {
    if (!text.includes('facebook.com')) return bot.reply('Masukan link video facebook!')
    axios({ "method": "GET", "url": "https://mannoffc-x.hf.space/download/facebook", "params": { "url": q }}).then(_ => {
        lydia.replyWithVideo({ url: _.data.result.video });
    })
}