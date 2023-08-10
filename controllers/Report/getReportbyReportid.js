const getReportbyRid = require('../../models/report');

module.exports = (req, res) => {
  const reportId = req.params.reportId;

  getReportbyRid.findOne({ reportID: reportId }, (error, data) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.json(data);
    }
  });
};
