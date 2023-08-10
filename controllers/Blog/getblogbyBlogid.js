const Blog = require("../../models/blogs");
const Profile = require("../../models/saved");

module.exports = async (req, res) => {
  try {
    const { blog_id, user_id } = req.params;

    const post = await Blog.find({ blog_id: blog_id }).sort({date_added:-1});
    const profile = await Profile.find({user_id:user_id});
    //const categorys = await category.find({});
    if (!post) {
      return res.status(404).send('Post not found');
    }
    
    const result = post.map(blog => {
      //const matchingProfile = profile.find(profile => profile.User_id === blog.User_id);
      //const matchingcategory = categorys.find(data => data.category_id === blog.category_id);
      const matchingSavedBlog = profile.find(profile =>
        profile.saveall_id.Blogs.some(savedBlog => savedBlog.blogid === blog.blog_id)
      );
      const resultlike = blog.likes.some(liked => liked.user_id === user_id);

      let saved = 'not saved';
      let like = "not liked";

      if (matchingSavedBlog) {
        saved = 'saved';
      }

      if (resultlike) {
        like = "liked";
      }

      return {
        ...blog.toObject(),
        //category_name: matchingcategory ? matchingcategory.category_name : null,
        saved: saved,
        like: like,
      };
    });

    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
};
