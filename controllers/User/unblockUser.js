const profile = require('../../models/Profile');
const blocker = require('../../models/blockedUser');
const blocked = require('../../models/blockedByUser');

module.exports = async (req, res) => {
    const { User_id } = req.params; // The Blocker
    const { user_id } = req.body; // The Blocked

    try {
        const user1 = await profile.findOne({ User_id: User_id }); // blocker
        if (!user1) {
            return res.status(404).json({ message: "user1 not found" });
        }

        const user2 = await profile.findOne({ User_id: user_id }); // blocked
        if (!user2) {
            return res.status(404).json({ message: "user2 not found" });
        }

        const blockerUser = await blocker.findOne({ User_id: User_id });
        const blockedUser = await blocked.findOne({ User_id: user_id });

        // Check if User_id exists in the blockedByUser array of the blocked collection
        const findUserInBlocked = blockedUser.blockedByUser.some((block) => block.user_id === User_id);
        if (findUserInBlocked) {
            // If found, remove it from the array
            blockedUser.blockedByUser = blockedUser.blockedByUser.filter((block) => block.user_id !== User_id);
            await blockedUser.save();
        }

        // Check if user_id exists in the blockedUser array of the blocker collection
        const findUserInBlocker = blockerUser.blockedUser.some((block) => block.user_id === user_id);
        if (findUserInBlocker) {
            // If found, remove it from the array
            blockerUser.blockedUser = blockerUser.blockedUser.filter((block) => block.user_id !== user_id);
            await blockerUser.save();
        } else {
            return res.json({ message: "user already unblocked" });

        }


        return res.json({ message: "user unblocked successfully" });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};
