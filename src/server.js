const express = require('express')
const app = express()

app.use(express.static('public'))

app.get('/hello', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.send('Hello World');
})

app.listen(3000, () => {
    console.log('alive');
})