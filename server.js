const express = require("express");
const allRoutes = require("./controllers");
const session = require("express-session");
const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const http = require('http')
const {Server} = require('socket.io')
const cors = require('cors')
const app = express();
const server = http.createServer(app)

app.use(cors())

const io = new Server(server, {
    cors:{
        origin:'http://localhost:3000',
        methods:['GET', 'POST'],
    },
})

server.listen(3002, ()=>{
    console.log('server is running')
})

const PORT = process.env.PORT || 3001;
// Requiring our models for syncing
const { User} = require("./models");
// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const sess = {
  secret: process.env.SESSION_SECRET,
  cookie: {
    maxAge: 3 * 60 * 60 * 1000
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};


app.use(session(sess));
// Static directory
app.use(express.static('public'));


app.use("/", allRoutes);


sequelize.sync({ force: false }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT localhost:" + PORT);
  });
});