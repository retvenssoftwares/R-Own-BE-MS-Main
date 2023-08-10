

//models
const profile = require("../../models/Profile");
const save =require("../../models/saved")
const posts =require("../../models/Post")
const feedCache =require("../../models/feedcache")
// const likearray = require('../../models/feedlikes')
// const commentarray = require('../../models/comments')
module.exports = async (req, res) => {
    const {User_id} = req.params;//receiver
    const {  user_id } = req.body;//sender
    

    try {
        const findProfile = await profile.findOne({ User_id }); //receiver
        const ownProfile = await profile.findOne({User_id : user_id}); //sender
        
        if (!findProfile) {
            return res.status(404).json({ message: "profile not found" });
        }

        // const newRequest = { connection_id };


        const connExists = findProfile.connections.some((connection) => connection.user_id === user_id);
        
        if ((connExists) || (likeexist) || (connexist)) {
            
            // Remove the user_id from the connections array
            findProfile.connections = findProfile.connections.filter((connection) => connection.user_id !== user_id);
            await findProfile.save();
            ownProfile.connections = ownProfile.connections.filter((connection) => connection.user_id !== User_id);
            await ownProfile.save()
         
             //saved section
              const saveuser1 = await save.findOne({ user_id: User_id });//blocker
                if (!saveuser1) {
                return res.status(404).json({ message: "saveuser1 not found" });
                   }
                const saveuser2 = await save.findOne({ user_id: user_id });//blocked
                    if (!saveuser2) {
                  return res.status(404).json({ message: "saveuser2 not found" });
                  }
                // Remove the user_id from the saved array
                saveuser1.saveall_id.Posts = saveuser1.saveall_id.Posts.filter((block) => block.user_id !== user_id);
                await saveuser1.save();

                saveuser2.saveall_id.Posts = saveuser2.saveall_id.Posts.filter((blocked) => blocked.user_id !== User_id);
                await saveuser2.save();

             ///Post
                const posts1 = await posts.find({ user_id: User_id });
                const  posts2 = await posts.find({ user_id: user_id });
                
                //feed
                const feed1 = await feedCache.findOne({ user_id: User_id });
                const feed2  = await feedCache.findOne({ user_id: user_id });
                
                // Collect post_ids from posts1
                const postIds = posts1.map((post) => post.post_id);
                const postIds2 = posts2.map((post) => post.post_id);
               // Update feed1 and remove matching post_ids
                if (feed1) {
                    await feedCache.updateOne(
                      { user_id: User_id },
                      { $pull: { posts: { post_id: { $in: postIds2 } } } }
                    );
                  }
              
                  // Update feed2 and remove matching post_ids
                  if (feed2) {
                    await feedCache.updateOne(
                      { user_id: user_id },
                      { $pull: { posts: { post_id: { $in: postIds } } } }
                    );
                  }


            return res.json({ message: "Your connection was removed" });
           
        } 
        
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};




// models
// models
// models
// const profile = require("../../models/Profile");
// const likearray = require('../../models/feedlikes');
// const commentarray = require('../../models/comments');

// module.exports = async (req, res) => {
//   const { User_id } = req.params; // receiver
//   const { user_id } = req.body; // sender

//   try {
//     const findProfile = await profile.findOne({ User_id }); // receiver
//     const ownProfile = await profile.findOne({ User_id: user_id }); // sender
//     let likedata = await likearray.findOne({ user_id: User_id });
//     let commentdata = await commentarray.findOne({ user_id: User_id });

//     if (!findProfile) {
//       return res.status(404).json({ message: "Profile not found" });
//     }

//     const connExists = findProfile.connections.some((connection) => connection.user_id === user_id);
//     const likeExists = likedata && likedata.likes.some((like) => like.user_id === user_id);
//     const commentExists = commentdata && commentdata.comments.some((comment) => comment.user_id === user_id);

//     if (connExists || likeExists || commentExists) {
//       // Remove the user_id from the connections array
//       findProfile.connections = findProfile.connections.filter((connection) => connection.user_id !== user_id);
//       await findProfile.save();

//       ownProfile.connections = ownProfile.connections.filter((connection) => connection.user_id !== User_id);
//       await ownProfile.save();

//       if (likeExists) {
//         likedata.likes = likedata.likes.filter((like) => like.user_id !== user_id);
//         await likedata.save();
//       }

//       if (commentExists) {
//         commentdata.comments = commentdata.comments.filter((comment) => comment.user_id !== user_id);
//         await commentdata.save();
        
//         // Remove user_id from all the comments the user has made
//         const commentsMadeByUser = commentdata.comments.map((comment) => comment.comment_id);

//         await commentarray.updateMany(
//           { 'comments.comment_id': { $in: commentsMadeByUser } },
//           { $pull: { 'comments.$.replies': { user_id: user_id } } }
//         );
//       }

//       // Remove user_id from all the posts the user has liked
//       if (likedata && likedata.likes.length > 0) {
//         const postsLikedByUser = likedata.likes.map((like) => like.post_id);

//         await likearray.updateMany(
//           { post_id: { $in: postsLikedByUser } },
//           { $pull: { likes: { user_id: user_id } } }
//         );
//       }

//       return res.json({ message: "Your connection was removed" });
//     }

//     // Handle other scenarios if needed...

//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// };
