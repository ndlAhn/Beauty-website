import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login/login';
import Register from './pages/register/register';
import Survey from './pages/survey/survey';
import News from './pages/news/news';
import Homepage from './pages/home/homepage';
import AboutUs from './pages/about-us/aboutUs';
import Review from './pages/reviews/review';
import CreateReview from './pages/create-review/createReview';
function App() {

  
    return(
    <Router>
      <Routes>
        <Route path="/create-review" element={<CreateReview />} />
        <Route path="/" element={<Homepage />} />
        <Route path="/log-in" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/survey" element={<Survey />} />
        <Route path="/news" element={<News />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/reviews" element = {<Review />} />
      </Routes>
    </Router>
    )
  
}



export default App;
