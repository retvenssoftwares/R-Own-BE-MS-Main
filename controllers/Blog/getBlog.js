const blog = require('../../models/blogs');
const profile = require('../../models/Profile');
const saved = require('../../models/saved');
const category = require('../../models/blogCategories');

module.exports = async (req, res) => {
  try {
    const { User_id } = req.params;

    const Blog = await blog.aggregate([{ $sample: { size: 10 } }]);
    const profiles = await profile.find({ User_id });
    const save = await saved.find({ user_id: User_id });
    const categorys = await category.find({});

    const result = Blog.map((blog) => {
      const matchingProfile = profiles.find((profile) => profile.User_id === blog.User_id);
      const matchingcategory = categorys.find((data) => data.category_id === blog.category_id);
      const matchingSavedBlog = save.find((profile) =>
        profile.saveall_id.Blogs.some((savedBlog) => savedBlog.blogid === blog.blog_id)
      );
      const resultlike = blog.likes.some((liked) => liked.user_id === User_id);

      let saved = 'not saved';
      let like = 'not liked';

      if (matchingSavedBlog) {
        saved = 'saved';
      }

      if (resultlike) {
        like = 'liked';
      }

      return {
        ...blog,
        category_name: matchingcategory ? matchingcategory.category_name : null,
        saved: saved,
        like: like,
      };
    });

    return res.status(200).json(result);
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'something went wrong' });
  }
};
