

const saved = require('../../models/saved');
const Blog = require('../../models/blogs');

module.exports = async (req, res) => {
  const { user_id } = req.params;
  let currentPage = parseInt(req.query.page) || 1; // Current page number
  const pageSize = 10; // Number of blogs per page

  try {
    // Calculate the skip value based on the current page and page size
    const skip = (currentPage - 1) * pageSize;

    // Find the document based on user_id
    const savedDocument = await saved.findOne({ user_id });

    if (!savedDocument) {
      return res.status(404).json({ message: 'No blogs found for the user.' });
    }

    const blogIds = savedDocument.saveall_id.Blogs || [];

    // Retrieve blogs using pagination
    const paginatedBlogs = blogIds.slice(skip, skip + pageSize);

    if (paginatedBlogs.length === 0) {
      return res.status(200).json({ message: 'You have reached the end.' });
    }

    // Get the blog IDs
    const blogIdList = paginatedBlogs.map((blog) => blog.blogid);

    // Fetch the like count for each blog
    const likeCounts = await Blog.aggregate([
      { $match: { blog_id: { $in: blogIdList } } },
      { $project: { _id: 0, blog_id: 1, likeCount: { $size: '$likes' } } }
    ]);

    // Fetch the comment count for each blog
    const commentCounts = await Blog.aggregate([
      { $match: { blog_id: { $in: blogIdList } } },
      { $project: { _id: 0, blog_id: 1, commentCount: { $size: '$comments' } } }
    ]);

    // Create a map of blog IDs to their respective like counts
    const likeCountsMap = likeCounts.reduce((map, { blog_id, likeCount }) => {
      map[blog_id] = likeCount;
      return map;
    }, {});

    // Create a map of blog IDs to their respective comment counts
    const commentCountsMap = commentCounts.reduce((map, { blog_id, commentCount }) => {
      map[blog_id] = commentCount;
      return map;
    }, {});

    // Add like count and comment count to each blog
    const blogsWithCounts = paginatedBlogs.map((blog) => ({
      ...blog.toObject(),
      likeCount: likeCountsMap[blog.blogid] || 0,
      commentCount: commentCountsMap[blog.blogid] || 0
    }));

    res.json([{
      page: currentPage,
      pageSize,
      blogs: blogsWithCounts
    }]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};
