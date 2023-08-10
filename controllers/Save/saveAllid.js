
const profile = require('../../models/saved');
const feed = require('../../models/Post');
const job = require('../../models/job');
const blog = require('../../models/blogs')
const services = require('../../models/service')
const event = require('../../models/events');
const hotel = require('../../models/Hotels')

module.exports = async (req, res) => {
  const user_id = req.params.User_id;
  const { postid, jobid, blogid, eventid, serviceid, hotelid, operation } = req.body;

  try {
    const post = await profile.find({ user_id: user_id });
    if (post.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    
    const feedData = await feed.findOne({ post_id: postid });
    const feed_userid = feedData ? feedData.user_id : null
    const feed_location = feedData ? feedData.location : null
    const { User_name, Profile_pic, Full_name, media,verificationStatus,caption } = feedData || {};

    const blogdata = await blog.findOne({ blog_id: blogid });
    const bloguserid = blogdata ? blogdata.User_id : null;  
    const profilepic = blogdata ? blogdata.Profile_pic : null;  
    const username =  blogdata ? blogdata.User_name : null;
    const blog_status =  blogdata ? blogdata.verificationStatus : null;
    const {blog_image, category_name, blog_title} = blogdata || {}

    const servicesdata = await services.findOne({serviceId:serviceid })
    const services_userid = servicesdata ? servicesdata.user_id : null
    const services_pic = servicesdata ? servicesdata.Profile_pic : null
    const services_username = servicesdata ? servicesdata.User_name : null
    const service_status = servicesdata ? servicesdata.verificationStatus : null
    const {vendorName, vendorImage , location, vendorServicePrice} = servicesdata || {}

 

    const jobData = await job.findOne({ jid: jobid });
    const job_userid = jobData ? jobData.user_id : null
    const { jobTitle, hotelLogoUrl, expectedCTC, jobType, companyName, jobLocation } = jobData || {};


    //const newComment = { postid, jobid, eventid, serviceid, hotelid, User_name, Profile_pic, Full_name, media, jobTitle, hotelLogoUrl, expectedCTC, jobType, companyName, jobLocation};
    const newblog = {blog_image, category_name, blog_title, Profile_pic: profilepic, User_name: username,user_id:bloguserid,verificationStatus:blog_status,blogid}
    const servicesarray = {serviceid, vendorName, vendorImage , location, vendorServicePrice, Profile_pic:services_pic,User_name:services_username,user_id:services_userid,verificationStatus:service_status}
    
    const hotelData = await hotel.findOne({hotel_id: hotelid})
    const hotel_userid = hotelData ? hotelData.user_id : null
    const {hotelCoverpicUrl, hotelAddress, hotelName, hotelRating} = hotelData || {};

    const eventData = await event.findOne({event_id: eventid});
    const eventuserid = eventData ? eventData.User_id : null;
    const eventUserName = eventData ? eventData.User_name : null;
    const eventProfilePic = eventData ? eventData.Profile_pic : null;
    const event_status = eventData ? eventData.verificationStatus : null;
    const { price, event_start_date, event_thumbnail, event_title,event_category} = eventData || {};

    const newEvent = {
      eventid,
      price,
      event_start_date,
      event_thumbnail,
      event_title,
      event_category,
      user_id:eventuserid,
      verificationStatus:event_status,
      Profile_pic: eventProfilePic,
      User_name: eventUserName
    }
  
    const newHotel = {
      hotelCoverpicUrl,
      hotelid,
      hotelAddress,
      hotelName,
      hotelRating,
      user_id:hotel_userid
    }

    const newpost = { 
      postid, 
      User_name, 
      Profile_pic, 
      Full_name, 
      user_id:feed_userid,
      media, 
      verificationStatus,
      caption,
      location:feed_location
    }

    const newjob = {
      jobid, 
      user_id:job_userid,
      jobTitle, 
      hotelLogoUrl, 
      expectedCTC, 
      jobType, 
      companyName, 
      jobLocation 
    };

    const { Posts, Jobs, Blogs, Events, Services, Hotels } = post[0].saveall_id;

    if (operation === 'push') {
      if (postid) {
        const existingPost = Posts.find((comment) => comment.postid === postid);
        if (existingPost) {
          return res.status(400).json({ message: "Post ID already exists" });
        }
        Posts.unshift(newpost);
      }
      if (jobid) {
        const existingJob = Jobs.find((comment) => comment.jobid === jobid);
        if (existingJob) {
          return res.status(400).json({ message: "Job ID already exists" });
        }
        Jobs.unshift(newjob);
      }
      if (blogid) {
        const existingblog = Blogs.find((comment) => comment.blogid === blogid);
        if (existingblog) {
          return res.status(400).json({ message: "blog ID already exists" });
        }
        Blogs.unshift(newblog);
        }
        
      
      if (eventid) {
        const existingevent = Events.find((comment) => comment.eventid === eventid);
        if (existingevent) {
          return res.status(400).json({ message: "Event ID already exists" });
        }
        Events.unshift(newEvent);
      }
      if (serviceid) {
        const existingservice = Services.find((comment) => comment.serviceid === serviceid);
        if (existingservice) {
          return res.status(400).json({ message: "service ID already exists" });
        }
        Services.unshift(servicesarray);
      }
      if (hotelid) {
        const existinghotel = Hotels.find((comment) => comment.hotelid === hotelid);
        if (existinghotel) {
          return res.status(400).json({ message: "hotel ID already exists" });
        }
        Hotels.unshift(newHotel);
      }
    } else if (operation === 'pop') {
      if (postid) {
        const index = Posts.findIndex((comment) => comment.postid === postid);
        if (index !== -1) Posts.splice(index, 1);
      }
      if (jobid) {
        const index = Jobs.findIndex((comment) => comment.jobid === jobid);
        if (index !== -1) Jobs.splice(index, 1);
      }
      if (blogid) {
        const index = Blogs.findIndex((comment) => comment.blogid === blogid);
        if (index !== -1) Blogs.splice(index, 1);
      }
      if (eventid) {
        const index = Events.findIndex((comment) => comment.eventid === eventid);
        if (index !== -1) Events.splice(index, 1);
      }
      if (serviceid) {
        const index = Services.findIndex((comment) => comment.serviceid === serviceid);
        if (index !== -1) Services.splice(index, 1);
      }
      if (hotelid) {
        const index = Hotels.findIndex((comment) => comment.hotelid === hotelid);
        if (index !== -1) Hotels.splice(index, 1);
      }
    }

    await post[0].save();
    return res.json({ message: "ID operation performed successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

