const blog = require('../../models/blogCategories');
const Blog = require('../../models/blogs');

module.exports = async (req, res) => {
  try {
    const categories = await blog.find();
    if (!categories) {
      return res.status(404).json({ error: 'Categories not found' });
    }

    const categoryIds = categories.map(category => category.category_id);

    const categoryCounts = await Blog.aggregate([
      {
        $match: { category_id: { $in: categoryIds } }
      },
      {
        $group: {
          _id: '$category_id',
          count: { $sum: 1 }
        }
      }
    ]);

    const result = categories.map(category => {
      const countEntry = categoryCounts.find(entry => entry._id === category.category_id);
      const count = countEntry ? countEntry.count : 0;

      return {
        category_id: category.category_id,
        category_name: category.category_name,
        Image: category.Image,
        date_added: category.date_added,
        blog_count: count
      };
    });

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};