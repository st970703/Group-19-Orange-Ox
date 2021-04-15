import express from 'express';
import path from 'path';
import { Server } from 'socket.io';

// Setup Express
const app = express();
const port = process.env.PORT || 3001;

const httpServer = app.listen(port, 'localhost',
  function () {
    var host = httpServer.address().address;
    var port = httpServer.address().port;
    console.log('HTTP server listening at http://%s:%s', host, port);
  });

// Setup body-parser
app.use(express.json());

// Make the "public" folder available statically
app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Serve up the frontend's "build" directory, if we're running in production mode.
if (process.env.NODE_ENV === 'production') {
  console.log('Running in production!');

  // Make all files in that folder public
  app.use(express.static(path.join(__dirname, '../../frontend/build')));

  // If we get any GET request we can't process using one of the server routes, serve up index.html by default.
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/build/index.html'));
  });
}

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

// Register a callback function to run when we have an individual connection
// This is run for each individual user that connects
io.sockets.on('connection',
  // We are given a websocket object in our function
  function (socket) {
    console.log("We have a new client: " + socket.id);

    // When this user emits, client side: socket.emit('otherevent',some data);
    socket.on('pen',
      function (data) {
        // Data comes in as whatever was sent, including objects
        console.log("Received: 'pen' " + data);

        // Send it to all other clients
        socket.broadcast.emit('pen', data);

        // This is a way to send to everyone including sender
        // io.sockets.emit('message', "this goes to everyone");
      }
    );

    socket.on('shape',
      function (data) {
        // Data comes in as whatever was sent, including objects
        console.log("Received: 'shape' " + data);

        // Send it to all other clients
        socket.broadcast.emit('shape', data);

        // This is a way to send to everyone including sender
        // io.sockets.emit('message', "this goes to everyone");
      }
    );

    socket.on('eraser',
      function (data) {
        // Data comes in as whatever was sent, including objects
        console.log("Received: 'eraser' " + data);

        // Send it to all other clients
        socket.broadcast.emit('eraser', data);

        // This is a way to send to everyone including sender
        // io.sockets.emit('message', "this goes to everyone");
      }
    );

    socket.on('clear',
      function () {
        // Data comes in as whatever was sent, including objects
        console.log("Received: 'clear'");

        // Send it to all other clients
        socket.broadcast.emit('clear');

        // This is a way to send to everyone including sender
        // io.sockets.emit('message', "this goes to everyone");
      }
    );

    socket.on('disconnect', function () {
      console.log("Client " + socket.id + " has disconnected");
    });
  }
);