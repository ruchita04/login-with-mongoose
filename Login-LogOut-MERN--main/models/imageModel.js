import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
  name: String,
  image: {
    type: Buffer,
    contentType: String,
  },
});

const Image = mongoose.model("image", imageSchema);

export default Image;
