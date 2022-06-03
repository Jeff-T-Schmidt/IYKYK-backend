const express = require("express");
const router = express.Router();
const {User,Event,Attendee,Attraction} = require("../../models");

// api/events/  get all events
router.get('/', (req,res)=>{
    if(!req.session.user){
        return res.status(401).json({msg:"please login first!"})
    }
    Event.findAll({})
    .then(dbEvents=>{
        res.json(dbEvents)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ msg: "an error occured", err});
    });
})
// api/events/:id get single event by id
router.get('/:id',(req,res)=>{
    if(!req.session.user){
        return res.status(401).json({msg:"please login first!"})
    }
    Event.findByPk(req.params.id,{})
    .then(dbEvent => {
        res.json(dbEvent);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ msg: "an error occured", err });
      });
})

// api/event/  create event
router.post('/',(req,res)=>{
    if(!req.session.user){
        return res.status(401).json({msg:"please login first!"})
    }
    Event.create({
        title:req.body.title,
        location:req.body.location,
        details:req.body.details,
        timeStamp:req.body.timeStamp,
        startDate:req.body.startDate,
        endDate:req.body.endDate,
        adminId:req.session.user.id
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
router.put("/:id", (req, res) => {
    if(!req.session.user){
      return res.status(401).json({msg:"Please login to join the club!"})
  }
    Event.update(req.body,{
      where: {
        id: req.params.id
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
  router.delete("/:id", (req, res) => {
    if(!req.session.user){
        return res.status(401).json({msg:"Please login to join the club!"})
    }
    Event.destroy({
      where: {
        id: req.params.id
      }
    }).then(delEvent => {
      res.json(delEvent);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ msg: "an error occured", err });
    });
  });
// api/events/attractions  find all attractions in that event
router.get('/attractions', (req,res)=>{
    if(!req.session.user){
        return res.status(401).json({msg:"Please login to join the club!"})
    }
    Attraction.findAll({})
    .then(dbAttractions=>{
        res.json(dbAttractions)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ msg: "an error occured", err});
    });
    
})



module.exports = router