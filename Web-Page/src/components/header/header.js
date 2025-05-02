import './header.css';
import Logo from './Logo.png';
import { useNavigate } from 'react-router-dom';
import { CiSearch } from 'react-icons/ci';
import { FaRegUser } from 'react-icons/fa';
import { FaRegHeart } from 'react-icons/fa6';
import { FaRegBell } from 'react-icons/fa';
import { FaRegEdit } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useContext, useState } from 'react';
import DropDown from '../dropdown/UserDropDown/dropdown.js';
import ProductDropDown from '../dropdown/ProductDropDown/ProductDropDown.js';
import StateContext from '../../context/context.context.js';

function Header() {
    const [openProfile, setOpenProfile] = useState(false);
    const navigate = useNavigate();
    const [state, dispatchState] = useContext(StateContext);
    const handleNavigate = (e) => {
        const navPath = e.target.innerText.toLowerCase();
        if (navPath === 'home') {
            navigate('/');
        } else if (navPath === 'about us') navigate('/about-us');
        else if (navPath === 'beauty finder') navigate('/beauty-finder');
        else navigate(`/${navPath}`);
    };
    return (
        <div>
            <div className="homepage-bg">
                <div className="header-bar">
                    <div className="header">
                        <div className="left-side">
                            <img src={Logo} alt="Logo" className="logo" />
                        </div>
                        <div className="search">
                            <input
                                className="search-text"
                                placeholder="Searching for product,review or ingredient..."
                            ></input>
                            <CiSearch className="search-icon" />
                        </div>

                        <div className="right-side">
                            <FaRegEdit className="review-icon" onClick={() => navigate('/create-review')} />
                            <FaRegHeart className="like-icon" />
                            <FaRegBell className="notice-icon" />
                            <div
                                onMouseEnter={(e) => {
                                    setOpenProfile(true);
                                }}
                                onMouseLeave={(e) => {
                                    setTimeout(() => {
                                        setOpenProfile(false);
                                    }, 2000);
                                }}
                            >
                                <FaRegUser className="user-icon" />
                                {openProfile && <DropDown />}
                            </div>
                        </div>
                    </div>

                    {/* Open profile drop down */}

                    <div className="nav-bar">
                        <ul className="nav-bar-ul">
                            <li onClick={handleNavigate} className="nav-bar-header">
                                Home
                            </li>
                            <li onClick={handleNavigate} className="nav-bar-header">
                                News
                            </li>

                            <li className="nav-bar-header product">
                                <span onClick={handleNavigate}>Products</span>
                                <ProductDropDown />
                            </li>
                            <li onClick={handleNavigate} className="nav-bar-header">
                                Reviews
                            </li>
                            <li onClick={handleNavigate} className="nav-bar-header">
                                Recommendations
                            </li>

                            <li onClick={handleNavigate} className="nav-bar-header">
                                Ingredients
                            </li>
                            <li onClick={handleNavigate} className="nav-bar-header">
                                Community
                            </li>
                            <li onClick={handleNavigate} className="nav-bar-header">
                                Beauty Finder
                            </li>
                            <li onClick={handleNavigate} className="nav-bar-header">
                                About us
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Header;
