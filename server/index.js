const express = require('express')
const dotenv = require('dotenv').config()
const db = require('./models')

const port = process.env.SERVER_PORT || 3000

const app = express()

// Routers
const postRouter = require('./routes/Posts')
app.use("/posts", postRouter)


// Creo prima la connessione con il db, sequelize crea eventuali tabelle non presenti nel db che sono presenti nel nostro folder models/
db.sequelize.sync().then(()=>{
    app.listen(port, ()=>{
        console.log(`Server is running on port ${port}`)
    })
})

