import { useEffect, useState } from "react"

import APIEndpoints from "../data/APIEndpoints.json";
import "./UserInteraction.css"

const UserInteraction = (props) => {
    const { chain_name, network_type } = props;

    const [command, setCommand] = useState("");
    const [current_user, setCurrent_user] = useState("");
    const [user_node, setUser_node] = useState({});
    const [node_status, setNode_status] = useState({});
    const [command_res, setCommand_res] = useState(undefined);

    const get_user = async () => {
        try {
            let response = await fetch("/api/current-user");
            let data = await response.json();
            setCurrent_user(data.response);

        } catch (err) {
            console.log(err);
        }
    }

    const check_user_node = async () => {
        try {
            if(current_user === chain_name.split("-")[1]) {
                setCurrent_user("main");
                setUser_node({ "status": "success" });

            } else {
                let response = await fetch(APIEndpoints.Blockchain + "/api/chain/check-user-node/?chain_name=" + chain_name + "&network_type=" + network_type + "&username=" + current_user);
                setUser_node(await response.json());

            }
        } catch (err) {
            console.log(err);
        }
    }

    const fetch_node_status = async () => {
        try {
            // Check if chain is running
            let response = await fetch(APIEndpoints.Blockchain + "/api/chain-node-status/?chain_name=" + chain_name + "&network_type=" + network_type + "&username=" + current_user);
            setNode_status(await response.json());

        } catch (err) {
            setNode_status({ "status": "failed" });

        }
    }

    const create_node = async () => {
        try {
            await fetch(APIEndpoints.Blockchain + "/api/chain-new-node/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ chain_name: chain_name.split('-')[0], network_type, chain_owner: chain_name.split('-')[1], username: current_user })
            });
            setUser_node({ "status": "success" });

        } catch (err) {
            console.log(err);

        }
    };

    const start_chain_node = async () => {
        try {
            await fetch(APIEndpoints.Blockchain + "/api/chain-start-node/?chain_name=" + chain_name.split('-')[0] + "&network_type=" + network_type + "&chain_owner=" + chain_name.split('-')[1] + "&username=" + current_user);
            setNode_status({ "status": "success" });

        } catch (err) {
            console.log(err);

        }
    };

    const send_request = async () => {
        setCommand_res(undefined);
        
        let response = await fetch(APIEndpoints.Blockchain + "/api/chain/command/?chain_name=" + chain_name + "&network_type=" + network_type + "&username=" + current_user + "&command=" + command);
        setCommand_res(await response.json());
    }

    const get_command_output = () => {
        if (command_res) {
            if(command_res.status === "success") {
                const command_str = JSON.stringify(command_res.response);
                const command_arr = command_str.split("\\n");
                const command_out = command_arr[1].replace("\\\"", "").split("\\\"")[0].replace("[", "").replace("]", "");
                
                return command_out;

            } else {
                return "Error!";

            }
        } else {
            return command_res;
        }
    }

    useEffect(() => { get_user(); }, []);
    useEffect(() => {
        if (current_user !== "") {
            check_user_node();
        }
    }, [current_user]);
    useEffect(() => {
        if (user_node && user_node.status === "success") {
            fetch_node_status();
        }
    }, [user_node])

    return (
        <div id="user_interaction">
            {(
                user_node.status ? 
                    (user_node.status === "success" ? 
                        (node_status.status === "success" ?
                            <div id="command_form_main">
                                <form id="command_form">
                                    <div className="form_field">
                                        <label className="command_form_label">Enter Command</label>
                                        <input className="command_form_input" type="text" value={command} onChange={(text) => setCommand(text.target.value)}/><br/>
                                    </div>
                                    <button className="command_form_button" type="button" onClick={send_request}>Enter</button>
                                </form> 
                                <label id="command_response">{get_command_output()}</label>
                            </div> : 
                            (node_status.error === "2" ?
                                <div><button className="command_form_button" type="button" onClick={() => { start_chain_node(); }}>Click here</button> to start node</div> : 
                                <div>Loading...</div>)) :
                    ( user_node.error === "2" ? 
                    <div className="error">
                        <div className="error_name">User node not found</div>
                        <div className="error_suggestion"><button onClick={() => { create_node(); }}>Click here</button><div className="error_smol">to create a new one</div></div>
                    </div> : <div className="error">Error!</div>)) :
                <div>Loading...</div>
            )}
        </div>
    )
}

export default UserInteraction