

const Profile = require('../../models/Profile');

module.exports = async (req, res) => {
    try {
        // Use the Profile model to count the number of records
        const count = (await Profile.countDocuments()).toLocaleString();
        // const countWithPlus = count.toLocaleString()
        return res.status(200).json({count: count});
      } catch (err) {
        console.error(err);
       return res.status(500).json({ message: 'Something went wrong' });
      }
};
