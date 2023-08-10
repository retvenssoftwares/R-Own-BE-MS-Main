const getApplicationStage = require('../../models/jobApplication')

module.exports = function(req, res) {
    const status = req.params.status;
    getApplicationStage.find({ status: status }, function(err, applications) {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      } else {
        res.status(200).send(applications);
      }
    });
  };
  