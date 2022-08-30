const e = require('express');
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server);

require('dotenv').config()

const PORT = 3001
let rooms = {}
const yelp = require('yelp-fusion');
const client = yelp.client(process.env.YELP_API_KEY);

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

app.get('/yelpstuff', (req, res) => {
  res.send()
})

io.on('connection', (socket) => {
  console.log('a user connected: ' + socket.id);

  socket.on('create-room', (roomName, settings) => {
    console.log("create room called")
    if (roomName in rooms) {
      socket.emit("error", roomName + " already exists.");
    } else {
      let searchSettings = {
        limit: 20,
        location: settings.location,
        radius: settings.radius,
        term: settings.term,
        open_at: settings.open_at,
        price: settings.price
      }
      client.search(
          searchSettings
        ).then(response => {
        console.log(roomName + ": room created!")
        rooms[roomName] = response.jsonBody.businesses.reverse()
        for (const restaurant of rooms[roomName]) {
          restaurant["yeses"] = new Set()
          restaurant["nos"] = new Set()
        }
        socket.emit('successfully created room!', response.jsonBody.businesses)
      }).catch(e => {
        socket.emit('error', 'Failed to create room ' + roomName + '.')
        console.log(e);
      });
    }
  })
  
  socket.on('get-restaurant-list', (roomName) => {
    console.log("getting restaurants from " + roomName + "...")
    console.log(rooms)
    socket.emit('restaurant-list', rooms[roomName])
  })

  socket.on('get-results', (roomName) => {
    rooms[roomName].sort((a,b) => a.votes > b.votes ? 1 : -1)
    socket.emit(rooms[roomName])
  })
  
  socket.on('join-room', (roomName) => {
    if (!(roomName in rooms)) {
      socket.emit("error", "That room does not exist!")
    } else {
      socket.join(roomName)
      socket.emit('restaurant-list', rooms[roomName])
    }
  })

  socket.on('leave-room', (roomName) => {
    console.log("user left " + roomName)
    socket.leave(roomName)
  })

  socket.on('yes-vote', (roomName, index, username) => {
    rooms[roomName][index]['yeses'].add(username)
  })
  socket.on('no-vote', (roomName, index, username) => {
    rooms[roomName][index]['nos'].add(username)
  })
});

// io.on('disconnect', ())

app.get('/yelp/:id', (req, res) => {
  client.search({
    term: 'restaurants',
    limit: 3,
    location: "Albany,CA",
    radius: 10000,
    categories: ['tacos'],
    open_at: 1660537936,
    price: [1, 2]
  }).then(response => {
    res.send(response.jsonBody.businesses[req.params.id].name);
  }).catch(e => {
    console.log(e);
  });
})

app.get('/rooms', (req, res) => {
  res.send(rooms)
})


server.listen(PORT, () => {
  console.log('listening on port:' + PORT);
});

