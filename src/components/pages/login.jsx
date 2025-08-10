import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AIXOPSLogo from '../../assets/AIXOPS_Login_page.png'

const Login = () => {
    const [formData, setFormData] = useState({ username: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        localStorage.setItem("username", formData.username);

        try {
            // Hardcoded MVP validation
            if (
                (formData.username === "tskbalaji" && formData.password === "12345678") ||
                (formData.username === "aadharsh" && formData.password === "12345678")
            ) {
                // Set user role based on username
                const user = {
                    username: formData.username,
                    role: formData.username === "tskbalaji" ? "developer" : "business",
                };

                // Store user details in localStorage
                localStorage.setItem("userDetails", JSON.stringify(user));

                // Navigate to dashboard on successful login
                navigate("/home");
            } else {
                throw new Error("Invalid username or password");
            }
        } catch (error) {
            console.error(error);
            setError(error.message || "Login failed");
        }
    };

    return (
        <div
            style={{
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
                gap: "50px", // Space between logo, line, and form
            }}
        >
            <img
                src={AIXOPSLogo}
                alt="AIXOPS"
                style={{
                    maxHeight: "300px"
                }}
            />

            <div
                style={{
                    minWidth: "500px",
                    padding: "40px",
                    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
                    borderRadius: "10px",
                    backgroundColor: "#f9f9f9",
                    minHeight: "500px",
                }}
            >
                <h2
                    style={{
                        textAlign: "center",
                        color: "#007bff",
                        marginBottom: "30px", // Increased margin for spacing
                        fontWeight: "bold",
                        fontSize: "24px", // Slightly larger font for balance
                    }}
                >
                    Login
                </h2>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "20px", // Increased gap for spacing
                        minHeight: "300px", // Added minHeight to ensure content fills space
                    }}
                >
                    <input
                        name="username"
                        placeholder="username"
                        onChange={handleChange}
                        required
                        style={{
                            padding: "20px", // Increased padding from 15px to 20px
                            borderRadius: "5px",
                            border: "1px solid #ddd",
                            fontSize: "18px", // Increased font size for readability
                            backgroundColor: "#fff",
                            boxShadow: "inset 0 1px 3px rgba(0,0,0,0.1)",
                            color: "#333",
                            width: "100%", // Ensure full width
                        }}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={handleChange}
                        required
                        style={{
                            padding: "20px", // Increased padding from 15px to 20px
                            borderRadius: "5px",
                            border: "1px solid #ddd",
                            fontSize: "18px", // Increased font size for readability
                            backgroundColor: "#fff",
                            boxShadow: "inset 0 1px 3px rgba(0,0,0,0.1)",
                            color: "#333",
                            width: "100%", // Ensure full width
                        }}
                    />
                    <button
                        type="button"
                        onClick={handleSubmit}
                        style={{
                            padding: "20px", // Increased padding from 15px to 20px
                            backgroundColor: "#007bff",
                            color: "white",
                            border: "none",
                            borderRadius: "5px",
                            fontSize: "18px", // Increased font size for balance
                            fontWeight: "bold",
                            cursor: "pointer",
                            transition: "background-color 0.3s, box-shadow 0.3s",
                            width: "100%", // Ensure full width
                        }}
                        onMouseOver={(e) =>
                            (e.target.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.2)")
                        }
                        onMouseOut={(e) => (e.target.style.boxShadow = "none")}
                    >
                        Login
                    </button>
                    {error && (
                        <p style={{ color: "red", textAlign: "center", margin: "15px 0", fontSize: "16px" }}>
                            {error}
                        </p>
                    )}
                </div>
                <div style={{ textAlign: "center", marginTop: "20px" }}>
                    <Link
                        to="/forgot-password"
                        style={{
                            color: "#007bff",
                            textDecoration: "none",
                            fontWeight: "bold",
                            fontSize: "16px", // Increased font size for consistency
                        }}
                        onMouseOver={(e) => (e.target.style.textDecoration = "underline")}
                        onMouseOut={(e) => (e.target.style.textDecoration = "none")}
                    >
                        Forgot Password?
                    </Link>
                    {/* <span style={{ margin: "0 10px", color: "#555" }}>|</span>
                    <Link
                        to="/register"
                        style={{
                            color: "#007bff",
                            textDecoration: "none",
                            fontWeight: "bold",
                        }}
                        onMouseOver={(e) => (e.target.style.textDecoration = "underline")}
                        onMouseOut={(e) => (e.target.style.textDecoration = "none")}
                    >
                        Create an Account
                    </Link> */}
                </div>
            </div>
        </div>
    );
};

export default Login;