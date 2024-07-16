import './news.css';
import Header from '../../components/header/header.js';
import Footer from '../../components/footer/footer.js';
import { FiFilter } from "react-icons/fi";

function News(){
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
                    <div className='news-intro'>
                           <h2>Update new beauty trends with Beauty Insight</h2> 
                           <p>Stay ahead in beauty with <strong>Beauty Insight</strong>! We bring you the latest trends, from innovative skincare routines to makeup techniques that highlight your natural beauty. 
                            Discover the hottest products and must-try trends with our expert advice. Whether it's clean beauty, multi-step skincare, or minimalist makeup, Beauty Insight keeps you in the know. 
                            </p>
                        </div>
                    <div className='news-trends'>
                        <h3>Hot trends</h3>
                        <div class="news-image-area">
                        <div class="news-title">News title 1</div>
                        <div class="news-meta">creator — dd/mm/yyyy</div>
                    </div>
                    <div className="home-new-more">
                        <a href="#" className="home-new-more-text">See all</a>
                    </div>
                    </div>
                    <div className='news-tips'>
                        <h3>Tips</h3>
                        <div class="news-image-area">
                        <div class="news-title">News title 1</div>
                        <div class="news-meta">creator — dd/mm/yyyy</div>
                    </div>
                    <div className="home-new-more">
                        <a href="#" className="home-new-more-text">See all</a>
                    </div>
                    </div>
                    <div className='news-tips'>
                        <h3>Health care</h3>
                        <div class="news-image-area">
                        <div class="news-title">News title 1</div>
                        <div class="news-meta">creator — dd/mm/yyyy</div>
                    </div>
                    <div className="home-new-more">
                        <a href="#" className="home-new-more-text">See all</a>
                    </div>
                    </div>
                    <div className='news-tips'>
                        <h3>Solving skin problems</h3>
                        <div class="news-image-area">
                        <div class="news-title">News title 1</div>
                        <div class="news-meta">creator — dd/mm/yyyy</div>
                    </div>
                    <div className="home-new-more">
                        <a href="#" className="home-new-more-text">See all</a>
                    </div>
                    </div>
                </div>
                
            </div>
           
            <Footer />
        </div>
    )
}
export default News;