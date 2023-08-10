const block = require("../../models/blockedUser");

module.exports= async (req, res) => {
    try {
        const { User_id } = req.params;
      const userlist = await block.findOne({User_id: User_id }).select('blockedUser');
      
      if (userlist) {
        res.send(userlist);
      } else {
        res.json({message: "No match found"});
      }
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Something went wrong' });
    }
  };