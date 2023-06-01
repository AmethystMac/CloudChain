import { useContext } from "react";

import ChainStatusContext from "../contexts/ChainStatusProvider";

const useChainStatus = () => {
    return useContext(ChainStatusContext);
}

export default useChainStatus;