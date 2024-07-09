import './profile.css';
import SubHeader from '../../../components/subHeader/subHeader';
import ProfileSidebar from '../../../components/sidebar/profile-sidebar/profileSidebar';
import { RxAvatar } from "react-icons/rx";

function Profile() {
    return (
        <div>
            <SubHeader />
            <div className="profile-wrap">
            <ProfileSidebar />
            <div className="profile-content-wrap">
                <div className="profile-content">
                   <div className="user-profile">
                    <div className="avatar">
                    <label htmlFor="profileImageUpload" >
                        <img className="profile-img"
                        src={'https://t3.ftcdn.net/jpg/02/09/37/00/360_F_209370065_JLXhrc5inEmGl52SyvSPeVB23hB6IjrR.jpg'}
                        alt="Profile"
                        />
                    </label>
                    </div>
                    <div className="profile-name">  
                    </div> 
                    </div>
                

                </div>
            </div>
            </div>
            
            
        </div>
    )
}
export default Profile;