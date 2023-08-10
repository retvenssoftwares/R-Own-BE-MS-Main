
const service = require('../../models/service');
module.exports =  async (req, res) => { {
    try {

      const filter = { vendorServiceId: req.params.vendorServiceId };
      const update = {
        vendorServicePrice: req.body.vendorServicePrice,
        display_status: req.body.display_status,    
};
      const options = { new: true };
      const updatedprice = await service.findOneAndUpdate(filter, update, options);

      res.status(200).send({ message: 'service price updated successfully' });

    } catch (err) {
      console.error(err);
      res.status(500).send({ message: 'something wrong' });
    }
  };
};

//


