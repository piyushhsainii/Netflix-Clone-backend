const List = require('../models/list')

//creating List - 
const createList = async(req,res)=>{

    const { title, type , genre, content } = req.body
    try {       
    const list = await List.create({
        title, 
        type , 
        genre,
        content 
    })
    res.status(200).json({
        success:true,
        list
    })
    } catch (error) {
        res.status(400).json({
            success:false,
            message:error
        })
    }

}
const updateList = async(req,res)=>{

    const {content , id } = req.body
    try {       
        const existingList = await List.findById(id);

                console.log('lol')
                // Append the new content to the existing list
                existingList.content.push(content);
                await existingList.save();

                res.status(200).json({
                    success: true,
                    list: existingList,
                });
    }
  
     catch (error) {
        res.status(400).json({
            success:false,
            message:error
        })
    }

}

//api  to delete list

const deleteList = async(req,res)=>{
    try {
        const list = await List.findById(req.params.id)

        if(!list){
            return res.status(400).json({
                success:false,
                message:"Invalid ID"
            })
        }
        await list.deleteOne()

        res.status(200).json({
            success:true,
            message:"List successfully deleted"
        })

    } catch (error) {
        res.status(400).json({
            success:false,
            message:error
        })
    }
}

//get list 

const getList = async(req,res)=>{ 
   try {
    const type= req.query.type
    const genre= req.query.genre
    
    let list ;

    if(type && genre ){ 
        list = await List.aggregate([
            { $sample : {size:10} },
            { $match : {type : type , genre:genre}  }
        ])
       
    } 
    else if(type && !genre ){       
        list = await List.aggregate([
            { $sample : {size:10} },
            { $match : {type : type}  }
        ])   
    }
    else if(!type && genre ){       
        list = await List.aggregate([
            { $sample : {size:10} },
            { $match : { genre:genre}  }
        ])   
    }
    else {
        list = await List.aggregate([
            { $sample : {size:10} }
        ])
    }

    res.status(200).json({
        success:true,
        list
    })

   } catch (error) {
        res.status(400).json({
            success:false,
            message:error
        })
   }

}


const deleteListElement = async(req,res)=>{
    try {
    const {content , id } = req.body

    const existingList = await List.findById(id);

    if (!existingList) {
        return res.status(404).json({
            success: false,
            message: 'List not found.',
        });
    }
    const indexToRemove = existingList.content.indexOf(content);

    if (indexToRemove !== -1) {
        existingList.content.splice(indexToRemove, 1);
        await existingList.save();

        res.status(200).json({
            success: true,
            list: existingList,
        });
    } else {
        res.status(404).json({
            success: false,
            message: 'Item not found in the list.',
        });
    }

    } catch (error) {
        res.status(400).json({
            success:false,
            message:error
        })
    }
}

module.exports = { createList , deleteList , getList , updateList , deleteListElement }