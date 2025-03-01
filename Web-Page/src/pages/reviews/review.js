import './review.css';
import Header from '../../components/header/header.js';
import Footer from '../../components/footer/footer.js';
import { FiFilter } from 'react-icons/fi';
import { useEffect, useState } from 'react';
import instance from '../../axios/instance.js';

function formatDate(isoString) {
    const date = new Date(isoString);

    const options = { year: 'numeric', month: 'short', day: '2-digit' };
    return date.toLocaleDateString('en-US', options).replace(',', '');
}

function Review() {
    const [reviews, setReviews] = useState([]);
    const cloudName = 'dppaihihm';

    useEffect(() => {
        instance
            .get('/get-all-reviews')
            .then((res) => {
                console.log(res.data);
                setReviews(res.data);
            })
            .catch((err) => console.log(err));
    }, []);
    return (
        <div className="review-wrap">
            <Header />
            <div className="news-wrap">
                <div className="new-content-wrap">
                    <div className="news-filter-wrap">
                        <div className="news-filter-content">
                            <FiFilter className="news-filter" />
                        </div>
                    </div>
                    <div className="home-news-content">
                        <h3>Product reviews</h3>
                        <p className="products-descript">
                            Discover the best skincare products with reviews from both experts and users at Beauty
                            Insight. Our community provides in-depth analyses of top-rated products, while real users
                            share their personal experiences and results. Whether you're looking for cleansers,
                            moisturizers, serums, or more, our comprehensive reviews help you make informed decisions.
                            Stay updated with the latest trends and innovations in skincare, and find the perfect
                            products to achieve your healthiest, most radiant skin.
                        </p>
                        {reviews?.map((item, index) => (
                            <div className="home-news" key={index}>
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
                </div>
            </div>
            <Footer />
        </div>
    );
}
export default Review;
