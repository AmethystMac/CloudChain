import { Link } from "react-router-dom"

import "./Home.css";

const Main = () => {
    return (
        <div>
            <div id="home_nav">
                <div id="logo">CloudChain</div>
                <div id="link_div">
                    <div id="norm_link_div">
                        <Link to="/about" className="link"><div className="link_box">About</div></Link>
                    </div>
                    <div className="box_link_div">
                        <Link to="/login" className="link"><div className="link_box">Login</div></Link>
                        <Link to="/register" className="link"><div className="link_box">Join</div></Link>
                    </div>
                </div>
            </div>
            <div id="home_page">
                <div id="page_text">
                    Empowering your business with<br/>
                    secure and decentralized solutions.
                </div>
                <div className="box_link_div">
                    <Link to="/register" className="link"><div className="link_box">Get Started</div></Link>
                </div>
            </div>
        </div>
    )
}

export default Main