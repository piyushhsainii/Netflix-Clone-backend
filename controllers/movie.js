const Movie = require('../models/movie')

const createMovie = async(req,res)=>{
        const {
            Name,
            Desc,
            Img,
            ImgTitle,
            ImgSm,
            trailer,
            genre,
            isSeries,
        } = req.body
    
      const movie = await Movie.create({
        Name,
        Desc,
        Img,
        ImgTitle,
        ImgSm,
        trailer,
        genre,
        isSeries,
        })
    
        res.status(200).json({
            success:true,
            movie
        })
    
    }


//gives me a random movie from the database
const getRandomMovie = async(req,res)=>{  
        const type = req.query.type;
        let  movie;
    
        if(type === "series"){
           movie =  await Movie.aggregate([
           { $match: { isSeries:"true" }},
           { $sample: { size:1 } },
           ])
        } else 
        movie = await Movie.aggregate([
            { $match : { isSeries : "false" } },
            { $sample : { size:1  } },
        ])
    
        res.status(200).json({
            success:true,
            movie
        })
    }

// delete any movie 

const deleteMovie = async(req,res)=>{
    const movie = await Movie.findById(req.params.id)

    if(!req.params.id){
        return res.status(400).json({
            success:false,
            message:"movie does not exist"
        })
    }
    movie.deleteOne();

    return res.status(200).json({
        success:true,
        message:"Movie deleted successfully"
    })
}

// get any movie
const getMovie = async(req,res)=>{
    const movie = await Movie.findById(req.params.id)

    if(!req.params.id){
        return res.status(400).json({
            success:false,
            message:"movie does not exist"
        })
    }

    return res.status(200).json({
        success:true,
        movie
    })
}
// get all movie
const getallMovies = async(req,res)=>{
    const movie = await Movie.find()

    return res.status(200).json({
        success:true,
        movie
    })
}



module.exports = { createMovie , getRandomMovie ,
     deleteMovie , getMovie ,getallMovies }