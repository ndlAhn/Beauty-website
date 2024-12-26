import './reviewDetails.css';

import Header from '../../components/header/header.js';
import Footer from '../../components/footer/footer.js';
import { FaRegClock } from "react-icons/fa";
import { BsReply } from "react-icons/bs";



function ReviewDetails() { 
    return(
        <div>
            <Header />
            <div className='review-details-wrap'>
                <div className='review-details-content-wrap'>
                    <div className='review-details-title'>
                        <h3>Title</h3>
                    </div>
                    
                    <h5>Introduction</h5>
                    <div className='review-script'><p>Product review introduction</p></div>
                    <div className='table-content-block'>                           
                            <div className ='content-title-block'>
                                <h6 className='content-title'>Table of Content</h6>
                            </div>
                            <a href='' class="triangle-before">Pakaging</a>
                            <a href='' class="triangle-before">Ingredients type</a>
                            <a href='' class="triangle-before">Uses</a> 
                            <a href='' class="triangle-before">Target user</a>
                            <a href='' class="triangle-before">Review</a>
                            <a href='' class="triangle-before">Pros & Cons</a>
                            <a href='' class="triangle-before">User Guidelines</a>
                            <a href='' class="triangle-before">Product description</a>
                            <a href='' class="triangle-before">Uses</a>
                            <a href='' class="triangle-before">Warning</a>
                    </div>
                    <img src="images.jpeg" alt="Product photo" />
                    <div className ='element-review-details'>
                            <h5>1. Pakaging:</h5>
                            <div className='review-script'>
                                <p>Pakaging review script</p>
                            </div>
                    </div>
                    <div className ='element-review-details'>
                            <h5>2. Ingredients:</h5>
                            <div className='review-script'>
                               <p>Ingredient details</p> 
                            </div>
                            
                    </div>
                    <div className ='element-review-details'>
                            <h5>3. Uses:</h5>
                            <div className='review-script'>
                                <p>Guidelines</p>
                            </div>
                            
                    </div>
                    <div className ='element-review-details'>
                            <h5>4. Target user:</h5>
                            <div className='review-script'>
                                <p>Age & Skin type</p>
                            </div>
                            
                    </div>
                    <div className ='element-review-details'>
                            <h5>5. Review:</h5>
                            <div className='review-script'>
                                <p>Review script</p>
                            </div>
                            
                    </div>
                    <div className ='element-review-details'>
                            <h5>6. Pros & Cons:</h5>
                            
                                <div className='review-details-pros-cons-wrap'>
                                    <div className='review-details-pros'>
                                        <div className='review-details-title'>   
                                            <p>Pros</p>
                                        </div>
                                        <div className='review-script'>
                                            <div className='pros-script'>Pros script</div>
                                        </div>
                                    </div>
                                    <div className='review-details-cons'>
                                        <div className='review-details-title'>
                                            <p>Cons</p>
                                        </div>
                                        <div className='review-script'>
                                            <div lassName='cons-script'>Cons script</div>
                                        </div>
                                    </div>
                                </div>                           
                    </div>
                    <div className ='element-review-details'>
                            <h5>7. User Guidelines:</h5>
                            <div className='review-script'>
                                <p>User Guidelines script</p>
                            </div>        
                    </div>
                    <div className ='element-review-details'>
                            <h5>Conclusion</h5>
                            <div className='review-script'>
                                <p>Conclusion script</p>
                            </div>        
                    </div>
                    <div class="custom-line"></div>
                    <div className='review-detais-reviewer'>
                        <h6>REVIEW BY:</h6>
                        <h6 className='review-detais-reviewer-name'>Reviewer's name</h6>
                        <h6>UPDATED:</h6>
                        <h6>22/5/2002</h6>
                    </div>
                    <div className='review-details-comment'>
                        <h5>Comments</h5>
                        <div className='review-details-comment-area'>
                            <textarea type="text" className='comment' id="comment" name="comment" />
                            
                        </div>
                        <div className='review-details-comment-upload-btn'>
                            <button className='upload-comment-btn'>Upload comment</button> 
                        </div>
                        <div className='review-details-user-comment'>
                            <div className='comment-header'>
                                <p className='user-comment'>User's name</p>
                                
                                <div className='comment-history-section'>
                                    <div className='comment-history'>
                                        <FaRegClock className='clock-icon' />               
                                    </div>
                                <p>22/5/2002</p>
                                </div>
                                
                            </div>
                            <div className='user-comment-script'>
                                <p>User's comment</p>
                                
                            </div>
                            <div className='reply-comment-section'>
                                    <div className='comment-history'>
                                        <BsReply className='reply-icon' />               
                                    </div>
                                <p>Reply</p>
                            </div>
                        </div>                      
                    </div>       
                </div>                  
            </div>
            <Footer />
        </div>
    )
}
export default ReviewDetails;