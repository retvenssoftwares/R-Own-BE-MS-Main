const Faq = require('../../models/faq')
const moment = require('moment-timezone')

module.exports = async (req, res) => {
    try {
        const { question, answer } = req.body;
        const Date = moment().tz("Asia/Calcutta").format("YYYY-MM-DD HH:mm:ss");
         const Faqs = new Faq({ question, answer, Date: Date });

        await Faqs.save();

        res.json({ message: 'FAQ added successfully.' });

    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'something wrong' });
    }
};