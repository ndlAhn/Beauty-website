import './homepage.css';
import Header from '../../components/header/header.js';
import Footer from '../../components/footer/footer.js';
import Slogan from '../../pages/home/slogan.png';
import { FaRegHeart } from 'react-icons/fa';
import ChatBox from '../../components/chatBox/chatBox.js';

function Homepage() {
    return (
        <div>
            <Header />
            <div className="home-wrap">
                <div className="slogan-banner">
                    <img src={Slogan} alt="slogan banner" className="slogan" />
                </div>
                <div className="home-news-content">
                    <h3>Hot news</h3>

                    <div className="container">
                        <div className="row">
                            <div className="col-md-6 news-block">
                                <div className="news-image">
                                    <div className="news-title">News title 1</div>
                                    <div className="news-meta">creator — dd/mm/yyyy</div>
                                </div>
                            </div>

                            <div className="col-md-6 news-block">
                                <div className="news-image">
                                    <div className="news-title">News title 2</div>
                                    <div className="news-meta">creator — dd/mm/yyyy</div>
                                </div>
                            </div>

                            <div className="col-md-6 news-block">
                                <div className="news-image">
                                    <div className="news-title">News title 3</div>
                                    <div className="news-meta">creator — dd/mm/yyyy</div>
                                </div>
                            </div>

                            <div className="col-md-6 news-block">
                                <div className="news-image">
                                    <div className="news-title">News title 4</div>
                                    <div className="news-meta">creator — dd/mm/yyyy</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="home-new-more">
                        <a href="/news" className="home-new-more-text">
                            See all
                        </a>
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
                        <a href="/products" className="home-new-more-text">
                            See all
                        </a>
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
                        <a href="/products" className="home-new-more-text">
                            See all
                        </a>
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
                        <a href="/products" className="home-new-more-text">
                            See all
                        </a>
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
                        <a href="/products" className="home-new-more-text">
                            See all
                        </a>
                    </div>
                </div>
            </div>
            <Footer />
            <div className="chatbox-wrapper">
        <ChatBox />
      </div>
        </div>
    );
}

export default Homepage;
