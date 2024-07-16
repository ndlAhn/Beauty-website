import './comments.css';
import SubHeader from '../../../components/subHeader/subHeader';
import ReviewSidebar from '../../../components/sidebar/review-sidebar/reviewSidebar';
import { IoIosSearch } from "react-icons/io";
import { FiFilter } from "react-icons/fi";
function Comments() {
    return(
        <div>
        <SubHeader/>
        <div className="review-post-wrap">
        <ReviewSidebar />
            <div className="profile-content-wrap">
                
                <div className="profile-content">
                <h3>Manage comments</h3>
                <div className="comments-search-filter">
                        <div className="comments-search-area">
                        <input className="comments-search" placeholder="Find comments"></input>
                        <IoIosSearch className="comments-search-icon" />
                        </div>
                        <FiFilter className="comments-filter" />
                        
                </div>
                <div className="posts-menu">
                        <p>Comment</p>
                        <p>Creator</p>
                        <p>Comment date</p>
                </div>
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
                            <p>Creator's name</p>
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
export default Comments;