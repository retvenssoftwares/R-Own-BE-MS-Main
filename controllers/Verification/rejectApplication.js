const verification = require('../../models/verification')

module.exports = async (req, res) => {
    const verifyUser = await verification.findOne({user_id: req.params.user_id});
    if (verifyUser){
      await verification.deleteOne({ user_id: verifyUser.user_id });
      return res.status(200).json({message: "Application Rejected"});
    }
    else {
        return res.status(404).json({message: "User not found"});
    }
}