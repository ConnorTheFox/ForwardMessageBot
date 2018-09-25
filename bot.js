const tgBot = require('node-telegram-bot-api')
const process = require('process')

const token = process.env.TOKEN

const bot = new tgBot(token, { polling: true })

console.log('Bot running at ' + new Date())

bot.on('message', (msg) => {
    if (msg.forward_date) {
        let rawDate = new Date(msg.forward_date * 1000)
        let date = rawDate.toLocaleDateString()
        let time = rawDate.toLocaleTimeString()
        let forwardId = msg.forward_from.id
        let UTCDate = rawDate.toUTCString()

        bot.sendMessage(msg.chat.id, `Date: ${date}\nTime (in MST): ${time}\nOriginal Sender ID: ${forwardId}\n\nTime (in UTC): ${UTCDate}`)
    }
})