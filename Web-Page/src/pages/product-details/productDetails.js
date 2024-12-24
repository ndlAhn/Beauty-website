import './productDetails.css';

import Header from '../../components/header/header.js';
import Footer from '../../components/footer/footer.js';
import { FaRegHeart } from "react-icons/fa";
function ProductDetails() {
    return (
        <div>
            <Header />
            <div className='review-product-wrap'>

                {/* Left hand side */}

                <div className='review-product-content-wrap'>
                    <div className='title-liked'>
                        <div className ='content-title-block'>
                            <h3>Product name</h3>
                        </div>
                        <div><FaRegHeart className='product-infor-liked'/></div>
                    </div>
                    
                        <h5>Product information</h5>
                        <p classname="product-infor">Product information script</p>
                        <div className='table-content-block'>                           
                            <div className ='content-title-block'>
                                <h6 className='content-title'>Table of Content</h6>
                            </div>
                            <a href='' class="triangle-before">Brand</a>
                            <a href='' class="triangle-before">Product type</a>
                            <a href='' class="triangle-before">Capacity</a> 
                            <a href='' class="triangle-before">Price range</a>
                            <a href='' class="triangle-before">Skin type</a>
                            <a href='' class="triangle-before">Skin proplem</a>
                            <a href='' class="triangle-before">Ingredient</a>
                            <a href='' class="triangle-before">Product description</a>
                            <a href='' class="triangle-before">Uses</a>
                            <a href='' class="triangle-before">Warning</a>
                        </div>
                        <img src="images.jpeg" alt="Product photo" />
                        <div className ='element-title'>
                            <h5>Brand:</h5>
                            <p>Brand name</p>
                        </div>
                        <div className ='element-title'>
                            <h5>Product type:</h5>
                            <p>Product type name</p>
                        </div>
                        <div className ='element-title'>
                            <h5>Capacity:</h5>
                            <p>Product Capacity</p>
                        </div>
                        <div className ='element-title'>
                            <h5>Price range:</h5>
                            <p>Product price range</p>
                        </div>
                        <div className ='element-title'>
                            <h5>Skin type:</h5>
                            <p>Skin types</p>
                        </div>
                        <div className ='element-title'>
                            <h5>Skin proplem:</h5>
                            <p>Skin proplems</p>
                        </div>
                        <div className ='element-title'>
                            <h5>Incredient:</h5>
                            <p>Incredients</p>
                        </div>
                        <div className ='element-title-coloum'>
                            <h5>Product description:</h5>
                            <p>Product description</p>
                        </div>
                        <div className ='element-title-coloum'>
                            <h5>Uses:</h5>
                            <p>Product Uses</p>
                        </div>
                        <div className ='element-title-coloum'>
                            <h5>Warning:</h5>
                            <p>Warnings</p>
                        </div>                       
                </div>

                {/* Right hand side */}
                <div className="product-right-side">
                    <div className='product-recommend-right-side'>
                    <h3>Discover Products You'll Adore</h3>
                    </div>
                    <div className='product-recommend-product-infor'>
                         <div className="home-news">
                            <div className="home-new-picture">
                                <p>Product's picture</p>
                            </div>
                                <p className="home-new-title">Product's name</p>
                                <FaRegHeart />
                        </div>
                        <div className="home-news">
                            <div className="home-new-picture">
                                <p>Product's picture</p>
                            </div>
                                <p className="home-new-title">Product's name</p>
                                <FaRegHeart />
                        </div>
                    </div>
                   
                </div>
                
            </div>
            <Footer />
        </div>
    )
}
export default ProductDetails;