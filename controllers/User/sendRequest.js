
const profile = require("../../models/Profile");
const feed = require('../../models/feedcache');
const post = require('../../models/Post');
const admin = require('firebase-admin');
const servAcc = require('../../utils/firebase');
const notifySchema = require('../../models/notification');
const moment = require('moment-timezone')
module.exports = async (req, res) => {
  const { User_id } = req.params; // receiver
  const { user_id } = req.body; // sender
 // const date_added = new Date();

  try {
    const findProfile = await profile.findOne({ User_id });
    const { device_token } = findProfile;
    const ownProfile = await profile.findOne({ User_id: user_id });
    const deviceToken = ownProfile.device_token;
    const { Full_name, Profile_pic, User_name, Role, verificationStatus } = ownProfile;
    const newComment = { user_id: ownProfile.User_id, body: `${Full_name} sent you a connection request`, Profile_pic, User_name: User_name, Role, verificationStatus, date_added: moment().tz("Asia/Calcutta").format("YYYY-MM-DD HH:mm:ss") };
    const newSender = { user_id: findProfile.User_id, body: `${findProfile.Full_name} accepted your connection request`, Profile_pic: findProfile.Profile_pic, Role: findProfile.Role, User_name: findProfile.User_name, verificationStatus: findProfile.verificationStatus, date_added: moment().tz("Asia/Calcutta").format("YYYY-MM-DD HH:mm:ss") };
    const notify = await notifySchema.findOne({ user_id: User_id });
    const Notify = await notifySchema.findOne({ user_id: user_id });
    const posttwo = await post.find({ user_id: user_id }).limit(3); // sender
    const one = posttwo.map((data) => data.post_id);

    const postone = await post.find({ user_id: User_id }).limit(3); // receiver
    const two = postone.map((data) => data.post_id);

    if (!findProfile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    const date_added = moment().tz("Asia/Calcutta").format("YYYY-MM-DD HH:mm:ss")
    const newRequest = { user_id, date_added: date_added };
    const newPendingRequest = { user_id: User_id };

// Check if user_id is already in connections array
const isAlreadyConnected = findProfile.connections.some((connection) => connection.user_id === user_id);
if (isAlreadyConnected) {
  return res.json({ message: "User is already connected" });
}

    const requestExists = findProfile.requests.some((request) => request.user_id === user_id);
    if (requestExists) {
      findProfile.connections.push(newRequest);
      findProfile.requests = findProfile.requests.filter((request) => request.user_id !== user_id);
      await findProfile.save();
      ownProfile.connections.push({ user_id: User_id, date_added: moment().tz("Asia/Calcutta").format("YYYY-MM-DD HH:mm:ss") });
      await ownProfile.save();
      ownProfile.requests = ownProfile.requests.filter((request) => request.user_id !== User_id);
      await ownProfile.save();

      const feed1 = await feed.findOne({ user_id: User_id }); // receiver
      const feed2 = await feed.findOne({ user_id: user_id }); // sender

      if (feed1 && feed2) {
        for (let i = one.length - 1; i >= 0; i--) {
          const postId = one[i];
          if (!feed1.posts.some((post) => post.post_id === postId)) {
            feed1.posts.unshift({ post_id: postId });
          }
        }
        await feed1.save();

        for (let i = two.length - 1; i >= 0; i--) {
          const postId = two[i];
          if (!feed2.posts.some((post) => post.post_id === postId)) {
            feed2.posts.unshift({ post_id: postId });
          }
        }
        await feed2.save();
      }

      if (deviceToken) {
        const notification = {
          token: deviceToken,
          data: {
            title: 'Accept message',
            body: `${findProfile.Full_name} accepted your connection request`,
            type:"connection"
          },
          android:{
            priority:"high"
          }, apns: {
            payload: {
              "aps" : {
                "alert" : {
                    "title" : "Accept message",
                    "body" : `${findProfile.Full_name} accepted your connection request`
                }
              },
              "notificationType": "connection",
              "userID": user_id,
              "role": Role,
            }
          },
        };

        try {
          const response = await admin.messaging().send(notification);
          console.log('Notification sent successfully:', response);
        } catch (error) {
          console.error('Error sending notification:', error);
        }
      }

      if (Notify) {
        Notify.notifications.acceptNotification.unshift(newSender);
        await Notify.save();
      } else {
        const newNotification = new notifySchema({
          user_id: User_id,
          notifications: {
            requestNotification: [newSender]
          }
        });
        await newNotification.save();
      }

      return res.json({ message: "Your request was accepted" });
    } else {
      ownProfile.pending_request.push({ user_id: User_id });
      await ownProfile.save();
      findProfile.requests.push(newRequest);
      await findProfile.save();
      ownProfile.pending_request.push(newPendingRequest);
      await ownProfile.save();
      let totalcount = findProfile.requests.length
      if (device_token) {
        let notificationBody = '';

        if (totalcount === 1) {
          notificationBody = `${Full_name} sent you request`;
        } else {
          notificationBody = `${Full_name} and ${totalcount-1} other people sent you request`;
        }
        const notification = {
          token: device_token,
          data: {
            title: 'Request message',
            body: notificationBody,
            type:"request"
          },
          android:{
            priority:"high"
          },
          apns: {
            payload: {
              "aps" : {
                "alert" : {
                    "title" : "Request message",
                    "body" : notificationBody
                }
              },
              "notificationType": "connection",
              "userID": user_id,
              "role": Role,
            }
          },
        };

        try {
          const response = await admin.messaging().send(notification);
          //console.log('Notification sent successfully:', response);
        } catch (error) {
          console.error('Error sending notification:', error);
        }
      }

      if (notify) {
        notify.notifications.requestNotification.unshift(newComment);
        await notify.save();
      } else {
        const newNotification = new notifySchema({
          user_id: user_id,
          notifications: {
            requestNotification: [newComment]
          }
        });
        await newNotification.save();
      }

      // Update the request count in the profile schema
      findProfile.request_count = findProfile.requests.length;
      await findProfile.save();

      return res.json({ message: "Request sent successfully" });
    }

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
