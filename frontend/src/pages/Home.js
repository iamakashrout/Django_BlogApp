import { useEffect } from "react";
import Posts from "../components/Posts";
import { useNavigate } from "react-router-dom";

export default function Home() {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (!token) {
            navigate("/login");
        }
    }, [token, navigate]);

    if (!token) {
        return null; // Prevents rendering if redirecting
    }

    return (
        <div>
            <h1>Welcome to the Blog</h1>
            <Posts />
        </div>
    );
}
