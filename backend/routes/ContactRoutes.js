const express=require("express");
const { createContact, getAllContact } =require("../controllers/ContactController");
const {isAuthenticatedUser,hasAuthorisedRoles} =require("../middlewares/auth")

const router=express.Router();

router.route("/create-contact").post(isAuthenticatedUser,createContact)
router.route("/admin/all-contact").get(isAuthenticatedUser,hasAuthorisedRoles,getAllContact)

module.exports=router