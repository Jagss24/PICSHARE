import mongoose from "mongoose";

const conn = async (mongo_url) => {
  try {
    await mongoose
      .connect(
       process.env.MONGO_URL
      )
      .then(() => {
        console.log("MongoDB cloud connected");
      });
  } catch (error) {
    console.log(error);
  }
};

export default conn;
