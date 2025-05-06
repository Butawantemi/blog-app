import { set, connect } from 'mongoose';
import dotenv from "dotenv";
dotenv.config();

const url = process.env.MONGO_DB_URI;
if (!url) {
  throw new Error("MONGO_DB_URI is not defined in environment variables.");
}
export const connectToDB = async () => {
  try {
    set('strictQuery', false);
    const db = await connect(url);
    console.log("MongoDB is connected successfully")
  } catch (error) {
    console.log(error);
  }
};

export default connectToDB;
