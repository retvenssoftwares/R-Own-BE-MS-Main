// //model paths
// const jobApplication  = require("../../models/jobApplication");


// module.exports = async (req, res) => {
//     try {
     
//       // Update the job Application 
//       const filter = {  applicationId: req.params.applicationId };
//       const update = {
//         status: req.body.status,
//       };
//       const options = { new: true };
//           const updatedapplication = await jobApplication.findOneAndUpdate(filter, update, options);
//            res.send({ message: 'Job Application updated successfully' });
      
//     } catch (err) {
//       console.error(err);
//       res.status(500).send({ message: 'Something went wrong' });
//     }
//   };

//model paths
const jobApplication  = require("../../models/jobApplication");
const Profile = require('../../models/Profile')
const admin = require('firebase-admin');
const servAcc = require('../../utils/firebase');
const notifications = require('../../models/notification')
module.exports = async (req, res) => {
    try {
     
      // Update the job Application 
      const applicationId = req.params.applicationId;
      const JobApp = await jobApplication.findOne({applicationId: applicationId});
      const {user_id} = JobApp;
      const findProfile = await Profile.findOne({User_id: user_id});
      const {device_token, Full_name} = findProfile;
      
      const notify = await notifications.findOne({ user_id: user_id });
      const filter = {  applicationId: applicationId };
      const update = {
        status: req.body.status,
      };
   
      const options = { new: true };
          const updatedapplication = await jobApplication.findOneAndUpdate(filter, update, options);
           res.status(200).send({ message: 'Job Application updated successfully' });
           if (device_token) {
            let notificationBody = '';
            if (req.body.status === 'On Hold') {
              notificationBody = `${Full_name}, your applied job application's status has changed to On Hold`;
            } else if(req.body.status === 'Scheduled'){
              notificationBody = `${Full_name}, your applied job application's status has changed to Scheduled`;
            }else if(req.body.status === "Criteria Doesn't Match"){
              notificationBody = `${Full_name}, sorry your applied job application does not match the required criteria`;
            }else if(req.body.status === "Hired"){
              notificationBody = `Congrats ${Full_name}, you are hired`;
            }else if(req.body.status === "Rejected"){
              notificationBody = `${Full_name}, sorry your job application is rejected`;
            }else if(req.body.status === "Promoted to further round"){
              notificationBody = `${Full_name}, congrats you are selected for further round`;
            }
            const newlike = {            
              Full_name,
              user_id: findProfile.User_id,
              body: notificationBody,
            };
            if (notify) {
              notify.notifications.JobNotifications.unshift(newlike);
              await notify.save();
            } else {
              const newNotification = new notifications({
                user_id: user_id,
                notifications: {
                  JobNotifications: [newlike],
                },
              });
              await newNotification.save();
            }
            const notification = {
              token: device_token,
              notification: {
                title: 'Job Application Status',
                body: notificationBody,
              },
            };
            try {
              const response = await admin.messaging().send(notification);
              console.log('Notification sent successfully:', response);
            } catch (error) {
              console.error('Error sending notification:', error);
            }
          }
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: 'Something went wrong' });
    }
  };
  
  