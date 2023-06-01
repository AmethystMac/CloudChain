import { createContext, useState } from "react";

const ChainStatusContext = createContext();

export const ChainStatusProvider = ({ children }) => {
    const [chain_status, setChain_status] = useState({});

    return (
        <ChainStatusContext.Provider value={[ chain_status, setChain_status ]}>
            {children}
        </ChainStatusContext.Provider>
    )
}

export default ChainStatusContext