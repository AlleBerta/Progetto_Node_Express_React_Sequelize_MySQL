const express = require('express')
const router = express.Router()
const { Posts } = require('../models')
const { constants } = require('../constants') // Costanti di stauts code

// Middlewear in express: funzione che riceve req, res e next
// Ogni volta che si fa una richiesta al db deve essere asyncrona
router.get('/', async (req, res) => {
    try {
        const listOfPosts = await Posts.findAll()
        res.status(constants.OK).json({ success: true, data: listOfPosts })
        // res.status(constants.OK).json(listOfPosts)
    } catch (err) {
        console.log(err);
        res.status(constants.SERVER_ERROR).json({ success: false, message: "Errore interno." })
    }
});

router.get('/byId/:id', async (req, res) => {
    const id = req.params.id
    try {
        const post = await Posts.findByPk(id)
        res.status(constants.OK).json({ success: true, data: post })
        // res.status(constants.OK).json(post)
    } catch (err) {
        console.log(err);
        res.status(constants.SERVER_ERROR).json({ success: false, message: "Errore interno." })
        // res.status(constants.SERVER_ERROR).json({error: "Errore interno."})
    }
})

router.post("/", async (req, res) => {
    try {
        const post = req.body
        await Posts.create(post); // Inserisce i dati nella tabella
        res.json(post);
    } catch (err) {
        console.log(err);
        res.status(constants.SERVER_ERROR).json({ success: false, message: "Errore interno." })
    }
})
module.exports = router