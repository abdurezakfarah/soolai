import React, { useEffect, useRef, useState, type ChangeEvent } from "react";
import { toast } from "sonner";
import { getPosts } from "../api";
import { Card, Loader, PageHead } from "../components";
import type { Post } from "../types";

//renders
const renderLoader = () => {
  return (
    <div className="flex justify-center items-center">
      <Loader />
    </div>
  );
};

export interface RenderCardsProps {
  data: Post[];
  title: string;
}

const RenderCards: React.FC<RenderCardsProps> = ({ data, title }) => {
  if (data?.length > 0) {
    return data.map((post: Post) => <Card key={post.id} {...post} />);
  } else {
    return (
      <p className="my-2 mx-auto tracking-tighter font-extrabolder text-4xl text-slate-300 p-4  ">
        {title}
      </p>
    );
  }
};

const Root = () => {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState<Post[] | []>([]);
  const [searchedResult, setSearchedResult] = useState<Post[] | []>([]);
  const [searchText, setSearchText] = useState("");

  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        setLoading(true);

        const data = await getPosts();

        if ("error" in data) {
          toast.error(data.error);
          return;
        }
        const posts = data?.posts;
        posts && setPosts(posts);
      } catch (error: unknown) {
        console.log(error);

        const defaultMessage =
          "Oopsie! We had a little problem and couldn't take images from our computer. But don't worry, we know about it, and we'll make it better! 😊";

        if (error instanceof Error) {
          toast.error(error.message || defaultMessage);
        } else {
          toast.error(defaultMessage);
        }
      } finally {
        setLoading(false);
      }
    };

    loadPosts();

    return () => {
      if (!searchTimeoutRef.current) return;

      clearTimeout(searchTimeoutRef.current);
    };
  }, []);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.currentTarget.value);

    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    const searchTimeout = setTimeout(() => {
      const searchedResult = posts?.filter(
        (post: Post) =>
          post.name?.toLowerCase().includes(searchText.toLowerCase()) ||
          post.prompt?.toLowerCase().includes(searchText.toLowerCase()),
      );
      setSearchedResult(searchedResult);
    }, 500) as NodeJS.Timeout;

    searchTimeoutRef.current = searchTimeout;
  };

  return (
    <div className="container max-w-7xl mx-auto">
      <PageHead
        title="Discover Our Community's Art"
        subtitle="Enjoy creative and beautiful images created by DALL-E AI."
      />

      {posts.length > 0 && (
        <section className="mt-16">
          <input
            className="placeholder:text-gray-500 flex h-12 w-full rounded-md border border- p-3 text-sm  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-"
            onChange={handleSearchChange}
            placeholder="Cabdirisaaq  or blue yacht..."
          />
        </section>
      )}

      <section className="mt-10">
        {loading ? (
          renderLoader()
        ) : (
          <>
            {searchText && (
              <h2 className="font-medium text-black-light text-xl mb-3 tracking-tight">
                Showing results for{" "}
                <span className="font-bold text-black-dark">{searchText}</span>
              </h2>
            )}
            <div className="grid grid-cols-1 gap-3 lg:grid-cols-4 sm:grid-cols-3 xs:grid-2">
              {searchText ? (
                <RenderCards
                  data={searchedResult}
                  title={"No search results found."}
                />
              ) : (
                <RenderCards data={posts} title={"No posts yet"} />
              )}
            </div>
          </>
        )}
      </section>
    </div>
  );
};

export default Root;
