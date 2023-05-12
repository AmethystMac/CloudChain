import { useEffect, useState } from "react"

import ChainBlock from "./ChainBlock";
import APIEndpoints from "../data/APIEndpoints.json";
import "./ChainBlockData.css";

const ChainBlockData = (props) => {
    const { chain_name, network_type } = props;

    const [chain_blocks, setChain_blocks] = useState([]);

    const fetch_chain_blocks = async () => {
        try {
            let response = await fetch(APIEndpoints.EC2 + "/api/chain/get-blocks/?chain_name=" + chain_name + "&network_type=" + network_type);
            let fetched_data = await response.json();
            setChain_blocks(fetched_data.response);

        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => { fetch_chain_blocks(); }, []);

    return (
        <div id ="block_data">
            Latest Blocks
            <hr className="separator_line" />
            { chain_blocks.map((block, key) => 
                <div key={key}>
                    <ChainBlock {...block} />
                    { (key < chain_blocks.length - 1 && <hr />) }
                </div>
            )}
        </div>
    )
}

export default ChainBlockData