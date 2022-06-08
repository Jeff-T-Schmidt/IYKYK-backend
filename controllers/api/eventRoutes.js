const express = require("express");
const router = express.Router();
const { User, Event, Attendee, Attraction } = require("../../models");
const {withAuth} = require("../../util/tokenAuth")

// api/events/  get all events
router.get('/', (req, res) => {
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
router.post('/', withAuth, (req, res) => {
  Event.create({
    title: req.body.title,
    location: req.body.location,
    details: req.body.details,
    time_stamp: req.body.time_stamp,
    start_date: req.body.start_date,
    end_date: req.body.end_date,
    admin_id: req.body.admin_id
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
router.put("/:event_id", withAuth, (req, res) => {
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
router.delete("/:event_id", withAuth, (req, res) => {
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
router.post('/:event_id/attractions', withAuth, (req, res) => {
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
router.put("/attractions/:id", withAuth, (req, res) => {
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
router.delete("/attractions/:id", withAuth, (req, res) => {
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
router.get('/:event_id/attendees', (req, res) => {
  Attendee.findAll({
      include:[Event],
    where: {
        event_id: req.params.event_id
      }
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
  Attendee.findByPk(req.params.id,{
    include: [ Event]
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
router.post('/attendees', withAuth, (req, res) => {
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
router.put('/attendees/:id', withAuth, (req, res) => {
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
router.delete('/attendees/:id', withAuth, (req, res) => {
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