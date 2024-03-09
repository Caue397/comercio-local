const express = require('express')
const cors = require('cors')
require('../config/database')

const router = require('./routes/router')

const app = express()

app.use(cors())
app.use(express.json())
app.use(router)

app.listen(3333, () => console.log('Servidor foi iniciado'))