import './dropdown.css';
import { ImProfile } from "react-icons/im";
import { MdLogout } from "react-icons/md";
import { CiSettings } from "react-icons/ci";
function DropDown () {
    return(
        <div>
            <div className="user-drop-list">
                <ul className="user-profile-list">
                    <span className="user-profile-list-span">
                        <ImProfile className="user-drop-list-icon" />    
                        <li className="drop-list-list">Profile</li>
                    </span>
                    <span className="user-profile-list-span">
                        <CiSettings className="user-drop-list-icon" />
                        <li className ="drop-list-list">Setting</li>
                    </span>
                    <span className="user-profile-list-span">
                        <MdLogout className="user-drop-list-icon" />
                        <li className ="drop-list-list">Logout</li>
                    </span>
                </ul>
            </div>  
        </div>
    )
}
export default DropDown;
