import './homepage.css';
import Header from '../../components/header/header.js';
import Footer from '../../components/footer/footer.js';
import Slogan from  '../../pages/home/slogan.png';
import { FaRegHeart } from "react-icons/fa";

function Homepage(){
    return(
        <div >
            <Header />
            <div className="home-wrap">
                  <div className="slogan-banner">
                    <img src={Slogan} alt="slogan banner" className="slogan"/>
                  </div>
                  <div className="home-news-content">
                    <h3>Hot news</h3>
                        
                    <div class="container">
                <div class="row">
                    <div class="col-md-6 news-block">
                    <div class="news-image">
                        <div class="news-title">News title 1</div>
                        <div class="news-meta">creator — dd/mm/yyyy</div>
                    </div>
                    
                    </div>

                    <div class="col-md-6 news-block">
                    <div class="news-image">
                        <div class="news-title">News title 2</div>
                        <div class="news-meta">creator — dd/mm/yyyy</div>
                    </div>
                    
                    </div>

                    <div class="col-md-6 news-block">
                    <div class="news-image">
                        <div class="news-title">News title 3</div>
                        <div class="news-meta">creator — dd/mm/yyyy</div>
                    </div>
                    
                    </div>

                    <div class="col-md-6 news-block">
                    <div class="news-image">
                        <div class="news-title">News title 4</div>
                        <div class="news-meta">creator — dd/mm/yyyy</div>
                    </div>
                    
                    </div>
                    </div>
                    </div>
                    <div className="home-new-more">
                        <a href="/news" className="home-new-more-text">See all</a>
                    </div>
                  </div>
                  <div className="home-news-content">
                    <h3>New arrivals</h3>
                        <div className="home-news">
                        <div className="home-new-picture">
                            <p>Product's picture</p>
                        </div>
                            <p className="home-new-title">Product's name</p>
                            <FaRegHeart />
                        </div>
                        <div className="home-new-more">
                        <a href="/products" className="home-new-more-text">See all</a>
                        </div>
                    </div>
                    <div className="home-news-content">
                    <h3>Hot products</h3>
                        <div className="home-news">
                        <div className="home-new-picture">
                            <p>Product's picture</p>
                        </div>
                            <p className="home-new-title">Product's name</p>
                            <FaRegHeart />
                        </div>
                        <div className="home-new-more">
                        <a href="/products" className="home-new-more-text">See all</a>
                        </div>
                    </div>
                    <div className="home-news-content">
                    <h3>New reviews</h3>
                        <div className="home-news">
                        <div className="home-new-picture">
                            <p>Review's cover</p>
                        </div>
                            <p className="home-new-title">Review's title</p>
                            <p className="home-review-title">Reviewer - Post date</p>
                        </div>
                        <div className="home-new-more">
                        <a href="/products" className="home-new-more-text">See all</a>
                        </div>
                    </div>
                    <div className="home-news-content">
                    <h3>Recommends</h3>
                        <div className="home-news">
                        <div className="home-new-picture">
                            <p>Product's picture</p>
                        </div>
                            <p className="home-new-title">Product's name</p>
                            <FaRegHeart />
                        </div>
                        <div className="home-new-more">
                        <a href="/products" className="home-new-more-text">See all</a>
                        </div>
                    </div>



                  
               
                

            </div>
            <Footer />
        </div>
    )
}

export default Homepage;