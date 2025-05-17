const express = require('express')
const dotenv = require('dotenv').config()
const db = require('./models')
const cors = require('cors')

const port = process.env.SERVER_PORT || 3000

const app = express()
// middlewear
// cors Permette al server Express di accettare richieste da origini diverse.
// Senza cors non potresti connettere il client con il server
app.use(cors())
app.use(express.json())

// Routers
const postRouter = require('./routes/Posts')
app.use("/posts", postRouter)
const commentRouter = require('./routes/Comments')
app.use("/comments", commentRouter)
const usersRouter = require('./routes/Users')
app.use("/auth", usersRouter)
const likesRouter = require('./routes/Likes')
app.use("/likes", likesRouter)


// Creo prima la connessione con il db, sequelize crea eventuali tabelle non presenti nel db che sono presenti nel nostro folder models/
db.sequelize.sync({ alter: true }).then(() => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`)
    })
})

