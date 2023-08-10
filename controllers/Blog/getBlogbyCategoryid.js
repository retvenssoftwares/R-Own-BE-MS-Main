

const blog = require('../../models/blogs');
const profile = require('../../models/saved');
const category = require('../../models/blogCategories');

module.exports = async (req, res) => {
  try {
    const { User_id, category_id } = req.params;

    const Blog = await blog.find({category_id: category_id}).sort({date_added:-1});
    const profiles = await profile.find({user_id:User_id});
    const categorys = await category.find({});

    const result = Blog.map(blog => {
      //const matchingProfile = profiles.find(profile => profile.User_id === blog.User_id);
      const matchingcategory = categorys.find(data => data.category_id === blog.category_id);

      const matchingSavedBlog = profiles.find(profile => 
        profile.saveall_id.Blogs.some(savedBlog => savedBlog.blogid === blog.blog_id)
      );
      const resultlike = blog.likes.some(liked => liked.user_id === User_id);
      let saved = 'not saved';
      let like = "not liked";
      let profileData = null;

     
        if (matchingSavedBlog) {
          saved = 'saved';
        }
      
        if (resultlike) {
          like = "liked";
        }
      return {
        ...blog.toObject(),
        // User_name: profileData ? profileData.User_name : null,
        // Profile_pic: profileData ? profileData.Profile_pic : null,
        category_name: matchingcategory ? matchingcategory.category_name : null,
        saved: saved,
        like: like,
      };
    });

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: "something went wrong" });
  }
};
