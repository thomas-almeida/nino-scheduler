const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const TelegramBot = require('node-telegram-bot-api/lib/telegram')

require('dotenv').config();

const telegramToken = process.env.TELEGRAM_TOKEN;
const telegramChatId = process.env.CHAT_ID;

const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

const port = process.env.PORT || 3001

const bot = new TelegramBot(telegramToken, { polling: true })

app.get('/nino', (req, res) => {
    res.send('Meaw')
})

app.post('/send-schedule', (req, res) => {
    const chatId = telegramChatId
    const message = req.body.mensagem

    bot.sendMessage(chatId, message)
        .then(() => res.send('Mensagem enviada'))
        .catch((error) => res.status(500).send('Erro ao enviar' + error))
})

app.listen(port, () => {
    console.log('API rodando')
})