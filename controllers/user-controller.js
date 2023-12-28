//Importing models/databases of books and users
const BookModel = require('../models/book-model');
const UserModel = require('../models/user-model');
//logic of APIs
exports.getAllUsers = async (req,res)=>{
    const users = await UserModel.find();
    if(users.length === 0){
        return res.status(404).json({
            success:true,
            message:'No user found!!'
        })
    }
    return res.status(200).json({
        success:true,
        data:users
    })
}

exports.getUserById = async (req,res)=>{
    const {id} = req.params;
    const user = await UserModel.findById(id);
    if(!user){
        return res.status(404).json({
            success:false,
            message:`User with this id = ${id} doesnot exist`
        })
    }
    return res.status(200).json({
        success:true,
        data:user
    })
}

exports.createNewUser = async (req,res)=>
{
    const {id} = req.params;
    const {data} = req.body;
    if(!data){
        return res.status(200).json({
            success:false,
            message:'No data found'
        })
    }
    await UserModel.create(data);
    const alltheusers = await UserModel.find();
    return res.status(200).json({
        success:true,
        data:alltheusers
    })

}

exports.deleteUserById = async (req,res)=>{
    const {id} = req.params;
    const userExist = await UserModel.findById(id);
    if(!userExist){
          return res.status(404).json({
            success:false,
            message:`User with the id=${id} doesnot exist`
          })
    }

    await UserModel.deleteOne({_id:id});
    const alltheusers = await UserModel.find();
    return res.status(200).json({
        success:true,
        data:alltheusers
    })
    
}

exports.updateUserById = async (req,res)=>{
    const {id} = req.params;
    const {data} = req.body;
    if(!data){
        return res.status(404).json({
            success:false,
            message:'No data found'
        })
    }
    const updatedUser = await UserModel.findOneAndUpdate({_id:id},{$set:{...data}},{new:true});
    if(!updatedUser){
        return res.status(404).json({
            success:false,
            message:'User doesnot exist'
        })
    }
    return res.status(200).json({
        success:true,
        data:updatedUser
    })
}

exports.userSubscriptionDetailsById = async (req,res)=>{
    const {id} = req.params;
    const user = await UserModel.findById({_id:id});
    if(!user){
        return res.status(404).json({
            success: false,
            message:"User does not exist"
        })}
        var getDateinDays = (data)=>{
            let date;
            if(data = ""){
                date = new Date();
            }
            else{
                date = new Date(data);
            }
            let days = Math.floor(date/(1000*60*60*24));
            return days;
        }
     var subscriptiontype = (date)=>{
        if(user.subscriptionType == 'Basic'){
            date = date + 90;
        }
        else if(user.subscriptionType == 'Standard'){
            date = date + 180;
        }
        else if(user.subscriptionType == 'Premium'){
            date = date + 365;
        }
        return date;
    }    
    let currentDate = getDateinDays();
    let returnDate = getDateinDays(user.returnDate);
    let subscriptionDate = getDateinDays(user.subscriptionDate);
    let subscriptionExpiryDate = subscriptiontype(subscriptionDate);
    var data = {
        ...user,
        subscriptionexpiration: subscriptionExpiryDate < currentDate,
        daysleft: subscriptionExpiryDate <= currentDate ? 0 : (subscriptionExpiryDate - currentDate),
        fine : returnDate < currentDate ? subscriptionExpiryDate < currentDate ? 200 : 100 : 0
    }
    return res.status(200).json({
        success:true,
        data:data
    })
}
