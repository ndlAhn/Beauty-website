import './aboutUs.css';
import Header from '../../components/header/header.js';
import Welcome from './welcome.png';
import Footer from '../../components/footer/footer.js';


function AboutUs() {
    return(
        <div className="aboutUs-wrapper">
            <Header />
            <div className="aboutUs-content">
                <h2 style={{color: "var(--text-color-blue)"}}>ABOUT US</h2>
                <img src={Welcome} alt="welcome image" className="welcome-img"/>
                <p className="intro">Welcome to <strong>Beauty Insight</strong>, your ultimate destination for all things beauty! 
                Whether you're a skincare enthusiast, makeup lover, or just beginning your beauty journey, 
                we've got you covered. Our website offers a comprehensive selection of products, 
                in-depth reviews, and detailed ingredient insights to help you make informed choices.</p>
                <h4>Discover Your Perfect Product</h4>
                <p className="intro">
                At <strong>Beauty Insight</strong>, we believe in providing only the best for our customers. Explore our curated range of skincare,
                makeup, haircare, and wellness products from top brands around the globe. From luxurious creams and serums to everyday essentials,
                our collection is designed to cater to all skin types and beauty needs.
                </p>
                <h4>Honest and Detailed Product Reviews</h4>
                <p className="intro">
                Making the right choice can be overwhelming, but we're here to simplify it for you. Our expert team of beauty aficionados meticulously tests 
                and reviews each product, providing you with honest and detailed feedback. Our reviews cover everything from texture and scent to effectiveness 
                and value for money, ensuring you know exactly what to expect before making a purchase.
                </p>
                <h4>Ingredient Transparency</h4>
                <p className="intro">
                We understand the importance of knowing what goes into your beauty products. That's why we offer detailed ingredient lists and explanations
                for every item we feature. Learn about the benefits and potential concerns of each ingredient, empowering you to make safe and healthy choices
                for your skin and body.
                </p>
                <h4>Join Our Beauty Community</h4>
                <p className="intro">
                Beyond products and reviews, <strong>Beauty Insight</strong> is a thriving community of beauty lovers.
                Share your experiences, discover tips and tricks, and connect with like-minded individuals 
                who share your passion for beauty.
                </p>
                <p className="intro">
                Embark on your beauty journey with confidence and clarity.
                Welcome to <strong>Beauty Insight</strong> – where beauty meets trust.
                </p>
            </div>
            <Footer />    
        </div>
    )
}
export default AboutUs; 