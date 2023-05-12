import "./ChainBlock.css";

const ChainBlock = (props) => {
    const { number, hash, difficulty } = props;

    return (
        <div className="block">
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
        </div>
    )
}

export default ChainBlock
