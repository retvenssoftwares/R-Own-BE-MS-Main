const fetch = require('node-fetch');
module.exports =(req,res)=>{
    
    const MESIBO_API_ENDPOINT = 'https://api.mesibo.com/backend';
    const MESIBO_API_TOKEN = 'vjzu7zrvmyqepjq6qemwz4yuwyplr8oy8bhjxztejs0pqvzysuh8lrjptjwy969t';
    const gid = req.body.gid;
  
    const requestUrl = `${MESIBO_API_ENDPOINT}?op=groupgetmembers&gid=${gid}&token=${MESIBO_API_TOKEN}`;
  
    fetch(requestUrl)
    .then(response => response.json())
    .then(data => {
      res.json(data); // the user's profile details will be logged to the console
      
    })
    .catch(error => {
      console.error(`Failed to retrieve user details: ${error}`);
    });
  
  
  }