const express = require('express')
const router = express.Router()
const {Posts} = require('../models')

// Middlewear in express: funzione che riceve req, res e next
// Ogni volta che si fa una richiesta al db deve essere asyncrona
router.get('/', async (req, res) =>{
    const listOfPosts = await Posts.findAll()
    res.json(listOfPosts)

});

router.post("/", async (req, res)=>{
    const post = req.body
    await Posts.create(post); // Inserisce i dati nella tabella
    res.json(post);
})
module.exports = router