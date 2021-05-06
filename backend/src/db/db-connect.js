import mongoose from 'mongoose';


export default function connectToDatabase() {
  const connectionString = `mongodb+srv://admin:${process.env.MONGODB_PASSWORD}@cluster0.7szcs.mongodb.net/DefaultDB?retryWrites=true&w=majority`
  console.log(connectionString);
  return mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
}