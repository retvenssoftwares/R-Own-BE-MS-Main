const appupdates = require('../../models/appUpdate');

module.exports = async (req, res) => {
    {
        try {

            const filter = { update_id: req.params.update_id };
            const update = {
                updateDescription: req.body.updateDescription,
                displayStatus: req.body.displayStatus,
                Android_version: req.body.Android_version,
                iOS_version: req.body.iOS_version,
                updateTitle: req.body.updateTitle
            };
                const options = { new: true };
                const updatedapp = await appupdates.findOneAndUpdate(filter, update, options);

                res.status(200).send({ message: 'app updated successfully' });

            }
        catch (err) {
            console.error(err);
            res.status(500).send({ message: 'something wrong' });
        }
    };
};