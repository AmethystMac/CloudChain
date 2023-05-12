import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./BlockchainCard.css"

const BlockchainCard = (props) => {
    const { chain_name, network_type, user } = props;
    const navigate = useNavigate();

    const chain_info = () => {
        navigate("./chain/" + network_type + `/${chain_name}-${user}`);
    }

    return (    
        <button className="card" onClick={chain_info}>
            <div className="card_text">{chain_name}</div>
        </button>
    )
}

export default BlockchainCard