const express = require("express");
const router = express.Router();
const { User, Event, Attendee, Attraction } = require("../../models");

// api/events/  get all events
router.get('/', (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ msg: "please login first!" })
  }
  Event.findAll({
    include: [Attendee, Attraction]
  })
    .then(dbEvents => {
      res.json(dbEvents)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ msg: "an error occured", err });
    });
})
// api/events/:id get single event by id
router.get('/:event_id', (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ msg: "please login first!" })
  }
  Event.findByPk(req.params.event_id, {
    include: [Attendee, Attraction]
  })
    .then(dbEvent => {
      res.json(dbEvent);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ msg: "an error occured", err });
    });
})

// api/event/  create event
router.post('/', (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ msg: "please login first!" })
  }
  Event.create({
    title: req.body.title,
    location: req.body.location,
    details: req.body.details,
    time_stamp: req.body.time_stamp,
    start_date: req.body.start_date,
    end_date: req.body.end_date,
    admin_id: req.session.user.id
  })
    .then(newEvent => {
      res.json(newEvent);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ msg: "an error occured", err });
    });
})

// api/events/:id  update events
router.put("/:event_id", (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ msg: "Please login to join the club!" })
  }
  Event.update(req.body, {
    where: {
      id: req.params.event_id
    }
  }).then(updatedEvent => {

    res.json(updatedEvent);
  })
    .catch(err => {
      console.log(err);
      res.status(500).json({ msg: "an error occured", err });
    });
});

// api/events/:id  delete event
router.delete("/:event_id", (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ msg: "Please login to join the club!" })
  }
  Event.destroy({
    where: {
      id: req.params.event_id
    }
  }).then(delEvent => {
    res.json(delEvent);
  })
    .catch(err => {
      console.log(err);
      res.status(500).json({ msg: "an error occured", err });
    });
});
// api/events/:id/attractions  find all attractions in that event
router.get('/:event_id/attractions', (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ msg: "Please login to join the club!" })
  }
  Attraction.findAll({
    where: {
      event_id: req.params.event_id
    }
  })
    .then(dbAttractions => {
      res.json(dbAttractions)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ msg: "an error occured", err });
    });

})
// api/events/:event_id/attractions/:id  find one attraction
router.get('/attractions/:id', (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ msg: "Please login to join the club!" })
  }
  Attraction.findByPk(req.params.id, {
    include: [Event]
  })
    .then(dbAttraction => {
      res.json(dbAttraction)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ msg: "an error occured", err });
    });

})
// api/events/attractions     create attractions
router.post('/:event_id/attractions', (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ msg: "please login first!" })
  }
  Attraction.create({
    title: req.body.title,
    location: req.body.location,
    details: req.body.details,
    time_stamp: req.body.time_stamp,
    start_date: req.body.start_date,
    end_date: req.body.end_date,
    event_id: req.body.event_id
  })
    .then(newAttraction => {
      res.json(newAttraction);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ msg: "an error occured", err });
    });
})

// api/events/attractions/id    update attractions
router.put("/attractions/:id", (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ msg: "Please login to join the club!" })
  }
  Attraction.update(req.body, {
    where: {
      id: req.params.id
    }
  }).then(updatedAttraction => {

    res.json(updatedAttraction);
  })
    .catch(err => {
      console.log(err);
      res.status(500).json({ msg: "an error occured", err });
    });
});
// api/events/attractions/id    delete attraction
router.delete("/attractions/:id", (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ msg: "Please login to join the club!" })
  }
  Attraction.destroy({
    where: {
      id: req.params.id
    }
  }).then(delAttraction => {
    res.json(delAttraction);
  })
    .catch(err => {
      console.log(err);
      res.status(500).json({ msg: "an error occured", err });
    });
});
// api/events/attendees   find all attendees
router.get('/attendees', (req, res) => {
  Attendee.findAll({
    include: [User, Event]
  })
    .then(dbAttendees => {
      res.json(dbAttendees)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ msg: "an error occured", err });
    });

})
// api/events/attendees/id   find one
router.get('/attendees/:id', (req, res) => {
  Attendee.findByPk({
    include: [User, Event]
  })
    .then(dbAttendee => {
      res.json(dbAttendee)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ msg: "an error occured", err });
    });

})
// api/events/attendees  create attendees
router.post('/attendees', (req, res) => {
  Attendee.create({
    event_id: req.body.event_id,
    user_id: req.body.user_id,
    invited_email: req.body.invited_email,
    going: req.body.going
  })
    .then(newAttendee => {
      res.json(newAttendee)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ msg: "an error occured", err });
    });

})

// api/events/attendees/id  update  attendees
router.put('/attendees/:id', (req, res) => {
  Attendee.update(req.body, {
    where: {
      id: req.params.id
    }
  })
    .then(updatedAttendee => {
      res.json(updatedAttendee)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ msg: "an error occured", err });
    });

})
// api/events/attendees/id   delete attendees
router.delete('/attendees/:id', (req, res) => {
  Attendee.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(delAttendee => {
      res.json(delAttendee)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ msg: "an error occured", err });
    });

})

module.exports = router