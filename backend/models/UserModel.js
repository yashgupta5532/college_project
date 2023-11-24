const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const jwtToken = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: [3, "Name can't be less than 3 characters"],
    maxLength: [40, "Name can't be greater than 40 characters"],
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    unique: [true, "Email Already exists"],
    required: [true, "Email is required"],
    validate: [validator.isEmail, "Enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "password is required"],
    minLength: [8, "password should be minimum 8 characters"],
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  posts:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:"Post"
    }
  ],
  followers:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:"User"
    }
  ],
  following :[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:"User"
    }
  ],
  myStatus:{
    type:String,
    maxLength:[100,"status can't be greater than 100 chars"],
    default:"Love is Life",
  },
  role: {
    type: String,
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

//hash the password
UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  return next();
});

UserSchema.methods.matchPassword = async function(password){
  return await bcrypt.compare(password, this.password);
};

UserSchema.methods.generateToken = function () {
  return jwtToken.sign({ _id: this._id }, process.env.JWT_SECRET_KEY);
};

UserSchema.methods.generateResetPasswordToken =function(){
    const resetToken=crypto.randomBytes(32).toString("hex");

    this.resetPasswordToken=crypto.createHash("sha256").update(resetToken).digest("hex")
    this.resetPasswordExpire=Date.now()+1*60*60*1000
    return resetToken;
}

const User = mongoose.model("User", UserSchema);

module.exports = User;
