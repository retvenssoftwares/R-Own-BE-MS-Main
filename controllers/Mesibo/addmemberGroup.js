module.exports =(req, res) => {
    const { group_id,user } = req.body;
  
    const fetch = require('node-fetch');
  
    // Set up Mesibo API endpoint and token
    const MESIBO_API_ENDPOINT = 'https://api.mesibo.com/backend';
    const MESIBO_API_TOKEN = 'vjzu7zrvmyqepjq6qemwz4yuwyplr8oy8bhjxztejs0pqvzysuh8lrjptjwy969t';
    
  
    // Add user to Mesibo.
    
  
    const requestBody = {
      op: "groupeditmembers",
      group: {
        gid: group_id,
        members: { 
          m: user,
          permissions: {
            send: true,
            recv: true,
            pub: true,
            sub: true,
            list: true
        }
        },
       
        
      },
      token: MESIBO_API_TOKEN 
  }
    // console.log(requestBody)
  
    fetch(MESIBO_API_ENDPOINT, {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: {
            'Content-Type': 'application/json'
        }
    })
  
        .then(response => response.json())
  
        .then(data => {
            if (data.result == 1) {
  
                res.json(data)
  
            } else {
                console.error(`Failed to add user ${user}: ${data.error} because user does not exist in our database`);
            }
        })
        .catch(error => {
            console.error(`Failed to add user ${user}: ${error}`);
        });
  
  };