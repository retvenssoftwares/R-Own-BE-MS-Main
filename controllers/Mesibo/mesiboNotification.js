const admin = require('firebase-admin');
const serviceAccount = require('../../utils/r-own-d0a2c-firebase-adminsdk-8vi0h-088627958e.json');
const profile = require('../../models/Profile')
// Initialize Firebase Admin SDK with your project credentials

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)
// });

module.exports = async (req, res) => {
    // Get the registration tokens from the request body
    //const registrationTokens = req.body.registrationTokens;
    
    const profiledata = await profile.findOne({ User_id: req.params.User_id })
    if(!profiledata){
        res.json({message:"profile not fount"})
    }

    // const { device_token} = profiledata
   

    const t = req.body.t;
    const b = req.body.b
    // console.log(typeof registrationTokens)
  
    // Define the message to send
    const message = {
      notification: {
        title: `${t}`,
        body: `${b}`
      },

    };
  
    // Send the message to each token in the array
    const messagePromises = [profiledata].map(async (profile) => {
      message.token = profile.device_token;
      return admin.messaging().send(message);
    });
  
    try {
      const responses = await Promise.all(messagePromises);
      console.log('Successfully sent messages:', responses);
      res.status(200).json({ success: true, responses: responses });
    } catch (error) {
      console.error('Error sending messages:', error);
      res.status(500).json({ success: false, error: error.message });
    }
  };
