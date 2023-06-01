import { useContext } from "react";

import ShowBlockContext from "../contexts/ShowBlockProvider";

const useShowBlock = () => {
    return useContext(ShowBlockContext);
}

export default useShowBlock;