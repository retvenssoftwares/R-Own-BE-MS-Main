//models path
const group =require('../../models/userGroup')
module.exports= (req, res) => {
    group.find({}, (error, grp) => {
      if (error) {
        res.status(500).send(error);
      } else {
        res.send(grp);
      }
    });
  };