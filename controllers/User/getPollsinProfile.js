

// const post = require('../../models/Post');
// const profile = require('../../models/Profile')

// module.exports = async (req, res) => {
//   try {
//     const { User_id } = req.params;
//     const { page } = req.query;
//     const pageSize = 10;
//     const currentPage = parseInt(page) || 1;
//     const skip = (currentPage - 1) * pageSize;

//     const userPolls = await post.find({ user_id: User_id, post_type: 'Polls' });

//     const totalPosts = userPolls.length;

//     const pagedPosts = userPolls.slice(skip, skip + pageSize);

//     if (pagedPosts.length > 0) {
//       res.json({
//         page: currentPage,
//         // pageSize,
//         // totalPages: Math.ceil(totalPosts / pageSize),
//         // totalPosts,
//         posts: pagedPosts,
//       });
//     } else {
//       res.json({ message: 'You have reached the end' });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).send({ message: 'Something went wrong' });
//   }
// };

const post = require('../../models/Post');
const profile = require('../../models/Profile');

module.exports = async (req, res) => {
  try {
    const { User_id,user_id } = req.params;
    const { page } = req.query;
    const pageSize = 10;
    const currentPage = parseInt(page) || 1;
    const skip = (currentPage - 1) * pageSize;

    const userPolls = await post.find({ user_id: User_id, post_type: 'Polls' }).sort({date_added:-1});;

    const totalPosts = userPolls.length;

    const pagedPosts = userPolls.slice(skip, skip + pageSize);

    if (pagedPosts.length > 0) {
      const modifiedPosts = await Promise.all(
        pagedPosts.map(async (post) => {
          const modifiedPost = post.toObject();
          const pollQuestions = modifiedPost.pollQuestion;

          for (const question of pollQuestions) {
            const options = question.Options;

            for (const option of options) {
              if (option.votes.some((vote) => vote.user_id === user_id)) {
                modifiedPost.voted = 'yes';
                break;
              } else {
                modifiedPost.voted = 'no';
              }
            }
          }

          return modifiedPost;
        })
      );

      res.json([{
        page: currentPage, 
        pageSize,
        posts: modifiedPosts,
      }]);
    } else {
      res.json([{ message: 'You have reached the end' }]);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Something went wrong' });
  }
};
