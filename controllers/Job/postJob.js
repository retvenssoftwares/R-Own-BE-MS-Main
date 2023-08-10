

const profile = require('../../models/Profile');
const job = require('../../models/job');
const hotel = require('../../models/Hotels');
const vendorServices = require('../vendors/vendorServices');

module.exports = async (req, res) => {
  const { User_id } = req.params;
  const data = await profile.findOne({ User_id: User_id });
  const hoteldata = await hotel.find({ user_id: User_id });


  if (!data) {
    return res.send("no match found");
  }

  if (!hoteldata || hoteldata.length === 0) {
    return res.json({ message: "Please add a hotel first" });
  }

  if (data.Role === "Business Vendor/Freelancer") {
    const vendorimg = data.vendorInfo.vendorImage;

    const jobData = new job({
      user_id: req.body.user_id,
      jobApplicants: req.body.jobApplicants,
      jid: req.body.jid,
      jobCategory: req.body.jobCategory,
      jobTitle: req.body.jobTitle,
      companyName: req.body.companyName,
      workplaceType: req.body.workplaceType,
      jobType: req.body.jobType,
      designationType: req.body.designationType,
      noticePeriod: req.body.noticePeriod,
      expectedCTC: req.body.expectedCTC,
      jobLocation: req.body.jobLocation,
      jobDescription: req.body.jobDescription,
      skillsRecq: req.body.skillsRecq,
      Bookmarked: req.body.Bookmarked,
      display_status: req.body.display_status,
      vendorimg: vendorimg,
      
    });

    await jobData.save();
    return res.json({ message: "vendor job posted successfully" });
  } else if (data.Role === "Hotel Owner") {
    const hotelLogoUrl = hoteldata[0] ? hoteldata[0].hotelLogoUrl : null;
    let hotel_id = null;

    for (const hotelItem of hoteldata) {
      if (
        hotelItem.hotelName &&
        hotelItem.hotelName.toLowerCase() === req.body.companyName.toLowerCase() &&
        hotelItem.user_id === req.body.user_id
      ) {
        hotel_id = hotelItem.hotel_id;
        break;
      }
    }

    if (hotel_id) {
      const jobData = new job({
        user_id: req.body.user_id,
        jobApplicants: req.body.jobApplicants,
        jid: req.body.jid,
        jobCategory: req.body.jobCategory,
        jobTitle: req.body.jobTitle,
        companyName: req.body.companyName,
        workplaceType: req.body.workplaceType,
        jobType: req.body.jobType,
        designationType: req.body.designationType,
        noticePeriod: req.body.noticePeriod,
        expectedCTC: req.body.expectedCTC,
        jobLocation: req.body.jobLocation,
        jobDescription: req.body.jobDescription,
        skillsRecq: req.body.skillsRecq,
        Bookmarked: req.body.Bookmarked,
        display_status: req.body.display_status,
        hotelLogoUrl: hotelLogoUrl,
        hotel_id: hotel_id
      });

      await jobData.save();
      return res.json({ message: "hotel owner job posted successfully" });
    } else {
      return res.json({ message: "Company name or User ID does not match with any hotel data" });
    }
  } else {
    return res.json({ message: "Please enter a valid user ID" });
  }
};
