import './likePost.css';
import SubHeader from '../../../components/subHeader/subHeader';
import ProfileSidebar from '../../../components/sidebar/profile-sidebar/profileSidebar';
import { FiFilter } from "react-icons/fi";

function LikedPost() {
    return (
        <div>
            <SubHeader />
            <div className="liked-wrap">
                <ProfileSidebar />
                <div className="liked-content-wrap">
                    <div className="liked-title-filter">
                        <h4>Liked Post</h4>
                        <FiFilter className="filter" />
                    </div>
                    
                    <div className="liked-first-post">
                        <div className="post-picture">
                            <p>Post picture</p>
                        </div>
                        <div className="like-post-content">
                            <h4>Post title</h4>
                            <p>Reviewer: <strong>Review's name</strong></p>
                            <div className="unliked">
                                <button className="liked-unlike-bnt">Unlike</button>
                            </div>
                            
                        </div>
                    </div>
                </div>    
            </div>
            
        </div>
    )
}
export default LikedPost;