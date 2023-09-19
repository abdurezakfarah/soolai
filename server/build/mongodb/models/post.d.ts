import { Model, Document } from "mongoose";
export interface IPost extends Document {
    id?: string;
    name: string;
    prompt: string;
    photo: string;
}
declare const Post: Model<IPost>;
export default Post;
