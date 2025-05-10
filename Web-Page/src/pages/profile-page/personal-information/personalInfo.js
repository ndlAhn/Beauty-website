import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Button,
    Card,
    CardContent,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel,
    MenuItem,
    Select,
    Typography,
    TextField,
    Avatar,
    Paper,
    Divider,
} from '@mui/material';
import instance from '../../../axios/instance';
import StateContext from '../../../context/context.context';
import SubHeader from '../../../components/subHeader/subHeader';
import ProfileSidebar from '../../../components/sidebar/profile-sidebar/profileSidebar';
import './personalInfo.css';
const SKIN_TYPES = [
    { value: 'oily', label: 'Oily skin' },
    { value: 'dry', label: 'Dry skin' },
    { value: 'normal', label: 'Normal skin' },
    { value: 'combination', label: 'Combination skin' },
    { value: 'sensitive', label: 'Sensitive skin' },
    { value: 'acne_prone', label: 'Acne-prone skin' },
];

const SKIN_PROBLEMS = [
    { value: 'acne', label: 'Acne' },
    { value: 'aging', label: 'Aging' },
    { value: 'dried', label: 'Dried skin' },
    { value: 'oily', label: 'Oily skin' },
    { value: 'enlarged_pores', label: 'Enlarged pores' },
    { value: 'scarring', label: 'Scarring' },
    { value: 'skin_recovery', label: 'Skin recovery' },
];

const ALLERGY_OPTIONS = [
    { value: 'fragrance', label: 'Fragrance' },
    { value: 'alcohol', label: 'Alcohol' },
    { value: 'silicones', label: 'Silicones' },
    { value: 'parabens', label: 'Parabens' },
    { value: 'essential_oil', label: 'Essential Oils' },
];

function PersonalInfo() {
    const [state, dispatchState] = useContext(StateContext);
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        bio: '',
        avt_path: '',
        skin_type: '',
        acne: false,
        aging: false,
        dried: false,
        oily: false,
        enlarged_pores: false,
        scarring: false,
        skin_recovery: false,
        fragrance: false,
        alcohol: false,
        silicones: false,
        parabens: false,
        essential_oil: false,
    });

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        try {
            const response = await instance.post('/get-user-data-by-id', {
                user_id: state.userData?.user_id,
            });
            console.log(response.data);
            setUserData(response.data);
            setFormData({
                skin_type: response.data.skin_type,
                name: response.data.name || '',
                bio: response.data.bio || '',
                avt_path: response.data.avt_path || '',
                skin_type: response.data.skin_type || '',
                acne: response.data.acne || false,
                aging: response.data.aging || false,
                dried: response.data.dried || false,
                oily: response.data.oily || false,
                enlarged_pores: response.data.enlarged_pores || false,
                scarring: response.data.scarring || false,
                skin_recovery: response.data.skin_recovery || false,
                fragrance: response.data.fragrance || false,
                alcohol: response.data.alcohol || false,
                silicones: response.data.silicones || false,
                parabens: response.data.parabens || false,
                essential_oil: response.data.essential_oil || false,
            });
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSkinProblemChange = (problem) => {
        setFormData((prev) => ({
            ...prev,
            [problem]: !prev[problem],
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Update basic info
            await instance.post('/update-info', {
                user_id: state.userData?.user_id,
                name: formData.name,
                bio: formData.bio,
                avt_path: formData.avt_path,
            });

            // Update skin and allergy info
            await instance.post('/survey', {
                user_id: state.userData?.user_id,
                skinType: formData.skin_type,
                skinProb: {
                    acne: formData.acne,
                    aging: formData.aging,
                    dried: formData.dried,
                    oily: formData.oily,
                    enlarged_pores: formData.enlarged_pores,
                    scarring: formData.scarring,
                    skin_recovery: formData.skin_recovery,
                },
                allergies: [
                    formData.fragrance ? 'fragrance' : null,
                    formData.alcohol ? 'alcohol' : null,
                    formData.silicones ? 'silicones' : null,
                    formData.parabens ? 'parabens' : null,
                    formData.essential_oil ? 'essential_oil' : null,
                ].filter(Boolean),
            });

            setEditMode(false);
            fetchUserData(); // Refresh data
        } catch (error) {
            console.error('Error updating user data:', error);
        }
    };

    const textColor = 'rgb(169, 80, 80)';
    const buttonColor = 'rgb(169, 80, 80)';

    if (!userData) {
        return <Typography>Loading...</Typography>;
    }

    return (
        <div>
            <SubHeader />

            <div className="personal-wrap">
                <ProfileSidebar />

                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#f5f5f5',
                        flex: 1,
                        padding: '0 30px ',
                        backgroundColor: 'white',
                        paddingBottom: '30px',
                    }}
                >
                    <Paper
                        elevation={3}
                        sx={{
                            width: '100%',
                            maxWidth: 800,
                            p: 4,
                            borderRadius: 2,
                        }}
                    >
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                            <Typography variant="h4" sx={{ color: textColor, fontWeight: 'bold' }}>
                                User Profile
                            </Typography>
                            <Button
                                variant="contained"
                                onClick={() => setEditMode(!editMode)}
                                sx={{
                                    backgroundColor: buttonColor,
                                    '&:hover': { backgroundColor: 'rgb(140, 60, 60)' },
                                }}
                            >
                                {editMode ? 'Cancel' : 'Edit Profile'}
                            </Button>
                        </Box>

                        {editMode ? (
                            <form onSubmit={handleSubmit}>
                                <Box sx={{ display: 'flex', gap: 4, mb: 4 }}>
                                    <Box sx={{ flex: 1 }}>
                                        <FormControl fullWidth sx={{ mb: 3 }}>
                                            <FormLabel sx={{ color: textColor, mb: 1, fontWeight: 'bold' }}>
                                                Skin type:
                                            </FormLabel>
                                            <Select
                                                name="skin_type"
                                                value={formData.skin_type}
                                                onChange={handleInputChange}
                                            >
                                                {SKIN_TYPES.map((type) => (
                                                    <MenuItem key={type.value} value={type.value}>
                                                        {type.label}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>

                                        <FormControl fullWidth sx={{ mb: 3 }}>
                                            <FormLabel sx={{ color: textColor, mb: 1, fontWeight: 'bold' }}>
                                                Skin problems:
                                            </FormLabel>
                                            <FormGroup>
                                                {SKIN_PROBLEMS.map((problem) => (
                                                    <FormControlLabel
                                                        key={problem.value}
                                                        control={
                                                            <Checkbox
                                                                checked={formData[problem.value]}
                                                                onChange={() => handleSkinProblemChange(problem.value)}
                                                                name={problem.value}
                                                            />
                                                        }
                                                        label={problem.label}
                                                    />
                                                ))}
                                            </FormGroup>
                                        </FormControl>

                                        <FormControl fullWidth sx={{ mb: 3 }}>
                                            <FormLabel sx={{ color: textColor, mb: 1, fontWeight: 'bold' }}>
                                                Ingredient Allergies:
                                            </FormLabel>
                                            <FormGroup>
                                                {ALLERGY_OPTIONS.map((allergy) => (
                                                    <FormControlLabel
                                                        key={allergy.value}
                                                        control={
                                                            <Checkbox
                                                                checked={formData[allergy.value]}
                                                                onChange={() => handleSkinProblemChange(allergy.value)}
                                                                name={allergy.value}
                                                            />
                                                        }
                                                        label={allergy.label}
                                                    />
                                                ))}
                                            </FormGroup>
                                        </FormControl>
                                    </Box>
                                </Box>

                                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        sx={{
                                            backgroundColor: buttonColor,
                                            color: 'white',
                                            px: 4,
                                            py: 1.5,
                                            '&:hover': {
                                                backgroundColor: 'rgb(140, 60, 60)',
                                            },
                                        }}
                                    >
                                        Save Changes
                                    </Button>
                                </Box>
                            </form>
                        ) : (
                            <Box sx={{ display: 'flex', gap: 4 }}>
                                <Box sx={{ flex: 1 }}>
                                    <Avatar
                                        src={`https://res.cloudinary.com/dppaihihm/image/upload/${formData.avt_path}.jpg`}
                                        sx={{ width: 150, height: 150, mb: 3 }}
                                    />
                                    <Typography variant="h5" sx={{ mb: 1, fontWeight: 'bold' }}>
                                        {userData.name}
                                    </Typography>
                                    <Typography variant="body1" sx={{ mb: 3 }}>
                                        {userData.bio || 'No bio provided'}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Username: {userData.username}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Gender: {userData.gender}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Date of Birth: {new Date(userData.dob).toLocaleDateString()}
                                    </Typography>
                                </Box>

                                <Box sx={{ flex: 1 }}>
                                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                                        Skin Information
                                    </Typography>
                                    <Divider sx={{ mb: 2 }} />

                                    <Typography variant="body1" sx={{ mb: 1 }}>
                                        <strong>Skin Type:</strong> {userData.skin_type || 'Not specified'}
                                    </Typography>

                                    <Typography variant="body1" sx={{ mb: 1 }}>
                                        <strong>Skin Concerns:</strong>
                                    </Typography>
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                                        {SKIN_PROBLEMS.map(
                                            (problem) =>
                                                userData[problem.value] && (
                                                    <Typography
                                                        key={problem.value}
                                                        variant="body2"
                                                        sx={{
                                                            backgroundColor: '#f0f0f0',
                                                            px: 1.5,
                                                            py: 0.5,
                                                            borderRadius: 1,
                                                        }}
                                                    >
                                                        {problem.label}
                                                    </Typography>
                                                ),
                                        )}
                                        {!SKIN_PROBLEMS.some((problem) => userData[problem.value]) && (
                                            <Typography variant="body2" color="text.secondary">
                                                No skin concerns specified
                                            </Typography>
                                        )}
                                    </Box>

                                    <Typography variant="body1" sx={{ mb: 1 }}>
                                        <strong>Allergies to Avoid:</strong>
                                    </Typography>
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                        {ALLERGY_OPTIONS.map(
                                            (allergy) =>
                                                userData[allergy.value] && (
                                                    <Typography
                                                        key={allergy.value}
                                                        variant="body2"
                                                        sx={{
                                                            backgroundColor: '#f0f0f0',
                                                            px: 1.5,
                                                            py: 0.5,
                                                            borderRadius: 1,
                                                        }}
                                                    >
                                                        {allergy.label}
                                                    </Typography>
                                                ),
                                        )}
                                        {!ALLERGY_OPTIONS.some((allergy) => userData[allergy.value]) && (
                                            <Typography variant="body2" color="text.secondary">
                                                No allergies specified
                                            </Typography>
                                        )}
                                    </Box>
                                </Box>
                            </Box>
                        )}
                    </Paper>
                </Box>
            </div>
        </div>
    );
}

export default PersonalInfo;
