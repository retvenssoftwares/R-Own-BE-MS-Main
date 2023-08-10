

const Post = require('../../models/Post');
const Profile = require('../../models/Profile');
const Like = require('../../models/feedlikes');
const Comment = require('../../models/comments');
const Saved = require('../../models/saved')

module.exports = async (req, res) => {
  try {
    const { User_id } = req.params;
    const { user_id } = req.params;
    const { page } = req.query;
    const pageSize = 10;
    const currentPage = parseInt(page) || 1;
    const skip = (currentPage - 1) * pageSize;

    const searchQuery = {
      user_id: User_id,
      post_type: { $in: ['Update about an event', 'Check-in', 'normal status'] }
    };

    const totalPosts = await Post.countDocuments(searchQuery);

    const hotelpost = await Post
      .find(searchQuery)
      .skip(skip)
      .limit(pageSize)
      .sort({date_added:-1});

      // const userProfile = await Profile({User_id: user_id})
    const saved = await Saved.findOne({ user_id: user_id });

    const postIds = hotelpost.map((post) => post.post_id);
    console.log(postIds)

    //like count
    const likeCounts = await Like.aggregate([
      { $match: { post_id: { $in: postIds } } },
      {
        $addFields: {
          filteredLikes: {
            $filter: {
              input: "$likes",
              as: "like",
              cond: { $eq: ["$$like.display_status", "1"] }
            }
          }
        }
      },
      { $group: { _id: '$post_id', likeCount: { $sum: { $size: '$filteredLikes' } } } }
    ]);
    const likeCountMap = new Map(likeCounts.map((item) => [item._id, item.likeCount]));
 
    ///saved
    const likedPosts2 = await Like.find({
      post_id: { $in: postIds },
      "likes.user_id": user_id,
      // "likes.display_status": { $ne: '0' }
    });

    //comment count
    const commentCounts = await Comment.aggregate([
      { $match: { post_id: { $in: postIds } } },
      {
        $addFields: {
          comments: {
            $filter: {
              input: "$comments",
              as: "comment",
              cond: { $eq: ["$$comment.display_status", "1"] }
            }
          }
        }
      },
      { $group: { _id: '$post_id', commentCount: { $sum: { $size: '$comments' } } } }
    ]);
    const commentCountMap = new Map(commentCounts.map((item) => [item._id, item.commentCount]));
    

    const likedPostIds = likedPosts2.map((likedPost) => likedPost.post_id);
    const savedPosts = saved.saveall_id.Posts.map((savedPost) => savedPost.postid);

    const postsWithStatus = hotelpost.map((post) => {
      const isSaved = savedPosts.includes(post.post_id);
      const isLiked = likedPostIds.includes(post.post_id);
     // const likeCount = likedPosts.filter((likedPost) => likedPost.post_id === post.post_id).reduce((total, likedPost) => total + likedPost.likes.length, 0);
     const likeCount = likeCountMap.get(post.post_id) || 0; 
     //const commentCount = commentPosts.filter((commentPost) => commentPost.post_id === post.post_id).reduce((total, commentPost) => total + commentPost.comments.length, 0);
     const commentCount = commentCountMap.get(post.post_id) || 0;

      return {
        ...post.toObject(),
        saved: isSaved ? 'saved' : 'not saved',
        liked: isLiked ? 'liked' : 'not liked',
        likeCount: likeCount,
        commentCount: commentCount
      };
    });

    if (postsWithStatus.length > 0) {
      res.json([{
        page: currentPage,
        pageSize,
        posts: postsWithStatus
      }]);
    } else {
      res.json([{ message: 'You have reached the end' }]);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Something went wrong' });
  }
};
