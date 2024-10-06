import './App.css';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Login from './pages/login/login';
import Register from './pages/register/register';
import Survey from './pages/survey/survey';
import News from './pages/news/news';
import Homepage from './pages/home/homepage';
import AboutUs from './pages/about-us/aboutUs';
import Review from './pages/reviews/review';
import CreateReview from './pages/review-pages/create-review/createReview';
import Profile from './pages/profile-page/profile/profile';
import PersonalInfo from './pages/profile-page/personal-information/personalInfo';
import LikedPost from './pages/profile-page/liked-posts/likePost';
import LikedProduct from './pages/profile-page/liked-product/likedProduct';
import Posts from './pages/review-pages/posts/posts';
import CreateProduct from './pages/review-pages/comments/createProduct';
import Ingredients from './pages/ingredients/ingredients';
import Products from './pages/products/products';
import Recommendations from './pages/profile-page/recommendations/recommendations';
import { useContext, useEffect } from 'react';
import StateContext from './context/context.context';

function App() {
    // const [state, dispatchState] = useContext(StateContext);
    // const navigate = useNavigate();
    // useEffect(() => {
    //     if (state.login === false) {
    //         navigate('/log-in');
    //     }
    //     console.log(state);
    // }, [state]);
    return (
        <Routes>
            <Route path="/recommendations" element={<Recommendations />} />
            <Route path="/products" element={<Products />} />
            <Route path="/ingredients" element={<Ingredients />} />
            <Route path="/CreateProduct" element={<CreateProduct />} />
            <Route path="/create-review" element={<CreateReview />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/" element={<Homepage />} />
            <Route path="/log-in" element={<Login />} />
            <Route path="/survey" element={<Survey />} />
            <Route path="/news" element={<News />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/reviews" element={<Review />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/personal-information" element={<PersonalInfo />} />
            <Route path="/liked-posts" element={<LikedPost />} />
            <Route path="/liked-products" element={<LikedProduct />} />
        </Routes>
    );
}

export default App;
