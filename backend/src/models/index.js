import mongoose from 'mongoose';
mongoose.Promise = global.Promise;

const db = {};

db.user = require('./user.model');

module.exports = db;