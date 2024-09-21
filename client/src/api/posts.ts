import type { Post, PostsResponse } from "../types";

const baseUrl = import.meta.env.VITE_SERVER_BASE_URL;

export const createPost = async (post: Omit<Post, "id">) => {
  const endPoint = import.meta.env.VITE_ENDPOINTS_V1_POSTS;

  const url = baseUrl + endPoint;

  const postOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  };

  const response = await fetch(url, postOptions);

  const data = await response.json();
  return data as {post: Post} | {error: string};
};

export async function getPosts() {
  const url = `${baseUrl}/api/v1/posts`;
  const response = await fetch(url);
  return (await response.json()) as PostsResponse;
}
