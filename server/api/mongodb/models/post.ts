import mongoose, { Schema, Document } from "mongoose";

export interface Post extends Document {
  id?: string;
  name: string;
  prompt: string;
  photo: string;
}

const postSchema = new Schema<Post>({
  name: { type: String, required: true },
  prompt: { type: String, required: true },
  photo: { type: String, required: true },
});

const Post = mongoose.model<Post>("Post", postSchema);

export default Post;
