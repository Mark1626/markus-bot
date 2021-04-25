const username = process.env.KEYBASE_USERNAME
const paperkey = process.env.KEYBASE_PAPERKEY

const Bot = require('keybase-bot')
const quotes = require('./quotes.json').quotes
const bot = new Bot()

async function main() {
    try {
        if (!username || !paperkey) {
            throw "No username or paperkey set"
        }
        await bot.init(username, paperkey, { verbose: false })

        console.log(`Your bot is initialized.`)
        const channel = { name: 'mark854' }
        const message = {
            body: `
${bot.myInfo().username}@${new Date().toLocaleTimeString()}
> ${quotes[Math.floor(Math.random() * quotes.length)]}
            `,
        }
        await bot.chat.send(channel, message)
        console.log('Message sent!')

    } catch (error) {
        console.log(error)
    } finally {
        shutDown()
    }
}

const shutDown = () => {
    bot.deinit().then(() => process.exit())
}

process.on('SIGINT', shutDown)
process.on('SIGTERM', shutDown)

main()
