const express = require('express')
const router = express.Router()
const { Posts, Likes } = require('../models')
const { constants } = require('../utils/constants') // Costanti di stauts code
const { sendResponse } = require('../utils/response')
const { validateToken } = require('../middlewares/AuthMiddleware')

// Middlewear in express: funzione che riceve req, res e next
// Ogni volta che si fa una richiesta al db deve essere asyncrona
router.get('/', validateToken, async (req, res) => {
    try {
        // Ricavo anche il numero totale di like di ogni post
        const listOfPosts = await Posts.findAll({ include: [Likes] })

        // Ricavo i like di ogni post che ha effettuato l'utente attualmente loggato
        const likedPosts = await Likes.findAll({ where: { UserId: req.user.id } })

        sendResponse(res, constants.OK, true, "", { listOfPosts: listOfPosts, likedPosts: likedPosts })
    } catch (err) {
        console.log(err);
        sendResponse(res, constants.SERVER_ERROR, false, "Errore interno")
    }
});

router.get('/byId/:id', async (req, res) => {
    const id = req.params.id
    try {
        const post = await Posts.findByPk(id, { include: [Likes] })
        res.status(constants.OK).json({ success: true, data: post })
        // res.status(constants.OK).json(post)
    } catch (err) {
        console.log(err);
        res.status(constants.SERVER_ERROR).json({ success: false, message: "Errore interno." })
        // res.status(constants.SERVER_ERROR).json({error: "Errore interno."})
    }
})

router.post("/", validateToken, async (req, res) => {
    try {
        const post = req.body
        post.username = req.user.username
        console.log(post)
        await Posts.create(post); // Inserisce i dati nella tabella
        sendResponse(res, constants.RESOURCE_CREATED, true, "Post Creato")
    } catch (err) {
        console.log("Bella")
        console.log(err);
        sendResponse(res, constants.SERVER_ERROR, false, "Errore interno.")
    }
})

router.delete("/:postId", validateToken, async (req, res) => {
    const postId = req.params.postId

    try {
        const deleted = await Posts.destroy({
            where: {
                id: postId
            }
        });

        if (deleted === 0) {
            return res.status(constants.NOT_FOUND).json({ success: false, message: "Comment not found." });
        }

        return res.status(constants.OK).json({ success: true, message: "Comment deleted successfully." });
    } catch (err) {
        console.error(err);
        return res.status(constants.SERVER_ERROR).json({ success: false, message: "Internal server error." });
    }
})
module.exports = router