import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"

import UserInteraction from "../components/UserInteraction";
import ChainBlockData from "../components/ChainBlockData";
import ChainTransactionData from "../components/ChainTransactionData";
import ChainNotFound from "../components/ChainNotFound";
import APIEndpoints from "../data/APIEndpoints.json";
import "./ChainPage.css";

const ChainPage = () => {
    const { chain_name, network_type } = useParams();

    const [chain_status, setChain_status] = useState({});

    const fetch_chain_status = async () => {
        try {
            // Check if chain is running
            let response = await fetch(APIEndpoints.EC2 + "/api/chain-status/?chain_name=" + chain_name + "&network_type=" + network_type);
            setChain_status(await response.json());

        } catch (err) {
            setChain_status({ "status": "failed" });

        }
    }

    useEffect(() => { fetch_chain_status(); }, []);

    return (
        <div id="chain_page_main">
            <div id="page_name">
                Blockchain Network - <div id="chain_page_name">{chain_name.split("-")[0].toUpperCase()}</div>
            </div>
            <div id="chain_page">
                <div>
                { (chain_status.status === "success" ? 
                    <div id="chain_page_column">
                        <UserInteraction chain_name={chain_name} network_type={network_type} />
                        <div id="chain_data">
                            <ChainBlockData chain_name={chain_name} network_type={network_type} />
                            <ChainTransactionData chain_name={chain_name} network_type={network_type} />
                        </div>
                    </div> : <ChainNotFound />) }
                </div>
            </div>
        </div>
    )
}

export default ChainPage