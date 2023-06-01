import useShowBlock from "../hooks/useShowBlock";
import "./ChainBlock.css";

const ChainBlock = (props) => {
    const { number, hash, difficulty, keyValue } = props;

    const [show_block, setShow_block, block_number, setBlock_number] = useShowBlock();

    const show_block_info = () => {
        setBlock_number(keyValue);
        setShow_block(true);
    }

    return (
        <button type="button" onClick={() => { show_block_info(); }} className="block">
            <div className="block_field">
                <div className="block_field_box">Block</div><div>{number}</div>
            </div>
            <div className="elements_separator">
                <div className="block_field">
                    <div className="block_field_box">Hash</div><div className="label_wrap">{hash}</div>
                </div>
                <div className="block_field">
                    <div className="block_field_box">Mining Difficulty</div><div>{difficulty}</div>
                </div>
            </div>
        </button>
    )
}

export default ChainBlock
