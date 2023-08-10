
const AWS = require('aws-sdk');
const multer = require('multer');
const s3 = require('../../utils/url');
const Profile = require('../../models/Profile');
const Post = require('../../models/Post');
const Comment = require('../../models/comments');
const like = require('../../models/feedlikes');
const event = require('../../models/events')
const notification = require('../../models/notificationSchema')
const notify = require('../../models/notification')
const service = require('../../models/service')
const saves = require('../../models/saved')
const group = require('../../models/userGroup')
const block = require('../../models/blockedUser')
const _ = require('lodash');
const multerS3 = require('multer-s3');
const { S3Client } = require("@aws-sdk/client-s3");
const storage = multer.memoryStorage();



const upload = multer({
  storage: multerS3({
    s3,
    bucket: 'rown-bucket', // Replace with your S3 bucket name
    acl: 'public-read',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: (req, file, cb) => {
      cb(null, `profile-pictures/${file.originalname}`);
    },
  }),
});

module.exports = async (req, res) => {
  try {
    let mediaUrl;

    // Upload the file to DigitalOcean Spaces if a file has been selected
    if (req.file) {
      const params = {
        Bucket: 'rown-bucket', // Replace with your S3 bucket name
        Key: `profile-pictures/${req.file.originalname}`,
        Body: req.file.buffer,
        ContentType: req.file.mimetype,
        acl: 'public-read'
      };
      await s3.upload(params).promise();
      mediaUrl = `https://rown-bucket.s3.amazonaws.com/profile-pictures/${req.file.originalname}`;
    }


    const filter = { User_id: req.params.User_id };
    const update = {
      Full_name: req.body.Full_name,
      Email: req.body.Email,
      DOB: req.body.DOB,
      User_name: req.body.User_name,
      location: req.body.location,
      Role: req.body.Role,
      device_token: req.body.device_token,
      hospitalityExpertInfo: req.body.hospitalityExpertInfo,
      Mesibo_account: req.body.Mesibo_account,
      Interest: req.body.Interest,
      Post_count: req.body.Post_count,
      connection_count: req.body.connection_count,
      saved_post: req.body.saved_post,
      Liked_post: req.body.Liked_post,
      // verificationStatus: req.body.verificationStatus,
      userBio: req.body.userBio,
      Gender: req.body.Gender,
      profileCompletionStatus: req.body.profileCompletionStatus,
      Profile_pic: mediaUrl,
      display_status: req.body.display_status
    };

    const validUsernameRegex = /^[a-z0-9_.]+$/;
    if (!validUsernameRegex.test(req.body.User_name)) {
      return res.status(400).send({ message: 'User_name can only contain small letters (a-z), numbers (0-9), and characters (._)' });
    }

    const existingUser = await Profile.findOne({ User_name: req.body.User_name });
    if (existingUser && existingUser.User_id === req.params.User_id) {
      return res.status(409).send({ message: 'User name already exists' });
    }

    // If specific fields within normalUserInfo are provided, update only those fields
    if (req.body.jobTitle || req.body.jobCompany || req.body.jobType || req.body.jobStartYear || req.body.jobEndYear) {
      const index = req.body.index || 0;
      const fieldPrefix = `normalUserInfo.${index}.`;

      if (req.body.jobTitle) update[`${fieldPrefix}jobTitle`] = req.body.jobTitle;
      if (req.body.jobCompany) update[`${fieldPrefix}jobCompany`] = req.body.jobCompany;
      if (req.body.jobType) update[`${fieldPrefix}jobType`] = req.body.jobType;
      if (req.body.jobStartYear) update[`${fieldPrefix}jobStartYear`] = req.body.jobStartYear;
      if (req.body.jobEndYear) update[`${fieldPrefix}jobEndYear`] = req.body.jobEndYear;
    }

    // If specific fields within studentEducation are provided, update only those fields
    if (req.body.educationPlace || req.body.education_session_start || req.body.education_session_end) {
      const index = req.body.index || 0;
      const fieldPrefix = `studentEducation.${index}.`;

      if (req.body.educationPlace) update[`${fieldPrefix}educationPlace`] = req.body.educationPlace;
      if (req.body.education_session_start) update[`${fieldPrefix}education_session_start`] = req.body.education_session_start;
      if (req.body.education_session_end) update[`${fieldPrefix}education_session_end`] = req.body.education_session_end;
    }

    // If specific fields within hospitalityExpert are provided, update only those fields
    if (req.body.userDescription || req.body.jobtype || req.body.jobtitle || req.body.hotelCompany || req.body.jobstartYear || req.body.jobendYear) {
      const index = req.body.index || 0;
      const fieldPrefix = `hospitalityExpertInfo.${index}.`;

      if (req.body.userDescription) update[`${fieldPrefix}userDescription`] = req.body.userDescription;
      if (req.body.jobtype) update[`${fieldPrefix}jobtype`] = req.body.jobtype;
      if (req.body.jobtitle) update[`${fieldPrefix}jobtitle`] = req.body.jobtitle;
      if (req.body.hotelCompany) update[`${fieldPrefix}hotelCompany`] = req.body.hotelCompany;
      if (req.body.jobstartYear) update[`${fieldPrefix}jobstartYear`] = req.body.jobstartYear;
      if (req.body.jobendYear) update[`${fieldPrefix}jobendYear`] = req.body.jobendYear;
    }


    const options = { new: true };
    const updatedProfile = await Profile.updateOne(filter, { $set: update });



    // Update fields in postSchema with matching user_id
    await Post.updateMany(
      { user_id: req.params.User_id },
      {
        $set: {
          Full_name: req.body.Full_name,
          User_name: req.body.User_name,
          // verificationStatus:req.body.verificationStatus,
          Profile_pic: mediaUrl,
          jobTitle: req.body.normalUserInfo && req.body.normalUserInfo.length > 0 ? req.body.normalUserInfo[0].jobTitle : undefined
        }
      }
    );

    //blocked user
    // Update fields in likeSchema with matching user_id
    await block.updateMany({ 'blockedUser.user_id': req.params.User_id }, { $set: { 'blockedUser.$[blocked].Full_name': req.body.Full_name, 'blockedUser.$[blocked].Profile_pic': mediaUrl } }, { arrayFilters: [{ 'blocked.user_id': req.params.User_id }] });

    // Update fields in serviceSchema with matching user_id
    await service.updateMany({ user_id: req.params.User_id }, { $set: { Full_name: req.body.Full_name, location: req.body.location, User_name: req.body.User_name, Profile_pic: mediaUrl } });


    // Update fields in eventSchema with matching user_id
    await event.updateMany({ User_id: req.params.User_id }, { $set: { Full_name: req.body.Full_name, User_name: req.body.User_name, Profile_pic: mediaUrl } });


    // Update fields in commentSchema with matching user_id
    await Comment.updateMany({ 'comments.user_id': req.params.User_id }, { $set: { 'comments.$[comment].User_name': req.body.User_name, 'comments.$[comment].Profile_pic': mediaUrl } }, { arrayFilters: [{ 'comment.user_id': req.params.User_id }] });

    // Update fields in likesnotification notificationcache with matching user_id
    await notification.updateMany({ 'notifications.likesNotification.user_id': req.params.User_id }, { $set: { 'notifications.likesNotification.$[notifiaction].Full_name': req.body.Full_name, 'notifications.likesNotification.$[notifiaction].User_name': req.body.User_name, 'notifications.likesNotification.$[notifiaction].Profile_pic': mediaUrl } }, { arrayFilters: [{ 'notifiaction.user_id': req.params.User_id }] });

    // Update fields in likesnotification notifications with matching user_id
    await notify.updateMany({ 'notifications.likesNotification.user_id': req.params.User_id }, { $set: { 'notifications.likesNotification.$[notifiaction].Full_name': req.body.Full_name, 'notifications.likesNotification.$[notifiaction].User_name': req.body.User_name, 'notifications.likesNotification.$[notifiaction].Profile_pic': mediaUrl } }, { arrayFilters: [{ 'notifiaction.user_id': req.params.User_id }] });

    // Update fields in commentnotification notificationcache with matching user_id
    await notification.updateMany({ 'notifications.commentNotification.user_id': req.params.User_id }, { $set: { 'notifications.commentNotification.$[notifiaction].Full_name': req.body.Full_name, 'notifications.commentNotification.$[notifiaction].User_name': req.body.User_name, 'notifications.commentNotification.$[notifiaction].Profile_pic': mediaUrl } }, { arrayFilters: [{ 'notifiaction.user_id': req.params.User_id }] });

    // Update fields in commentnotification notifications with matching user_id
    await notify.updateMany({ 'notifications.commentNotification.user_id': req.params.User_id }, { $set: { 'notifications.commentNotification.$[notifiaction].Full_name': req.body.Full_name, 'notifications.commentNotification.$[notifiaction].User_name': req.body.User_name, 'notifications.commentNotification.$[notifiaction].Profile_pic': mediaUrl } }, { arrayFilters: [{ 'notifiaction.user_id': req.params.User_id }] });


    // Update fields in requestnotification notifications with matching user_id
    await notify.updateMany({ 'notifications.requestNotification.user_id': req.params.User_id }, { $set: { 'notifications.requestNotification.$[notifiaction].Full_name': req.body.Full_name, 'notifications.requestNotification.$[notifiaction].User_name': req.body.User_name, 'notifications.requestNotification.$[notifiaction].Profile_pic': mediaUrl } }, { arrayFilters: [{ 'notifiaction.user_id': req.params.User_id }] });


    // Update fields in acceptnotification notifications with matching user_id
    await notify.updateMany({ 'notifications.acceptNotification.user_id': req.params.User_id }, { $set: { 'notifications.acceptNotification.$[notifiaction].Full_name': req.body.Full_name, 'notifications.acceptNotification.$[notifiaction].User_name': req.body.User_name, 'notifications.acceptNotification.$[notifiaction].Profile_pic': mediaUrl } }, { arrayFilters: [{ 'notifiaction.user_id': req.params.User_id }] });

    // Update fields in callnotification notifications with matching user_id
    await notify.updateMany({ 'notifications.CallNotifications.user_id': req.params.User_id }, { $set: { 'notifications.CallNotifications.$[notifiaction].Full_name': req.body.Full_name, 'notifications.CallNotifications.$[notifiaction].User_name': req.body.User_name, 'notifications.CallNotifications.$[notifiaction].Profile_pic': mediaUrl } }, { arrayFilters: [{ 'notifiaction.user_id': req.params.User_id }] });


    // Update fields in likeSchema with matching user_id
    await like.updateMany({ 'likes.user_id': req.params.User_id }, { $set: { 'likes.$[like].User_name': req.body.User_name, 'likes.$[like].Profile_pic': mediaUrl } }, { arrayFilters: [{ 'like.user_id': req.params.User_id }] });

    //update reply comment
    // Update fields in commentSchema with matching user_id
    await Comment.updateMany(
      { 'comments.replies.user_id': req.params.User_id },
      {
        $set: {
          'comments.$[comment].replies.$[reply].User_name': req.body.User_name,
          'comments.$[comment].replies.$[reply].Profile_pic': mediaUrl
        }
      },
      {
        arrayFilters: [
          { 'comment.replies.user_id': req.params.User_id },
          { 'reply.user_id': req.params.User_id }
        ]
      }
    );

    //Saves Posts
    await saves.updateMany(
      { 'saveall_id.Posts.user_id': req.params.User_id },
      {
        $set: {
          'saveall_id.Posts.$[elem].User_name': req.body.User_name,
          'saveall_id.Posts.$[elem].Full_name': req.body.Full_name,
          'saveall_id.Posts.$[elem].Profile_pic': mediaUrl
        }
      },
      { arrayFilters: [{ 'elem.user_id': req.params.User_id }] });


    //Saves Events
    await saves.updateMany(
      { 'saveall_id.Events.user_id': req.params.User_id },
      {
        $set: {
          'saveall_id.Events.$[elem].User_name': req.body.User_name,
          'saveall_id.Events.$[elem].Profile_pic': mediaUrl
        }
      },
      { arrayFilters: [{ 'elem.user_id': req.params.User_id }] });

    //Saves Services
    await saves.updateMany(
      { 'saveall_id.Services.user_id': req.params.User_id },
      {
        $set: {
          'saveall_id.Services.$[elem].User_name': req.body.User_name,
          'saveall_id.Services.$[elem].Profile_pic': mediaUrl
        }
      },
      { arrayFilters: [{ 'elem.user_id': req.params.User_id }] });

    //Saves blogs
    await saves.updateMany(
      { 'saveall_id.Blogs.user_id': req.params.User_id },
      {
        $set: {
          'saveall_id.Blogs.$[elem].User_name': req.body.User_name,
          'saveall_id.Blogs.$[elem].Profile_pic': mediaUrl
        }
      },
      { arrayFilters: [{ 'elem.user_id': req.params.User_id }] });


    //update community
    await group.updateMany({ 'Admin.user_id': req.params.User_id }, { $set: { 'Admin.$[like].Full_name': req.body.Full_name, 'Admin.$[like].location': req.body.location, 'Admin.$[like].Profile_pic': mediaUrl } }, { arrayFilters: [{ 'like.user_id': req.params.User_id }] });

    await group.updateMany({ 'Members.user_id': req.params.User_id }, { $set: { 'Members.$[like].Full_name': req.body.Full_name, 'Members.$[like].location': req.body.location, 'Members.$[like].Profile_pic': mediaUrl } }, { arrayFilters: [{ 'like.user_id': req.params.User_id }] });

    await group.updateMany({ creatorID: req.params.User_id }, { $set: { creator_name: req.body.Full_name, } });


    ///
    res.status(200).send({ message: 'User profile updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Something went wrong' });
  }
};



