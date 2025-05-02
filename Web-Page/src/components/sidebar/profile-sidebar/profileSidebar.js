import './profileSidebar.css';
import { AiOutlineHome } from 'react-icons/ai';
import { RiProfileLine } from 'react-icons/ri';
import { MdOutlineSettings } from 'react-icons/md';
import { FaRegHeart } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

function ProfileSidebar() {
    return (
        <div className="review-sidebar">
            <nav className="review-sidebar-nav">
                <ul>
                    <li>
                        <AiOutlineHome className="profile-sidebar-icon" />
                        <Link to="/" className="sidebar-link">
                            Home
                        </Link>
                    </li>
                    <li>
                        <RiProfileLine className="profile-sidebar-icon" />
                        <Link to="/profile" className="sidebar-link">
                            Profile
                        </Link>
                    </li>
                    <li>
                    <MdOutlineSettings className="pi-icon"/>
                    <Link to="/personal-information" className="sidebar-link">Personal information</Link>
                </li>
                    <li>
                        <FaRegHeart className="post-icon" />
                        <Link to="/liked-posts" className="sidebar-link">
                            Liked posts
                        </Link>
                    </li>
                    <li>
                        <FaRegHeart className="profile-sidebar-icon" />
                        <Link to="/Liked-products" className="sidebar-link">
                            Liked products
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}
export default ProfileSidebar;
