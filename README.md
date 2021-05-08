# SE750/CS732 Group-19-Orange-Ox
<img src="./frontend/src/img/orange-ox.svg" alt="Orange_ox_logo" height="90">

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

* [MERN Stack](https://www.mongodb.com/mern-stack)
* [Material UI](https://material-ui.com/)
* [react-p5](https://www.npmjs.com/package/react-p5)
* [socket.io](https://socket.io/)

### Installing

* Go to the frontend directory, and then
```
npm install
```
* Likewise, go to the backend directory, and then
```
npm install
```
* Create a `.env` file in the frontend directory.
Use the [.env.example](./frontend/.env.example) file as an example.

* Create a `.env` file in the backend directory.
Use the [.env.example](./backend/.env.example) file as an example.

### Running

* Go to the frontend directory, and then
```
npm run start
```
to run the frontend React App on port 3000.

* Likewise, go to the backend directory, and then
```
npm run start
```
to run the backend Express HTTP server on port 3001.
* and the Express Websocket server on port 4001.

## Running the tests

### Backend Testing
* In the `backend` directory, run command:
```
npm test
```
this will run the tests for MongoDB and Express.

## Authors

* Mike Lee
* Jusin Kim
* Callum Bradding

## License

This project is licensed under the [__GNU General Public License__](LICENSE)
