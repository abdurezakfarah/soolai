import mongoose, { Model, Schema, Document } from "mongoose";

export interface IPost extends Document {
  id?: string;
  name: string;
  prompt: string;
  photo: string;
}

const postSchema: Schema<IPost> = new Schema<IPost>({
  name: { type: String, required: true },
  prompt: { type: String, required: true },
  photo: { type: String, required: true },
});

const Post: Model<IPost> = mongoose.model<IPost>('Post', postSchema);

export default Post;

