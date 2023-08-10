// const express = require('express');

const Profile = require('../../models/Profile');
const Jobdata = require('../../models/job');

module.exports = async (req, res) => {
  try {
    const { user_id } = req.params;
    // find profile document with the given user_id
    const profile = await Profile.findOne({ User_id: user_id });
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }
    // extract jid from each Bookmarkjob object in profile
    const jids = profile.Bookmarkjob.map((bookmark) => bookmark.jid);
    // console.log(jids)
    // find all jobdata documents where jID matches any jid in the profile
    const jobs = await Jobdata.find({ jID: { $in: jids } });
    // console.log(jobs)
    res.status(200).json({ jobs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


