import { useEffect, useState } from "react"

import ChainTransaction from "./ChainTransaction";
import APIEndpoints from "../data/APIEndpoints.json";
import "./ChainTransactionData.css";

const ChainTransactionData = (props) => {
    const { chain_name, network_type } = props;

    const [chain_transactions, setChain_transactions] = useState([]);

    const fetch_chain_transactions = async () => {
        try {
            let response = await fetch(APIEndpoints.Blockchain + "/api/chain/get-transactions/?chain_name=" + chain_name + "&network_type=" + network_type);
            let fetched_data = await response.json();
            setChain_transactions(fetched_data.response);

        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => { fetch_chain_transactions(); }, []);

    return (
        <div id ="block_data">
            Latest Transactions
            <hr className="separator_line"></hr>
            { chain_transactions.map((transaction, key) => 
                <div key={key}>
                    <ChainTransaction {...transaction} />
                    { (key < chain_transactions.length - 1 && <hr />) }
                </div>
            )}
        </div>
    )
}

export default ChainTransactionData