import useShowBlock from "../hooks/useShowBlock";

const BlockInfo = (props) => {
    const [show_block, setShow_block, block_number, setBlock_number] = useShowBlock();

    const exit_block_info = () => {
        setShow_block(false);
    }

    return (
        <div>
            <div>Block: {props.number}<button type="button" onClick={() => { exit_block_info(); }}>X</button></div>
            {Object.keys(props).map((key) => (
                <div key={key}>
                    {key}: {props[key]}
                </div>
            ))}
        </div>
    )
}
export default BlockInfo