import mongoose from 'mongoose';

// Load .env if not in production
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

/**
 * This function begins the process of connecting to the database, and returns a promise that will
 * resolve when the connection is established.
 */
export default function connectToDatabase() {
  const uri = `mongodb+srv://admin:${process.env.MONGO_PASSWORD}@cluster0.7szcs.mongodb.net/DefaultDB?retryWrites=true&w=majority`;
  return mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
}
