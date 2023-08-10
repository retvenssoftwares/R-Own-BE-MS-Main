
const fetch = require('node-fetch');
const community = require('../../models/userGroup');
module.exports = async (req, res) => {
    // await Profile.findOne({ User_id: req.body.User_id });
        // const { Mesibo_account } = existingUser;
        // const mesiboUid = Mesibo_account[0].uid
        
        const groupid = req.body.groupid;
        const MESIBO_API_ENDPOINT = 'https://api.mesibo.com/backend';
        const MESIBO_API_TOKEN = 'vjzu7zrvmyqepjq6qemwz4yuwyplr8oy8bhjxztejs0pqvzysuh8lrjptjwy969t';

        if(groupid){
            await community.deleteOne({ group_id: groupid });
        }
       

        try {
            
            const response = await fetch(`${MESIBO_API_ENDPOINT}?token=${MESIBO_API_TOKEN}&op=groupdel`, {
                method: 'POST',
                body: JSON.stringify({
                    op: "groupdel",
                    group: {
                        gid: `${groupid}`
                    },
                    token: MESIBO_API_TOKEN
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });



            const data = await response.json();
            // console.log(data);

            
            res.json({message:"group deleted successfully!!"})
        } catch (error) {
            console.error('Error deleting user from Mesibo:', error.message);
        }


   
    
}