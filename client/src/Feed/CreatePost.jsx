import { useState } from "react";
import API from "../../services/api";

const CreatePost = ({ refreshPosts }) => {
  const [text, setText] = useState("");
  const [image, setImage] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);

  const handlePost = async () => {
    if (!text) return alert("Text required");

    await API.post("/posts", {
      text,
      image,
      isPrivate,
    });

    setText("");
    setImage("");
    setIsPrivate(false);

    refreshPosts();
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <textarea
        placeholder="Write something..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <input
        type="text"
        placeholder="Image URL"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />

      <label>
        <input
          type="checkbox"
          checked={isPrivate}
          onChange={(e) => setIsPrivate(e.target.checked)}
        />
        Private
      </label>

      <button onClick={handlePost}>Post</button>
    </div>
  );
};

export default CreatePost;