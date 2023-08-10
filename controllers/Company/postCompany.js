
const Company =require('../../models/company')

 module.exports=async (req, res) => {
    const { company_name,addedbyUser } = req.body;  
    try {       
      // Create the new contact document
      const newCompany = new Company({ company_name,addedbyUser });
      await newCompany.save();
      res.status(201).json({ message: 'Company created successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  };