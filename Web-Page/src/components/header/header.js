import './header.css';
import Logo from './Logo.png';
import { useNavigate } from 'react-router-dom';
import { CiSearch } from "react-icons/ci";
import { FaRegUser } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa6";
import { FaRegBell } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState} from 'react';
import DropDown from '../dropdown/UserDropDown/dropdown.js';
import ProductDropDown from '../dropdown/ProductDropDown/ProductDropDown.js';

function Header() {
const [openProfile, setOpenProfile] = useState(false);
const navigate = useNavigate();
const handleNavigation = (path) => {
    navigate(path);
};

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
                    <FaRegEdit className="review-icon" /> 
                    {/* <FaRegEdit className="review-icon" onClick={handleNavigation('/create-review')}/> */}
                    <FaRegHeart className="like-icon" />
                    <FaRegBell className="notice-icon" />
                    <div onMouseEnter={e=>{setOpenProfile(true)}} onMouseLeave={e=>{
                        setTimeout(()=>
                    {
                        setOpenProfile(false)
                    },2000)
                         }}>
                    <FaRegUser className="user-icon"  />
                    {
               openProfile && <DropDown /> 
            }
                    </div>
                    
                    
                </div>
            </div>
            
            {/* Open profile drop down */}
            
            
                
            <div className="nav-bar">
                <ul className ="nav-bar-ul">
                    <li className="nav-bar-header"><a 
                    href="/">Home</a></li>
                    <li className="nav-bar-header"><a 
                    href="/news">News</a></li>
                    <li className="nav-bar-header"><a 
                    href="/products">Products</a></li>
                    <li className="nav-bar-header"><a 
                    href="/reviews">Reviews</a></li>
                    <li className="nav-bar-header"><a 
                    href="/recommendations">Recommendations</a></li>
                    <li className="nav-bar-header"><a 
                    href="/comparison">Comparison</a></li>
                    <li className="nav-bar-header"><a 
                    href="/ingredients">Ingredients</a></li>
                    <li className="nav-bar-header"><a 
                    href="/about-us">About us</a></li>
                </ul>
            </div>
            </div>
            
            <ProductDropDown />

            
        </div>
    </div>
);
}
export default Header;