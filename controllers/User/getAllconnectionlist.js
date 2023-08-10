// const express = require('express');

const Profile = require('../../models/Profile');


module.exports = async (req, res) => {
  try {
  
    const profile = await Profile.findOne({ User_id: req.params.User_id });
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }
    // extract connids from each requests object in profile
    const connectionIds = profile.connections.map((data) => data.user_id);
  
    // find all jobdata documents where jID matches any jid in the profile
    const conns = await Profile.find({ User_id: { $in: connectionIds } }, 'Full_name User_id Profile_pic User_name verificationStatus Role Phone Mesibo_account');
    // console.log(jobs)
    res.status(200).json([{ conns }]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


