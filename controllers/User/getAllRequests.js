// const express = require('express');

const Profile = require('../../models/Profile');


module.exports = async (req, res) => {
  try {
    const { user_id } = req.params;
    // find profile document with the given user_id
    const profile = await Profile.findOne({ User_id: user_id });
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }
    // extract connids from each requests object in profile
    const userIds = profile.requests.map((reqs) => reqs.user_id);
    // console.log(jids)
    // find all jobdata documents where jID matches any jid in the profile
    const conns = await Profile.find({ User_id: { $in: userIds } }, 'Full_name User_id Profile_pic Role verificationStatus normalUserInfo.jobTitle');
    // console.log(jobs)
    res.status(200).json({ conns });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


