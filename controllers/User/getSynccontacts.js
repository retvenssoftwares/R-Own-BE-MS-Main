// // Models path
// const Contacts = require('../../models/contacts');
// const Profile = require('../../models/Profile');

// module.exports = async (req, res) => {
//   try {
//     const user_id = req.params.User_id;
//     const contactDetails = await Contacts.findOne({ User_id: user_id }).select('ContactDetails');

//     if (!contactDetails || !contactDetails.ContactDetails) {
//       return res.json({ message: 'Please sync your contacts' });
//     }

//     const contactDetailNumbers = contactDetails.ContactDetails.map(contactDetail => contactDetail.Number);

//     const matchedNumbers = await Profile.find({ Phone: { $in: contactDetailNumbers } }, 'requests normalUserInfo.jobTitle Profile_pic verificationStatus userBio Role Full_name ');
// let connectionStatus = 'Not Connected';
// if(user_id.includes(Profile.requests)){
//   connectionStatus = 'Requested'
// }
//     if (matchedNumbers.length > 0) {
//       return res.json([{ message: 'Matches found', matchedNumbers, connectionStatus }]);
//     } else {
//       return res.json({ message: 'No match found' });
//     }
//   } catch (error) {
//     console.error(error);
//     return res.status(500).send({ message: 'Something went wrong' });
//   }
// };

const Contacts = require('../../models/contacts');
const Profile = require('../../models/Profile');

module.exports = async (req, res) => {
  try {
    const user_id = req.params.User_id;
    const contactDetails = await Contacts.findOne({ User_id: user_id }).select('ContactDetails');

    if (!contactDetails || !contactDetails.ContactDetails) {
      return res.json({ message: 'Please sync your contacts' });
    }

    const contactDetailNumbers = contactDetails.ContactDetails.map(contactDetail => contactDetail.Number);

    const matchedNumbers = await Profile.find({ Phone: { $in: contactDetailNumbers } }, 'connections requests User_id hospitalityExpertInfo.jobtitle normalUserInfo.jobTitle Profile_pic verificationStatus userBio Role Full_name Mesibo_account User_name display_status');

    let matchedContacts = [];

    for (const matchedNumber of matchedNumbers) {
      let connectionStatus = 'Not Connected';
      
      if (matchedNumber.requests.some(request => request.user_id === user_id)) {
        connectionStatus = 'Requested';
      }else if (matchedNumber.connections.some(conn => conn.user_id === user_id)) {
        connectionStatus = 'Connected';
      }
      
      matchedContacts.push({
        matchedNumber,
        connectionStatus
      });
    }

    if (matchedContacts.length > 0) {
      return res.json({ message: 'Matches found', matchedContacts });
    } else {
      return res.json({ message: 'No match found' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'Something went wrong' });
  }
};
