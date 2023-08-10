//get by id
const event = require('../../models/events');
const profile = require('../../models/Profile');
const category = require('../../models/eventCategory');

module.exports = async (req, res) => {
  try {
    const event_id = req.params.event_id;
    const Event = await event.find({ event_id: event_id }).sort({date_added:-1});
    const profiles = await profile.find({});
    const categorys = await category.find({});

    const result = Event.map(job => {
      const matchingProfile = profiles.find(profile => profile.User_id === job.user_id);
      const matchingcategory = categorys.find(data => data.category_id === job.category_id);
      if (((!matchingProfile) || (!matchingcategory))) {
        return {
          ...job.toObject(),
          User_name: null,
          Profile_pic: null,
          category_name: null,
          verificationStatus: null
        };
      } else {
        return {
          ...job.toObject(),
          User_name: matchingProfile.User_name,
          Profile_pic: matchingProfile.Profile_pic,
          category_name: matchingcategory.category_name,
          verificationStatus: matchingProfile.verificationStatus
        };
      }
    });

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};