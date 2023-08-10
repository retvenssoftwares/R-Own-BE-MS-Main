
const Event = require('../../models/events');
const profile = require('../../models/saved');
const category = require('../../models/eventCategory');

module.exports = async (req, res) => {
  try {
    const { User_id } = req.params;

    const Blog = await Event.find({}).sort({date_added:-1});
    const profiles = await profile.find({user_id:User_id});
    const categorys = await category.find({});

    const result = Blog.map(event => {
      
      const matchingcategory = categorys.find(data => data.category_id === event.category_id);

      const matchingSavedBlog = profiles.find(profile => 
        profile.saveall_id.Events.some(savedBlog => savedBlog.eventid === event.event_id)
      );

      let saved = 'not saved';
      let profileData = null;

      
        if (matchingSavedBlog) {
          saved = 'saved';
        }


      return {
        ...event.toObject(),
        category_name: matchingcategory ? matchingcategory.category_name : null,
        saved: saved,
      };
    });

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: "something went wrong" });
  }
};