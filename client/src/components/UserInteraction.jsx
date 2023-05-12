import { useEffect, useState } from "react"

import APIEndpoints from "../data/APIEndpoints.json";
import "./UserInteraction.css"

const UserInteraction = (props) => {
    const { chain_name, network_type } = props;

    const [command, setCommand] = useState("");
    const [current_user, setCurrent_user] = useState("");
    const [user_status, setUser_status] = useState({ "status": "success" });
    const [command_res, setCommand_res] = useState(undefined);

    const send_request = async () => {
        setCommand_res(undefined);
        
        let response = await fetch(APIEndpoints.EC2 + "/api/chain/command/?chain_name=" + chain_name + "&network_type=" + network_type + "&username=" + current_user + "&command=" + command);
        setCommand_res(await response.json());
    }

    const check_user = async () => {
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
            let owner = chain_name.split("-")[1];
            if(owner === current_user) {
                setCurrent_user("main");
                setUser_status({ "status": "success" });

            } else {
                let response = await fetch(APIEndpoints.EC2 + "/api/chain/check-user-node/?chain_name=" + chain_name + "&network_type=" + network_type + "&username=" + current_user);
                setUser_status(await response.json());

            }
        } catch (err) {
            console.log(err);
        }
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

    useEffect(() => { check_user(); }, []);
    useEffect(() => {
    if (current_user !== "") {
        check_user_node();
    }
    }, [current_user]);

    return (
        <div id="user_interaction">
            {( user_status.status === "success" ? 
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
                ( user_status.error === "2" ? 
                <div className="error">
                    <div className="error_name">User node not found!</div>
                    <div className="error_suggestion"><div className="error_smol">Create a new one:</div><div className="error_sol">{"sh ./scripts/shell/CreateNode.sh 234 private foo 123"}</div></div>
                </div> : <div className="error">Error!</div> ))}
        </div>
    )
}

export default UserInteraction