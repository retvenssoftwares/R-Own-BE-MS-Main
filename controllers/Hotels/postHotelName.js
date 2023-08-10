const hotelname =require('../../models/hotelname')

 module.exports=async (req, res) => {
    const { hotel_name } = req.body;  
    try {       
      // Create the new contact document
      const newname = new hotelname({ hotel_name });
      await newname.save();
      res.status(201).json({ message: 'hotel created successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  };