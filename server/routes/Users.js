const express = require('express')
const router = express.Router()
const { Users } = require('../models')
const { constants } = require('../utils/constants') // Costanti di stauts code
const bcrypt = require('bcrypt')
const dotenv = require('dotenv').config()
const { validateToken } = require('../middlewares/AuthMiddleware')
const { generateToken } = require('../utils/jwt')
const { sendResponse } = require('../utils/response')
const { where } = require('sequelize')

router.post("/", async (req, res) => {
    try {
        const { username, password } = req.body

        const hashedPassword = await bcrypt.hash(password, Number(process.env.PSW_SALT));

        const newUser = await Users.create({
            username: username,
            password: hashedPassword
        })

        // Dopo aver creato l'utente, genero il jwt
        const accessToken = generateToken({
            username: newUser.username,
            id: newUser.id
        })

        console.log("Token: " + accessToken)

        res.status(constants.RESOURCE_CREATED).json({ success: true, message: "Registered Successfully!!!", data: { token: accessToken, username: username, id: newUser.id } })

    } catch (err) {
        res.status(constants.SERVER_ERROR).json({ success: false, message: "Errore interno." })
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

        // Genero JWT
        const accessToken = generateToken({
            username: user.username,
            id: user.id
        })
        return res.status(constants.OK).json({ success: true, message: "You logged in!!", data: { token: accessToken, username: username, id: user.id } })
    })
})

// endpoint per l'autorizzazione: una volta chiamato verifica attraverso il validateToken e restituisce il body
router.get('/verify', validateToken, (req, res) => {
    res.status(constants.OK).json({ success: true, user: req.user })
})

router.get("/basicinfo/:id", async (req, res) => {
    const id = req.params.id

    try {
        // Ricavo tutto tranne il campo password perché non mi serve
        const basicInfo = await Users.findByPk(id, {
            attributes: { exclude: ['password'] }
        })

        sendResponse(res, constants.OK, true, "", basicInfo)
    } catch (err) {
        res.status(constants.SERVER_ERROR).json({ success: false, message: "Errore interno." })
    }
})

router.put('/changepassword', validateToken, async (req, res) => {
    const { oldPassword, newPassword } = req.body

    try {
        // Controllo se lo user è presente nel db
        const user = await Users.findOne({ where: { username: req.user.username } });
        // Utilizzo stato 401 per rendere più difficile possibile user enumeration
        if (!user) return sendResponse(res, constants.UNAUTHORIZED, false, "User Doesn't Exist!");

        const match = await bcrypt.compare(oldPassword, user.password);
        if (!match) return sendResponse(res, constants.UNAUTHORIZED, false, "Wrong Old Password Entered!");

        const hashedNewPassword = await bcrypt.hash(newPassword, Number(process.env.PSW_SALT));
        await Users.update({ password: hashedNewPassword }, { where: { id: user.id } });

        return sendResponse(res, constants.OK, true, "Password Updated!");
    } catch (err) {
        console.error("Errore cambio password:", err);
        return sendResponse(res, constants.SERVER_ERROR, false, "Internal server error");
    }
})
module.exports = router