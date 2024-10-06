import { useContext } from 'react';
import instance from '../../axios/instance';
import { SURVEY } from '../../constant/endPoint';
import './survey.css';
import StateContext from '../../context/context.context';
import { useNavigate } from 'react-router-dom';

function Survey() {
    const [state, dispatchState] = useContext(StateContext);
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {
            skinType: e.target.skinType.value,
            skinProb: e.target.skinProb.value,
        };
        instance
            .post(SURVEY, { ...formData, ...state.userData })
            .then((res) => {
                console.log(res.data);
                navigate('/');
            })
            .catch((err) => {
                console.log(err);
            });
    };
    return (
        <div>
            <div className="survey-bg">
                <div className=" survey-form-bg">
                    <form className="survey-form" onSubmit={handleSubmit}>
                        <div className="form-title">
                            <h3>Personal Information</h3>
                        </div>
                        <div className="survey-field">
                            <div className="skin-type">
                                <label htmlFor="skintype">Skin type:</label>
                                <select className="skin-type-select" name="skinType" id="skin-type">
                                    <option value="oily">Oily skin</option>
                                    <option value="dry">Dry skin</option>
                                    <option value="normal">Normal skin</option>
                                    <option value="combination">Combination skin</option>
                                    <option value="sensitive-skin">Sensitive skin</option>
                                    <option value="sensitive-skin">Acne-pront skin</option>
                                </select>
                            </div>
                            <div className="skin-prob">
                                <label htmlFor="skin-prob">Skin problem:</label>
                                <select className="skin-prob-select" name="skinProb" id="skin-prob">
                                    <option value="acne">Acne</option>
                                    <option value="aging">Aging</option>
                                    <option value="dried">Dried skin</option>
                                    <option value="oily">Oily skin</option>
                                    <option value="enlarged pores">Enlarged pores</option>
                                    <option value="scarring">Scarring</option>
                                    <option value="skin recovery">Skin recovery</option>
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
                            <button type="submit" className="finish-btn">
                                Finish
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
export default Survey;
