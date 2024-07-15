import './likedProduct.css';
import { FiFilter } from "react-icons/fi";
import SubHeader from '../../../components/subHeader/subHeader';
import ProfileSidebar from '../../../components/sidebar/profile-sidebar/profileSidebar';
function LikedProduct () {
    return(
        <div>
        <SubHeader />
        <div className="liked-wrap">
            <ProfileSidebar />
            <div className="liked-content-wrap">
                <div className="liked-title-filter">
                    <h4>Liked Products</h4>
                    <FiFilter className="filter" />
                </div>
                
                <div className="liked-first-product">
                    <div className="product-picture">
                        <p>Product's picture</p>
                    </div>
                    <div className="liked-product-content">
                        <h4>Product's name</h4>
                        <button className="liked-unlike-bnt">Unlike</button>  
                    </div>
                    
                </div>
                
            </div>    
        </div>
        
    </div>
    );
}
export default LikedProduct;