import { useContext, useState } from 'react';
import instance from '../../axios/instance';
import { SURVEY } from '../../constant/endPoint';
import StateContext from '../../context/context.context';
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
    Chip,
    Paper,
    TextField,
    ListItemText,
    InputLabel,
    OutlinedInput,
} from '@mui/material';

const SKIN_PROBLEMS = [
    { value: 'acne', label: 'Acne' },
    { value: 'aging', label: 'Aging' },
    { value: 'dried', label: 'Dried skin' },
    { value: 'oily', label: 'Oily skin' },
    { value: 'enlarged_pores', label: 'Enlarged pores' },
    { value: 'scarring', label: 'Scarring' },
    { value: 'skin_recovery', label: 'Skin recovery' },
];

const SKIN_TYPES = [
    { value: 'oily', label: 'Oily skin' },
    { value: 'dry', label: 'Dry skin' },
    { value: 'normal', label: 'Normal skin' },
    { value: 'combination', label: 'Combination skin' },
    { value: 'sensitive', label: 'Sensitive skin' },
    { value: 'acne_prone', label: 'Acne-prone skin' },
];

const PRICE_SEGMENTS = [
    { value: 'drug_store', label: 'Drug-store' },
    { value: 'mid_end', label: 'Mid-end' },
    { value: 'high_end', label: 'High-end' },
];

const ALLERGY_OPTIONS = [
    { value: 'fragrance', label: 'Fragrance' },
    { value: 'alcohol', label: 'Alcohol' },
    { value: 'silicones', label: 'Silicones' },
    { value: 'parabens', label: 'Parabens' },
    { value: 'essential_oils', label: 'Essential Oils' },
];

function Survey() {
    const [state, dispatchState] = useContext(StateContext);
    const navigate = useNavigate();
    const [skinType, setSkinType] = useState('');
    const [selectedProblems, setSelectedProblems] = useState({
        acne: false,
        aging: false,
        dried: false,
        oily: false,
        enlarged_pores: false,
        scarring: false,
        skin_recovery: false,
    });
    const [priceSegments, setPriceSegments] = useState({
        drug_store: false,
        mid_end: false,
        high_end: false,
    });
    const [selectedAllergies, setSelectedAllergies] = useState([]);
    const [skincareGoals, setSkincareGoals] = useState([]);

    const toggleSkinProblem = (problem) => {
        setSelectedProblems((prev) => ({
            ...prev,
            [problem]: !prev[problem],
        }));
    };

    const handleAllergyChange = (event) => {
        setSelectedAllergies(event.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        instance
            .post('/survey', {
                skin_type: e.target.skinType.value,
                skinProb: selectedProblems,
                allergies: selectedAllergies,
                user_id: state.userData?.user_id,
            })
            .then((res) => {
                console.log(res.data);
                navigate('/');
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const textColor = 'rgb(169, 80, 80)';
    const buttonColor = 'rgb(169, 80, 80)';

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
            }}
        >
            <Paper
                elevation={3}
                sx={{
                    width: '100%',
                    maxWidth: 600,
                    p: 4,
                    borderRadius: 2,
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

                <form onSubmit={handleSubmit}>
                    {/* Original Survey Fields */}
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
                                    .map((value) => {
                                        const label = SKIN_PROBLEMS.find((p) => p.value === value)?.label || value;
                                        return label;
                                    })
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
                                    <ListItemText primary={problem.label} sx={{ color: 'black' }} />
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    {/* Added Allergies Field */}
                    <FormControl fullWidth sx={{ mb: 3 }}>
                        <FormLabel sx={{ color: textColor, mb: 1, fontWeight: 'bold' }}>
                            Ingredient Allergies:
                        </FormLabel>
                        <Select
                            multiple
                            value={selectedAllergies}
                            onChange={handleAllergyChange}
                            renderValue={(selected) => selected.join(', ')}
                            sx={{
                                '& .MuiOutlinedInput-notchedOutline': {
                                    borderColor: textColor,
                                },
                            }}
                        >
                            {ALLERGY_OPTIONS.map((allergy) => (
                                <MenuItem key={allergy.value} value={allergy.value}>
                                    <Checkbox checked={selectedAllergies.indexOf(allergy.value) > -1} />
                                    <ListItemText primary={allergy.label} />
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
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
                            Finish
                        </Button>
                    </Box>
                </form>
            </Paper>
        </Box>
    );
}

export default Survey;
