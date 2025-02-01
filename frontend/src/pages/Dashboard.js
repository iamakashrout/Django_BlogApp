import { useEffect, useState } from "react";
import { getPosts, deletePost } from "../api";
import { Link } from "react-router-dom";

export default function Dashboard() {
    const [posts, setPosts] = useState([]);
    const token = localStorage.getItem("token");

    useEffect(() => {
        getPosts(token).then((res) => setPosts(res.data));
    }, []);

    const handleDelete = async (postId) => {
        await deletePost(postId, token);
        setPosts(posts.filter((post) => post.id !== postId));
    };

    return (
        <div>
            <h1>Your Posts</h1>
            <Link to="/create-post">Create New Post</Link>
            {posts.map((post) => (
                <div key={post.id}>
                    <h2>{post.title}</h2>
                    <p>{post.content}</p>
                    <button onClick={() => handleDelete(post.id)}>Delete</button>
                </div>
            ))}
        </div>
    );
}
