const express = require('express')
const router = express.Router()
const { Comments } = require('../models')
const { constants } = require('../constants')
const { validateToken } = require('../middlewares/AuthMiddleware')
const { where } = require('sequelize')

router.get('/:postId', async (req, res) => {
    const postId = req.params.postId
    try {
        // SELECT * FROM `comments` WHERE `PostId`= postId; 
        const comments = await Comments.findAll({ where: { PostId: postId } })
        res.status(constants.OK).json({ success: true, data: comments })
        // res.status(constants.OK).json(comments)
    } catch (err) {
        console.log(err);
        res.status(constants.SERVER_ERROR).json({ success: false, message: "Errore interno." })
    }
})

// prima di eseguire la post, verifica la validità del token
router.post("/", validateToken, async (req, res) => {
    const comment = req.body
    const username = req.user.username
    comment.username = username // Aggiungo lo user al db
    try {
        await Comments.create(comment); // Inserisce i dati nella tabella
        res.status(constants.RESOURCE_CREATED).json({ success: true, data: comment });
        // res.status(constants.RESOURCE_CREATED).json(comment);
    } catch (err) {
        console.log(err);
        res.status(constants.SERVER_ERROR).json({ success: false, message: "Errore interno." })
    }
})

router.delete("/:commendId", validateToken, async (req, res) => {
    const commentId = req.params.commendId
    console.log("req: " + req)
    try {
        const deleted = await Comments.destroy({
            where: {
                id: commentId
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