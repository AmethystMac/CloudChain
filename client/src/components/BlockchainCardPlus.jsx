import { useNavigate } from "react-router-dom";

const BlockchainCardPlus = () => {
    const navigate = useNavigate();

    const create_chain = () => {
        navigate("./create/chain");
    }

    return (
        <button className="card" onClick={create_chain}>
            <h3>{"+"}</h3>
        </button>
    )
}

export default BlockchainCardPlus