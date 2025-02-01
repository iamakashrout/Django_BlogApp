import { useState } from "react";
import { createPost } from "../api";
import { useNavigate } from "react-router-dom";

export default function PostForm() {
    const [form, setForm] = useState({ title: "", content: "" });
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!token) {
            alert("Please log in to create a post");
            return;
        }
        await createPost(form, token);
        navigate("/dashboard");
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Title" onChange={(e) => setForm({ ...form, title: e.target.value })} />
            <textarea placeholder="Content" onChange={(e) => setForm({ ...form, content: e.target.value })}></textarea>
            <button type="submit">Create Post</button>
        </form>
    );
}
