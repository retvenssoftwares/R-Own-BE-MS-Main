// const fetch = require('node-fetch');
// //const community = require('../../models/userGroup');

// module.exports = async (req, res) => {
//   const { user,grpid } = req.body;

//   const MESIBO_API_ENDPOINT = 'https://api.mesibo.com/backend';
//   const MESIBO_API_TOKEN = 'ejh3hj6cnqhqw1spf3d9fbacml7z30psg1a1g2ng36au02l24elb2r747u5evcgv';

//   try {
//     // Delete group from your application's database (if applicable)
//     //await community.deleteOne({ group_id: groupid });

//     // Leave the group using Mesibo API
//     const response = await fetch(`${MESIBO_API_ENDPOINT}?token=${MESIBO_API_TOKEN}&op=groupeditmembers`, {
//         method: 'POST',
//         body: JSON.stringify({
//             op: "groupeditmembers",
//             group: {
//               gid: grpid,
//               memebrs: {
//                 remove: 1
//               },
//               members: {
//                 m: user
//               }
//             },
//             token: MESIBO_API_TOKEN
//           }),
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });

//     const data = await response.json();
//     console.log(data);
   
//     res.json({ message: 'Group delete successfully!!' });
    

   
//   } catch (error) {
//     console.error('Error leaving group:', error.message);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

const fetch = require('node-fetch');
//const community = require('../../models/userGroup');

module.exports = async (req, res) => {
  const { user, grpid } = req.body;
  

  const MESIBO_API_ENDPOINT = 'https://api.mesibo.com/backend';
  const MESIBO_API_TOKEN = 'vjzu7zrvmyqepjq6qemwz4yuwyplr8oy8bhjxztejs0pqvzysuh8lrjptjwy969t';

  try {
    // Delete group from your application's database (if applicable)
    //await community.deleteOne({ group_id: groupid });

    // Leave the group using Mesibo API
    const response = await fetch(`${MESIBO_API_ENDPOINT}?token=${MESIBO_API_TOKEN}&op=groupeditmembers`, {
      method: 'DELETE',
      body: JSON.stringify({
        op: "groupeditmembers",
        group: {
          gid: grpid,
          members: {
            m:user,
            remove:1,
            admin:{
              remuser:true
            }
          },
          
        },
        token: MESIBO_API_TOKEN
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    console.log(data);

    res.json({ message: 'Group members removed successfully!!' });

  } catch (error) {
    console.error('Error leaving group:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
