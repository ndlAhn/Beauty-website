import './ingredients.css';
import Header from '../../components/header/header.js';
import Footer from '../../components/footer/footer.js';
import { FiFilter } from "react-icons/fi";
function Ingredients() {
    return(
        <div>

            <Header />
            <div className='news-wrap'>
                <div className='new-content-wrap'>
                    <div className="ingre-intro">
                    <h3>Look up and cosmetic ingredients analysis</h3>
                    <p className='ingre-script'>Curious about what's in your cosmetics? With <strong>Beauty Insight</strong>, you can easily look up and analyze cosmetic ingredients. Discover the benefits, potential risks, and overall effectiveness of each component in your beauty products. Stay informed and make smarter choices for your skincare and makeup routine. Empower yourself with the knowledge to choose the best for your skin!
                    </p>
                    <p className='ingre-script'>Enter the names of the ingredients:</p>
                    
                    <div className='ingre-lookup-field'>
                        <textarea className='ingre-lookup'></textarea>
                        <button className='ingre-lookup-btn'>Look up</button>
                        
                    </div>
                    <p>Note: When entering multiple ingredients, the ingredients must be separated by commas( , )!</p>
                    <div className='ingre-table'>
                        <div className='news-filter-wrap'>
                            <div className="news-filter-content">
                            <FiFilter className='news-filter' />
                            </div>
                        </div>
                        <h5>Detailed table of ingredients</h5>
                        <div className='ingre-table-detail'>
                            Ingredients details
                        </div>
                    </div>
                    </div>
                    
            </div>
            </div>
            <Footer />
        </div>
    )
}
export default Ingredients;