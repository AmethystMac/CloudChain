import { useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom"

import UserInteraction from "../components/UserInteraction";
import ChainBlockData from "../components/ChainBlockData";
import ChainTransactionData from "../components/ChainTransactionData";
import ChainNotStarted from "../components/ChainNotStarted";
import { ShowBlockProvider } from "../contexts/ShowBlockProvider";
import useChainStatus from "../hooks/useChainStatus";
import APIEndpoints from "../data/APIEndpoints.json";
import "./ChainPage.css";

const ChainPage = () => {
    const { chain_name, network_type } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const [current_user, setCurrent_user] = useState("");
    const [chain_status, setChain_status] = useChainStatus();

    const get_user = async () => {
        try {
            let response = await fetch("/api/current-user");
            let data = await response.json();
            setCurrent_user(data.response);

        } catch (err) {
            console.log(err);
        }
    }

    const fetch_chain_status = async () => {
        try {
            // Check if chain is running
            let response = await fetch(APIEndpoints.Blockchain + "/api/chain-node-status/?chain_name=" + chain_name + "&network_type=" + network_type + "&username=main");
            setChain_status(await response.json());

        } catch (err) {
            setChain_status({ "status": "failed" });

        }
    }

    const stop_chain_service = async () => {
        try {
            await fetch(APIEndpoints.Blockchain + "/api/chain-stop-service/?chain_name=" + chain_name.split('-')[0] + "&network_type=" + network_type + "&username=" + chain_name.split('-')[1]);
            setChain_status({ "status": "failed" });

        } catch (err) {
            console.log(err);

        }
    }

    useEffect(() => { get_user(); }, []);
    useEffect(() => {
        if (current_user !== "") {
            fetch_chain_status();
        }
    }, [current_user]);
    useEffect(() => { navigate(location); }, [chain_status]);

    return (
        <div id="chain_page_main">
            <div id="page_name">
                Blockchain Network - <div id="chain_page_name">{chain_name.split("-")[0].toUpperCase()}</div>
                { chain_status.status === "success"  && current_user === chain_name.split('-')[1] ? <button type="button" onClick={() => { stop_chain_service() }} className="node_stop_btn">Stop</button> : <></> }
            </div>
            <div id="chain_page">
                <div>
                { (chain_status.status === "success" ? 
                    <div id="chain_page_column">
                        <UserInteraction chain_name={chain_name} network_type={network_type} />
                        <div id="chain_data">
                            <ShowBlockProvider>
                                <ChainBlockData chain_name={chain_name} network_type={network_type} />
                            </ShowBlockProvider>
                            <ChainTransactionData chain_name={chain_name} network_type={network_type} />
                        </div>
                    </div> : <ChainNotStarted chain_name={chain_name} network_type={network_type} owner={ chain_name.split('-')[1] === current_user ? true : false } />) }
                </div>
            </div>
        </div>
    )
}

export default ChainPage