import './sidebar.css';
import { AiOutlineHome } from "react-icons/ai";
import { TbLayoutNavbar } from "react-icons/tb";
import { FaRegCommentDots } from "react-icons/fa6";


function Sidebar () {
    return(
        <div className="sidebar-wrap">   
            <div className="sidebar">
            <button className="sidebar-btn" disabled>WRITE REVIEW</button>
            <hr style={{color: "var(--text-color-blue)"}} />
                <div className="sidebar-item">
                    <span>
                        <AiOutlineHome className="sidebar-icon"/>
                        <a href="/" >Home</a>
                    </span>
                    <span>
                        <TbLayoutNavbar className="sidebar-icon" />
                        <a href="#" >Post</a>
                    </span>
                    <span>
                        <FaRegCommentDots className="sidebar-icon" />
                        <a href="#" >Comment</a>
                    </span>
                    
                </div>
            </div>
        </div>
    );
}
export default Sidebar;