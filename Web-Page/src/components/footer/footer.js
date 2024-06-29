import './footer.css';
import { FaFacebookSquare } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { AiFillTikTok } from "react-icons/ai";
import { SiZalo } from "react-icons/si";
import { IoMdSend } from "react-icons/io";

function Footer() {
    return(
    <footer className="footer">
    <div className="footer-contact">
        <h5>CONTACT INFORMATION</h5>
        <p><strong>Name:</strong> Nguyen Dang Lan Anh</p>
        <p><strong>Contact Number:</strong> (+84) xxx-xxx-xxx</p>
        <p><strong>Email:</strong> ndlanh225@gmail.com</p>
    </div>
    <div className="footer-column">
        <h5>CATEGORY</h5>
        <p>Home</p>
        <p>News</p>
        <p>Product information</p>
        <p>Reviews</p>
        <p>Skin care</p>
        <p>Ingredient information</p>
        <p>Brand</p>
        <p>Beauty magazine</p> 
    </div>
    
    <div className="footer-column">
        <h5>ABOUT US</h5>
        <p>Up-to-date beauty trending update</p>
        <p>Reliable information</p>
        <p>Product information</p>
        <p>Product reviews</p>
        <p>Ingredient Search</p>
        <p>Product Comparison</p>
    </div>
    <div className="footer-column">
        <h5>CONTACT US</h5>
        <span className="footer-input-holder">
        <input className ="footer-input" type="email" placeholder="Email" />
        <IoMdSend className="footer-send" />
        </span>

        <div className="social-icons">

            <FaFacebookSquare className="footer-icon" />
            <FaSquareInstagram className="footer-icon" />
            <AiFillTikTok className="footer-icon" />
            <SiZalo className="footer-icon" />

        </div>
    </div>
    </footer>)
}
export default Footer;