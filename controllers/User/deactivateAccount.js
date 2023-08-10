const Profile = require('../../models/Profile');
const comment = require('../../models/comments');
const post = require('../../models/Post');
const contacts = require('../../models/contacts');
const events = require('../../models/events');
const Likes = require('../../models/feedlikes');
const hotels = require('../../models/Hotels');
const jobs = require('../../models/job');
const jobApplications = require('../../models/jobApplication');
const notifications = require('../../models/notification');
const notificationCache = require('../../models/notificationSchema');
const jobRequests = require('../../models/requestjob');
const services = require('../../models/service');
const vendorReviews = require('../../models/userReviewsdetails');
const hotelReviews = require('../../models/HotelreviewsOfUser');
const Saves = require('../../models/saved');

module.exports = async (req, res) => {
    try {

        const existingUser = await Profile.findOne({ User_id: req.body.User_id });
        if (existingUser) {
            await Profile.updateMany({ User_id: existingUser.User_id }, { display_status: '0' });
            await post.updateMany({ user_id: existingUser.User_id }, { display_status: '0' });
            await contacts.updateMany({ User_id: existingUser.User_id }, { display_status: '0' });
            await events.updateMany({ User_id: existingUser.User_id }, { display_status: '0' });
            await hotels.updateMany({ user_id: existingUser.User_id }, { display_status: '0' });
            await jobs.updateMany({ user_id: existingUser.User_id }, { display_status: '0' });
            await jobApplications.updateMany({ user_id: existingUser.User_id }, { display_status: '0' });
            await services.updateMany({ user_id: existingUser.User_id }, { display_status: '0' });
            await vendorReviews.updateMany({ user_id: existingUser.User_id }, { display_status: '0' });
            await hotelReviews.updateMany({ user_id: existingUser.User_id }, { display_status: '0' });
            await jobRequests.updateMany({ userID: existingUser.User_id }, { display_status: '0' });
            await notifications.deleteMany({ user_id: existingUser.User_id });
            await notificationCache.deleteMany({ user_id: existingUser.User_id });

            const user_id = existingUser.User_id;

            //comments
            const existingComments = await comment.updateMany(
                {
                    $or: [
                        { "comments.user_id": user_id },
                        { "comments.replies.user_id": user_id },
                    ],
                },
                {
                    $set: {
                        "comments.$[elem].display_status": '0',
                        "comments.$[].replies.$[elem].display_status": '0',
                    },
                },
                {
                    arrayFilters: [
                        { "elem.user_id": user_id },
                    ],
                }
            );

            //likes
            const existingLikes = await Likes.updateMany(
                {
                    $or: [
                        { "likes.user_id": user_id },

                    ],
                },
                {
                    $set: {
                        "likes.$[elem].display_status": '0',

                    },
                },
                {
                    arrayFilters: [
                        { "elem.user_id": user_id },
                    ],
                }
            );

            //Profile connection
            const existingconnections = await Profile.updateMany(
                {
                    $or: [
                        { "connections.user_id": user_id },

                    ],
                },
                {
                    $set: {
                        "connections.$[elem].display_status": '0',

                    },
                },
                {
                    arrayFilters: [
                        { "elem.user_id": user_id },
                    ],
                }
            );

            //Profile request
            const existingrequest = await Profile.updateMany(
                {
                    $or: [
                        { "requests.user_id": user_id },

                    ],
                },
                {
                    $set: {
                        "requests.$[elem].display_status": '0',

                    },
                },
                {
                    arrayFilters: [
                        { "elem.user_id": user_id },
                    ],
                }
            );

            //Vendorreviews
            const existingvendor = await vendorReviews.updateMany(
                {
                    $or: [
                        { "userReviews.user_id": user_id },

                    ],
                },
                {
                    $set: {
                        "userReviews.$[elem].display_status": '0',

                    },
                },
                {
                    arrayFilters: [
                        { "elem.user_id": user_id },
                    ],
                }
            );

            //hotelReviews
            const existingreviews = await hotelReviews.updateMany(
                {
                    $or: [
                        { "reviews_types.User_id": user_id },

                    ],
                },
                {
                    $set: {
                        "reviews_types.$[elem].display_status": '0',

                    },
                },
                {
                    arrayFilters: [
                        { "elem.User_id": user_id },
                    ],
                }
            );

            // Modify saveall_id display_status for matching User_id in Posts
            await Saves.updateMany(
                { "saveall_id.Posts.user_id": user_id },
                { $set: { "saveall_id.Posts.$[elem].display_status": '0' } },
                { arrayFilters: [{ "elem.user_id": user_id }] }
            );

            // Modify saveall_id display_status for matching User_id in Jobs
            await Saves.updateMany(
                { "saveall_id.Jobs.user_id": user_id },
                { $set: { "saveall_id.Jobs.$[elem].display_status": '0' } },
                { arrayFilters: [{ "elem.user_id": user_id }] }
            );

            // Modify saveall_id display_status for matching User_id in Blogs
            await Saves.updateMany(
                { "saveall_id.Blogs.user_id": user_id },
                { $set: { "saveall_id.Blogs.$[elem].display_status": '0' } },
                { arrayFilters: [{ "elem.user_id": user_id }] }
            );

            // Modify saveall_id display_status for matching User_id in Services
            await Saves.updateMany(
                { "saveall_id.Services.user_id": user_id },
                { $set: { "saveall_id.Services.$[elem].display_status": '0' } },
                { arrayFilters: [{ "elem.user_id": user_id }] }
            );

            // Modify saveall_id display_status for matching User_id in Events
            await Saves.updateMany(
                { "saveall_id.Events.user_id": user_id },
                { $set: { "saveall_id.Events.$[elem].display_status": '0' } },
                { arrayFilters: [{ "elem.user_id": user_id }] }
            );

            // Modify saveall_id display_status for matching User_id in Hotels
            await Saves.updateMany(
                { "saveall_id.Hotels.user_id": user_id },
                { $set: { "saveall_id.Hotels.$[elem].display_status": '0' } },
                { arrayFilters: [{ "elem.user_id": user_id }] }
            );



            res.status(200).send({ message: "User account deactivated successfully", user_id: existingUser.User_id });
        } else {
            res.status(200).send({ message: "User account not found" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Something went wrong' });
    }
};
