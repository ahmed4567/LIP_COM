if (process.env.NOD_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const expressLayout = require('express-ejs-layouts')
const indexRouter = require('./routes/index')
const mongoos = require("mongoose")

mongoos.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoos.connection
db.on('error', error => console.error(error))
db.once('open', () => console.error('conected to mangoos'))

app.set("view engine", "ejs")
app.set("views", __dirname + "/views")
app.set("layout", "layouts/layout")
app.use(expressLayout)
app.use(express.static("public"))
app.use('/', indexRouter)