import Post from "../Post";
import { useEffect, useState } from "react";

export default function IndexPage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("https://utiva-blog-api.onrender.com/api/user/post") // Use the URL of your proxy server here
      .then((response) => response.json())
      .then((posts) => setPosts(posts))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return <>{posts.length > 0 && posts.map((post) => <Post {...post} />)}</>;
}
