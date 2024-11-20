import 'dotenv/config'
import linebot from 'linebot'
import commandUSD from './commands/usd.js'
import commandFE from './commands/fe.js'
import commandQR from './commands/qr.js'
import commandTWGod from './commands/twgod.js'

const bot = linebot({
    channelId: process.env.CHANNEL_ID,
    channelSecret: process.env.CHANNEL_SECRET,
    channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
})

bot.on('message', (event) => {
    if (event.message.type === 'text') {
        console.log(event.message.text)
        if (event.message.text === 'usd') {
            commandUSD(event)
        } else if (event.message.text === 'fe') {
            commandFE(event)
        } else if (event.message.text === 'qr') {
            console.log('快速回復')
            commandQR(event)
        }
    } else if (event.message.type === 'location') {
        console.log('台灣GOD')
        commandTWGod(event)
    }
})

// postback
bot.on('postback', (event) => {
    const data = event.postback.data
    event.reply(data)
})

bot.listen('/', 3000 || process.env.PORT, () => {
    console.log('機器人啟動!!')
})
