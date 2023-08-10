const Event = require('../../models/events'); 

// Controller function to fetch upcoming events
module.exports = async (req, res) => {
  try {
    const currentDate = new Date();
    const location = req.params.location;
    const events = await Event.find({location: location},'event_title event_start_date event_start_time event_id location event_thumbnail display_status').sort({date_added:-1}); // Retrieve events from the database
    
    const upcomingEvents = events.filter(event => {
      const eventStartDate = new Date(event.event_start_date + ' ' + event.event_start_time);
      
      if (eventStartDate.getDate() === currentDate.getDate()) {
        
        const eventStartTime = eventStartDate.getTime();
        const currentTime = currentDate.getTime();
        return eventStartTime > currentTime;
      } else {
        return eventStartDate > currentDate;
      }
    });

    res.json(upcomingEvents);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}



 




    
  