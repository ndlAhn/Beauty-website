import './profileSidebar.css';
import { AiOutlineHome } from "react-icons/ai";
import { RiProfileLine } from "react-icons/ri";
import { MdOutlineSettings } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa6";
import { Link } from 'react-router-dom';



function ProfileSidebar () {
    return(
        <div className="sidebar-wrap">   
            <div className="profile-sidebar">
                <div className="profile-sidebar-item">
                    <span>
                        <AiOutlineHome className="sidebar-icon"/>
                        <a href="/" >Home</a>
                    </span>
                    <span>
                        <RiProfileLine className="sidebar-icon"/>
                        <a href="/profile" >Profile</a>
                    </span>
                    <span>
                        <MdOutlineSettings className="sidebar-icon"/>
                        <a href="#" >Personal information</a>
                    </span>
                    <span>
                        <FaRegHeart className="sidebar-icon" />
                        <a href="#" >Liked posts</a>
                    </span>
                    <span>
                        <FaRegHeart className="sidebar-icon" />
                        <a href="#" >Liked products</a>
                    </span>

                    
                </div>
            </div>
        </div>
    )
}
export default ProfileSidebar;