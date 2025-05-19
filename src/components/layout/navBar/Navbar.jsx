import { GiHamburgerMenu } from "react-icons/gi";

import "./Navbar.css";

function Navbar({ toggleSidebar }) {


    return (
        <>
            <div className="navbar h-100">
                <div className="hamburger" onClick={toggleSidebar}>
                    <GiHamburgerMenu color="#fff" size="30px" />
                </div>
                <div className="px-2 rounded">
                    <div className="fs-4 fw-semibold">AIRAVAT HOSPITAL</div>
                </div>
            </div>
        </>
    );
};

export default Navbar;