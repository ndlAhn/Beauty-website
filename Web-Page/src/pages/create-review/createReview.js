import './createReview.css';
import Header from '../../components/header/header.js';
import Footer from '../../components/footer/footer.js';
function CreateReview () {
    return (
        <div>
            <div className="create-review-content">
               <h2 className="write-review-title">WRITE REVIEW</h2>
                <h4>Title</h4>
                <input className="input-title" type="text" required/>
                <h4>Introduction</h4>
                <input className="input-intro" type="text" required/>
                <h4>Picture</h4>    
                <h4>1. Pakaging</h4>
                <input className="input-pakage" type="text" required/>
                <h4>2. Ingredients</h4>
                <input className="input-ingredients" type="text" required/>
                <h4>3. Uses</h4>
                <input className="input-uses" type="text" required/>
                <h4>4. Target user</h4>
                <input className="input-target" type="text" required/>
                <h4>5. Review</h4>
                <input className="input-review" type="text" required/>
                <h4>6. Pros & Cons</h4>
                <input className="input-pros" type="text" required/>
                <input className="input-cons" type="text" required/>
                <h4>Product User Guide</h4>
                <input className="input-guide" type="text"/>
                <h4>Conclusion</h4>
                <input className="input-conclu" type="text" required/>
                <br />
                <button type ="button">Post review</button>
                <button type="button">Preview post</button>
            </div>
            
            
        </div>
    )
}
export default CreateReview;