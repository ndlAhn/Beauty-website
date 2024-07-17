import './review.css';
import Header from '../../components/header/header.js';
import Footer from '../../components/footer/footer.js';
import { FiFilter } from "react-icons/fi";
function Review(){
    return ( 
        <div className="review-wrap">
        <Header />
        <div className='news-wrap'>
                <div className='new-content-wrap'>
                <div className='news-filter-wrap'>
                        <div className="news-filter-content">
                        <FiFilter className='news-filter' />
                        </div>
                    </div>
                <div className="home-news-content">
                    <h3>Product reviews</h3>
                    <p className='products-descript'>
                    Discover the best skincare products with reviews from both experts and users at Beauty Insight. 
                    Our community provides in-depth analyses of top-rated products, while real users share their personal
                    experiences and results. Whether you're looking for cleansers, moisturizers, serums, or more,
                    our comprehensive reviews help you make informed decisions. Stay updated with the latest trends and
                    innovations in skincare, and find the perfect products to achieve your healthiest, most radiant skin.
                    </p>
                        <div className="home-news">
                        <div className="home-new-picture">
                            <p>Review's cover</p>
                        </div>
                            <p className="home-new-title">Review's title</p>
                            <p className="home-review-title">Reviewer - Post date</p>
                        </div>
                </div>
                 
                </div>
        </div>
        <Footer />
        </div>
    
    
    )
}
export default Review;