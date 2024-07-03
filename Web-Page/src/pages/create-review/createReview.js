import './createReview.css';
import Sidebar from '../../components/sidebar/sidebar.js';
import SubHeader from "../../components/subHeader/subHeader.js";
import { IoIosCloudUpload } from "react-icons/io";

function CreateReview () {
    return (
        <div>
            <SubHeader/>
            <div className="create-review-wrap">
            <Sidebar />
            
            <div className="create-review-area">
                <div className="create-review-content">
                <h3 className="write-review-title">WRITE REVIEW</h3>
                <div className="review-input-area">
                    <h5>Title</h5>
                    <textarea className="input-title" type="text" required/>   
                </div>
                <div className="review-input-area">
                    <h5>Introduction</h5>
                    <textarea className="input-intro" type="text" required/>
                </div>
                
                <div className="review-input-area">
                    <h5>Picture</h5>
                    <div className="upload-area">
                        <IoIosCloudUpload className="upload-icon" />
                        <button className="upload-btn">Upload picture</button>
                    </div>
                    
                </div>

                <div className="review-input-area">
                    <h5>1. Pakaging</h5>
                    <textarea className="input-pakage" type="text" required/>
                </div>   
                
                <div className="review-input-area">
                    <h5>2. Ingredients</h5>
                    <textarea className="input-ingredients" type="text" required/>
                </div>
                
                <div className="review-input-area">
                    <h5>3. Uses</h5>
                    <textarea className="input-uses" type="text" required/>
                </div>
                
                <div className="review-input-area">
                    <h5>4. Target user</h5>
                    <textarea className="input-target" type="text" required/>
                </div>
                
                <div className="review-input-area">
                    <h5>5. Review</h5>
                    <textarea className="input-review" type="text" required/>
                </div>
                
                <div className="review-input-area">
                    <h5>6. Pros & Cons</h5>
                    <textarea className="input-pros" placeholder="Input the advantages..." type="text" required/>
                    <textarea className="input-cons" placeholder="Input the disadvantages..."type="text" required/> 
                </div>
                
                <div className="review-input-area">
                    <h5>Product User Guide</h5>
                    <textarea className="input-guide" type="text"/>   
                </div>
                
                <div className="review-input-area">
                    <h5>Conclusion</h5>
                    <textarea className="input-conclu" type="text" required/>
                </div>

            </div>
                <div className="post-area">
                    <button className="post-btn" type ="button">POST REVIEW</button>
                </div>
                
            
                
            </div>
            
            </div>
        </div>
            
        
    )
}
export default CreateReview;