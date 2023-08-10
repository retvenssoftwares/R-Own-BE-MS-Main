
const Profile = require('../../models/Profile');

module.exports = async (req, res) => {
  try {
    const user_id = req.params.user_id;
    const { jobtype, jobtitle, hotelCompany, jobstartYear, jobendYear } = req.body;
    const group = await Profile.findOne({ User_id: user_id });
    if (!group) {
      return res.status(404).json({ message: "User not found" });
    }

    if (jobtype && jobtitle && hotelCompany && jobstartYear && jobendYear) {
      const hospitality = { jobtype, jobtitle, hotelCompany, jobstartYear, jobendYear };
      
      // Find the index to insert the new hospitality object to maintain order based on jobstartYear
      let insertIndex = group.hospitalityExpertInfo.length; // Default to the last index

      for (let i = 0; i < group.hospitalityExpertInfo.length; i++) {
        if (jobendYear === "present") {
          insertIndex = 0; // Insert at the beginning if jobendYear is "present"
          break;
        } else if (jobstartYear > group.hospitalityExpertInfo[i].jobstartYear) {
          insertIndex = i; // Insert before the current index if jobstartYear is greater
          break;
        } else if (jobstartYear === group.hospitalityExpertInfo[i].jobstartYear) {
          if (jobendYear === group.hospitalityExpertInfo[i].jobendYear) {
            // Check for equal jobendYear and break if found, assuming we don't want duplicates
            break;
          } else if (jobendYear > group.hospitalityExpertInfo[i].jobendYear) {
            insertIndex = i; // Insert before the current index if jobendYear is greater
            break;
          }
        }
      }

      
      group.hospitalityExpertInfo.splice(insertIndex, 0, hospitality);
    }

    await group.save();

    return res.json({ message: "User information added successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
