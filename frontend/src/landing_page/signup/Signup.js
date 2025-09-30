import React, { useState } from "react";
import axios from "axios";

function Signup() {
    const [formData, setFormData] = useState({
        email: "",
        username: "",
        password: "",
    });

    const [message, setMessage] = useState("");

    // handle input change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(
                "http://localhost:5000/signup",   // backend API
                formData,
                { withCredentials: true }        // allow cookies
            );

            setMessage(res.data.message);
        } catch (err) {
            console.error(err);
            setMessage("Something went wrong!");
        }
    };

    return (
        <div style={{ maxWidth: "400px", margin: "auto", padding: "20px" }}>
            <h1>Signup</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit">Signup</button>
            </form>

            {message && <p>{message}</p>}
        </div>
    );
}

export default Signup;
