

// const saved = require('../../models/saved');
// const Comment = require('../../models/comments');
// const Like = require('../../models/feedlikes');

// module.exports = async (req, res) => {
//   const { user_id } = req.params;
//   const pageSize = 10; // Number of posts per page
//   const page = parseInt(req.query.page) || 1; // Current page number

//   try {
//     // Find the document containing the 'Posts' array based on the user_id
//     const result = await saved.findOne({ user_id }, { 'saveall_id.Posts': 1 }).exec();
//     const posts = result?.saveall_id?.Posts || []; // Extract the 'Posts' array

//     const totalCount = posts.length;
//     const totalPages = Math.ceil(totalCount / pageSize);

//     if (page > totalPages) {
//       // Page number exceeds the total number of pages
//       return res.json({ message: 'You have reached the end' });
//     }

//     const startIndex = (page - 1) * pageSize;
//     const endIndex = startIndex + pageSize;
//     const paginatedPosts = posts.slice(startIndex, endIndex);

//     // Get the post IDs
//     const postIds = paginatedPosts.map((post) => post.postid);

//     // Fetch likes count for each post
//     const likeCounts = await Like.aggregate([
//       { $match: { post_id: { $in: postIds } } },
//       { $group: { _id: '$post_id', count: { $sum: { $size: '$likes' } } } }
//     ]);

//     // Fetch comment count for each post
//     const commentCounts = await Comment.aggregate([
//       { $match: { post_id: { $in: postIds } } },
//       { $group: { _id: '$post_id', count: { $sum: { $size: '$comments' } } } }
//     ]);

//     // Create a map of post IDs to their respective like counts
//     const likeCountsMap = likeCounts.reduce((map, { _id, count }) => {
//       map[_id] = count;
//       return map;
//     }, {});

//     // Create a map of post IDs to their respective comment counts
//     const commentCountsMap = commentCounts.reduce((map, { _id, count }) => {
//       map[_id] = count;
//       return map;
//     }, {});

//     // Add like count and comment count to each post
//     const postsWithCounts = paginatedPosts.map((post) => ({
//       ...post.toObject(),
//       likeCount: likeCountsMap[post.postid] || 0,
//       commentCount: commentCountsMap[post.postid] || 0
//     }));

//     res.json([{
//       posts: postsWithCounts,
//       page,
//       pageSize,
//       // totalPosts: totalCount,
//       // totalPages
//     }]);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

const saved = require('../../models/saved');
const Comment = require('../../models/comments');
const Like = require('../../models/feedlikes');

module.exports = async (req, res) => {
  const { user_id } = req.params;
  const pageSize = 10; // Number of posts per page
  const page = parseInt(req.query.page) || 1; // Current page number

  try {
    // Find the document containing the 'Posts' array based on the user_id
    const result = await saved.findOne({ user_id }, { 'saveall_id.Posts': 1 }).exec();
    const posts = result?.saveall_id?.Posts || []; // Extract the 'Posts' array

    const totalCount = posts.length;
    const totalPages = Math.ceil(totalCount / pageSize);

    if (page > totalPages) {
      // Page number exceeds the total number of pages
      return res.json({ message: 'You have reached the end' });
    }

    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedPosts = posts.slice(startIndex, endIndex);

    // Get the post IDs
    const postIds = paginatedPosts.map((post) => post.postid);

    // Fetch likes count for each post
    const likeCounts = await Like.aggregate([
      { $match: { post_id: { $in: postIds } } },
      { $group: { _id: '$post_id', count: { $sum: { $size: '$likes' } } } }
    ]);

    // Fetch comment count for each post
    const commentCounts = await Comment.aggregate([
      { $match: { post_id: { $in: postIds } } },
      { $group: { _id: '$post_id', count: { $sum: { $size: '$comments' } } } }
    ]);

    // Create a map of post IDs to their respective like counts
    const likeCountsMap = likeCounts.reduce((map, { _id, count }) => {
      map[_id] = count;
      return map;
    }, {});

    // Create a map of post IDs to their respective comment counts
    const commentCountsMap = commentCounts.reduce((map, { _id, count }) => {
      map[_id] = count;
      return map;
    }, {});

    // Find the user's liked posts
    const userLikedPosts = await Like.find({ 'likes.user_id':user_id });

    // Create a map of post IDs to their respective liked status
    const likedStatusMap = userLikedPosts.reduce((map, like) => {
      map[like.post_id] = true;
      return map;
    }, {});

    // Add like count, comment count, and liked status to each post
    const postsWithCountsAndLikedStatus = paginatedPosts.map((post) => ({
      ...post.toObject(),
      likeCount: likeCountsMap[post.postid] || 0,
      commentCount: commentCountsMap[post.postid] || 0,
      like: likedStatusMap[post.postid] ? "liked" : "not liked" // Convert boolean to "liked" or "not liked"
    }));

    res.json([{
      posts: postsWithCountsAndLikedStatus,
      page,
      pageSize,
      // totalPosts: totalCount,
      // totalPages
    }]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
