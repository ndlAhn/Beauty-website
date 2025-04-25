import './personalInfo.css';
import SubHeader from '../../../components/subHeader/subHeader';
import ProfileSidebar from '../../../components/sidebar/profile-sidebar/profileSidebar';
import { useContext, useEffect } from 'react';
import StateContext from '../../../context/context.context';
import React, { useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import {
   
    Checkbox,
    ListItemText
  } from '@mui/material';

function PersonalInfo() {
    
    const [selectedGoals, setSelectedGoals] = useState([]);

  const skincareGoals = [
    { value: 'Moisturizing', label: 'Hydration & Moisturizing' },
    { value: 'acne-control', label: 'Acne Control' },
    { value: 'anti-aging', label: 'Anti-aging' },
    { value: 'brightening', label: 'Brightening' },
    { value: 'oil-control', label: 'Oil Control' },
    { value: 'repair', label: 'Soothing & Repair' }
  ];

    const [selectedProblems, setSelectedProblems] = useState([]);
    const skinProblems = [
        { value: 'acne', label: 'Acne-prone' },
        { value: 'dull-skin', label: 'Dull skin' },
        { value: 'large-pores', label: 'Large pores' },
        { value: 'uneven-skin-tone', label: 'Uneven skin tone' },
        { value: 'dark-skin', label: 'Dark spots & hyperpigmentation' },
        { value: 'Red-irritation', label: 'Redness & irritation' },
        { value: 'aging', label: 'Wrinkles & fine lines' },
        { value: 'dehydrated-skin', label: 'Dehydrated skin' }
      ];
    const [skinType, setSkinType] = useState('');
    const handleChange = (event) => {
        const { name, value } = event.target;
        // **[CHỈNH SỬA 1]:** Xử lý logic cho từng trường hợp dựa trên thuộc tính 'name' của input
        if (name === 'skingoal') {
            setSelectedGoals(value);
        } else if (name === 'skinprob') {
            setSelectedProblems(value);
        } else if (name === 'skintype') {
            setSkinType(value);
        }
    };
    const [gender, setGender] = useState('');
    const handleGenderChange = (event) => {
    setGender(event.target.value);
  };
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
                                    <div className="gender-group">
                                    <div className="personal-gender">
                                        <input
                                        type="radio"
                                        id="male"
                                        name="gender"
                                        value="male"
                                        checked={gender === 'male'}
                                        onChange={handleGenderChange}
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
                                        name="gender"
                                        value="female"
                                        checked={gender === 'female'}
                                        onChange={handleGenderChange}
                                        className="personal-gender-input"
                                        />
                                    <label htmlFor="female" className="personal-gender-label">
                                        Female
                                    </label>
                                    </div>
                                    </div>

                                </div>
                                <div className="info-field">
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
  <label htmlFor="skin-type" className="personal-label" style={{ marginBottom: 0 }}>
    Skin type:
  </label>

  <FormControl fullWidth style={{ flex: 1 }}>
    <Select
      id="skin-type"
      name="skintype"
      value={skinType}
      onChange={handleChange}
      className="profile-input"
      displayEmpty
      sx={{
        backgroundColor: '#ffffff',
        height: '40px',
        minWidth: '200px',
      }}
    >
      <MenuItem value="" disabled>Select skin type</MenuItem>
      <MenuItem value="oily-skin">Oily skin</MenuItem>
      <MenuItem value="dry-skin">Dry skin</MenuItem>
      <MenuItem value="normal-skin">Normal skin</MenuItem>
      <MenuItem value="com-skin">Combination skin</MenuItem>
      <MenuItem value="sensitive-skin">Sensitive skin</MenuItem>
    </Select>
  </FormControl>
</div>

{false && skinType && (
  <div style={{ backgroundColor: '#d4a6a6', padding: '10px', marginTop: '10px', textAlign: 'center' }}>
    {skinType.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
  </div>
)}

    </div>
                                {/* skin problem */}
                                <div className="info-field" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
      <label htmlFor="skin-prob" className="personal-label" style={{ marginBottom: 0, minWidth: '120px' }}>
        Skin problem:
      </label>
      
      <FormControl fullWidth style={{ flex: 1 }}>
        <Select
          id="skin-prob"
          name="skinprob"
          multiple
          value={selectedProblems}
          onChange={handleChange}
          displayEmpty
          renderValue={(selected) => {
            if (selected.length === 0) {
              return "Select skin problems";
            }
            return selected.map(value => {
              const problem = skinProblems.find(p => p.value === value);
              return problem ? problem.label : value;
            }).join(', ');
          }}
          sx={{
            backgroundColor: '#ffffff',
            minHeight: '40px',
            '& .MuiSelect-select': {
              padding: '8px 32px 8px 12px',
            }
          }}
        >
          <MenuItem value="" disabled>
            Select skin problems
          </MenuItem>
          {skinProblems.map((problem) => (
            <MenuItem key={problem.value} value={problem.value}>
              <Checkbox checked={selectedProblems.indexOf(problem.value) > -1} />
              <ListItemText primary={problem.label} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
                                {/* skincare goal */}
                                <div className="info-field" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
      <label htmlFor="skin-goal" className="personal-label" style={{ marginBottom: 0, minWidth: '120px' }}>
        Skincare goal:
      </label>
      
      <FormControl fullWidth style={{ flex: 1 }}>
        <Select
          id="skin-goal"
          name="skingoal"
          multiple
          value={selectedGoals}
          onChange={handleChange}
          displayEmpty
          renderValue={(selected) => {
            if (selected.length === 0) {
              return "Select skincare goals";
            }
            return selected.map(value => {
              const goal = skincareGoals.find(g => g.value === value);
              return goal ? goal.label : value;
            }).join(', ');
          }}
          sx={{
            backgroundColor: '#ffffff',
            minHeight: '40px',
            '& .MuiSelect-select': {
              padding: '8px 32px 8px 12px',
            }
          }}
        >
          <MenuItem value="" disabled>
            Select skincare goals
          </MenuItem>
          {skincareGoals.map((goal) => (
            <MenuItem key={goal.value} value={goal.value}>
              <Checkbox checked={selectedGoals.indexOf(goal.value) > -1} />
              <ListItemText primary={goal.label} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
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
