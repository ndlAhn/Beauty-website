import './recommendations.css';
import { FiFilter } from "react-icons/fi";
import { FaRegHeart } from "react-icons/fa";
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
function Recommendations() {
    return(
        <div>
            <Header />
            <div className='news-wrap'>
                <div className='new-content-wrap'>
                    <div className='news-filter-wrap'>
                        <div className="news-filter-content">
                        <FiFilter className='news-filter' />
                        </div>
                    </div>
                    <h3>Recommendation</h3>
                    <div className="home-news-content">
                        <p className='products-descript'>Welcome to Beauty Insight's skincare product recommendations!
                        Our Website curate a selection of the best products tailored to your skin type and concerns. 
                        Whether you need hydration, anti-aging solutions, acne treatments, or daily essentials, we've got you covered.
                        Explore top-rated cleansers, moisturizers, serums, and more, all backed by expert reviews and user feedback. 
                        Achieve your best skin with our personalized recommendations and discover the perfect products to enhance your skincare routine.
                        </p>
                        
                    </div>
                    
                    
                </div>
                
            </div>
            <Footer />
        </div>
    )
}

export default Recommendations;