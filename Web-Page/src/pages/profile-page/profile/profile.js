import './profile.css';
import SubHeader from '../../../components/subHeader/subHeader';
import ProfileSidebar from '../../../components/sidebar/profile-sidebar/profileSidebar';
import { useContext, useEffect, useState } from 'react';
import StateContext from '../../../context/context.context';
import instance from '../../../axios/instance';
import { BiEditAlt } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

function formatDate(isoString) {
    const date = new Date(isoString);

    const options = { year: 'numeric', month: 'short', day: '2-digit' };
    return date.toLocaleDateString('en-US', options).replace(',', '');
}

function Profile() {
    const test = {};
    const [state, dispatchState] = useContext(StateContext);

    const [reviews, setReviews] = useState([]);
    const cloudName = 'dppaihihm';
    const navigate = useNavigate();
    useEffect(() => {
        console.log(state);
        instance
            .post('/get-review-by-user-id', { user_id: state.userData.userId })
            .then((res) => {
                console.log(res.data);
                setReviews(res.data);
            })
            .catch((err) => console.log(err));
    }, []);
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
                            {reviews?.map((item, index) => (
                                <div
                                    className="home-news"
                                    key={index}
                                    onClick={() => navigate(`/review-detail/${item.review_id}`)}
                                >
                                    <div className="home-new-picture">
                                        <img
                                            className="review-poster"
                                            src={`https://res.cloudinary.com/${cloudName}/image/upload/${item.img_path}.jpg`}
                                        />
                                    </div>
                                    <p className="home-new-title">{item.title}</p>
                                    <p className="home-review-title">Reviewer: {item.name} </p>
                                    <p className="home-review-title">Post date: {formatDate(item.createdAt)} </p>
                                </div>
                            ))}
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
