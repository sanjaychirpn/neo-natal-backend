import dotenv from 'dotenv';
dotenv.config();
import { connect } from 'mongoose';

const MONGODB_URL = process.env.MONGODB_URL;

let dbConnect = async () => {
  await connect(MONGODB_URL)
    .then((conn) => {
      console.log(`🚀 🚀 🚀 🚀 Database Connected Successfully 🚀 🚀 🚀 🚀`);
    })
    .catch((error) => {
      console.log('DB Connection Failed!');
      console.log(error);
      process.exit(1);
    });
};

export default dbConnect;
