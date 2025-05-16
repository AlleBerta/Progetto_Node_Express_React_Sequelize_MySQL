const express = require('express')
const router = express.Router()
const { Comments } = require('../models')
const { constants } = require('../constants')
const { validateToken } = require('../middlewares/AuthMiddleware')

router.get('/:postId', async (req, res) => {
    const postId = req.params.postId
    try {
        // SELECT * FROM `comments` WHERE `PostId`= postId; 
        const comments = await Comments.findAll({ where: { PostId: postId } })
        res.status(constants.OK).json(comments)
    } catch (err) {
        console.log(err);
        res.status(constants.SERVER_ERROR).json({ error: "Errore interno." })
    }
})

// prima di eseguire la post, verifica la validità del token
router.post("/", validateToken, async (req, res) => {
    const comment = req.body
    const username = req.user.username
    comment.username = username // Aggiungo lo user al db
    try {
        await Comments.create(comment); // Inserisce i dati nella tabella
        res.status(constants.RESOURCE_CREATED).json(comment);
    } catch (err) {
        console.log(err);
        res.status(constants.SERVER_ERROR).json({ error: "Errore interno." })
    }
})

module.exports = router