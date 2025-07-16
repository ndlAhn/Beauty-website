import { useContext, useState } from 'react';
import instance from '../../axios/instance';
import StateContext from '../../context/context.context';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Button,
    Checkbox,
    FormControl,
    FormLabel,
    MenuItem,
    Select,
    Typography,
    Paper,
    ListItemText,
    CircularProgress,
    Alert,
} from '@mui/material';
import { useEffect } from 'react';

// Map survey skin problems to user model fields
const SKIN_PROBLEMS = [
    { value: 'acne_prone', label: 'Acne-prone' },
    { value: 'dull_skin', label: 'Dull skin' },
    { value: 'large_pores', label: 'Large pores' },
    { value: 'uneven', label: 'Uneven skin' },
    { value: 'dark_spot', label: 'Dark spots' },
    { value: 'redness', label: 'Redness' },
    { value: 'dehydrated', label: 'Dehydrated' },
    { value: 'wrinkles', label: 'Wrinkles' },
];

const SKIN_TYPES = [
    { value: 'oily', label: 'Oily skin' },
    { value: 'dry', label: 'Dry skin' },
    { value: 'normal', label: 'Normal skin' },
    { value: 'combination', label: 'Combination skin' },
    { value: 'sensitive', label: 'Sensitive skin' },
];

const SKIN_GOALS = [
    { value: 'hydration', label: 'Hydration & Moisturizing (Cấp nước & Dưỡng ẩm)' },
    { value: 'acne_control', label: 'Acne Control (Trị mụn)' },
    { value: 'anti_aging', label: 'Anti-aging (Chống lão hóa)' },
    { value: 'brightening', label: 'Brightening (Làm sáng da)' },
    { value: 'oil_control', label: 'Oil Control (Kiềm dầu)' },
    { value: 'smooth_and_repair', label: 'Soothing & Repair (Làm dịu & Phục hồi da)' },
];

function Survey() {
    const [state] = useContext(StateContext);
    const navigate = useNavigate();
    const [skinType, setSkinType] = useState('');
    const [ingredients, setIngredients] = useState([]);
    const [selectedProblems, setSelectedProblems] = useState({
        acne_prone: false,
        dull_skin: false,
        large_pores: false,
        uneven: false,
        dark_spot: false,
        redness: false,
        dehydrated: false,
        wrinkles: false,
    });
    const [selectedGoals, setSelectedGoals] = useState({
        hydration: false,
        acne_control: false,
        anti_aging: false,
        brightening: false,
        oil_control: false,
        smooth_and_repair: false,
    });
    const [selectedAllergies, setSelectedAllergies] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);

    const handleAllergyChange = (event) => {
        setSelectedAllergies(event.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setIsSubmitting(true);

        try {
            // Prepare allergies data - send only ingredient IDs
            const allergiesToSend = selectedAllergies.map((allergy) =>
                typeof allergy === 'object' ? allergy.ingredient_id : allergy,
            );

            await instance.post('/survey', {
                skin_type: skinType,
                skinProb: selectedProblems,
                skinGoals: selectedGoals,
                allergies: allergiesToSend,
                user_id: state.userData?.user_id,
            });

            navigate('/');
        } catch (err) {
            console.error('Submission error:', err);
            setError(err.response?.data?.message || 'Failed to submit survey. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const textColor = 'rgb(169, 80, 80)';
    const buttonColor = 'rgb(169, 80, 80)';

    useEffect(() => {
        const fetchIngredients = async () => {
            try {
                const response = await instance.get('/get-all-ingredients');
                setIngredients(response.data);
            } catch (err) {
                console.error('Failed to fetch ingredients:', err);
                setError('Failed to load ingredients. Please refresh the page.');
            }
        };

        fetchIngredients();
    }, []);

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                backgroundColor: '#f5f5f5',
                p: 2,
                backgroundImage: `url(/surveyBG.png)`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <Paper
                elevation={3}
                sx={{
                    width: '100%',
                    maxWidth: 600,
                    p: 4,
                    borderRadius: 2,
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                }}
            >
                <Typography
                    variant="h5"
                    component="h2"
                    gutterBottom
                    sx={{
                        color: textColor,
                        fontWeight: 'bold',
                        mb: 4,
                        textAlign: 'center',
                    }}
                >
                    Personal Information
                </Typography>

                {error && (
                    <Alert severity="error" sx={{ mb: 3 }}>
                        {error}
                    </Alert>
                )}

                <form onSubmit={handleSubmit}>
                    <FormControl fullWidth sx={{ mb: 3 }}>
                        <FormLabel sx={{ color: textColor, mb: 1, fontWeight: 'bold' }}>Skin type:</FormLabel>
                        <Select
                            name="skinType"
                            value={skinType}
                            onChange={(e) => setSkinType(e.target.value)}
                            sx={{
                                '& .MuiOutlinedInput-notchedOutline': {
                                    borderColor: textColor,
                                },
                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                    borderColor: textColor,
                                },
                            }}
                            required
                        >
                            {SKIN_TYPES.map((type) => (
                                <MenuItem key={type.value} value={type.value}>
                                    {type.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl fullWidth sx={{ mb: 3 }}>
                        <FormLabel sx={{ color: textColor, mb: 1, fontWeight: 'bold' }}>Skin problems:</FormLabel>
                        <Select
                            name="skinProblems"
                            multiple
                            value={Object.keys(selectedProblems).filter((key) => selectedProblems[key])}
                            onChange={(e) => {
                                const selected = e.target.value;
                                const newProblems = {};
                                SKIN_PROBLEMS.forEach((problem) => {
                                    newProblems[problem.value] = selected.includes(problem.value);
                                });
                                setSelectedProblems(newProblems);
                            }}
                            sx={{
                                '& .MuiOutlinedInput-notchedOutline': {
                                    borderColor: textColor,
                                },
                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                    borderColor: textColor,
                                },
                                backgroundColor: 'white',
                            }}
                            renderValue={(selected) =>
                                selected
                                    .map((value) => SKIN_PROBLEMS.find((p) => p.value === value)?.label || value)
                                    .join(', ')
                            }
                        >
                            {SKIN_PROBLEMS.map((problem) => (
                                <MenuItem key={problem.value} value={problem.value}>
                                    <Checkbox
                                        checked={selectedProblems[problem.value]}
                                        sx={{
                                            color: textColor,
                                            '&.Mui-checked': {
                                                color: buttonColor,
                                            },
                                        }}
                                    />
                                    <ListItemText primary={problem.label} />
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl fullWidth sx={{ mb: 3 }}>
                        <FormLabel sx={{ color: textColor, mb: 1, fontWeight: 'bold' }}>Skin goals:</FormLabel>
                        <Select
                            name="skinGoals"
                            multiple
                            value={Object.keys(selectedGoals).filter((key) => selectedGoals[key])}
                            onChange={(e) => {
                                const selected = e.target.value;
                                const newGoals = {};
                                SKIN_GOALS.forEach((goal) => {
                                    newGoals[goal.value] = selected.includes(goal.value);
                                });
                                setSelectedGoals(newGoals);
                            }}
                            sx={{
                                '& .MuiOutlinedInput-notchedOutline': {
                                    borderColor: textColor,
                                },
                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                    borderColor: textColor,
                                },
                                backgroundColor: 'white',
                            }}
                            renderValue={(selected) =>
                                selected
                                    .map((value) => SKIN_GOALS.find((g) => g.value === value)?.label || value)
                                    .join(', ')
                            }
                        >
                            {SKIN_GOALS.map((goal) => (
                                <MenuItem key={goal.value} value={goal.value}>
                                    <Checkbox
                                        checked={selectedGoals[goal.value]}
                                        sx={{
                                            color: textColor,
                                            '&.Mui-checked': {
                                                color: buttonColor,
                                            },
                                        }}
                                    />
                                    <ListItemText primary={goal.label} />
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl fullWidth sx={{ mb: 3 }}>
                        <FormLabel sx={{ color: textColor, mb: 1, fontWeight: 'bold' }}>
                            Ingredient Allergies:
                        </FormLabel>
                        <Select
                            multiple
                            value={selectedAllergies}
                            onChange={handleAllergyChange}
                            renderValue={(selected) => selected.map((item) => item.name || item).join(', ')}
                            sx={{
                                '& .MuiOutlinedInput-notchedOutline': {
                                    borderColor: textColor,
                                },
                            }}
                        >
                            {ingredients.map((ingredient) => (
                                <MenuItem key={ingredient.ingredient_id} value={ingredient}>
                                    <Checkbox
                                        checked={selectedAllergies.some(
                                            (item) => (item.ingredient_id || item) === ingredient.ingredient_id,
                                        )}
                                    />
                                    <ListItemText primary={ingredient.name} />
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                        <Button
                            type="submit"
                            variant="contained"
                            disabled={isSubmitting}
                            sx={{
                                backgroundColor: buttonColor,
                                color: 'white',
                                px: 4,
                                py: 1.5,
                                '&:hover': {
                                    backgroundColor: 'rgb(140, 60, 60)',
                                },
                                '&:disabled': {
                                    backgroundColor: 'rgba(169, 80, 80, 0.5)',
                                },
                            }}
                            startIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : null}
                        >
                            {isSubmitting ? 'Submitting...' : 'Finish'}
                        </Button>
                    </Box>
                </form>
            </Paper>
        </Box>
    );
}

export default Survey;
