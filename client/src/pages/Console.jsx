import { useEffect } from "react";
import { useNavigate, useLocation, Routes, Route, Link } from "react-router-dom"

import ChainBrowser from "./ChainBrowser";
import ChainPage from "./ChainPage";
import ChainForm from "./ChainForm";
import { ChainStatusProvider } from "../contexts/ChainStatusProvider";
import Error from "./Error";
import APIEndpoints from "../data/APIEndpoints.json";
import "./Console.css"

const Home = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Checking the authentication status of the user
    const checkAuth = async () => {
        try {
            let response = await fetch("/api/current-user");
            let fetched_data = await response.json();

            if(fetched_data.status === "failed") {
                navigate("/");
            
            }
            
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => { checkAuth() }, [location]);

    return (
        <div id="console_page">
            <div id="main_nav">
                <nav>
                    <Link to="./">Home</Link>
                </nav>
            </div>
            <div id="main_content">
                <Routes>
                    <Route path="/" element={<ChainBrowser />} />
                    <Route path="/chain/:network_type/:chain_name" element={<ChainStatusProvider><ChainPage /></ChainStatusProvider>} />
                    <Route path="/create/chain" element={<ChainForm />} />
                    <Route path="*" element={<Error />} />
                </Routes>   
            </div>
            <div id="main_footer">
                CloudChain
            </div>
        </div>
    )
}

export default Home