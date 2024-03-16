import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema({
  emailId: {
    type: String,
    required: true,
  },
  images: [
    {
      type: String,
    }
  ],
});

export default mongoose.model("ImageSchema", ImageSchema)
