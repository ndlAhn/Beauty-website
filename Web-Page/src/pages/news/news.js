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
                    
                    <div className='news-intro'>
                           <h2>Update new beauty trends with Beauty Insight</h2> 
                           <p>Stay ahead in beauty with <strong>Beauty Insight</strong>! We bring you the latest trends, from innovative skincare routines to makeup techniques that highlight your natural beauty. 
                            Discover the hottest products and must-try trends with our expert advice. Whether it's clean beauty, multi-step skincare, or minimalist makeup, Beauty Insight keeps you in the know. 
                            </p>
                        </div>
                    <div className='news-trends'>
                        <div class="news-image-area">
                        <div class="news-title">News title 1</div>
                        <div class="news-meta">creator — dd/mm/yyyy</div>
                    </div>
                    </div>
                </div>     
            </div>   
            <Footer />
        </div>
    )
}
export default News;