import { useRef, useState, useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom";

import APIEndpoints from "../data/APIEndpoints.json";
import "./Login.css";

const Login = () => {
    const navigate = useNavigate();

    const usernameRef = useRef();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        usernameRef.current.focus();
    }, []);

    const verify_credentials = async () => {
        try {
            const response = await fetch("/api/verify-user", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password })
            })

            const fetched_data = await response.json();
            if(fetched_data.status === "success") {
                setUsername("");
                setPassword("");

                navigate("/console");

            } else {
                console.log(fetched_data);
                navigate("/");
                
            }

        } catch(err) {
            console.log(err);
        }
    }

    return (
        <div id="login_page">
            <form className="form">
                <div className="form_name">LOGIN</div>
                <div className="form_field">
                    <label className="form_label">Username</label>
                    <input 
                        ref={usernameRef} 
                        className="form_input" 
                        type="text" 
                        value={username} 
                        autoComplete="off"
                        onChange={(text) => setUsername(text.target.value)}
                    /><br/>
                </div>
                <div className="form_field">
                    <label className="form_label">Password</label>
                    <input 
                        className="form_input" 
                        type="password" 
                        value={password} 
                        onChange={(text) => setPassword(text.target.value)}
                    />
                </div>
                <button className="form_button" type="button" onClick={() => { verify_credentials() }}>Enter</button>
            </form>
            <div className="plain_text">
                Experience the power of decentralized technology with our <br/>
                secure and user-friendly blockchain-as-a-service platform.
            </div>
        </div>
    )
}

export default Login