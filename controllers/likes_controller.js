const Like = require('../models/like');
const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.toggleLike = async function(req,res){
    try {
        //likes/toggle/?id=abcdef&type=Post
        let likeable;
        let deleted = false;
        
        if(req.query.type = 'Post'){
            likeable = await Post.findById(req.query.id).populate('like');
        }else{
            likeable = await Post.findById(req.query.id).populate('like');
        }

        //if like already exist
        let existingLike = await Like.findOne({
            likeable : req.query.id,
            onModel : req.query.type,
            user : req.query._id
        });

        if(existingLike){
            likeable.likes.pull(existingLike._id);
            likeable.save();

            existingLike.remove();

            deleted = true;
        }else{
            //make a new like
            let newLike = await Like.create({
                user : req.user._id,
                likeable : req.query.id,
                onModel : req.query.type
            })

            likeable.likes.push(like);
            likeable.save();
        }

        return res.json(200,{
            message: 'Liked',
            deleted : deleted
        })


    } catch (error) {
        console.log(error);
        return res.json(500,{
            message : 'Internal Server Error'
        })
    }
}