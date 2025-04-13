import './personalInfo.css';
import SubHeader from '../../../components/subHeader/subHeader';
import ProfileSidebar from '../../../components/sidebar/profile-sidebar/profileSidebar';
import { useContext, useEffect } from 'react';
import StateContext from '../../../context/context.context';

function PersonalInfo() {
    const [state, dispatchState] = useContext(StateContext);
    useEffect(() => {
        console.log(state);
    });
    return (
        <div>
            <SubHeader />
            <div className="personal-wrap">
                <ProfileSidebar />
                <div className="personal-content-wrap">
                    <div className="personal-content">
                        <form className="survey-form">
                            <div className="form-title">
                                <h2>Personal Information</h2>
                            </div>
                            <div className="personal-survey-field">
                                <div className="info-field">
                                    <label className="personal-label" htmlFor="Uname">
                                        Name:
                                    </label>
                                    <input
                                        className="profile-input"
                                        type="text"
                                        id="Uname"
                                        name="Uname"
                                        required
                                    ></input>
                                </div>
                                <div className="info-field">
                                    <label htmlFor="dob" className="personal-label">
                                        Date of birth:
                                    </label>
                                    <input className="profile-input" type="date" id="dob" required></input>
                                </div>

                                <div className="info-field">
                                    <label htmlFor="gender" className="personal-label">
                                        Gender:
                                    </label>
                                    <div className="personal-gender">
                                        <input
                                            type="radio"
                                            id="male"
                                            name="male"
                                            value="male"
                                            className="personal-gender-input"
                                        />
                                        <label htmlFor="male" className="personal-gender-label">
                                            Male
                                        </label>
                                    </div>
                                    <div className="personal-gender">
                                        <input
                                            type="radio"
                                            id="female"
                                            name="female"
                                            value="female"
                                            className="personal-gender-input"
                                        />
                                        <label htmlFor="female" className="personal-gender-label">
                                            Female
                                        </label>
                                    </div>
                                </div>
                                <div className="info-field">
                                    <label htmlFor="skintype" className="personal-label">
                                        Skin type:
                                    </label>
                                    <select className="profile-input" name="skintype" id="skin-type">
                                        <option value="oily-skin-t">Oily skin</option>
                                        <option value="dry-skin">Dry skin</option>
                                        <option value="normal-skin">Normal skin</option>
                                        <option value="com-skin">Combination skin</option>
                                        <option value="sensitve-skin">Sensitive skin</option>
                                    </select>
                                </div>
                                <div className="info-field">
                                    <label htmlFor="skin-prob" className="personal-label">
                                        Skin problem:
                                    </label>
                                    <select className="profile-input" name="skinprob" id="skin-prob">                                  
                                        <option value="acne">Acne-prone</option>
                                        <option value="dull-skin">Dull skin</option>
                                        <option value="large-pores">Large pores</option>
                                        <option value="uneven-skin-tone">Uneven skin tone</option>
                                        <option value="dark-skin">Dark spots & hyperpigmentation</option>
                                        <option value="Red-irritation">Redness & irritation</option>
                                        <option value="aging">Wrinkles & fine lines</option>
                                        <option value="dehydrated-skin">Dehydrated skin</option>
                                    </select>
                                </div>
                                <div className="info-field">
                                    <label htmlFor="skin-prob" className="personal-label">
                                        Skincare goal:
                                    </label>
                                    <select className="profile-input" name="skingoal" id="skin-goal">                                  
                                        <option value="Moisturizing">Hydration & Moisturizing</option>
                                        <option value="acne-control">Acne Control</option>
                                        <option value="anti-aging">Anti-aging</option>
                                        <option value="brightening">Brightening</option>
                                        <option value="oil-control">Oil Control</option>
                                        <option value="repair">Soothing & Repair</option>
                                    </select>
                                </div>

                                <label htmlFor="price-segment" className="personal-label-price">
                                    Price segments (optional):
                                </label>
                                <div className="price-segments">
                                    <div className="personal-price">
                                        <input
                                            className="personal-segment-input"
                                            type="checkbox"
                                            id="drug-store"
                                        ></input>
                                        <label className="personal-segment-label" htmlFor="drug-store">
                                            Drug-store
                                        </label>
                                    </div>
                                    <div className="personal-price">
                                        <input className="personal-segment-input" type="checkbox" id="mid-end"></input>
                                        <label className="personal-segment-label" htmlFor="mid-end">
                                            Mid-end
                                        </label>
                                    </div>
                                    <div className="personal-price">
                                        <input className="personal-segment-input" type="checkbox" id="high-end"></input>
                                        <label className="personal-segment-label" type="checkbox" id="high-end">
                                            High-end
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="save">
                                <button className="save-btn">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default PersonalInfo;
