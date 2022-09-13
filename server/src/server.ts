import express from 'express'

const app = express()


app.get('/ads', (req, res) => {
    return res.json([
        {id: 1, name: 'teste 01'},
        {id: 2, name: 'teste 02'},
        {id: 3, name: 'teste 03'},
        {id: 4, name: 'teste 04'},
    ])
})

app.listen(3333)