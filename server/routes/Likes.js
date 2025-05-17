const express = require('express')
const router = express.Router()
const { Likes } = require('../models')
const { constants } = require('../utils/constants') // Costanti di stauts code
const { validateToken } = require('../middlewares/AuthMiddleware')
const { sendResponse } = require('../utils/response')

/** NOTA: la get per contare quanti like un post ha non la faccio qua 
 * perché sarebbe poco efficiente. Faccio una union quando ricavo le info
 * di ogni singolo post nel route Posts.js */

router.post("/", validateToken, async (req, res) => {
    const { PostId } = req.body;
    const UserId = req.user.id; // lo UserId lo ricavo dal validateToken, in cui invii anche questo

    // Controllo extra su PostId e UserId
    if (!PostId) {
        return sendResponse(res, constants.BAD_REQUEST, false, "PostId is required")
    }
    if (!UserId) {
        return sendResponse(res, constants.BAD_REQUEST, false, "UserId is required")
    }

    try {
        // Check per verificare che sto inserndo un solo like in un singolo post con un singolo utente
        const found = await Likes.findOne({
            where: { PostId: PostId, UserId: UserId }
        })
        // Se non trova nulla, l'utente può mettere like ...
        // Altrimenti elimina il like che era già stato messo
        if (!found) {
            await Likes.create({
                PostId: PostId,
                UserId: UserId
            })
            sendResponse(res, constants.OK, true, "Post Liked", { liked: true })
            // Al posto che 
            // res.status(constants.OK).json({
            //     success: true,
            //     message: "Liked The Post",
            //     data: {liked: true}
            // })
        } else {
            await Likes.destroy({
                where: {
                    PostId: PostId,
                    UserId: UserId
                }
            })
            sendResponse(res, constants.OK, true, "Post Unliked", { liked: false })
        }
    } catch (err) {
        console.error("Errore nel like:", err);
        sendResponse(res, constants.SERVER_ERROR, false, "Internal server error")
    }
})

module.exports = router