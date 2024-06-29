import './header.css';
import Logo from './Logo.png';
import { CiSearch } from "react-icons/ci";
import { FaRegUser } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa6";
import { FaRegBell } from "react-icons/fa";
import 'bootstrap/dist/css/bootstrap.min.css';
import { IoIosCreate } from "react-icons/io";
import { useState} from 'react';
import DropDown from '../dropdown/UserDropDown/dropdown.js';
import ProductDropDown from '../dropdown/ProductDropDown/ProductDropDown.js';
function Header() {
const [openProfile, setOpenProfile] = useState(false);

    return (
        <div>
        <div className="homepage-bg">

            <div className="header-bar">
                <div className="header">
                <div className="left-side">
                    <img src ={Logo} alt="Logo" className="logo" />
                </div>
                <div className="search">
                    <input className ="search-text" placeholder="Searching for product,review or ingredient..."></input>
                    <CiSearch className="search-icon" />
                </div>        
                
                <div className ="right-side">
                    <IoIosCreate className="review-icon" />
                    <FaRegHeart className="like-icon" />
                    <FaRegBell className="notice-icon" />
                    <div>
                    <FaRegUser className="user-icon" onClick={()=> setOpenProfile
                    ((prev) => !prev)} />
                    </div>
                    
                    
                </div>
            </div>
            
            {/* Open profile drop down */}
            {
               openProfile && <DropDown /> 
            }
            
                
            <div className="nav-bar">
                <ul className ="nav-bar-ul">
                    <li className="nav-bar-header"><a href="#home">Home</a></li>
                    <li className="nav-bar-header"><a href="#news">News</a></li>
                    <li className="nav-bar-header"><a href="#products">Products</a></li>
                    <li className="nav-bar-header"><a href="#reviews">Reviews</a></li>
                    <li className="nav-bar-header"><a href="#recommendations">Recommendations</a></li>
                    <li className="nav-bar-header"><a href="#comparison">Comparison</a></li>
                    <li className="nav-bar-header"><a href="#ingredients">Ingredients</a></li>
                    <li className="nav-bar-header"><a href="#about-us">About us</a></li>
                </ul>
            </div>
            </div>
            
            <ProductDropDown />

        </div>
    </div>
);
}
export default Header;