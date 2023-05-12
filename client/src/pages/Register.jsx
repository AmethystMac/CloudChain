import { useRef, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";

import "./Login.css";

const Register = () => {
    const navigate = useNavigate();

    const userRef = useRef();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        userRef.current.focus();
    }, []);
        
    const verify_credentials = async () => {
        try {
            const response = await fetch("/api/create-user", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password })
            })

            const fetched_data = await response.json();
            if(fetched_data.status === "success") {
                navigate("/login");

            } else {
                navigate("/");
                
            }
                
        } catch(err) {
            console.log(err);
        }
    }

    return (
        <div id="login_page">
            <form className="form">
                <div className="form_name">JOIN US</div>
                <div className="form_field">
                    <label className="form_label">Username</label>
                    <input ref={userRef} className="form_input" type="text" value={username} onChange={(text) => setUsername(text.target.value)}/><br/>
                </div>
                <div className="form_field">
                    <label className="form_label">Password</label>
                    <input className="form_input" type="password" value={password} onChange={(text) => setPassword(text.target.value)} />
                </div>
                <button className="form_button" type="button" onClick={verify_credentials}>Enter</button>
            </form>
            <div className="plain_text">
                Join the decentralized revolution and start building your own blockchain-based<br/>
                applications with our easy and streamlined registration process.
            </div>
        </div>
    )
}
export default Register