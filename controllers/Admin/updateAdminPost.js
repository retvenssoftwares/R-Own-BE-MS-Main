
const adminPostUpdate = require('../../models/adminPost');
module.exports =  async (req, res) => { {
    try {

      const filter = { adminpostId: req.params.adminpostId };
      const update = {
        caption: req.body.caption,
        adminStatus: req.body.adminStatus,
        bookingengineLink: req.body.bookingengineLink,
        Event_name: req.body.Event_name       
};
      const options = { new: true };
      const updatedfaq = await adminPostUpdate.findOneAndUpdate(filter, update, options);

      res.status(200).send({ message: 'Post updated successfully' });

    } catch (err) {
      console.error(err);
      res.status(500).send({ message: 'something wrong' });
    }
  };
};