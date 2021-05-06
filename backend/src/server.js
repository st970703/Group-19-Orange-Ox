import express from 'express';
import path from 'path';
import { Server } from 'socket.io';
import connectToDatabse from './db/db-connect';

function removeElementFromArray(array, element) {
  const index = array.indexOf(element);
  if (index > -1) {
    array = array.splice(element, 1);
  }

  return array;
}

// dotenv setup for loading env variables
require('dotenv').config();

// Setup Express
const app = express();
const port = process.env.PORT || 3001;

// Connect to MongoDB
connectToDatabse()
  .then(() => console.log('Connected to database'));

const httpServer = app.listen(port, 'localhost',
  function () {
    var host = httpServer.address().address;
    var port = httpServer.address().port;
    console.log('HTTP server listening at http://%s:%s', host, port);
  });

// Setup body-parser
app.use(express.json());
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

// Make the "public" folder available statically
// app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

/*
import routes from './routes/index';
app.use('/', routes);
*/

require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);

// Serve up the frontend's "build" directory, if we're running in production mode.
/*
if (process.env.NODE_ENV === 'production') {
  console.log('Running in production!');

  // Make all files in that folder public
  app.use(express.static(path.join(__dirname, '../../frontend/build')));

  // If we get any GET request we can't process using one of the server routes, serve up index.html by default.
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/build/index.html'));
  });
}
*/

// WebSocket Portion
const wsServerPort = process.env.SOCKET_PORT || 4001;
const wsServer = app.listen(wsServerPort, 'localhost',
  function () {
    var host = wsServer.address().address;
    var port = wsServer.address().port;
    console.log('Websocket server listening at http://%s:%s', host, port);
  });

const io = new Server(wsServer,
  {
    cors: {
      origin: "*"
    }
  });

let canvasState = [];
let clients = [];

// Register a callback function to run when we have an individual connection
// This is run for each individual user that connects
io.sockets.on('connection',
  function (socket) {
    if (!clients.includes(socket.id)) {
      console.log("We have a new client: " + socket.id);

      clients.push(socket.id);

      socket.emit('initialCanvas',
        canvasState
      );

      // When this user emits, client side: socket.emit('otherevent',some data);
      socket.on('pen',
        function (data) {
          console.log("Received: 'pen' " + data);

          if (data && !canvasState.includes(data)) {
            canvasState.push(data);

            // Send it to all other clients
            socket.broadcast.emit('pen', data);

            // This is a way to send to everyone including sender
            // io.sockets.emit('message', "this goes to everyone");
          } else {
            return;
          }
        }
      );

      socket.on('shape',
        function (data) {
          console.log("Received: 'shape' " + data);

          if (data && !canvasState.includes(data)) {
            canvasState.push(data);

            // Send it to all other clients
            socket.broadcast.emit('shape', data);

            // This is a way to send to everyone including sender
            // io.sockets.emit('message', "this goes to everyone");
          } else {
            return;
          }
        }
      );

      socket.on('eraser',
        function (data) {
          console.log("Received: 'eraser' " + data);

          if (data && !canvasState.includes(data)) {
            canvasState.push(data);

            // Send it to all other clients
            socket.broadcast.emit('eraser', data);

            // This is a way to send to everyone including sender
            // io.sockets.emit('message', "this goes to everyone");
          } else {
            return;
          }
        }
      );

      socket.on('clear',
        function () {
          console.log("Received: 'clear'");

          if (canvasState.length > 0) {
            canvasState.splice(0);

            // Send it to all other clients
            socket.broadcast.emit('clear');

            // This is a way to send to everyone including sender
            // io.sockets.emit('message', "this goes to everyone");
          } else {
            return;
          }
        }
      );

      socket.on('disconnect', function () {
        console.log("Client " + socket.id + " has disconnected");

        clients = removeElementFromArray(clients, socket.id);
      });
    } else {
      return;
    }
  }
);