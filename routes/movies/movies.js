const express = require('express')
const router = express.Router()
const Product = require('../../models/movie')
const Movie = require('../../models/movie')
const { getRandomMovie, createMovie ,deleteMovie, getMovie, getallMovies } = require('../../controllers/movie')
const { isAuthenticated } = require('../../middleware/authenticate')


router.post('/createMovie', createMovie )

// api to return a random movie out of all
router.get('/randomMovie', isAuthenticated ,getRandomMovie )

router.get('/getMovie/:id', isAuthenticated , getMovie )

router.get('/getallMovies', isAuthenticated , getallMovies )

router.delete('/deleteMovie/:id', deleteMovie )


module.exports =  router 
