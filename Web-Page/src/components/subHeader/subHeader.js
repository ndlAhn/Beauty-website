import './subHeader.css';
import Logo from './Logo.png';
import { FaRegUserCircle } from "react-icons/fa";

function SubHeader(){
    return(
            <div className="sub-header">
            <div className="left-side">
                    <img src ={Logo} alt="Logo" className="logo" />
            </div>
            <div className="right-side">
                    <FaRegUserCircle className="sub-header-icon" />
            </div>
            </div>

        
    );
}
export default SubHeader;