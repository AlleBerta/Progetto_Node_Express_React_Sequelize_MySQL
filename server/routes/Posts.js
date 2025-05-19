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

// Ricevo un unico post in base al suo postId
router.get('/byId/:id', async (req, res) => {
    const id = req.params.id
    try {
        const post = await Posts.findByPk(id)
        res.status(constants.OK).json({ success: true, data: post })
        // res.status(constants.OK).json(post)
    } catch (err) {
        console.log(err);
        res.status(constants.SERVER_ERROR).json({ success: false, message: "Errore interno." })
    }
})

// Ricevo tutti i post creati da un unico UserId
router.get('/byUserId/:id', async (req, res) => {
    const id = req.params.id
    try {
        const listOfPosts = await Posts.findAll({ where: { UserId: id }, include: [Likes] })
        sendResponse(res, constants.OK, true, "", listOfPosts)
    } catch (err) {
        console.log(err);
        sendResponse(res, constants.SERVER_ERROR, false, "Errore interno.", err)
    }
})

router.post("/", validateToken, async (req, res) => {
    try {
        const post = req.body
        post.username = req.user.username
        post.UserId = req.user.id

        await Posts.create(post); // Inserisce i dati nella tabella
        sendResponse(res, constants.RESOURCE_CREATED, true, "Post Creato")
    } catch (err) {
        console.log(err);
        sendResponse(res, constants.SERVER_ERROR, false, "Errore interno.")
    }
})

router.put("/", validateToken, async (req, res) => {

    const { newTitle, newPostText, id } = req.body;

    // Validazione campi
    if (!id) {
        return sendResponse(res, constants.BAD_REQUEST, false, "ID del post mancante.");
    }

    const updateFields = {};
    if (newTitle !== undefined) updateFields.title = newTitle;
    if (newPostText !== undefined) updateFields.postText = newPostText;

    if (Object.keys(updateFields).length === 0) {
        return sendResponse(res, constants.BAD_REQUEST, false, "Nessun campo da aggiornare.");
    }
    try {

        // l'update con sequelize funziona così:
        // Primo {}: inserisco i campi che vado ad aggiornare
        // Secondo {}: inserisco il filtro
        const [updatedRows] = await Posts.update(updateFields, { where: { id: id } });

        if (updatedRows === 0) {
            return sendResponse(res, constants.NOT_FOUND, false, "Post non trovato o nessuna modifica necessaria.");
        }

        sendResponse(res, constants.OK, true, "Post aggiornato con successo.");
    } catch (err) {
        console.error("Errore durante l'aggiornamento del post:", err);
        sendResponse(res, constants.SERVER_ERROR, false, "Errore interno del server.");
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