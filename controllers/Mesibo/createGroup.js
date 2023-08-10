const AWS = require('aws-sdk');
const multer = require('multer');
const s3 = require('../../utils/url');
const profile = require('../../models/Profile')
const multerS3 = require('multer-s3');

const upload = multer({
  storage: multerS3({
    s3,
    bucket: 'rown-bucket', // Replace with your S3 bucket name
    acl: 'public-read',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: (req, file, cb) => {
      cb(null, `post-images/${file.originalname}`);
    },
  }),
});


module.exports = async (req, res) => {
  const { attribute } = req.body;
  const User_id = req.params.User_id

  const data = await profile.findOne({ User_id })

  const { Mesibo_account } = data

  const address = Mesibo_account[0].address


  const fetch = require('node-fetch');

  // Set up Mesibo API endpoint and token
  const MESIBO_API_ENDPOINT = 'https://api.mesibo.com/backend';
  const MESIBO_API_TOKEN = 'vjzu7zrvmyqepjq6qemwz4yuwyplr8oy8bhjxztejs0pqvzysuh8lrjptjwy969t';

  let mediaUrl

  // Upload the file to DigitalOcean Spaces if a file has been selected
  if (req.file) {
    const params = {
      Bucket: 'rown-bucket',
        Key: `mesibo/${req.file.originalname}`,
        Body: req.file.buffer,
        ContentType: req.file.mimetype,
        acl: 'public-read'
    };
    await s3.upload(params).promise();
    mediaUrl = `https://rown-bucket.s3.amazonaws.com/mesibo/${req.file.originalname}`;
  }


  // Add user to Mesibo
  const userAddress = attribute // Replace with the address of the user you want to add

  const requestBody = {
    op: "groupadd",
    token: MESIBO_API_TOKEN,

    group: {
      name: attribute,
      members: {
        m: address,
        admin: {
          owner: true
        },
      },

      active: 1,

      profile: {
        image: mediaUrl
      }

    }


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
        console.error(`Failed to add user ${userAddress}: ${data.error}`);
      }
    })
    .catch(error => {
      console.error(`Failed to add user ${userAddress}: ${error}`);
    });


};