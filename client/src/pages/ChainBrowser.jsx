import PrivateChainList from "../components/PrivateChainList"
import PublicChainList from "../components/PublicChainList"
import UserChainList from "../components/UserChainList"

import "./ChainBrowser.css"

const BlockchainBrowser = () => {
    return (
        <div id="browser_page_main">
            <div className="browser_page">
                <div className="browser_name">
                    Blockchain Console
                </div>
                <div id="chains_render">
                    <div className="chain" id="public_chain">
                        <PublicChainList />
                    </div>
                    <div className="chain" id="private_chain">
                        <PrivateChainList />
                    </div>
                    <div className="chain" id="your_chain">
                        <UserChainList />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default BlockchainBrowser