import './profile.css';
import SubHeader from '../../../components/subHeader/subHeader';
import ProfileSidebar from '../../../components/sidebar/profile-sidebar/profileSidebar';


function Profile() {
    return (
        <div>
            <SubHeader />
            <div className="profile-wrap">
            <ProfileSidebar />
            <div className="profile-content-wrap">
                <div className="profile-content">
                    <div className="user-profile">     
                    <label htmlFor="profileImageUpload" >
                        <img className="profile-img"
                        src={'https://t3.ftcdn.net/jpg/02/09/37/00/360_F_209370065_JLXhrc5inEmGl52SyvSPeVB23hB6IjrR.jpg'}
                        alt="Profile"
                        />
                    </label>
                    <div className="profile-name">  
                        <label className="profile-username">User Name</label>
                        <button className="edit-btn">Edit profile</button>
                    </div>
                    </div>
                    <div className="post-fler-flwing">
                        <div className="count">
                            <label>0</label>
                            <label>Posts</label>
                        </div>
                        <div className="count">
                            <label>0</label>
                            <label>Followers</label>
                        </div>
                        <div className="count">
                            <label>0</label>
                            <label>Following</label>
                        </div>
                    </div>
                    <div className="story">
                        <label className="story-text">Share story or quote...</label>
                    </div>
                    <hr style={{color: "var(--text-color-blue)"}} />
                    <h4>Recent Posts</h4>
                    <div className="pro5-post">
                        
                        <div className="first-post">
                            
                        </div>
                        <p>Post title</p> 
                        
                        
                    </div>
                    <h4>Liked</h4>
                    <div className ="pro5-like">
                       
                        <div className="first-post">
                            
                        </div>
                        <p>Post title</p>
                    </div>
                </div>
            </div>
            </div>
            
            
        </div>
    )
}
export default Profile;