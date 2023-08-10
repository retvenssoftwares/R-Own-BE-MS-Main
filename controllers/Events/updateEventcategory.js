//model paths
const Event  = require("../../models/eventCategory");


module.exports = async (req, res) => {
    try {
     
      // Update the job Application 
      const filter = {  category_id: req.params.category_id };
      const update = {
        display_status: req.body.display_status,
      };
      const options = { new: true };
          const updatedapplication = await Event.findOneAndUpdate(filter, update, options);
           res.status(200).send({ message: 'Event category updated successfully' });
      
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: 'Something went wrong' });
    }
  };
  