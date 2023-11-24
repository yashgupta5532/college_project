const Post = require("../models/PostModel");
const User = require("../models/UserModel");
const cloudinary = require("cloudinary");

exports.createPost = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const { title, description, images } = req.body;
    const myCloud = await cloudinary.v2.uploader.upload(images, {
      folder: "avatars",
    });
    const postData = {
      title,
      images: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      },
      description,
      owner: req.user._id,
    };
    const newPost = await Post.create(postData);
    user.posts.unshift(newPost);
    await newPost.save();
    await user.save();
    res.status(200).json({
      success: true,
      message: "Post created Successfully",
      newPost,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.likeDislike = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post doesnot exist",
      });
    }
    const isLiked = post.likes.includes(req.user._id);
    if (isLiked) {
      post.likes.pull(req.user._id);
    } else {
      post.likes.unshift(req.user._id);
    }
    await post.save();
    res.status(200).json({
      success: true,
      message: `you ${isLiked ? " Disliked " : " Liked"} the post`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.commentOnPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post doesnot exist",
      });
    }
    let commentIndex = -1;
    post.comments.forEach((item, idx) => {
      if (item.user.toString() === req.user._id.toString()) {
        commentIndex = idx;
      }
    });
    if (commentIndex !== -1) {
      post.comments[commentIndex].comment = req.body.comment;
    } else {
      post.comments.unshift({
        user: req.user._id,
        comment: req.body.comment,
      });
    }
    await post.save();
    res.status(200).json({
      success: true,
      message: `${
        commentIndex !== -1
          ? "comment Updated Successfully"
          : "comment added Successfully"
      }`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updatePost = async (req, res) => {
  try {
    //easy method
    //const post =await Post.findById(req.params.id);
    // if(!post){
    //   return res.status(404).json({
    //     success:false,
    //     message:"Post not found"
    //   })
    // }
    // if(post.owner.toString()!==req.user._id.toString()){
    //   return res.status(403).json({
    //     success:false,
    //     message:"You can delete only your post"
    // })
    // }
    // Object.assign(post,updatedData);

    const updatedData = req.body;
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );
    if (!updatedPost) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }
    if (updatedPost.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "you can delete only your post",
      });
    }
    await updatedPost.save();
    res.status(200).json({
      success: true,
      message: "Post updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }
    if (post.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You can delete your post only",
      });
    }
    res.status(200).json({
      success: true,
      message: "Post deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find({});
    res.status(200).json({
      success: true,
      posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getSinglePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }
    res.status(200).json({
      success: true,
      post,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getMyPosts = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const myPosts = user.posts;
    res.status(200).json({
      success: true,
      myPosts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//admin  -->getAll Pending posts
exports.PendingPosts = async (req, res) => {
  try {
    const posts = await Post.find({ status: "Pending" });
    if (!posts) {
      return res.status(404).json({
        success: false,
        message: "Posts not found",
      });
    }
    res.status(200).json({
      success: true,
      posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//admin  -->Reject posts
exports.RejectPost = async (req, res) => {
  try {
    const postId = req.params.id;
    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { status: "Rejected" },
      { new: true }
    );
    if (!updatedPost) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Post Rejected",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//admin  -->Approve posts
exports.ApprovePost = async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { status: "Approved" },
      { new: true }
    );
    if (!updatedPost) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Post Approved successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//admin  -->Delete a post
exports.DeletePostAdmin = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Post deleted Successfully ",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.SearchPost = async (req, res) => {
  try {
    const keyword = req.params.keyword;
    const posts = await Post.find({
      $or:[
        {title:new RegExp(keyword,"i")},
        {description:new RegExp(keyword,"i")}
      ]
    });
    if (posts.length === 0) {
      return res.status(404).json({
        success: true,
        message: "No posts found.",
        posts: [],
      });
    }

    res.json({
      success: true,
      message: "Posts found successfully.",
      posts: posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error.",
      error: error.message,
    });
  }
};
