export interface Post {
  id: string;
  name: string;
  prompt: string;
  photo: string;
}

export type PostsResponse = { posts: Post[] } | { error: string };
