import './reviewSidebar.css';
import { AiOutlineHome } from 'react-icons/ai';
import { TbLayoutNavbar } from 'react-icons/tb';
import { FaRegCommentDots } from 'react-icons/fa6';
import { RiProfileLine } from 'react-icons/ri';
import { MdOutlineSettings } from 'react-icons/md';
import { FaRegHeart } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { GrAddCircle } from 'react-icons/gr';
import { IoWaterOutline } from 'react-icons/io5';
import { useContext } from 'react';
import StateContext from '../../../context/context.context';

function ReviewSidebar() {
    const [state, dispatchState] = useContext(StateContext);
    return (
        <div className="review-sidebar">
            <Link to={'/create-review'} className="review-sidebar-btn">
                WRITE REVIEW
            </Link>
            <hr style={{ color: 'var(--text-color-blue)' }} />
            <nav className="review-sidebar-nav">
                <ul>
                    <li>
                        <AiOutlineHome className="sidebar-icon" />
                        <Link to="/" className="sidebar-link">
                            Home
                        </Link>
                    </li>
                    
                    {state.userData?.role === 'admin' && (
                        <li>
                            <GrAddCircle className="sidebar-icon" />
                            <Link to="/create-product" className="sidebar-link">
                                New product
                            </Link>
                        </li>
                    )}

                    {/*  */}

                    {state.userData?.role === 'admin' && (
                        <li>
                            <GrAddCircle className="sidebar-icon" />
                            <Link to="/create-incredient" className="sidebar-link">
                                New incredient
                            </Link>
                        </li>
                    )}
                    <li>
                        <TbLayoutNavbar className="sidebar-icon" />
                        <Link to="/posts" className="sidebar-link">
                            Your Post
                        </Link>
                    </li>
                    {state.userData?.role === 'admin' && (
                    <li>
                        <TbLayoutNavbar className="sidebar-icon" />
                        <Link to="/manage-product" className="sidebar-link">
                            Your Product
                        </Link>
                    </li>
                    )}
                    <li>
                        <TbLayoutNavbar className="sidebar-icon" />
                        <Link to="/manage-review" className="sidebar-link">
                            Your Review
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
        // <div className="sidebar-wrap">
        //     <div className="sidebar">
        //     <button className="sidebar-btn" disabled>WRITE REVIEW</button>
        //     <hr style={{color: "var(--text-color-blue)"}} />
        //         <div className="sidebar-item">
        //             <span>
        //                 <AiOutlineHome className="sidebar-icon"/>
        //                 <a href="/" >Home</a>
        //             </span>
        //             <span>
        //                 <RiProfileLine className="sidebar-icon"/>
        //                 <Link to="/profile" >Profile</Link>
        //             </span>
        //             <span>
        //                 <MdOutlineSettings className="sidebar-icon"/>
        //                 <a href="#" >Personal information</a>
        //             </span>
        //             <span>
        //                 <TbLayoutNavbar className="sidebar-icon" />
        //                 <a href="#" >Post</a>
        //             </span>
        //             <span>
        //                 <FaRegCommentDots className="sidebar-icon" />
        //                 <a href="#" >Comment</a>
        //             </span>
        //             <span>
        //                 <FaRegHeart className="sidebar-icon" />
        //                 <a href="#" >Liked posts</a>
        //             </span>
        //             <span>
        //                 <FaRegHeart className="sidebar-icon" />
        //                 <a href="#" >Liked products</a>
        //             </span>

        //         </div>
        //     </div>
        // </div>
    );
}
export default ReviewSidebar;
