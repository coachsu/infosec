const express = require('express')
const app = express()
const redis = require('redis')

const client = redis.createClient({
    host:'127.0.0.1',
    port:6379
})

client.on('error', (err) => {
    console.log(`Error ${err}`)
})

// 模擬惡意網站
app.use(express.static('hack-site'))

app.get('/set', async (req, res) => {
    message = req.query.message
    if(message) {
        await client.set('message', message)
        res.send(`MESSAGE: ${message} HAS BEEN RECORDED!`)
    } else {
        res.send('USAGE: message=[string]')
    }
})

app.get('/get', async (req, res) => {
    message = await client.get('message')
    if(message) {
        res.send(`Hello, ${message}!`)  
    } else {
        res.send('MESSAGE HAS NOT BEEN RECORDED!<br>USAGE: message=[string]')
    }

})

async function start() {
    await client.connect()
    app.listen(3000, () => console.log('Listening on port 3000!'))
}

start()
