import './profile.css';
import SubHeader from '../../../components/subHeader/subHeader';
import ProfileSidebar from '../../../components/sidebar/profile-sidebar/profileSidebar';
import { useContext, useEffect } from 'react';
import StateContext from '../../../context/context.context';
import instance from '../../../axios/instance';
import { BiEditAlt } from 'react-icons/bi';

function Profile() {
    const test = {};
    const [state, dispatchState] = useContext(StateContext);
    useEffect(() => {
        if (state.login === true) {
            console.log(state);
            instance
                .post('/get-user-product-review', state.userData.userId)
                .then((res) => {
                    console.log(res.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [state]);
    return (
        <div>
            <SubHeader />
            <div className="profile-wrap">
                <ProfileSidebar />
                <div className="profile-content-wrap">
                    <div className="profile-content">
                        <div className="user-profile">
                            <label htmlFor="profileImageUpload">
                                <img
                                    className="profile-img"
                                    src={
                                        'https://t3.ftcdn.net/jpg/02/09/37/00/360_F_209370065_JLXhrc5inEmGl52SyvSPeVB23hB6IjrR.jpg'
                                    }
                                    alt="Profile"
                                />
                            </label>
                            <div className="profile-name">
                                <label className="profile-username">{state.userData?.name}</label>
                                <label className="profile-username">{state.userData?.username}</label>
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
                            <div className="story-text-box">
                                <label className="story-text">Share story or quote...</label>
                            </div>
                            <div className="edit-story-box">
                                <BiEditAlt className="edit-story" />
                            </div>
                        </div>
                        <hr style={{ color: 'var(--text-color-blue)' }} />
                        <h4>Recent Posts</h4>
                        <div className="pro5-post">
                            <div className="first-post"></div>
                            {/* <p>Post title</p> */}
                        </div>
                        <h4>Liked</h4>
                        <div className="pro5-like">
                            <div className="first-post"></div>
                            {/* <p>Post title</p> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Profile;
