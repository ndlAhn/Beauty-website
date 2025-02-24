import './ProductDropDown.css';

function ProductDropDown() {
    return (
        <div className="product-drop-list-wrap">
            <div className="product-drop-down-wrap">
                <div className="product-drop-down-left-side">
                    <ul className="product-drop-menu">
                        <li className="product-drop-category">Cleansers</li>
                        <li className="product-drop-list-category">Cleansing Cream</li>
                        <li className="product-drop-list-category">Cleansing Oil</li>
                        <li className="product-drop-list-category">Cleansing Water</li>

                        <li className="product-drop-category">Toner</li>
                        <li className="product-drop-list-category">Hydrating Toner</li>
                        <li className="product-drop-list-category">Exfoliating Toner</li>

                        <li className="product-drop-category">Serums</li>
                        <li className="product-drop-list-category">Moisturizing Serum</li>
                        <li className="product-drop-list-category">Anti-aging Serum</li>

                        <li className="product-drop-category">Moisturizers</li>
                        <li className="product-drop-list-category">Gel Moisturizer</li>
                        <li className="product-drop-list-category">Cream Moisturizer</li>
                    </ul>
                </div>

                <div className="product-drop-down-right-side">
                    <ul className="product-drop-menu">
                        <li className="product-drop-category">Sunscreens</li>
                        <li className="product-drop-list-category">Physical Sunscreen</li>
                        <li className="product-drop-list-category">Chemical Sunscreen</li>
                        <li className="product-drop-list-category">Hybrid Sunscreen</li>

                        <li className="product-drop-category">Spot Treatments</li>
                        <li className="product-drop-list-category">Acne Treatment</li>
                        <li className="product-drop-list-category">Exfoliating Toner</li>

                        <li className="product-drop-category">Face Masks</li>
                        <li className="product-drop-list-category">Hydrating Mask</li>
                        <li className="product-drop-list-category">Cleansing Mask</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default ProductDropDown;
