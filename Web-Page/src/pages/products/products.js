import './products.css';
import Header from '../../components/header/header.js';
import Footer from '../../components/footer/footer.js';
import { FiFilter } from "react-icons/fi";
import { FaRegHeart } from "react-icons/fa";
function Products() {
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
                    <div className="home-news-content">
                        <h3>Product information</h3>
                        <p className='products-descript'>Transform your skincare routine with the perfect skin care products. At Beauty Insight, we guide you to find the best products tailored to your skin type, whether it's oily, dry, sensitive, or combination. 
                        Elevate your daily routine that leaves your skin feeling fresh, clean, and rejuvenated.</p>
                        
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
                        <h3>Cleansing</h3>
                        <p className='products-descript'>Discover the essential step to flawless skin with Beauty Insight's cleansing guide. Proper cleansing removes impurities, excess oil, and makeup, ensuring a fresh and healthy complexion.
                        </p>
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
                        <h3>Facial cleanser</h3>
                        <p className='products-descript'>
                        Revitalize your skin with the perfect facial cleanser from Beauty Insight. Our experts help you choose the ideal cleanser for your skin type, whether it's oily, dry, sensitive, or combination. 
                        </p>
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
                        <h3>Toner</h3>
                        <p className='products-descript'>
                        Balance and refresh your skin with the appropriate toner. Beauty Insight guides you in selecting the ideal toner for your skin type, helping to tighten pores, remove residual impurities, and restore your skin's natural pH balance
                        </p>
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
                        <h3>Mask</h3>
                        <p className='products-descript'>
                        Discover top-rated masks. Incorporate this essential step into your skincare routine for a glowing, refreshed complexion.
                        </p>
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
                        <h3>Exfoliate facial skin</h3>
                        <p className='products-descript'>
                        The best exfoliants for your skin type, helping to remove dead skin cells, unclog pores, and promote cell renewal.
                        </p>
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
                        <h3>Essence/Serum</h3>
                        <p className='product-descript'>
                        the ideal products to address your specific skin concerns, whether it's hydration, brightening, or anti-aging.
                        </p>
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
                        <h3>Lotion</h3>
                        <p className='products-descript'>
                        Hydrate and nourish your skin with the perfect lotion
                        </p>
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
                        <h3>Mineral spray</h3>
                        <p className='products-descript'>
                        the ideal mineral spray to hydrate, soothe, and nourish your skin throughout the day.
                        </p>
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
                        <h3>Sunscreen</h3>
                        <p className='products-descript'>
                        the ideal sunscreen for your skin type, offering broad-spectrum protection against harmful UV rays.
                        </p>
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
                        <h3>Skin problem</h3>
                        <p className='products-descript'>
                        Tackle your skin problems head-on with expert advice from Beauty Insight. Whether you're dealing with acne, dryness, redness, or uneven texture, our experts provide solutions tailored to your skin type and concerns.
                        </p>
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
                
            </div>
            <Footer />
        </div>
    )
}

export default Products;