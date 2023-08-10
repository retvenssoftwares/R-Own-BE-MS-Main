const jobD =require('../../models/job')
const profile = require('../../models/Profile')
 module.exports = async (req, res) => {
    try {
        
        const findprofile = await profile.findOne({User_id:req.params.User_id})


        const findJob = await jobD.findOne({jid: req.params.jid})
        
        if (!findprofile){
            res.send({message:"user not found"})
        }
         
        // enter your jid which you have to bookmarked and user_id also of that particuler user may be it will same as params or different
        const {jid, user_id } = req.body;

        const jidfound = findprofile.Bookmarkjob.some((bookmark) => bookmark.jid === jid);
        const userid   = findJob.Bookmarked.some((userdata)=> userdata.user_id === user_id)

        if(jidfound && userid) {
            findprofile.Bookmarkjob = findprofile.Bookmarkjob.filter((bookmark) => bookmark.jid !== jid);
            findJob.Bookmarked = findJob.Bookmarked.filter((userdata)=>userdata.user_id !== user_id)
            await findprofile.save();
            await findJob.save();
            res.status(200).send({ message: `your jobId ${jid} and user_id ${user_id} Unbookmark successfully!!` });
        } else {
            findprofile.Bookmarkjob.push({ jid });
            findJob.Bookmarked.push({user_id});
            await findprofile.save();
            await findJob.save();
            res.status(200).send({ message: `your jobId ${jid} user_id ${user_id}  Bookmarked successfully!!` });
        }


      } catch (error) {
        console.log(error);
        res.status(500).send({message: "Internal server error"});
      }
    };