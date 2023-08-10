const Profile = require('../../models/Profile');
const Blogs = require('../../models/blogs');
const Comments = require('../../models/comments');
const Events = require('../../models/events');
const Likes = require('../../models/feedlikes');
const Notification = require('../../models/notification');
const notificationCache = require('../../models/notificationSchema');
const hotelReviews = require('../../models/HotelreviewsOfUser')
const Posts = require('../../models/Post');
const service = require('../../models/service')
const saves = require('../../models/saved')
const verification = require('../../models/verification')
const vendorreview = require('../../models/userReviewsdetails')
const group = require('../../models/userGroup')
module.exports = async (req, res) => {
  try {

    const filter = { User_id: req.params.User_id };
    const update = {
      verificationStatus: req.body.verificationStatus
    };

    const options = { new: true };
    const updatedProfile = await Profile.updateOne(filter, { $set: update });

    // Update fields in postSchema with matching user_id
    await Blogs.updateMany(
      { User_id: req.params.User_id },
      {
        $set: {
          verificationStatus: req.body.verificationStatus
        }
      }
    );

    // Update fields in postSchema with matching user_id
    await Posts.updateMany(
      { user_id: req.params.User_id },
      {
        $set: {
          verificationStatus: req.body.verificationStatus
        }
      }
    );

    // Update fields in serviceSchema with matching user_id
    await service.updateMany({ user_id: req.params.User_id }, { $set: { verificationStatus: req.body.verificationStatus } });


    // Update fields in eventSchema with matching user_id
    await Events.updateMany({ User_id: req.params.User_id }, { $set: { verificationStatus: req.body.verificationStatus } });

    // Update fields in eventSchema with matching user_id
    await hotelReviews.updateMany({ 'reviews_types.User_id': req.params.User_id }, { $set: { 'reviews_types.$[comment].verificationStatus': req.body.verificationStatus } }, { arrayFilters: [{ 'comment.User_id': req.params.User_id }] });

    // Update fields in eventSchema with matching user_id
    await vendorreview.updateMany({ 'userReviews.user_id': req.params.User_id }, { $set: { 'userReviews.$[comment].verificationStatus': req.body.verificationStatus } }, { arrayFilters: [{ 'comment.user_id': req.params.User_id }] });

    // Update fields in commentSchema with matching user_id
    await Comments.updateMany({ 'comments.user_id': req.params.User_id }, { $set: { 'comments.$[comment].verificationStatus': req.body.verificationStatus } }, { arrayFilters: [{ 'comment.user_id': req.params.User_id }] });

    // Update fields in likesnotification notificationcache with matching user_id
    await Notification.updateMany({ 'notifications.likesNotification.user_id': req.params.User_id }, { $set: { 'notifications.likesNotification.$[notifiaction].verificationStatus': req.body.verificationStatus } }, { arrayFilters: [{ 'notifiaction.user_id': req.params.User_id }] });

    // Update fields in likesnotification notifications with matching user_id
    await notificationCache.updateMany({ 'notifications.likesNotification.user_id': req.params.User_id }, { $set: { 'notifications.likesNotification.$[notifiaction].verificationStatus': req.body.verificationStatus } }, { arrayFilters: [{ 'notifiaction.user_id': req.params.User_id }] });

    // Update fields in commentnotification notificationcache with matching user_id
    await Notification.updateMany({ 'notifications.commentNotification.user_id': req.params.User_id }, { $set: { 'notifications.commentNotification.$[notifiaction].verificationStatus': req.body.verificationStatus } }, { arrayFilters: [{ 'notifiaction.user_id': req.params.User_id }] });

    // Update fields in commentnotification notifications with matching user_id
    await notificationCache.updateMany({ 'notifications.commentNotification.user_id': req.params.User_id }, { $set: { 'notifications.commentNotification.$[notifiaction].verificationStatus': req.body.verificationStatus } }, { arrayFilters: [{ 'notifiaction.user_id': req.params.User_id }] });


    // Update fields in requestnotification notifications with matching user_id
    await Notification.updateMany({ 'notifications.requestNotification.user_id': req.params.User_id }, { $set: { 'notifications.requestNotification.$[notifiaction].verificationStatus': req.body.verificationStatus } }, { arrayFilters: [{ 'notifiaction.user_id': req.params.User_id }] });

    // Update fields in requestnotification notifications with matching user_id
    await notificationCache.updateMany({ 'notifications.requestNotification.user_id': req.params.User_id }, { $set: { 'notifications.requestNotification.$[notifiaction].verificationStatus': req.body.verificationStatus } }, { arrayFilters: [{ 'notifiaction.user_id': req.params.User_id }] });

    // Update fields in acceptnotification notifications with matching user_id
    await Notification.updateMany({ 'notifications.acceptNotification.user_id': req.params.User_id }, { $set: { 'notifications.acceptNotification.$[notifiaction].verificationStatus': req.body.verificationStatus } }, { arrayFilters: [{ 'notifiaction.user_id': req.params.User_id }] });

    // Update fields in acceptnotification notifications with matching user_id
    await notificationCache.updateMany({ 'notifications.acceptNotification.user_id': req.params.User_id }, { $set: { 'notifications.acceptNotification.$[notifiaction].verificationStatus': req.body.verificationStatus } }, { arrayFilters: [{ 'notifiaction.user_id': req.params.User_id }] });


    // Update fields in callnotification notifications with matching user_id
    await Notification.updateMany({ 'notifications.CallNotifications.user_id': req.params.User_id }, { $set: { 'notifications.CallNotifications.$[notifiaction].verificationStatus': req.body.verificationStatus } }, { arrayFilters: [{ 'notifiaction.user_id': req.params.User_id }] });

    // Update fields in callnotification notifications with matching user_id
    await notificationCache.updateMany({ 'notifications.CallNotifications.user_id': req.params.User_id }, { $set: { 'notifications.CallNotifications.$[notifiaction].verificationStatus': req.body.verificationStatus } }, { arrayFilters: [{ 'notifiaction.user_id': req.params.User_id }] });


    // Update fields in likeSchema with matching user_id
    await Likes.updateMany({ 'likes.user_id': req.params.User_id }, { $set: { 'likes.$[like].verificationStatus': req.body.verificationStatus } }, { arrayFilters: [{ 'like.user_id': req.params.User_id }] });

    //update reply comment
    // Update fields in commentSchema with matching user_id
    await Comments.updateMany(
      { 'comments.replies.user_id': req.params.User_id },
      {
        $set: {
          'comments.$[comment].replies.$[reply].verificationStatus': req.body.verificationStatus,
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
          'saveall_id.Posts.$[elem].verificationStatus': req.body.verificationStatus,

        }
      },
      { arrayFilters: [{ 'elem.user_id': req.params.User_id }] });


    //Saves Events
    await saves.updateMany(
      { 'saveall_id.Events.user_id': req.params.User_id },
      {
        $set: {
          'saveall_id.Events.$[elem].verificationStatus': req.body.verificationStatus,

        }
      },
      { arrayFilters: [{ 'elem.user_id': req.params.User_id }] });

    //Saves Services
    await saves.updateMany(
      { 'saveall_id.Services.user_id': req.params.User_id },
      {
        $set: {
          'saveall_id.Services.$[elem].verificationStatus': req.body.verificationStatus,

        }
      },
      { arrayFilters: [{ 'elem.user_id': req.params.User_id }] });

    //Saves blogs
    await saves.updateMany(
      { 'saveall_id.Blogs.user_id': req.params.User_id },
      {
        $set: {
          'saveall_id.Blogs.$[elem].verificationStatus': req.body.verificationStatus,

        }
      },
      { arrayFilters: [{ 'elem.user_id': req.params.User_id }] });


    //update community
    await group.updateMany({ 'Admin.user_id': req.params.User_id }, { $set: { 'Admin.$[like].verificationStatus': req.body.verificationStatus } }, { arrayFilters: [{ 'like.user_id': req.params.User_id }] });

    await group.updateMany({ 'Members.user_id': req.params.User_id }, { $set: { 'Members.$[like].verificationStatus': req.body.verificationStatus } }, { arrayFilters: [{ 'like.user_id': req.params.User_id }] });

    await group.updateMany({ creatorID: req.params.User_id }, { $set: { verificationStatus: req.body.verificationStatus } });


    ///delete the user record from verify collection
    await verification.deleteOne({ user_id: req.params.User_id });

    res.send({ message: 'User profile verified successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Something went wrong' });
  }
};
