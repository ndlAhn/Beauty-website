import './survey.css';

function Survey() {
    return (
        <div>
            <div className="survey-bg">
                <div className=" survey-form-bg">
                    <form className="survey-form">
                        <div className="form-title">
                            <h3>Personal Information</h3>
                        </div>
                        <div className="survey-field">
                            <div className="user-name">
                                <label className="text-name" htmlFor="Uname">
                                    Name:
                                </label>
                                <input className="u-name" type="text" id="Uname" name="Uname" required></input>
                            </div>

                            <div className="skin-type">
                                <label htmlFor="skintype">Skin type:</label>
                                <select className="skin-type-select" name="skintype" id="skin-type">
                                    <option value="oily-skin-t">Oily skin</option>
                                    <option value="dry-skin">Dry skin</option>
                                    <option value="normal-skin">Normal skin</option>
                                    <option value="com-skin">Combination skin</option>
                                    <option value="sensitve-skin">Sensitive skin</option>
                                </select>
                            </div>
                            <div className="skin-prob">
                                <label htmlFor="skin-prob">Skin problem:</label>
                                <select className="skin-prob-select" name="skinprob" id="skin-prob">
                                    <option value="none">None</option>
                                    <option value="acne">Acne</option>
                                    <option value="aging">Aging</option>
                                    <option value="dried-skin">Dried skin</option>
                                    <option value="oily-skin-p">Oily skin</option>
                                </select>
                            </div>
                            <div className="price-segments">
                                <label htmlFor="price-segment">Price segments:</label>
                                <div className="price-segment">
                                    <div className="drug-store">
                                        <input type="checkbox" id="drug-store"></input>
                                        <label htmlFor="drug-store">Drug-store</label>
                                    </div>
                                    <div className="mid-end">
                                        <input type="checkbox" id="mid-end"></input>
                                        <label htmlFor="mid-end">Mid-end</label>
                                    </div>
                                    <div className="high-end">
                                        <input type="checkbox" id="high-end"></input>
                                        <label type="checkbox" id="high-end">
                                            High-end
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="finish">
                            <button className="finish-btn">Finish</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
export default Survey;
