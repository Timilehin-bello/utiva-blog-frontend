import { formatISO9075 } from "date-fns";
import { UserContext } from "../src/UserContext";
import { Link } from "react-router-dom";
import { useContext } from "react";

export default function Post({
  _id,
  title,
  summary,
  cover,
  content,
  createdAt,
  author,
}) {
  const { isAuthenticated } = useContext(UserContext);
  function truncateString(str, num) {
    if (str.length <= num) {
      return str;
    }
    return str.slice(0, num) + "...";
  }

  async function handleDeletePost() {
    // console.log(isAuthenticated.username, "******", author);

    try {
      // Send a DELETE request to the API endpoint to delete the post
      const response = await fetch(
        `http://localhost:8080/api/user/post/${_id}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        // The post is successfully deleted. You can perform any additional actions,
        // like redirecting the user or updating the state to remove the post from the UI.
        alert("Post deleted successfully!");
        window.location.reload(true);
      } else {
        // Handle the case when the post could not be deleted, e.g., show an error message.
        alert("Failed to delete the post");
      }
    } catch (error) {
      // Handle any errors during the delete process.
      alert("An error occurred while deleting the post", error);
    }
  }

  return (
    <div className="post">
      <div className="image">
        <Link to={`/post/${_id}`}>
          <img src={"http://localhost:8080/" + cover} alt="" />
        </Link>
      </div>
      <div className="texts">
        <Link to={`/post/${_id}`}>
          <h2>{title}</h2>
        </Link>
        <p className="info" style={{ alignItems: "center" }}>
          <a href className="author">
            {author?.username.toUpperCase()}
          </a>
          <time>{formatISO9075(new Date(createdAt))}</time>
          {isAuthenticated?.username === author?.username && (
            <button
              className="button-58"
              style={{ width: "auto" }}
              onClick={handleDeletePost}
            >
              delete
            </button>
          )}
        </p>
        <p className="summary"> {truncateString(summary, 200)}</p>
      </div>
    </div>
  );
}
