import './ProductDropDown.css';

function ProductDropDown() {
    return(
        <div>
            <div className="product-drop-list-wrap">
                <div className='product-drop-down-wrap'>
                <div className='product-drop-down-left-side'>
                    <ul className="product-drop-menu">
                        <p className="product-drop-category">Cleansers</p>
                        <div className='product-category-menu'>
                            <li className ="product-drop-list-category">Cleansing Cream</li>
                            <li className ="product-drop-list-category">Cleansing Oil</li>                  
                            <li className ="product-drop-list-category">Cleansing Water</li>
                        </div>
                        <p className="product-drop-category">Toner</p>
                        <div className='product-category-menu'>
                            <li className ="product-drop-list-category">Hydrating Toner</li>
                            <li className ="product-drop-list-category">Exfoliating Toner</li>                  
                        </div>                   
                        <p className="product-drop-category">Serums</p>
                        <div className='product-category-menu'>
                            <li className ="product-drop-list-category">Moisturizing Serum</li>
                            <li className ="product-drop-list-category">Anti-aging Serum</li>                  
                        </div>
                        <p className="product-drop-category">Moisturizers</p>
                        <div className='product-category-menu'>
                            <li className ="product-drop-list-category">Gel Moisturizer</li>
                            <li className ="product-drop-list-category">Cream Moisturizer</li>                  
                        </div>
                    </ul>
                </div>
                <div className='product-drop-down-right-side'>
                <ul className="product-drop-menu">
                        <p className="product-drop-category">Sunscreens</p>
                        <div className='product-category-menu'>
                            <li className ="product-drop-list-category">Physical Sunscreen</li>
                            <li className ="product-drop-list-category">Chemical Sunscreen</li>                  
                            <li className ="product-drop-list-category">Hybrid Sunscreen</li>
                        </div>
                        <p className="product-drop-category">Spot Treatments</p>
                        <div className='product-category-menu'>
                            <li className ="product-drop-list-category">Acne Treatmentr</li>
                            <li className ="product-drop-list-category">Exfoliating Toner</li>                  
                        </div>                   
                        <p className="product-drop-category">Face Masks</p>
                        <div className='product-category-menu'>
                            <li className ="product-drop-list-category">Hydrating Mask</li>
                            <li className ="product-drop-list-category">Cleansing Mask</li>                  
                        </div>
                    </ul>
                </div>
                </div>               
            </div>
        </div>
    )
}
export default ProductDropDown;