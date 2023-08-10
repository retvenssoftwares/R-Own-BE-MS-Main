module.exports = (req, res) => {
    const { Address } = req.body;
    const fetch = require('node-fetch');
  
    // Set up Mesibo API endpoint and token
    const MESIBO_API_ENDPOINT = 'https://api.mesibo.com/backend';
    const MESIBO_API_TOKEN = 'vjzu7zrvmyqepjq6qemwz4yuwyplr8oy8bhjxztejs0pqvzysuh8lrjptjwy969t';
    // Add user to Mesibo
    const userAddress = `${Address}` // Replace with the address of the user you want to add
    const requestBody = {
        op: 'useradd',
        token: MESIBO_API_TOKEN,
        user: {
            address: userAddress,
            name: "some name",
            token: {
                appid: "app.retvens.rown",
                expiry: 525600
            }
            // active:true
        }
    };
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
  
                res.send(data.user);
            } else {
                res.send(`Failed to add user ${userAddress}: ${data.error}`);
            }
        })
        .catch(error => {
            res.send(`Failed to add user ${userAddress}: ${error}`);
        });
      };