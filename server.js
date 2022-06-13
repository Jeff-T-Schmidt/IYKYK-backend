const express = require("express");
const allRoutes = require("./controllers");
const sequelize = require("./config/connection");
const http = require('http')
const {Server} = require('socket.io')
const cors = require('cors')
const app = express();
const server = http.createServer(app)

app.use(cors())

const io = new Server(server, {
    cors:{
        origin:'http://localhost:3000'||'https://iykyk-frontend.herokuapp.com/' ,
        methods:['GET', 'POST'],
    },
})

io.on('connection',(socket)=>{
console.log(`user connected:${socket.id}`)
socket.on('send_message',(data)=>{
  socket.broadcast.emit("receive_message",data);
})
socket.on("disconnect", () => {
  console.log("User Disconnected", socket.id);
});
});

server.listen(3002, ()=>{
    console.log('socket server is running on port 3002')
})

const PORT = process.env.PORT || 3001;
// Requiring our models for syncing
const { User} = require("./models");
// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Static directory
app.use(express.static('public'));


app.use("/", allRoutes);


sequelize.sync({ force: false}).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT localhost:" + PORT);
  });
});