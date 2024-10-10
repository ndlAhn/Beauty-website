import './addIncredient.css';
import SubHeader from '../../../components/subHeader/subHeader';
import ReviewSidebar from '../../../components/sidebar/review-sidebar/reviewSidebar';
import { IoIosCloudUpload } from "react-icons/io";
import { CgAsterisk } from "react-icons/cg";
function AddIncredient () {
    return (
        <div>
            <SubHeader/>
            <div className="create-review-wrap">
            <ReviewSidebar />
            
            <div className="create-review-area">
                <div className="create-review-content">
                <h3 className="write-review-title">ADD NEW INCREDIENT</h3>
                <div className="review-input-area">
                    <span className="asterisk">
                        <h5>Incredient name</h5>
                        <CgAsterisk style={{color: "red"}} />
                    </span>
                    <textarea className="input-title-incredient" type="text" required/>   
                </div>
                <div className="review-input-area">
                    <span className="asterisk">
                        <h5>Function</h5>
                        <CgAsterisk style={{color: "red"}} />
                    </span>                   
                    <textarea className="input-function-incredient" type="text" required/>
                </div>

                <div className="review-input-area">
                    <span className="asterisk">
                        <h5>Safety Information</h5>
                        <CgAsterisk style={{color: "red"}} />
                    </span>
                    
                    <select className="incredient-select" name="skinType" id="skin-type" require>
                        <option value="Non-comedogenic">Non-comedogenic</option>
                        <option value="Hypoallergenic">Hypoallergenic</option>
                        <option value="Fragrance-free">Fragrance-free </option>
                        <option value="Dermatologically Tested">Dermatologically Tested</option>
                        <option value="Alcohol-free">Alcohol-free</option>
                        <option value="Sulphate-free">Sulphate-free</option>
                        <option value="Cruelty-free">Cruelty-free</option>
                        <option value="Vegan">Vegan</option>
                        <option value="Safe for Pregnancy">Safe for Pregnancy</option>
                    </select>
                </div>
            </div>
                <div className="post-area">
                    <button className="incredient-btn" type ="button">ADD INCREDIENT</button>
                </div>
                
            
                
            </div>
            
            </div>
        </div>
            
        
    )
}
export default AddIncredient;
