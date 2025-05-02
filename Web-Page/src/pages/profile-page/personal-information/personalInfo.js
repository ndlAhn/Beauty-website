import './personalInfo.css';
import SubHeader from '../../../components/subHeader/subHeader';
import ProfileSidebar from '../../../components/sidebar/profile-sidebar/profileSidebar';
import { useContext, useEffect, useState } from 'react';
import StateContext from '../../../context/context.context';
import instance from '../../../axios/instance';
import { FormControl, InputLabel, MenuItem, Select, Checkbox, ListItemText, Button } from '@mui/material';

function PersonalInfo() {
    const [state, dispatchState] = useContext(StateContext);
    const [loading, setLoading] = useState(true);
    const [selectedAllergies, setSelectedAllergies] = useState([]);

// Add this to your existing options
const allergyOptions = [
  { value: 'fragrance', label: 'Fragrance' },
  { value: 'alcohol', label: 'Alcohol' },
  { value: 'silicones', label: 'Silicones' },
  { value: 'parabens', label: 'Parabens' },
  { value: 'essential_oils', label: 'Essential Oils' },
  // Add more from your SAFETY_PROPERTIES as needed
];

const handleAllergyChange = (event) => {
  setSelectedAllergies(event.target.value);
};

    // Form states
    const [name, setName] = useState('');
    const [dob, setDob] = useState('');
    const [gender, setGender] = useState('');
    const [skinType, setSkinType] = useState('');
    const [selectedProblems, setSelectedProblems] = useState([]);
    const [selectedGoals, setSelectedGoals] = useState([]);
    const [priceSegments, setPriceSegments] = useState({
        drug_store: false,
        mid_end: false,
        high_end: false,
    });
    const [avatarPath, setAvatarPath] = useState('');

    // Options data
    const skincareGoals = [
        { value: 'Moisturizing', label: 'Hydration & Moisturizing' },
        { value: 'acne-control', label: 'Acne Control' },
        { value: 'anti-aging', label: 'Anti-aging' },
        { value: 'brightening', label: 'Brightening' },
        { value: 'oil-control', label: 'Oil Control' },
        { value: 'repair', label: 'Soothing & Repair' },
    ];

    const skinProblems = [
        { value: 'acne', label: 'Acne-prone' },
        { value: 'dull-skin', label: 'Dull skin' },
        { value: 'large-pores', label: 'Large pores' },
        { value: 'uneven-skin-tone', label: 'Uneven skin tone' },
        { value: 'dark-skin', label: 'Dark spots & hyperpigmentation' },
        { value: 'Red-irritation', label: 'Redness & irritation' },
        { value: 'aging', label: 'Wrinkles & fine lines' },
        { value: 'dehydrated-skin', label: 'Dehydrated skin' },
    ];

    // Fetch user data
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await instance.post('/get-user-data-by-id', {
                    user_id: state.userData?.userId,
                });

                if (response.data.success) {
                    const userData = response.data.data;

                    // Map data to form fields
                    setName(userData.name || '');
                    setDob(userData.dob ? new Date(userData.dob).toISOString().split('T')[0] : '');
                    setGender(userData.gender || '');
                    setSkinType(userData.skin_type || '');
                    setAvatarPath(userData.avt_path || '');

                    // Map skin problems (convert boolean fields to array)
                    const problems = [];
                    if (userData.acne) problems.push('acne');
                    if (userData.aging) problems.push('aging');
                    if (userData.dried) problems.push('dehydrated-skin');
                    if (userData.oily) problems.push('oil-control');
                    if (userData.elarged_pores) problems.push('large-pores');
                    if (userData.scarring) problems.push('dark-skin');
                    setSelectedProblems(problems);

                    // Map skincare goals
                    if (userData.skincare_goals) {
                        setSelectedGoals(userData.skincare_goals);
                    }

                    // Map price segments
                    if (userData.price_segments) {
                        setPriceSegments({
                            drug_store: userData.price_segments.drug_store || false,
                            mid_end: userData.price_segments.mid_end || false,
                            high_end: userData.price_segments.high_end || false,
                        });
                    }
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [state.userData?.userId]);

    const handleChange = (event) => {
        const { name, value } = event.target;

        if (name === 'skingoal') {
            setSelectedGoals(value);
        } else if (name === 'skinprob') {
            setSelectedProblems(value);
        } else if (name === 'skintype') {
            setSkinType(value);
        }
    };

    const handleGenderChange = (event) => {
        setGender(event.target.value);
    };

    const handlePriceSegmentChange = (segment) => {
        setPriceSegments((prev) => ({
            ...prev,
            [segment]: !prev[segment],
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = {
                user_id: state.userData.userId,
                name: e.target.Uname.value,
                dob: e.target.dob.value,
                gender,
                skin_type: skinType,
                // Map skin problems to boolean fields
                acne: selectedProblems.includes('acne'),
                aging: selectedProblems.includes('aging'),
                dried: selectedProblems.includes('dehydrated-skin'),
                oily: selectedProblems.includes('oil-control'),
                elarged_pores: selectedProblems.includes('large-pores'),
                scarring: selectedProblems.includes('dark-skin'),
                skincare_goals: selectedGoals,
                price_segments: priceSegments,
                avt_path: avatarPath,
            };

            const response = await instance.post('/update-info', formData);

            if (response.data.success) {
                // Update context or show success message
                console.log('Profile updated successfully');
            }
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <SubHeader />
            <div className="personal-wrap">
                <ProfileSidebar />
                <div className="personal-content-wrap">
                    <div className="personal-content">
                        <form className="survey-form" onSubmit={handleSubmit}>
                            <div className="form-title">
                                <h2>Personal Information</h2>
                            </div>
                            <h5>Tailor your experience for better recommendations</h5>
                            <p>This is your hub to manage and update your skin’s unique details. By keeping your profile accurate, you’ll receive personalized product matches that align with your skin type, concerns, and goals.</p>
                            <p>What You Can Do Here:</p>
                            <p>✧ Edit your skin profile: Update your skin type, concerns, and goals as they change.</p>
                            <p>✧ Track allergies: Flag ingredients to avoid, so we filter out unsuitable products.</p>
                            <p>✧ Optimize recommendations: The more precise your profile, the better your matches!</p>

                            <div className="personal-survey-field">
                                {/* Name Field */}
                                <div className="info-field">
                                    <label className="personal-label" htmlFor="Uname">
                                        Name:
                                    </label>
                                    <input
                                        className="profile-input"
                                        type="text"
                                        id="Uname"
                                        name="Uname"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                </div>

                                {/* Date of Birth Field */}
                                <div className="info-field">
                                    <label htmlFor="dob" className="personal-label">
                                        Date of birth:
                                    </label>
                                    <input
                                        className="profile-input"
                                        type="date"
                                        id="dob"
                                        value={dob}
                                        onChange={(e) => setDob(e.target.value)}
                                        required
                                    />
                                </div>

                                {/* Gender Field */}
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

                                {/* Skin Type Field */}
                                <div
                                    className="info-field"
                                    style={{ display: 'flex', alignItems: 'center', gap: '16px' }}
                                >
                                    <label htmlFor="skin-type" className="personal-label" style={{ marginBottom: 0 }}>
                                        Skin type:
                                    </label>
                                    <FormControl fullWidth style={{ flex: 1 }}>
                                        <Select
                                            id="skin-type"
                                            name="skintype"
                                            value={skinType}
                                            onChange={(e) => setSkinType(e.target.value)}
                                            className="profile-input"
                                            displayEmpty
                                            sx={{
                                                backgroundColor: '#ffffff',
                                                height: '40px',
                                                minWidth: '200px',
                                            }}
                                        >
                                            <MenuItem value="" disabled>
                                                Select skin type
                                            </MenuItem>
                                            <MenuItem value="oily">Oily skin</MenuItem>
                                            <MenuItem value="dry">Dry skin</MenuItem>
                                            <MenuItem value="normal">Normal skin</MenuItem>
                                            <MenuItem value="combination">Combination skin</MenuItem>
                                            <MenuItem value="sensitive">Sensitive skin</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>

                                {/* Skin Problems Field */}
                                <div
                                    className="info-field"
                                    style={{ display: 'flex', alignItems: 'center', gap: '16px' }}
                                >
                                    <label
                                        htmlFor="skin-prob"
                                        className="personal-label"
                                        style={{ marginBottom: 0, minWidth: '120px' }}
                                    >
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
                                                    return 'Select skin problems';
                                                }
                                                return selected
                                                    .map((value) => {
                                                        const problem = skinProblems.find((p) => p.value === value);
                                                        return problem ? problem.label : value;
                                                    })
                                                    .join(', ');
                                            }}
                                            sx={{
                                                backgroundColor: '#ffffff',
                                                minHeight: '40px',
                                                '& .MuiSelect-select': {
                                                    padding: '8px 32px 8px 12px',
                                                },
                                            }}
                                        >
                                            {skinProblems.map((problem) => (
                                                <MenuItem key={problem.value} value={problem.value}>
                                                    <Checkbox checked={selectedProblems.indexOf(problem.value) > -1} />
                                                    <ListItemText primary={problem.label} />
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </div>

                                {/* Skincare Goals Field */}
                                <div
                                    className="info-field"
                                    style={{ display: 'flex', alignItems: 'center', gap: '16px' }}
                                >
                                    <label
                                        htmlFor="skin-goal"
                                        className="personal-label"
                                        style={{ marginBottom: 0, minWidth: '120px' }}
                                    >
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
                                                    return 'Select skincare goals';
                                                }
                                                return selected
                                                    .map((value) => {
                                                        const goal = skincareGoals.find((g) => g.value === value);
                                                        return goal ? goal.label : value;
                                                    })
                                                    .join(', ');
                                            }}
                                            sx={{
                                                backgroundColor: '#ffffff',
                                                minHeight: '40px',
                                                '& .MuiSelect-select': {
                                                    padding: '8px 32px 8px 12px',
                                                },
                                            }}
                                        >
                                            {skincareGoals.map((goal) => (
                                                <MenuItem key={goal.value} value={goal.value}>
                                                    <Checkbox checked={selectedGoals.indexOf(goal.value) > -1} />
                                                    <ListItemText primary={goal.label} />
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </div>
                                {/* Ingredient Allergy Field */}
<div 
  className="info-field" 
  style={{ display: 'flex', alignItems: 'center', gap: '16px' }}
>
  <label
    htmlFor="ingredient-allergy"
    className="personal-label"
    style={{ marginBottom: 0, minWidth: '120px' }}
  >
    Ingredient allergy:
  </label>
  <FormControl fullWidth style={{ flex: 1 }}>
    <Select
      id="ingredient-allergy"
      name="ingredientAllergy"
      multiple
      value={selectedAllergies}
      onChange={handleAllergyChange}
      displayEmpty
      renderValue={(selected) => {
        if (selected.length === 0) {
          return 'Select ingredient allergies';
        }
        return selected
          .map((value) => {
            const allergy = allergyOptions.find((a) => a.value === value);
            return allergy ? allergy.label : value;
          })
          .join(', ');
      }}
      sx={{
        backgroundColor: '#ffffff',
        minHeight: '40px',
        '& .MuiSelect-select': {
          padding: '8px 32px 8px 12px',
        },
      }}
    >
      {allergyOptions.map((allergy) => (
        <MenuItem key={allergy.value} value={allergy.value}>
          <Checkbox checked={selectedAllergies.indexOf(allergy.value) > -1} />
          <ListItemText primary={allergy.label} />
        </MenuItem>
      ))}
    </Select>
  </FormControl>
</div>

                                {/* Price Segments Field */}
                                {/* <label htmlFor="price-segment" className="personal-label-price">
                                    Price segments (optional):
                                </label>
                                <div className="price-segments">
                                    {Object.entries(priceSegments).map(([key, value]) => (
                                        <div key={key} className="personal-price">
                                            <input
                                                className="personal-segment-input"
                                                type="checkbox"
                                                id={key}
                                                checked={value}
                                                onChange={() => handlePriceSegmentChange(key)}
                                            />
                                            <label className="personal-segment-label" htmlFor={key}>
                                                {key
                                                    .split('_')
                                                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                                                    .join('-')}
                                            </label>
                                        </div>
                                    ))}
                                </div> */}
                            </div>
                            <div className="save">
                                <button type="submit" className="save-btn">
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PersonalInfo;
