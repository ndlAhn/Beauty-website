import './posts.css';
import SubHeader from '../../../components/subHeader/subHeader';
import ReviewSidebar from '../../../components/sidebar/review-sidebar/reviewSidebar';
import { MdDeleteOutline } from "react-icons/md";
import { IoIosSearch } from "react-icons/io";
import { FiFilter } from "react-icons/fi";
import { MdEdit } from "react-icons/md";

function Posts() {
    return(
        <div>
        <SubHeader/>
        <div className="review-post-wrap">
        <ReviewSidebar />
            <div className="profile-content-wrap">
                
                <div className="profile-content">
                    <h3>Manage your posts</h3>
                    <div className="posts-search-filter">
                        <div className="posts-search-area">
                        <input className="posts-search" placeholder="Find post..."></input>
                        
                        <IoIosSearch className="posts-search-icon" />
                        </div>
                        <FiFilter className="posts-filter" />
                        
                    </div>
                    
                    <div className="posts-menu">
                        <p>Content</p>
                        <p>Manage</p>
                        <p>Post date</p>
                    </div>
                
                    {/* <div className="all-posts">
                        <div className="posts-first-post">
                        <div className="posts-picture">
                            <p>Post picture</p>
                        </div>
                        <div className="posts-content">
                            <h4>Post title</h4>
                            <p>Desription</p>
                        </div>
                        </div>
                        <div className="post-manage">
                            <MdDeleteOutline />
                        </div>
                        <div className="post-date">
                            <p>dd/mm/yyyy</p>
                        </div>
                    

                    </div> */}
                    <div className="post-row">
                        <div className="posts-first-post">
                            <div className="post-picture">
                            Post picture
                            </div>
                            <div className="post-content">
                            <div className="post-title">Post title</div>
                            <div className="post-description">Description</div>
                            </div>
                        </div>
                        
                        <div className="post-manage">
                            <MdEdit  className="edit-icon" />
                            <MdDeleteOutline className="trashcan" />
                        </div>
                        <div className="post-date">
                        <span>dd/mm/yyyy</span>
                        </div>
                    </div>

                </div>
            </div>
            
        </div>
        </div>
    )
}
export default Posts;