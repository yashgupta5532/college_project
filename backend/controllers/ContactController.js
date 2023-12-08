const Contact =require("../models/ContactModel");

exports.createContact=async(req,res)=>{
    try {
        const {name,email,address,contactNo,message}=req.body;
        if(contactNo.length !== 10){
            return res.status(401).json({
                success:false,
                message:"Please input Valid contacNo",
            })
        }
        if(message.trim()===''){
            return res.status(401).json({
                success:false,
                message:"Please write some message",
            })
        }
        const contact=await Contact.create({
            name,email,address,contactNo,message
        });
        res.status(200).json({
            success:true,
            message:"Contact form submitted successully",
            contact
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

//Admin
exports.getAllContact=async(req,res)=>{
    try {
        const allContact=await Contact.find();
        if(!allContact){
            return res.status(404).json({
                success:false,
                message:"not contacts found"
            })
        }
        res.status(200).json({
            success:true,
            allContact
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}