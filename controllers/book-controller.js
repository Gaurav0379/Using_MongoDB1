//Importing models/databases of books and users
const BookModel = require('../models/book-model');
const UserModel = require('../models/user-model');

//Importing books DTO
const IssuedBook = require('../dtos/books-dto');

//Here we are directly using exports method to export the APIs. 

exports.getAllBooks = async (req,res)=>{
    const books = await BookModel.find();
    if(books.length == 0){
        return res.status(404).json({
            success:false,
            message:'No books found'
        })
    }
    return res.status(200).json({
        success:true,
        data:books
    })
}

exports.getBookById = async (req,res)=>{
    const {id} = req.params;
    const getthebook = await BookModel.findById({_id:id});
    if(!getthebook){
        return res.status(404).json({
            success:false,
            message:'Book with the id does not exist'
        })
    }
    return res.status(200).json({
        success:true,
        data:getthebook
    })
} 

exports.updatethebookbyid = async (req,res)=>{
    const {data}  = req.body;
    const {id} = req.params;
    const book = await BookModel.findById({_id:id});
    if(!book){
        return res.status(404).json({
            success:false,
            message:`Book with the id = ${id} doesnot exist` 
        })
    }
    await BookModel.updateOne({_id:id},{$set:{...data}},{new:true});
    return res.status(200).json({
        success:true,
        updatedBook : book
    })
}

exports.getAllIssuedBooks = async (req,res)=>{
    const users = await UserModel.find({
        issuedBook:{$exists:true},
    }).populate("issuedBook")
    //DTOS(Data Transfer Objects)
    const issuedBook1 = users.map((each)=> new IssuedBook(each));
    if(issuedBook1.length == 0){
        return res.status(404).json({
            success:false,
            message:'No issued book exist'
        })
    }
    return res.status(200).json({
        success:true,
        Books:issuedBook1
    })
}

exports.addNewBook = async (req,res)=>{
    const {data} = req.body;
    if(!data){
        return res.status(404).json({
            success:false,
            message:'No data found'
        })
    }
   const exist = BookModel.findOne({name:data.name});
   console.log(data.name);
   if(exist){
    return res.status(404).json({
        success:false,
        message:'book already exist!!'
    })
   }
    await BookModel.create(data);
    const allthebooks = await BookModel.find();

    return res.status(200).json({
        success:true,
        data:allthebooks
    })
}

exports.deleteBookById = async (req,res)=>{
    const {id} = req.params;
    await BookModel.deleteOne({_id:id})
    const allthebooks = await BookModel.find();
    return res.status(200).json({
        success:true,
        data:allthebooks
    })
}
