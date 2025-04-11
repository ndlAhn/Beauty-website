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

function Survey() {
    const [state, dispatchState] = useContext(StateContext);
    const navigate = useNavigate();
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

    const toggleSkinProblem = (problem) => {
        setSelectedProblems((prev) => ({
            ...prev,
            [problem]: !prev[problem],
        }));
    };

    const handlePriceSegmentChange = (segment) => {
        setPriceSegments((prev) => ({
            ...prev,
            [segment]: !prev[segment],
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {
            skinType: e.target.skinType.value,
            skinProb: selectedProblems,
            priceSegments: priceSegments,
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
                    <FormControl fullWidth sx={{ mb: 3 }}>
                        <FormLabel sx={{ color: textColor, mb: 1, fontWeight: 'bold' }}>Skin type:</FormLabel>
                        <Select
                            name="skinType"
                            defaultValue="normal"
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
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                            {SKIN_PROBLEMS.map((problem) => (
                                <Chip
                                    key={problem.value}
                                    label={problem.label}
                                    clickable
                                    variant={selectedProblems[problem.value] ? 'filled' : 'outlined'}
                                    color={selectedProblems[problem.value] ? 'primary' : 'default'}
                                    onClick={() => toggleSkinProblem(problem.value)}
                                    sx={{
                                        fontWeight: 500,
                                        borderColor: textColor,
                                        color: selectedProblems[problem.value] ? 'white' : textColor,
                                        backgroundColor: selectedProblems[problem.value] ? buttonColor : 'transparent',
                                        '&:hover': {
                                            backgroundColor: selectedProblems[problem.value]
                                                ? buttonColor
                                                : 'rgba(169, 80, 80, 0.1)',
                                        },
                                    }}
                                />
                            ))}
                        </Box>
                    </FormControl>

                    <FormControl component="fieldset" fullWidth sx={{ mb: 3 }}>
                        <FormLabel component="legend" sx={{ color: textColor, mb: 1, fontWeight: 'bold' }}>
                            Price segments:
                        </FormLabel>
                        <FormGroup>
                            {PRICE_SEGMENTS.map((segment) => (
                                <FormControlLabel
                                    key={segment.value}
                                    control={
                                        <Checkbox
                                            checked={priceSegments[segment.value]}
                                            onChange={() => handlePriceSegmentChange(segment.value)}
                                            name={segment.value}
                                            sx={{
                                                color: textColor,
                                                '&.Mui-checked': {
                                                    color: buttonColor,
                                                },
                                            }}
                                        />
                                    }
                                    label={segment.label}
                                    sx={{ color: textColor }}
                                />
                            ))}
                        </FormGroup>
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
