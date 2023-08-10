const blog = require('../../models/blogs');
module.exports =  async (req, res) => { {
    try {

      const filter = { blog_id: req.params.blog_id };
      const update = {
        blog_title : req.body.blog_title,
        blog_content: req.body.blog_content,
        display_status: req.body.display_status,    
};
      const options = { new: true };
      const updatedfaq = await blog.findOneAndUpdate(filter, update, options);

      res.status(200).send({ message: 'blog updated successfully' });

    } catch (err) {
      console.error(err);
      res.status(500).send({ message: 'something wrong' });
    }
  };
};                                                                                                    