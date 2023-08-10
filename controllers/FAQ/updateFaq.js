
const Faq = require('../../models/faq');
module.exports =  async (req, res) => { {
    try {

      const filter = { faqId: req.params.faqId };
      const update = {
        question: req.body.question,
        answer: req.body.answer,
        display_status: req.body.display_status,    
};
      const options = { new: true };
      const updatedfaq = await Faq.findOneAndUpdate(filter, update, options);

      res.status(200).send({ message: 'FAQ updated successfully' });

    } catch (err) {
      console.error(err);
      res.status(500).send({ message: 'something wrong' });
    }
  };
};