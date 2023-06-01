import { createContext, useState } from "react";

const ShowBlockContext = createContext();

export const ShowBlockProvider = ({ children }) => {
    const [chain_status, setChain_status] = useState(false);
    const [block_number, setBlock_number] = useState(0);

    return (
        <ShowBlockContext.Provider value={[ chain_status, setChain_status, block_number, setBlock_number]}>
            {children}
        </ShowBlockContext.Provider>
    )
}

export default ShowBlockContext