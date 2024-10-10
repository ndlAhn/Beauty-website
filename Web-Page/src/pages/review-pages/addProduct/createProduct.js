import './createProduct.css';
import SubHeader from '../../../components/subHeader/subHeader';
import ReviewSidebar from '../../../components/sidebar/review-sidebar/reviewSidebar';
import { CgAsterisk } from "react-icons/cg";
import { IoIosCloudUpload } from "react-icons/io";
function createProduct() {
    return(
        <div>
        <SubHeader/>
        <div className="review-post-wrap">
        <ReviewSidebar />
            <div className="profile-content-wrap">
                
                <div className="profile-content">
                    <h3 className ="product-title">CREATE PRODUCT</h3>
                    <div className="review-input-area">
                    <span className="asterisk">
                        <h5>Product name</h5>
                        <CgAsterisk style={{color: "red"}} />
                    </span>
                    <textarea className="input-title-product" type="text" required/>   
                </div>
                <div className="review-input-area">
                    <span className="asterisk">
                        <h5>Product details</h5>
                        <CgAsterisk style={{color: "red"}} />
                    </span>
                    
                    <textarea className="input-intro-product" type="text" required/>
                </div>
                
                <div className="review-input-area">
                    <span className="asterisk">
                        <h5>Picture</h5>
                        <CgAsterisk style={{color: "red"}} />
                    </span>
                    
                    <div className="upload-area">
                        <IoIosCloudUpload className="upload-icon" />
                        <button className="product-upload-btn">Upload picture</button>
                    </div>
                    
                </div>

                <div className="review-input-area">
                    <span className="asterisk">
                        <h5>Brand</h5>
                        <CgAsterisk style={{color: "red"}} />
                    </span>
                    
                    <textarea className="input-pakage-product" type="text" required/>
                </div>

                <div className="review-input-area">
                    <span className="asterisk">
                        <h5>Product type</h5>
                        <CgAsterisk style={{color: "red"}} />
                    </span>
                    
                    <select className="product-type-select" name="skinType" id="skin-type" require>
                        <optgroup label="Cleansers">
                            <option value="oil-cleanser">Cleansing Oil</option>
                            <option value="cream-cleanser">Cream Cleanser</option>
                            <option value="cleansing-water">Cleansing Water</option>
                        </optgroup>
                        <optgroup label="Toners">
                            <option value="hydrating-toner">Hydrating Toner</option>
                            <option value="exfoliating-toner">Exfoliating Toner</option>
                            </optgroup>
                            <optgroup label="Serums">
                            <option value="brightening-serum">Brightening Serum</option>
                            <option value="anti-aging-serum">Anti-aging Serum</option>
                        </optgroup>
                        <optgroup label="Moisturizers">
                            <option value="gel-moisturizer">Gel Moisturizer</option>
                            <option value="cream-moisturizer">Cream Moisturizer</option>
                        </optgroup>
                        <optgroup label="Sunscreens">
                            <option value="physical-sunscreen">Physical Sunscreen</option>
                            <option value="chemical-sunscreen">Chemical Sunscreen</option>
                        </optgroup>
                            <optgroup label="Spot Treatments">
                            <option value="acne-treatment">Acne Treatment</option>
                            <option value="anti-redness-cream">Anti-redness Cream</option>
                        </optgroup>
                        <optgroup label="Face Masks">
                            <option value="hydrating-mask">Hydrating Mask</option>
                            <option value="cleansing-mask">Cleansing Mask</option>
                        </optgroup>
                    </select>
                </div>
                
                <div className="review-input-area">
                    <span className="asterisk">
                        <h5>Uses</h5>
                        <CgAsterisk style={{color: "red"}} />
                    </span>
                    
                    <textarea className="input-ingredients-product" type="text" required/>
                </div>
                
                <div className="review-input-area">
                    <span className="asterisk">
                        <h5>Capacity</h5>
                        <CgAsterisk style={{color: "red"}} />
                    </span>
                    
                    <textarea className="input-uses-product" type="text" required/>
                </div>
                
                <div className="review-input-area">
                    <span className="asterisk">
                        <h5>Skin type</h5>
                        <CgAsterisk style={{color: "red"}} />
                    </span>
                    
                    <select className="skin-type-select-product" name="skinType" id="skin-type" require>
                        <option value="oily">Oily skin</option>
                        <option value="dry">Dry skin</option>
                        <option value="normal">Normal skin</option>
                        <option value="combination">Combination skin</option>
                        <option value="sensitive-skin">Sensitive skin</option>
                        <option value="sensitive-skin">Acne-pront skin</option>
                        <option value="all-type">All types of skin</option>
                    </select>
                </div>
   
                <div className="review-input-area">
                    <span className="asterisk">
                        <h5>Skin problem</h5>
                        <CgAsterisk style={{color: "red"}} />  
                    </span>
                        <select className="skin-prob-select-product" name="skinProb" id="skin-prob" require  >
                            <option value="acne">Acne</option>
                            <option value="aging">Aging</option>
                            <option value="dried">Dried skin</option>
                            <option value="oily">Oily skin</option>
                            <option value="enlarged pores">Enlarged pores</option>
                            <option value="scarring">Scarring</option>
                            <option value="skin recovery">Skin recovery</option>
                        </select>
                </div>
                
                <div className="review-input-area">
                    
                    <span className="asterisk">
                        <h5>Incredient</h5>
                        <CgAsterisk style={{color: "red"}} />
                    </span>
                    <select className="incredient-select-product" name="incredient" id="incredient" require >
                        <option value="ingredient1">Ingredient 1</option>
                        <option value="ingredient2">Ingredient 2</option>
                        <option value="ingredient3">Ingredient 3</option>
                        <option value="ingredient4">Ingredient 4</option>
                        <option value="ingredient5">Ingredient 5</option>
                    </select>  
                </div>
                
                <div className="review-input-area">
                    <span className="asterisk">
                        <h5>Product description</h5>
                        <CgAsterisk style={{color: "red"}} />
                    </span> 
                    <textarea className="product-description" type="text" required/>
                </div>
                
                <div className="review-input-area">
                    
                        <h5>Price range</h5>
                    <select className="price-select-product" name="incredient" id="incredient" require >
                        <option value="drug-store">Drug store</option>
                        <option value="ingredient2">Mid end</option>
                        <option value="ingredient3">High end</option>
                    </select>
                </div>
                <div className="review-input-area">
                    <span className="asterisk">
                        <h5>Warning</h5>
                    </span>
                    
                    <textarea className="input-warning" type="text"/>
                </div>
                <div className="post-area">
                    <button className="post-product-btn" type ="button">POST PRODUCT</button>
                </div>
                
                
                
                </div>
                </div> 
            </div>
        </div>
        
    )
}
export default createProduct;