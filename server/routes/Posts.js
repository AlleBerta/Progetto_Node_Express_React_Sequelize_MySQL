const express = require('express')
const router = express.Router()

// Middlewear in express: funzione che riceve req, res e next
router.get('/', (req, res) =>{
    res.send('Hello World')
});

module.exports = router