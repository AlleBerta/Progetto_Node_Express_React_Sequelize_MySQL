const express = require('express')
const router = express.Router()
const { Users } = require('../models')
const { constants } = require('../constants') // Costanti di stauts code
const bcrypt = require('bcrypt')

router.post("/", async (req, res) => {
    try {
        const { username, password } = req.body

        bcrypt.hash(password, 10).then((hash) => {
            Users.create({
                username: username,
                password: hash
            })
            res.status(constants.RESOURCE_CREATED).json("Success!!!")
        })
    } catch (err) {
        console.log(err);
        res.status(constants.SERVER_ERROR).json({ error: "Errore interno." })
    }
})

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    // Controllo se lo user è presente nel db
    const user = await Users.findOne({
        where: {
            username: username
        }
    })

    // Utilizzo stato 401 per rendere più difficile possibile user enumeration
    if (!user) return res
        .status(constants.UNAUTHORIZED)
        .json({ success: false, message: "User Doesn't Exist!" })
    // Invio un json più generico e strutturato, in questo modo gestisco meglio l'operazione lato client
    bcrypt.compare(password, user.password).then((match) => {
        if (!match) return res
            .status(constants.UNAUTHORIZED)
            .json({ success: false, message: "Wrong Username and Password combination" })

        return res.status(constants.OK).json({ success: true, message: "You logged in!!" })
    })
})

module.exports = router