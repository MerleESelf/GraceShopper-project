const router = require('express').Router()
const { models: { Poster }} = require('../db')
module.exports = router

// route for all posters 
router.get('/', async(req, res, next ) => {
    try {
        const allPosters = await Poster.findAll(); 
        res.send(allPosters)
    } catch (error) {
        next(error)
    }
})