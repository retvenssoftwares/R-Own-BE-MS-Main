const Profile = require("../../models/Profile");
const feed = require("../../models/feedcache");
const moment = require('moment-timezone')

module.exports = async (req, res) => {
  const { post_id } = req.body;

  try {
    const users = await Profile.find();
    const feedDocs = await feed.find({});

    let found = false;
    const date_added = moment().tz("Asia/Calcutta").format("YYYY-MM-DD HH:mm:ss");
    for (let i = 0; i < users.length; i++) {
      const connections = users[i].connections.reverse();
      const userIds = connections.map((connection) => connection.user_id);

      for (let j = 0; j < feedDocs.length; j++) {
        const feedData = feedDocs[j];

        if (userIds.includes(feedData.user_id)) {
          feedData.posts.unshift({ post_id, date_added: date_added });
          await feedData.save();
          found = true;
        }
      }
    }

    if (found) {
      return res.status(200).json({ message: 'Post added successfully.' });
    } else {
      return res.status(404).json({ message: 'Connection not found.' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error.' });
  }
};
