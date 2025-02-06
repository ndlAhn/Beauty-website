import './addIncredient.css';
import SubHeader from '../../../components/subHeader/subHeader';
import ReviewSidebar from '../../../components/sidebar/review-sidebar/reviewSidebar';
import { IoIosCloudUpload } from "react-icons/io";
import { CgAsterisk } from "react-icons/cg";
import { BiEditAlt } from "react-icons/bi";
import { MdDeleteOutline } from "react-icons/md";

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
                <div className="post-area">
                    <button className="incredient-btn" type ="button">ADD NEW</button>
                    <button className="incredient-btn" type ="button">SAVE</button>
                </div>
            
                    
                
                <h4 className="write-review-title">INCREDIENT TABLE</h4>
                <div className='incredient-table-wrapper'>
                    <table className='incredient-table'>
                        <tr className='table-title'>
                            <td className='incredient-name-column'>Incredient name</td>
                            <td className='incredient-function-column'>Function</td>
                            <td className='satety-info-column'>Safety Information</td>
                            <td className='edit-column'>Edit</td>
                        </tr>
                        <tr className='table-incredient-content'>
                            <td className='incredient-name-column'>Name</td>
                            <td className='incredient-function-column'>Funtion detail</td>
                            <td className='satety-info-column'>Safety information detail</td>
                            <td className='edit-column'>
                                <div className='edit-icon-incredient'>
                                   <BiEditAlt className='edit-incredient-table-btn' />
                                   <MdDeleteOutline className='delete-incredient-table-btn'/>

                                </div>
                                
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
                
                
            
                
            </div>
            
            </div>
        </div>
            
        
    )
}
export default AddIncredient;
