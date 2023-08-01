const Comment= require('../models/comment');
const Post= require('../models/post');




module.exports.create= function(req, res){

    Post.findById(req.body.post).exec().
    then(post=>{
        if(post){


            Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            }).then(comment=>{
                post.comments.push(comment);
                post.save();
             return res.redirect('back');

            }).catch(err=>{
                console.log(" error creating to comment");
                return res.redirect('back');

            });
        }
    })





}


const mongoose = require('mongoose');


module.exports.destroy = function (req, res) {
   

    Comment.findById(req.params.id)
        .then(comment => {
            if (!comment) {
                console.log('Comment not found');
                return res.redirect('back');
            }

            if (comment.user.toString() === req.user.id) {
                let postId = comment.post;

                comment.deleteOne()
                    .then(() => {
                        // After deleting the comment, update the Post's comments array
                        return Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id } });
                    })
                    .then(() => {
                        console.log('Comment deleted successfully');
                        return res.redirect('back');
                    })
                    .catch(err => {
                        console.log('Error deleting the comment', err);
                        return res.redirect('back');
                    });
            } 
            else {
                console.log('Unauthorized to delete the comment');
                return res.redirect('back');
            }
        })
        .catch(err => {
            console.log('Error finding the comment:', err);
            return res.redirect('back');
        });
};
