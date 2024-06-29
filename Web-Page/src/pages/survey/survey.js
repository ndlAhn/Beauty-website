import './survey.css';

function Survey() {
    return(
        <div>
            <div className="surveyBG">
                <form className="surveyForm">
                    <div className="form-title">
                        <h3>Personal Information</h3>
                    </div>
                    <div className="surveyField">
                        <div className="user-name">
                            <label className="text-name" htmlFor ="Uname">Name:</label>
                            <input className="u-name" type="text" id="Uname" name="Uname" ></input><br />
                            
                        </div>
                        <div className="dob">
                            <label htmlFor="dob">Date of birth: </label>
                            <input className="date" type="date" id="dob"></input> <br />
                        </div>
                         
                        <div className="gender" id='gender'>
                            <label htmlFor ="gender">Gender:</label>
                            <div>
                                <input type="radio" id="male" name="male" value="male"/>
                                <label htmlFor="male">Male</label>
                            </div>
                            <div>
                                <input type="radio" id="female" name="female" value="female"/>
                                <label htmlFor="female">Female</label>   
                            </div>  
                        </div>
                        <div className="skin-type">
                            <label htmlFor ="skintype" >Skin type:</label>
                            <select className="skin-type-select" name="skintype" id="skin-type">
                                <option value= "oily-skin-t">Oily skin</option>
                                <option value= "dry-skin">Dry skin</option>
                                <option value= "normal-skin">Normal skin</option>
                                <option value= "com-skin">Combination skin</option>
                                <option value= "sensitve-skin">Sensitive skin</option>
                            </select>
                        </div>
                        <div className="skin-prob">
                            <label htmlFor ="skinprob" >Skin problem:</label>
                            <select className="skin-prob-select" name="skinprob" id="skin-prob">
                                <option value= "none">None</option>
                                <option value= "acne">Acne</option>
                                <option value= "aging">Aging</option>
                                <option value= "dried-skin">Dried skin</option>
                                <option value= "oily-skin-p">Oily skin</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor ="price-segment">Price segments:</label> <br />
                            <div className="price-segment">
                                <input type="checkbox" id="drug-store"></input>
                                <label htmlFor="drug-store">Drug-store</label><br />
                                <input type="checkbox" id="mid-end"></input> 
                                <label htmlFor="mid-end" >Mid-end</label><br />
                                <input type="checkbox" id="high-end"></input>
                                <label type="checkbox" id="high-end">High-end</label>  
                            </div>
                            
                        </div>
                    </div>
                        <button className="finish">Finish</button>
                </form>
            </div>
        </div>
    )
}
export default Survey;