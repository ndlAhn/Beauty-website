import './createReview.css';
import { useContext, useEffect, useState } from 'react';
import SubHeader from '../../../components/subHeader/subHeader';
import ReviewSidebar from '../../../components/sidebar/review-sidebar/reviewSidebar';
import { CgAsterisk } from 'react-icons/cg';
import { MdCancel } from 'react-icons/md';
import StateContext from '../../../context/context.context';
import instance from '../../../axios/instance';
import CloudinaryUploadWidget from '../../../components/cloudinaryUploadWidget/cloudinaryUploadWidget';
import { FormControl, MenuItem, Select, Typography } from '@mui/material';

function CreateReview(props) {
    const cloudName = 'dppaihihm';
    const uploadPreset = 'Beauty Web';
    const [publicId, setPublicId] = useState('');
    const [state, dispatchState] = useContext(StateContext);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        introduction: '',
        packaging: '',
        uses: '',
        targetUser: '',
        review: '',
        pros: '',
        cons: '',
        guide: '',
        conclusion: '',
        ingredients: '',
    });
    const [ingredients, setIngredients] = useState([]);

    const requiredFields = [
        'title',
        'introduction',
        'packaging',
        'uses',
        'targetUser',
        'review',
        'pros',
        'cons',
        'guide',
        'conclusion',
    ];

    const fetchIngredients = async () => {
        try {
            const res = await instance.get('/get-all-ingredients');
            setIngredients(res.data);
        } catch (error) {
            console.error('Error fetching ingredients:', error);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Kiểm tra nếu đang trong quá trình submit thì không làm gì
        if (isSubmitting) return;

        setIsSubmitting(true);

        try {
            const response = await instance.post('/create-review', {
                ...formData,
                picture: publicId,
                user_id: state.userData.user_id,
                type_review: props.type,
            });

            if (response.status === 200) {
                alert('Review submitted successfully!');
                // Reset form
                setFormData({
                    title: '',
                    introduction: '',
                    packaging: '',

                    uses: '',
                    targetUser: '',
                    review: '',
                    pros: '',
                    cons: '',
                    guide: '',
                    conclusion: '',
                });
                setPublicId('');
            } else {
                alert('Failed to submit review');
            }
        } catch (error) {
            console.error('Error submitting review:', error);
            alert('An error occurred while submitting the review');
        } finally {
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        fetchIngredients();
        console.log(props.type);
    }, []);

    return (
        <div>
            {props.type === 'reivew' ? <SubHeader /> : ''}
            <div className="create-review-wrap">
                {props.type === 'reivew' ? <ReviewSidebar /> : ''}

                <form className="create-review-area" onSubmit={handleSubmit}>
                    <div className="create-review-content">
                        <h3 className="write-review-title">WRITE {props.type === 'post' ? 'POST' : 'REVIEW'} </h3>
                        {requiredFields
                            .filter((field) => field !== 'ingredients')
                            .map((field, index) => (
                                <div key={index} className="review-input-area">
                                    <span className="asterisk">
                                        <h5>{field.charAt(0).toUpperCase() + field.slice(1)}</h5>
                                        <CgAsterisk style={{ color: 'red' }} />
                                    </span>
                                    <textarea
                                        name={field}
                                        required
                                        value={formData[field]}
                                        onChange={handleChange}
                                        disabled={isSubmitting}
                                    />
                                </div>
                            ))}

                        {/* <div className="review-input-area">
                            <span className="asterisk">
                                <h5>Select an ingredient</h5>
                                <CgAsterisk style={{ color: 'red' }} />
                            </span>
                            <FormControl sx={{ marginBottom: '10px' }} fullWidth className="review-input-area">
                                <Select
                                    fullWidth
                                    value={formData.ingredients}
                                    onChange={handleChange}
                                    name="ingredients"
                                    displayEmpty
                                    disabled={isSubmitting}
                                >
                                    <MenuItem value="" disabled>
                                        Select an ingredient
                                    </MenuItem>
                                    {ingredients.map((ingredient) => (
                                        <MenuItem key={ingredient.ingredient_id} value={ingredient.ingredient_id}>
                                            {ingredient.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            
                        </div>
                         */}

                        <div className="review-input-area">
                            <span className="asterisk">
                                <h5>Picture</h5>
                                <CgAsterisk style={{ color: 'red' }} />
                            </span>
                            <CloudinaryUploadWidget
                                uwConfig={{ cloudName, uploadPreset }}
                                setPublicId={setPublicId}
                                disabled={isSubmitting}
                            />
                            {publicId && (
                                <div className="image-preview">
                                    <img
                                        src={`https://res.cloudinary.com/${cloudName}/image/upload/${publicId}.jpg`}
                                        alt="Uploaded"
                                        className="preview-img"
                                        style={{ marginBottom: '30px' }}
                                    />
                                    <button
                                        type="button"
                                        className="remove-image-btn"
                                        onClick={() => setPublicId('')}
                                        disabled={isSubmitting}
                                    >
                                        <MdCancel size={24} color="red" />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="post-area">
                        <button className="post-btn" type="submit" disabled={isSubmitting || !publicId}>
                            {isSubmitting ? 'POSTING...' : 'POST REVIEW'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateReview;
