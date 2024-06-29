import './ProductDropDown.css';

function ProductDropDown() {
    return(
        <div>
            <div className="product-drop-list-wrap">
                <ul className="product=drop-list">
                        <li className="product-drop-list-list">Profile</li>
                        <li className ="product-drop-list-list">Setting</li>                    
                        <li className ="product-drop-list-list">Logout</li>
                </ul>
            </div>
        </div>
    )
}
export default ProductDropDown;