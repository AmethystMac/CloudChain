import { useState, useEffect } from "react";

import BlockchainCard from "./BlockchainCard";
import BlockchainCardPlus from "./BlockchainCardPlus";
import APIEndpoints from "../data/APIEndpoints.json";
import "./PrivateChainList.css"

const UserChainList = () => {
    const [chain_list, setChain_list] = useState([]);

    // Fetch the chain list from EC2 instance
    const check_user = async () => {
        try {
            let response = await fetch("/api/current-user");
            let fetched_data = await response.json();

            if(fetched_data.status === "success") {

                // Fetching the chains owned by the user
                let response = await fetch(APIEndpoints.Blockchain + "/api/chain-list/?type=user&user=" + fetched_data.response);
                setChain_list(await response.json());
            
            } else {
                console.log("Err: Cannot fetch UserChainList");

            }
            
        } catch (err) {
            console.log(err);
        }
    }

    // Running the fetch for first time loading
    useEffect(() => { check_user(); }, [])

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
                <div className="chain_network">YOUR BLOCKCHAINS</div>
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

export default UserChainList;