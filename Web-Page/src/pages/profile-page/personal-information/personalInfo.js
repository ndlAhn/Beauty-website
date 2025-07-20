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
    CircularProgress,
    Alert,
    Chip,
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
    { value: 'acne_prone', label: 'Acne-prone' },
    { value: 'dull_skin', label: 'Dull skin' },
    { value: 'large_pores', label: 'Large pores' },
    { value: 'uneven', label: 'Uneven' },
    { value: 'dark_spot', label: 'Dark spot' },
    { value: 'redness', label: 'Redness' },
    { value: 'dehydrated', label: 'Dehydrated' },
    { value: 'wrinkles', label: 'Wrinkles' },
];
// const SKIN_PROBLEMS = [
//     { value: 'acne', label: 'Acne' },
//     { value: 'aging', label: 'Aging' },
//     { value: 'dried', label: 'Dried skin' },
//     { value: 'oily', label: 'Oily skin' },
//     { value: 'enlarged_pores', label: 'Enlarged pores' },
//     { value: 'scarring', label: 'Scarring' },
//     { value: 'skin_recovery', label: 'Skin recovery' },
// ];

const SKINCARE_GOALS = [
    { value: 'hydration', label: 'Hydration' },
    { value: 'acne_control', label: 'Acne Control' },
    { value: 'anti_aging', label: 'Anti-Aging' },
    { value: 'brightening', label: 'Brightening' },
    { value: 'oil_control', label: 'Oil Control' },
    { value: 'smooth_and_repair', label: 'Smooth & Repair' },
];

function PersonalInfo() {
    const [state] = useContext(StateContext);
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        bio: '',
        avt_path: '',
        skin_type: '',
        skinProblems: {},
        skincareGoals: {},
        allergies: [],
    });

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        try {
            console.log('Hello');
            setLoading(true);
            const response = await instance.post('/get-user-data-by-id', {
                user_id: state.userData?.user_id,
            });
            const user = response.data.data;
            const skinProblems = {
                acne_prone: user.acne_prone || false,
                dull_skin: user.dull_skin || false,
                large_pores: user.large_pores || false,
                uneven: user.uneven || false,
                dark_spot: user.dark_spot || false,
                redness: user.redness || false,
                dehydrated: user.dehydrated || false,
                wrinkles: user.wrinkles || false,
            };

            const skincareGoals = {
                hydration: user.hydration || false,
                acne_control: user.acne_control || false,
                anti_aging: user.anti_aging || false,
                brightening: user.brightening || false,
                oil_control: user.oil_control || false,
                smooth_and_repair: user.smooth_and_repair || false,
            };

            setUserData(user);
            setFormData({
                name: user.name || '',
                bio: user.bio || '',
                avt_path: user.avt_path || '',
                skin_type: user.skin_type || '',
                skinProblems,
                skincareGoals,
                allergies: user.allergies || [],
            });
        } catch (error) {
            console.error('Error fetching user data:', error);
            setError('Failed to load user data');
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSkinProblemChange = (problem) => {
        setFormData((prev) => ({
            ...prev,
            skinProblems: {
                ...prev.skinProblems,
                [problem]: !prev.skinProblems[problem],
            },
        }));
    };

    const handleSkincareGoalChange = (goal) => {
        setFormData((prev) => ({
            ...prev,
            skincareGoals: {
                ...prev.skincareGoals,
                [goal]: !prev.skincareGoals[goal],
            },
        }));
    };

    const handleAllergyChange = (allergyId, isChecked) => {
        setFormData((prev) => {
            const newAllergies = isChecked
                ? [...prev.allergies, allergyId]
                : prev.allergies.filter((id) => id !== allergyId);
            return { ...prev, allergies: newAllergies };
        });
    };

    // ...existing code...
const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
        // Update basic info
        await instance.post('/update-info', {
            user_id: state.userData?.user_id,
            name: formData.name,
            bio: formData.bio,
            avt_path: formData.avt_path,
        });

        // Update skin, goals and allergy info
        await instance.post('/survey', {
            user_id: state.userData?.user_id,
            skin_type: formData.skin_type,
            acne_prone: formData.skinProblems.acne_prone || false,
            dull_skin: formData.skinProblems.dull_skin || false,
            large_pores: formData.skinProblems.large_pores || false,
            uneven: formData.skinProblems.uneven || false,
            dark_spot: formData.skinProblems.dark_spot || false,
            redness: formData.skinProblems.redness || false,
            dehydrated: formData.skinProblems.dehydrated || false,
            wrinkles: formData.skinProblems.wrinkles || false,
            hydration: formData.skincareGoals.hydration || false,
            acne_control: formData.skincareGoals.acne_control || false,
            anti_aging: formData.skincareGoals.anti_aging || false,
            brightening: formData.skincareGoals.brightening || false,
            oil_control: formData.skincareGoals.oil_control || false,
            smooth_and_repair: formData.skincareGoals.smooth_and_repair || false,
            allergies: formData.allergies,
        });

        setEditMode(false);
        await fetchUserData();
    } catch (error) {
        console.error('Error updating user data:', error);
        setError('Failed to update profile. Please try again.');
    } finally {
        setLoading(false);
    }
};
// ...existing code...

    const textColor = 'rgb(169, 80, 80)';
    const buttonColor = 'rgb(169, 80, 80)';

    if (loading && !userData) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (!userData) {
        return <Typography>No user data available</Typography>;
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
                        flex: 1,
                        padding: '0 30px',
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

                        {error && (
                            <Alert severity="error" sx={{ mb: 3 }}>
                                {error}
                            </Alert>
                        )}

                        {editMode ? (
                            <form onSubmit={handleSubmit}>
                                <Box sx={{ display: 'flex', gap: 4, mb: 4 }}>
                                    <Box sx={{ flex: 1 }}>
                                        <TextField
                                            fullWidth
                                            label="Name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            sx={{ mb: 3 }}
                                        />
                                        <TextField
                                            fullWidth
                                            label="Bio"
                                            name="bio"
                                            value={formData.bio}
                                            onChange={handleInputChange}
                                            multiline
                                            rows={3}
                                            sx={{ mb: 3 }}
                                        />
                                        <TextField
                                            fullWidth
                                            label="Avatar URL"
                                            name="avt_path"
                                            value={formData.avt_path}
                                            onChange={handleInputChange}
                                            sx={{ mb: 3 }}
                                        />

                                        <FormControl fullWidth sx={{ mb: 3 }}>
                                            <FormLabel sx={{ color: textColor, mb: 1, fontWeight: 'bold' }}>
                                                Skin type:
                                            </FormLabel>
                                            <Select
                                                name="skin_type"
                                                value={formData.skin_type}
                                                onChange={handleInputChange}
                                            >
                                                {SKIN_TYPES.map((type, index) => (
                                                    <MenuItem key={index} value={type.value}>
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
                                                {SKIN_PROBLEMS.map((problem, index) => (
                                                    <FormControlLabel
                                                        key={index}
                                                        control={
                                                            <Checkbox
                                                                checked={formData.skinProblems[problem.value]}
                                                                onChange={() => handleSkinProblemChange(problem.value)}
                                                            />
                                                        }
                                                        label={problem.label}
                                                    />
                                                ))}
                                            </FormGroup>
                                        </FormControl>

                                        <FormControl fullWidth sx={{ mb: 3 }}>
                                            <FormLabel sx={{ color: textColor, mb: 1, fontWeight: 'bold' }}>
                                                Skincare Goals:
                                            </FormLabel>
                                            <FormGroup>
                                                {SKINCARE_GOALS.map((goal, index) => (
                                                    <FormControlLabel
                                                        key={index}
                                                        control={
                                                            <Checkbox
                                                                checked={formData.skincareGoals[goal.value]}
                                                                onChange={() => handleSkincareGoalChange(goal.value)}
                                                            />
                                                        }
                                                        label={goal.label}
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
                                        disabled={loading}
                                        sx={{
                                            backgroundColor: buttonColor,
                                            color: 'white',
                                            px: 4,
                                            py: 1.5,
                                            '&:hover': {
                                                backgroundColor: 'rgb(140, 60, 60)',
                                            },
                                        }}
                                        startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
                                    >
                                        {loading ? 'Saving...' : 'Save Changes'}
                                    </Button>
                                </Box>
                            </form>
                        ) : (
                            <Box sx={{ display: 'flex', gap: 4 }}>
                                <Box sx={{ flex: 1 }}>
                                    <Avatar
                                        src={formData.avt_path || '/default-avatar.png'}
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
                                        Date of Birth:{' '}
                                        {userData.dob ? new Date(userData.dob).toLocaleDateString() : 'Not specified'}
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
                                            (problem, index) =>
                                                userData[problem.value] && (
                                                    <Chip
                                                        key={index}
                                                        label={problem.label}
                                                        sx={{ backgroundColor: '#f0f0f0' }}
                                                    />
                                                ),
                                        )}
                                        {!SKIN_PROBLEMS.some((problem) => userData[problem.value]) && (
                                            <Typography variant="body2" color="text.secondary">
                                                No skin concerns specified
                                            </Typography>
                                        )}
                                    </Box>

                                    <Typography variant="body1" sx={{ mb: 1 }}>
                                        <strong>Skincare Goals:</strong>
                                    </Typography>
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                                        {SKINCARE_GOALS.map(
                                            (goal, index) =>
                                                userData[goal.value] && (
                                                    <Chip
                                                        key={index}
                                                        label={goal.label}
                                                        sx={{ backgroundColor: '#f0f0f0' }}
                                                    />
                                                ),
                                        )}
                                        {!SKINCARE_GOALS.some((goal) => userData[goal.value]) && (
                                            <Typography variant="body2" color="text.secondary">
                                                No skincare goals specified
                                            </Typography>
                                        )}
                                    </Box>

                                    <Typography variant="body1" sx={{ mb: 1 }}>
                                        <strong>Allergies to Avoid:</strong>
                                    </Typography>
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                        {userData.allergies?.length > 0 ? (
                                            userData.allergies.map((allergy, index) => (
                                                <Chip
                                                    key={index}
                                                    label={allergy.name}
                                                    sx={{ backgroundColor: '#f0f0f0' }}
                                                />
                                            ))
                                        ) : (
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
