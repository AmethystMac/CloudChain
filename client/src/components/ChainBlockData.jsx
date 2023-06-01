import { useEffect, useState } from "react"

import ChainBlock from "./ChainBlock";
import useShowBlock from "../hooks/useShowBlock";
import APIEndpoints from "../data/APIEndpoints.json";
import "./ChainBlockData.css";
import BlockInfo from "./BlockInfo";

const ChainBlockData = (props) => {
    const { chain_name, network_type } = props;

    const [chain_blocks, setChain_blocks] = useState([]);
    const [show_block, setShow_block, block_number, setBlock_number] = useShowBlock();

    const fetch_chain_blocks = async () => {
        try {
            let response = await fetch(APIEndpoints.Blockchain + "/api/chain/get-blocks/?chain_name=" + chain_name + "&network_type=" + network_type);
            let fetched_data = await response.json();
            setChain_blocks(fetched_data.response);

        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => { fetch_chain_blocks(); }, []);
    console.log(chain_blocks);

    return (
        <div id ="block_data">
            { show_block ? 
                <BlockInfo { ...chain_blocks[block_number]}></BlockInfo> :
                <div>
                    Latest Blocks
                    <hr className="separator_line" />
                    { chain_blocks.map((block, key) => 
                        <div key={key}>
                            <ChainBlock {...block} keyValue={key} />
                            { (key < chain_blocks.length - 1 && <hr />) }
                        </div>
                    )}
                </div>
            }
        </div>
    )
}

export default ChainBlockData