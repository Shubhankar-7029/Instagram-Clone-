const postModel = require('../models/post.model');
const jwt = require('jsonwebtoken');
const imageKitModule = import('@imagekit/nodejs');

async function createPostController(req, res) {
    try {
        console.log(req.body, req.file);



        const { default: ImageKit, toFile } = await imageKitModule;

        const imagekit = new ImageKit({
            privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
        });
        // const token =req.cookies("token");
        const token = req.cookies?.token;
        
        // const userId = decoded.id;
        if (!token) {
            return res.status(401).json({
                 message: 'Token not found , Unauthorized' });
        }

        let decoded;

        try{
        decoded = jwt.verify(token, process.env.JWT_SECRET);
        }catch(error){
            return res.status(401).json({
                message: 'Invalid token , Unauthorized' });
        }
        const userId = decoded.id;
        console.log('Decoded user ID:', userId);
       
        const file = await imagekit.files.upload({
            file: await toFile(
                Buffer.from(req.file.buffer),
                'file'
            ),
            fileName: 'Test',
            folder: 'posts',
        });
        const post = await postModel.create({
            caption: req.body.caption,
            imageUrl: file.url,
            user: decoded.id
        });

        // console.log('ImageKit response:', file);

        // res.send(post);
        res.status(201).json({
            message: 'Post created successfully',
            post
        });

        } catch (error) {
        console.error(error);

        res.status(500).json({
            message: 'Image upload failed',
            error: error.message
        });
         }
}

async function getAllPostsController(req, res) {
    const token = req.cookies?.token;
    if (!token) {
        return res.status(401).json({
            message: 'Token not found , Unauthorized' });
    }

    let decoded;

    try{
    decoded = jwt.verify(token, process.env.JWT_SECRET);
    }
    catch(error){
        return res.status(401).json({
            message: 'Invalid token , Unauthorized' });
    }
    const userId = decoded.id;
    console.log('Decoded user ID:', userId);
    const posts = await postModel.find({ user: decoded.id });
    res.status(200).json({
        message: 'Posts fetched successfully',
        posts 
    });
}

async function getPostDetailsController(req, res) {
    const token = req.cookies?.token;
    if (!token) {
        return res.status(401).json({
            message: 'Token not found , Unauthorized' });
    }
    let decoded;
    try{
    decoded = jwt.verify(token, process.env.JWT_SECRET);
    }
    catch(error){
        return res.status(401).json({
            message: 'Invalid token , Unauthorized' });
    }
    const userId = decoded.id;
    const postId =req.params.postId;

    const post =await postModel.findById(postId);
    if (!post){
        return res.status(404).json({
            message: 'Post not found'
        });
    }

   const isValiduser = post.user === userId;
   if (!isValiduser){
    return res.status(403).json({
        message:'You are not authorized to view this post chalaza bosrike '
    });
   }
   else{
    res.status(200).json({
        message: 'Post details fetched successfully',
        post
    });
   }
    }
   


module.exports = {
    createPostController,
    getAllPostsController,
    getPostDetailsController
};
