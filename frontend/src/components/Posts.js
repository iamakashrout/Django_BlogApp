import { useEffect, useState } from "react";
import { getPosts } from "../api";

export default function Posts() {
    const [posts, setPosts] = useState([]);
    const token = localStorage.getItem("token");
    
    useEffect(() => {
        getPosts(token).then((res) => setPosts(res.data));
    }, []);

    return (
        <div>
            {posts.map((post) => (
                <div key={post.id}>
                    <h2>{post.title}</h2>
                    <p>{post.content}</p>
                    <small>By {post.author.username}</small>
                </div>
            ))}
        </div>
    );
}
