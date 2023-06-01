import { useState, useEffect } from "react";

import BlockchainCard from "./BlockchainCard";
import BlockchainCardPlus from "./BlockchainCardPlus";
import APIEndpoints from "../data/APIEndpoints.json";
import "./PrivateChainList.css"

const PrivateChainList = () => {
    const [chain_list, setChain_list] = useState([]);
    
    // To fetch the chain list from EC2 instance
    const fetch_chains = async () => {
        try {
            const response = await fetch(APIEndpoints.Blockchain + "/api/chain-list/?type=private");
            setChain_list(await response.json());
        } catch (err) {
            console.log(err);
        }
    }

    // Running the fetch for first time loading
    useEffect(() => { fetch_chains(); }, [])

    // Handling the scrolling effect
    const [scrollPosition, setScrollPosition] = useState(0);

    const handleScrollLeft = () => {
        if(scrollPosition)
            setScrollPosition(scrollPosition - 110);
    };
  
    const handleScrollRight = () => {
        if(scrollPosition <= 110 * (chain_list.length - 1))
            setScrollPosition(scrollPosition + 110);
    };

    return (
        <div className="chain_list">
            <div className="name_button_separator">
                <div className="chain_network">PRIVATE BLOCKCHAINS</div>
                <div className="chain_buttons">
                    <button type="button" onClick={handleScrollLeft} className="scroll_btn"> {"<"} </button>
                    <button type="button" onClick={handleScrollRight} className="scroll_btn"> {">"} </button>
                </div>
            </div>
            <div id="items" style={{ transform: `translateX(-${scrollPosition}px)` }}>
                { chain_list.map((item, key) =>
                    <BlockchainCard {...item} key={key}/>
                ) }
                { <BlockchainCardPlus /> }
            </div>
        </div>
    )
}; 

export default PrivateChainList;