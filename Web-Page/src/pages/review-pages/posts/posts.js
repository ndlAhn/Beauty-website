import './posts.css';
import SubHeader from '../../../components/subHeader/subHeader';
import ReviewSidebar from '../../../components/sidebar/review-sidebar/reviewSidebar';
function Posts() {
    return(
        <div>
        <SubHeader/>
        <div className="review-post-wrap">
        <ReviewSidebar />
            <div className="profile-content-wrap">
                <div className="profile-content">
                    <h3>Manage your posts</h3>
                    <div className="posts-menu">
                        <p>Content</p>
                        <p>Manage</p>
                        <p>Post date</p>
                    </div>
                    <div className="all-posts">
                        <div className="posts-first-post">
                        <div className="posts-picture">
                            <p>Post picture</p>
                        </div>
                        <div className="posts-content">
                            <h4>Post title</h4>
                            <p>Desription</p>
                        </div>
                    </div>
                    </div>
                    

                </div>
            </div>
            
        </div>
        </div>
    )
}
export default Posts;