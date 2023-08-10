
const jobrequest = require('../../models/requestjob');

module.exports = async (req, res) => {
  const { userID, designationType, noticePeriod, preferredLocation, expectedCTC, employmentType, department } = req.body;
  let data = "requested"
  try {
    // Create the new contact document
    const newjob = new jobrequest({
      userID,
      designationType,
      noticePeriod,
      preferredLocation,
      expectedCTC,
      employmentType,
      department,
      status:data
    });

    await newjob.save(); // Save the newjob instance

   
    res.status(201).json({ message: 'Job Request Posted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};
