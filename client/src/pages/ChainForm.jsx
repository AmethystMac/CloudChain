import { useState } from "react"
import { useNavigate } from "react-router-dom";

import APIEndpoints from "../data/APIEndpoints.json";
import Genesis from "../data/Genesis.json";
import "./ChainForm.css";

const ChainForm = () => {
    const navigate = useNavigate();

    const [chain_name, setChain_name] = useState("");
    const [network_type, setNetwork_type] = useState("private");
    const [crypto, setCrypto] = useState("wei");
    const [genesis, setGenesis] = useState(JSON.stringify(Genesis));
        
    const create_chain = async () => {
        let username = null;

        try {
            // Fetching the details of current user
            let response = await fetch("/api/current-user");
            let fetched_data = await response.json();
            
            if(fetched_data.status === "success") {
                username = fetched_data.response;

            } else {
                navigate("./");

            }
            
            // Sending an API request to create a blockchain
            response = await fetch(APIEndpoints.Blockchain + "/api/chain-new-service", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, chain_name, network_type, crypto, genesis })
            })

            fetched_data = await response.json();
            if(fetched_data.status === "success") {
                navigate("/console");

            } else {
                navigate("/");
                
            }
                
        } catch(err) {
            console.log(err);
        }
    }

    return (
        <div id="chain_form_main">
            <form className="chain_form">
                <div className="form_name">Create a Blockchain</div>
                <div className="chain_form_field">
                    <label className="form_label">Blockchain Name</label>
                    <input className="form_input" type="text" value={chain_name} onChange={text => setChain_name(text.target.value)}/>
                </div>
                <div className="chain_form_field">
                    <label className="form_label">Network Type</label>
                    <select className="form_select" value={network_type} onChange={text => setNetwork_type(text.target.value)}>
                        <option value="private">Private</option>
                        <option value="public">Public</option>
                    </select>
                </div>
                <div className="chain_form_field">
                    <label className="form_label">Cryptocurrency</label>
                    <input className="form_input" value={crypto} onChange={text => setCrypto(text.target.value)} list="eth-list"/>
                        <datalist id="eth-list">
                                <option value="wei" />
                                <option value="gwei" />
                                <option value="ether" />
                        </datalist>
                </div>
                <div className="chain_form_field">
                    <label className="form_label">Genesis Block</label>
                    <textarea className="form_textarea" value={genesis} onChange={text => setGenesis(text.target.value)} rows={10} cols={30}></textarea>
                </div>
                <button className="form_button" type="button" onClick={create_chain}>Enter</button>
            </form>
        </div>
    )   
}

export default ChainForm