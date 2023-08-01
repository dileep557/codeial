const Post= require('../models/post');
const Comment= require('../models/comment');


module.exports.create= function(req, res){

Post.create(
    
{

    content: req.body.content,
    user: req.user._id
}).then(post=>{
    return res.redirect('back');
}).catch(err=>{
    console.log(" error to creating post", err);
});
}




module.exports.destroy = function (req, res) {
  Post.findById(req.params.id)
    .then(post => {
      if (!post) {
        // If the post is not found, handle the error or redirect to an error page
        console.log("Post not found");
        return res.redirect('back');
      }

      if (post.user == req.user.id) {
        // Use deleteOne() to remove the post
        Post.deleteOne({ _id: post._id })
          .then(() => {
            // Delete related comments
            Comment.deleteMany({ post: post._id })
              .then(() => {
                return res.redirect('back');
              })
              .catch(err => {
                console.log("error deleting comments", err);
                return res.redirect('back');
              });
          })
          .catch(err => {
            console.log("error deleting post", err);
            return res.redirect('back');
          });
      } else {
        return res.redirect('back');
      }
    })
    .catch(err => {
      console.log("error finding post", err);
      return res.redirect('back');
    });
}
