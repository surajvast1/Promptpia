// mongodb connection
import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("MongoDb Is already Connected :)");
    return;
  }
  try {
    await mongoose.connect(process.env.MongoDb_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    isConnected = true;
    console.log("Mongo Db Connnected :)");
  } catch (err) {
    console.log("Mongo db cannot be connected ");
    console.log(err);
  }
};
