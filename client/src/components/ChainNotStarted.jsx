import { useNavigate, useLocation } from "react-router-dom";

import APIEndpoints from "../data/APIEndpoints.json";
import useChainStatus from "../hooks/useChainStatus";
import "./ChainNotStarted.css";

const ChainNotStarted = (props) => {
    const { chain_name, network_type, owner } = props;

    const navigate = useNavigate();
    const location = useLocation();

    const [chain_status, setChain_status] = useChainStatus();

    const start_chain_service = async () => {
        try {
            await fetch(APIEndpoints.Blockchain + "/api/chain-start-service/?chain_name=" + chain_name.split('-')[0] + "&network_type=" + network_type + "&username=" + chain_name.split('-')[1]);
            setChain_status({ "status": "success" });

        } catch (err) {
            console.log(err);

        }
    };

    return (
        <div className="error">
            <div className="error_sections error_heading">
                Blockchain Service Currently <span className="error_text">Unavailable</span>
            </div>

            { 
                owner ? 
                <div className="error_body start_chain">
                    <button onClick={() => { start_chain_service() }} className="error_start_btn"> Click here </button>
                    to start the blockchain service
                </div> :
            
                <div className="error_body">
                    We regret to inform you that the blockchain service is currently in a stopped state.
                    During this time, access to blockchain features and functionalities will be temporarily suspended.
                    If you believe this is a mistake or have any concerns, please contact the person responsible for running the blockchain.
                    They will be able to provide you with further information and updates regarding the status of the service.
                    Thank you for your cooperation."
                </div> 
            }

            <div className="error_sections">
                For further inquiries or assistance, please feel free to <span className="error_text">contact our support team</span>
            </div>
        </div>
    )
}

export default ChainNotStarted