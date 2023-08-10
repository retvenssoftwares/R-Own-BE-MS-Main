
const profile = require('../../models/Profile');
const blocker = require('../../models/blockedUser')
const blocked = require('../../models/blockedByUser')
const save = require('../../models/saved')
const like = require('../../models/feedlikes')
const comment = require('../../models/comments')
const notifications = require('../../models/notification')
const posts = require('../../models/Post')
const feedCache =require('../../models/feedcache')
module.exports = async (req, res) => {
    const { User_id } = req.params; // The Blocker
    const { user_id } = req.body; // The Blocked

    try {

        const user1 = await profile.findOne({ User_id: User_id });//blocker
        if (!user1) {
            return res.status(404).json({ message: "user1 not found" });
        }



        const user2 = await profile.findOne({ User_id: user_id });//blocked
        if (!user2) {
            return res.status(404).json({ message: "user2 not found" });
        }
           const {Full_name,Profile_pic, Role, verificationStatus}=user2;

        const block = await blocker.findOne({ User_id: User_id })
        const Blocked = await blocked.findOne({ User_id: user_id })

        const finduser = Blocked.blockedByUser.some((block) => block.user_id === User_id);
        if (finduser) {
            return res.json({ message: "you have already blocked" });
        }
        const blockuser = { user_id: user_id,Full_name:Full_name,Profile_pic:Profile_pic, Role: Role, verificationStatus: verificationStatus }

        //push blocked userid to blocker collection
        block.blockedUser.push(blockuser);
        await block.save();

        //push blocker userid to blocked collection
        const blockbyuser = { user_id: User_id }
        Blocked.blockedByUser.push(blockbyuser);
        await Blocked.save();

        // Remove the user_id from the connections array
        user1.connections = user1.connections.filter((block) => block.user_id !== user_id);
        await user1.save();
        user2.connections = user2.connections.filter((blocked) => blocked.user_id !== User_id);
        await user2.save()

        //saved section
        const saveuser1 = await save.findOne({ user_id: User_id });//blocker
        if (!saveuser1) {
            return res.status(404).json({ message: "saveuser1 not found" });
        }
        const saveuser2 = await save.findOne({ user_id: user_id });//blocked
        if (!saveuser2) {
            return res.status(404).json({ message: "saveuser2 not found" });
        }
        // Remove the user_id from the saved array
        saveuser1.saveall_id.Posts = saveuser1.saveall_id.Posts.filter((block) => block.user_id !== user_id);
        await saveuser1.save();

        saveuser2.saveall_id.Posts = saveuser2.saveall_id.Posts.filter((blocked) => blocked.user_id !== User_id);
        await saveuser2.save();


        //like section
        const likeuser1 = await like.find({ user_id: User_id });//blocker
        const likeuser2 = await like.find({ user_id: user_id });//blocked

        // Remove all like with matching user_id from likeuser1
        for (const likeDoc of likeuser1) {
            likeDoc.likes = likeDoc.likes.filter(
                (like) => like.user_id !== user_id
            );
            await likeDoc.save();
        }

        // Remove all like with matching user_id from likeuser2
        for (const likeDoc of likeuser2) {
            likeDoc.likes = likeDoc.likes.filter(
                (like) => like.user_id !== User_id
            );
            await likeDoc.save();
        }

        //comment section
        const commentuser1 = await comment.find({ user_id: User_id });//blocker
        const commentuser2 = await comment.find({ user_id: user_id });//blocked

        // Remove all comments with matching user_id from commentuser1
        for (const commentDoc of commentuser1) {
            commentDoc.comments = commentDoc.comments.filter(
                (comment) => comment.user_id !== user_id
            );
            await commentDoc.save();
        }

        // Remove all comments with matching user_id from commentuser2
        for (const commentDoc of commentuser2) {
            commentDoc.comments = commentDoc.comments.filter(
                (comment) => comment.user_id !== User_id
            );
            await commentDoc.save();
        }

        //notification
        const notification1 = await notifications.findOne({ user_id: User_id })
        const notification2 = await notifications.findOne({ user_id: user_id })

        // Update n1 and remove matching u_ids
        if (notification1) {
            await notifications.updateOne(
                { user_id: user_id },
                {
                    $pull: {
                        'notifications.likesNotification': { user_id: User_id },
                        'notifications.commentNotification': { user_id: User_id },
                        'notifications.requestNotification': { user_id: User_id },
                        'notifications.acceptNotification': { user_id: User_id },
                        'notifications.JobNotifications': { user_id: User_id },
                        'notifications.CallNotifications': { user_id: User_id },
                    }
                }
            );
        }

        // Update n1 and remove matching u_ids
        if (notification2) {
            await notifications.updateOne(
                { user_id: User_id },
                {
                    $pull: {
                        'notifications.likesNotification': { user_id: user_id },
                        'notifications.commentNotification': { user_id: user_id },
                        'notifications.requestNotification': { user_id: user_id },
                        'notifications.acceptNotification': { user_id: user_id },
                        'notifications.JobNotifications': { user_id: user_id },
                        'notifications.CallNotifications': { user_id: user_id },
                    }
                }
            );
        }


        const posts1 = await posts.find({ user_id: User_id });
        const posts2 = await posts.find({ user_id: user_id });
        //feed
        const feed1 = await feedCache.findOne({ user_id: User_id });
        const feed2 = await feedCache.findOne({ user_id: user_id });

        // Collect post_ids from posts1
        const postIds = posts1.map((post) => post.post_id);
        const postIds2 = posts2.map((post) => post.post_id);
        // Update feed1 and remove matching post_ids
        if (feed1) {
            await feedCache.updateOne(
                { user_id: User_id },
                { $pull: { posts: { post_id: { $in: postIds2 } } } }
            );
        }

        // Update feed2 and remove matching post_ids
        if (feed2) {
            await feedCache.updateOne(
                { user_id: user_id },
                { $pull: { posts: { post_id: { $in: postIds } } } }
            );
        }


        return res.json({ message: "user blocked successfully" });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }

};

