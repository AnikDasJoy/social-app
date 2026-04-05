import { useEffect, useState } from "react";
import API from "../../services/api";
import CreatePost from "./CreatePost";
import PostCard from "./PostCard";

// ✅ Moved outside — stable reference, no useCallback needed
const fetchPosts = async (setPosts) => {
  try {
    const res = await API.get("/posts");
    setPosts(res.data);
  } catch (err) {
    console.error(err);
  }
};

const Feed = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts(setPosts);
  }, []);

  const updatePost = (updatedPost) => {
    setPosts((prev) =>
      prev.map((p) =>
        p._id === updatedPost._id
          ? JSON.parse(JSON.stringify(updatedPost))
          : p
      )
    );
  };

  return (
    <div>
      <CreatePost refreshPosts={() => fetchPosts(setPosts)} />

      {posts.map((post) => (
        <PostCard
          key={post._id}
          post={post}
          updatePost={updatePost}
          fetchPosts={() => fetchPosts(setPosts)}
        />
      ))}
    </div>
  );
};

export default Feed;