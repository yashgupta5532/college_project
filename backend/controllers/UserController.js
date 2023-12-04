const { sendEmail } = require("../middlewares/sendEmail");
const cloudinary = require("cloudinary");
const User = require("../models/UserModel.js");

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, avatar } = req.body;
    if (!name || !email || !password || !avatar) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be atleast 8 characters",
      });
    }
    const mycloud = await cloudinary.v2.uploader.upload(avatar, {
      folder: "avatars",
    });
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(500).json({
        success: false,
        message: "User Already Exists",
      });
    }
    user = await User.create({
      name,
      email,
      password,
      avatar: {
        public_id: mycloud.public_id,
        url: mycloud.secure_url,
      },
    });
    const token = user.generateToken();
    const options = {
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      httpOnly: true,
      secure: true,
    };
    res.status(200).cookie("token", token, options).json({
      success: true,
      message: "Registered successfully",
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "user not found",
      });
    }
    const isPasswordMatch = await user.matchPassword(password);
    if (!isPasswordMatch) {
      return res.status(404).json({
        success: false,
        message: "Invalid password",
      });
    }
    const token = await user.generateToken();
    const options = {
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      httpOnly: true,
      secure: true,
    };
    res.status(200).cookie("token", token, options).json({
      success: true,
      message: "Logged in successfully",
      token,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

exports.logoutUser = async (req, res) => {
  try {
    res
      .status(200)
      .cookie("token", null, { expires: new Date(Date.now()), httpOnly: true })
      .json({
        success: true,
        message: "logout successfully",
      });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

exports.followUser = async (req, res) => {
  try {
    const loggedInUser = await User.findById(req.user._id);
    const userToFollow = await User.findById(req.params.id);
    if (!userToFollow) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isFollowing = loggedInUser.following.includes(userToFollow._id);

    if (isFollowing) {
      //unfollow
      loggedInUser.following.pull(userToFollow._id);
      userToFollow.followers.pull(loggedInUser._id);
    } else {
      //start following
      loggedInUser.following.unshift(userToFollow._id);
      userToFollow.followers.unshift(loggedInUser._id);
    }

    await loggedInUser.save();
    await userToFollow.save();
    res.status(200).json({
      success: true,
      message: `you ${isFollowing ? "UnFollow " : "Started Following "} ${
        userToFollow.name
      }`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getMyDetails = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("posts");
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//Admin
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getUserDetails = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updatePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const user = await User.findById(req.user._id).select("+password");
    const isPasswordMatch = await user.matchPassword(oldPassword);
    if (!isPasswordMatch) {
      return res.status(404).json({
        success: false,
        message: "Incorrect oldPassword",
      });
    }

    user.password = newPassword;
    await user.save();

    res.status(200).json({
      success: true,
      message: "password updated successfully",
    });
  } catch (error) {
    // console.log(error);
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const { name, email, avatar, myStatus } = req.body;
    if (name) {
      user.name = name;
    }
    if (email) {
      user.email = email;
    }
    if (avatar) {
      conole.log("we will add cloudinary later");
    }
    if (myStatus) {
      user.myStatus = myStatus;
    }
    await user.save();
    res.status(200).json({
      success: true,
      message: "Profile updated",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//Admin UpdateRole
exports.updateRole = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { role: "admin" },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      message: `${updatedUser.name} is now Admin`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    const resetPasswordToken = await user.generateResetPasswordToken();
    await user.save();

    const resetPasswordUrl = `${req.protocol}://${req.get(
      "host"
    )}/password/reset/${resetPasswordToken}`;

    const message = `Click on the below link to reset your password \n\n ${resetPasswordUrl}`;

    try {
      await sendEmail({
        email: user.email,
        subject: `Reset password`,
        message,
      });
      res.status(200).json({
        success: true,
        message: `Email sent to ${user.email}`,
      });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save();
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.resetPassword = async (req, res) => {
  const token = req.params.token;
  const { newPassword, confirmPassword } = req.body;
  if (newPassword !== confirmPassword) {
    return res.status(400).json({
      success: false,
      message: "Password doesnot match",
    });
  }
  try {
    const resetToken = await User.findOne({ resetPasswordToken: token });
    if (!resetToken) {
      return res.status(404).json({
        success: false,
        message: "Token Invalid",
      });
    }
    if (resetToken.expires < Date.now()) {
      return res.status(400).json({
        success: false,
        message: "Token has been Expired. Try again",
      });
    }
    const user = await User.findById(resetToken._id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    user.password = newPassword;
    await user.save();
    res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.Authors = async (req, res) => {
  try {
    const featuredAuthors = await User.aggregate([
      {
        $lookup: {
          from: "posts", // Assuming you have a 'posts' collection/table
          localField: "_id", // User ID field
          foreignField: "owner", // Author ID field in posts
          as: "userPosts",
        },
      },
      {
        $unwind: "$userPosts",
      },
      {
        $match: {
          "userPosts.status": "Approved",
        },
      },
      {
        $group: {
          _id: "$_id", // User ID
          name: { $first: "$name" },
          avatar: { $first: "$avatar" }, // Retrieve the avatar object
          email: { $first: "$email" }, // Add user's email
          myStatus: { $first: "$myStatus" }, // Add user's mystatus
          followers: { $first: { $size: "$followers" } }, // Add followers count
          following: { $first: { $size: "$following" } }, // Add following count
          postCount: { $sum: 1 }, // Count approved posts
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          email: 1,
          myStatus: 1,
          followers: 1,
          following: 1,
          postCount: 1,
          avatarUrl: "$avatar.url", // Extract avatar URL from the avatar object
        },
      },
      {
        $sort: { postCount: -1 }, // Sort users by postCount in descending order
      },
      {
        $limit: 10, // Select the top 10 users
      },
    ]);

    res.status(200).json({
      success: true,
      featuredAuthors,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
