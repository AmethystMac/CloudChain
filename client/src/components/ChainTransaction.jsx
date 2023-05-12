import "./ChainBlock.css";

const ChainTransaction = (props) => {
    const { from, to, value } = props;

    return (
        <div className="block">
            <div className="block_field">
                <div className="block_field_box">Value</div>{value}
            </div>
            <div className="elements_separator">
                <div className="block_field">
                    <div className="block_field_box">From</div>{from}
                </div>
                <div className="block_field">
                    <div className="block_field_box">To</div>{to}
                </div>
            </div>
        </div>
    )
}

export default ChainTransaction