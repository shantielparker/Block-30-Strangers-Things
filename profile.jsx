profile.jsx",
import { useState, useEffect } from "react"
import { fetchUser } from "../logic/fetch";
import NewPostForm from "../components/NewPostForm";
import OffcanvasForm from "../components/OffcanvasForm";

export default function Profile() {
    const [posts, setPosts] = useState([]);
    const [messages, setMessages] = useState([])
    const [username, setUsername] = useState()
    
    useEffect(() => {
        async function fetchUserDetails() {
            try {
                const token = sessionStorage.getItem("userToken");
                const fetchedUser = await fetchUser(token); //Fetch user info
                setPosts(fetchedUser.data.posts);
                setMessages(fetchedUser.data.messages)
                setUsername(fetchedUser.data.username)
            } catch (error) {
                console.error(`Error fetching user: ${error}`)
            }
        }
        fetchUserDetails()
    }, []);


    return (
        <div>
            <div className="container-fluid border-bottom pb-2">
                <h1 className="display-1">{username}</h1>
            </div>
            <div className="container text-center">
                <h2 className="display-4">Posts: {posts.length}</h2>
                <h2 className="display-4">Messages: {messages.length}</h2>
                <button className="btn btn-primary" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample">New Post</button>
            </div>
            {posts.length > 0 ? (
                posts.map(post => (
                    <div key={post._id} className="container mt-5 border shadow rounded">
                        <h3>{post.title}</h3>
                        <h5>Seller: {post.author?.username}</h5>
                        <p>{post.description}</p>
                        <p>{post.location}</p>
                        <p>{post.willDeliver ? "Delivery Available" : "Pickup Available"}</p>
                        <p>Price: {post.price}</p>

                        {/* Rendering associated messages */}
                        {post.messages > 0 ? (
                            <div className="card mt-3">
                                <div className="card-body">
                                    <h5 className="card-title">Messages</h5>
                                    <ul className="list-group">
                                        {post.messages.map(message => (
                                            <li key={message._id} className="list-group-item">
                                                <strong>{message.fromUser.username}</strong>: {message.content}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ) : null}
                    </div>
                ))
            ) : (
                <div className="container text-center">
                    <h3>No posts at this time.</h3>
                    <h3>Kinda lonely here</h3>
                </div>
            )}
            <OffcanvasForm />
        </div>
    )
}