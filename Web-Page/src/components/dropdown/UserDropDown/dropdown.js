import './dropdown.css';
import { ImProfile } from 'react-icons/im';
import { MdLogout } from 'react-icons/md';
import { CiSettings } from 'react-icons/ci';
import { IoIosSettings } from 'react-icons/io';
import { useContext } from 'react';
import StateContext from '../../../context/context.context';
import { loggout } from '../../../context/action.context';
import { useNavigate } from 'react-router-dom';

function DropDown() {
    const navigate = useNavigate();

    const [state, dispatchState] = useContext(StateContext);
    const test = 0;
    return (
        <div>
            <div className="user-drop-list">
                <ul className="user-profile-list">
                    <span onClick={(e) => navigate('/profile')} className="user-profile-list-span">
                        <ImProfile className="user-drop-list-icon" />
                        <li className="drop-list-list">Profile</li>
                    </span>
                    {/* <span className="user-profile-list-span">
                        <IoIosSettings className="user-drop-list-icon" />
                        <li className ="drop-list-list">Setting</li>
                    </span> */}
                    <span
                        className="user-profile-list-span"
                        onClick={(e) => {
                            e.stopPropagation();
                            dispatchState(loggout(''));
                        }}
                    >
                        <MdLogout className="user-drop-list-icon" />
                        <li className="drop-list-list">Logout</li>
                    </span>
                </ul>
            </div>
        </div>
    );
}
export default DropDown;
