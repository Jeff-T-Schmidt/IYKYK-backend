const express = require("express");
const router = express.Router();
const { User, Event, Attendee, Attraction } = require("../../models");
const bcrypt = require("bcrypt");
const {withAuth} = require("../utils/tokenAuth")
const jwt = require("jsonwebtoken");

router.get('/', (req, res) => {
  User.findAll({
    include: [Event]
  })
    .then(dbUsers => {
      res.json(dbUsers);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ msg: "an error occured", err });
    });
});
// router.get("/logout", (req, res) => {
//   req.session.destroy();
//   res.redirect("/")
// })

// router.post('/logout', withAuth, (req, res) => {
//   if (req.session.user.logged_in) {
//     req.session.destroy(() => {
//       res.status(204).end();
//     });
//   } else {
//     res.status(404).end();
//   }
// });

router.get("/:id", (req, res) => {
  User.findByPk(req.params.id, {
    include: [Event]
  })
    .then(dbUser => {
      res.json(dbUser);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ msg: "an error occured", err });
    });
});
router.post("/signup", withAuth, (req, res) => {
  User.create(req.body)
    .then(newUser => {
        const token = jwt.sign({ 
            id: newUser.id, 
            email:newUser.email, 
        }, process.env.JWT_SECRET, {
            expiresIn: process.env.TOKEN_MAX_AGE
        });
      res.status(200).json(token);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ msg: "an error occured", err });
    });
});
router.post("/login", withAuth, (req, res) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  }).then(foundUser => {
    if (!foundUser) {
      return res.status(400).json({ msg: "wrong login credentials" })
    }
    if (bcrypt.compareSync(req.body.password, foundUser.password)) {
        const token = jwt.sign({
            id:foundUser.id,
            email:foundUser.email,
        },process.env.JWT_SECRET,{
            expiresIn: process.env.TOKEN_MAX_AGE
      })
      return  res.status(200).json(token);
    } else {
      return res.status(400).json({ msg: "wrong login credentials" })
    }
  }).catch(err => {
    console.log(err);
    res.status(500).json({ msg: "an error occured", err });
  });
});

//update user
router.put("/:id", withAuth, (req, res) => {
  User.update(req.body, {
    where: {
      id: req.params.id
    }
  }).then(updatedUser => {
    res.json(updatedUser);
  })
    .catch(err => {
      console.log(err);
      res.status(500).json({ msg: "an error occured", err });
    });
});

//delete a user
router.delete("/:id", withAuth, (req, res) => {
  User.destroy({
    where: {
      id: req.params.id
    }
  }).then(delUser => {
    res.json(delUser);
  })
    .catch(err => {
      console.log(err);
      res.status(500).json({ msg: "an error occured", err });
    });
});
module.exports = router;