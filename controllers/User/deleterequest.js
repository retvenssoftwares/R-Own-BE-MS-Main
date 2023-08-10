const profile = require("../../models/Profile");
module.exports = async (req, res) => {
    const {User_id } = req.params;
    const {user_id } = req.body;
    const date_added = new Date();

    try {
        const findProfile = await profile.findOne({ User_id });
        
       
        if (!findProfile) {
            return res.status(404).json({ message: "profile not found" });
        }


        const requestfound = findProfile.requests.some((request) => request.user_id === user_id);

        if (requestfound){

            findProfile.requests = findProfile.requests.filter((request) => request.user_id !== user_id);
            await findProfile.save();
            res.json({message:"data updated successfully"})

        }

       
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};
