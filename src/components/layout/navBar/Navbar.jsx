import { GiHamburgerMenu } from "react-icons/gi";
import { TbUserCircle } from "react-icons/tb";
import { RiMoreFill } from "react-icons/ri";

import "./Navbar.css";

function Navbar({ toggleSidebar }) {


    return (
        <>
            <div className="navbar h-100">
                <div className="hamburger" onClick={toggleSidebar}>
                    <GiHamburgerMenu color="#fff" size="30px" />
                </div>
                <div className="px-2 rounded" style={{backgroundColor: "#EDC043"}}>
                    <div className="fs-5 fw-semibold">AIRAVAT HOSPITAL</div>
                </div>
                <div className="user-profile">
                    {/* <div className="side-line">
                    </div>
                    <div className="icon">
                        <TbUserCircle className="user-icon" />
                    </div>
                    <div className="details">
                        <p className="user-name">Username</p>
                        <p className="user-id">User id</p>
                    </div>
                    <div className="more">
                        <div>
                            <RiMoreFill className="more-icon" />
                        </div>
                    </div> */}
                    
                       <div className="more">
                        <div>
                            <RiMoreFill className="more-icon" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;