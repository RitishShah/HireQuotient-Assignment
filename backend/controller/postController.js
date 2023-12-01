const Post = require('../models/postModel');
const User = require('../models/userModel');
const utils = require('../utils/response');
const cloudinary = require('cloudinary')

exports.createPost = async (req, res) => {
    const bodyData = req.body;
    let images = bodyData.images;

    console.log("Create post images url", bodyData.images);
  
    const imagesLinks = [];
  
    for (let i = 0; i < images.length; i++) {
      console.log(images[i]);
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "posts",
      });
  
      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }
  
    req.body.images = imagesLinks;
    req.body.user = req.user.id;
    
    const post = await Post.create(req.body);
    utils.response(res,'success','Post Created',post,201);
};

exports.getAllPosts = async (req, res) => {
    const posts = await Post.find({});
    console.log("JJKK", posts);
    utils.response(res,'success','All Posts',posts,200);
}

exports.getSinglePost = async (req, res) => {
    const postId = req.params.id;
    console.log(postId);
    const post = await Post.find({_id: postId});

    if(!post) {
        return utils.response(res,'fail','No Post found associated with Id', null, 404);
    }

    utils.response(res,'success','Single Post',post,200);
}

exports.createComment = async (req, res, next) => {
  const bodyData = req.body;
  const comment = bodyData.comment;
  const postId = req.params.id;

  console.log(postId);

  const post = await Post.find({_id: postId});

  console.log("aaaaa", post);

  if(!post[0]) {
    return utils.response(res, 'fail', "Post doesn't exist associated with id", null, 404);
  }

  let comments = post[0].comments;
  const userId = req.user.id;
  const user = await User.find({_id: userId});
  const userName = user[0].name;

  console.log("cccc", comments);

  comments.push({'user': userId, 'name': userName, 'comment': comment});
  const numOfComments = comments.length;

  await Post.findByIdAndUpdate(postId, {'comments': comments, 'numOfComments': numOfComments}, {
    new: true,
    runValidator: true,
    useFindAndModify: false
  });

  const updatedData = await Post.find({_id: postId});

  utils.response(res,'success','Comment Created',updatedData[0],201);
};

exports.getMyselfPosts = async (req, res) => {
  const userId = req.user.id;
  const post  = await Post.find({user: userId});
  console.log("kda", post);

  if(post.length == 0) {
    return utils.response(res, 'fail', "User haven't posted yet", null, 404);
  }

  utils.response(res, 'fail', "User's posts", post, 200);
}