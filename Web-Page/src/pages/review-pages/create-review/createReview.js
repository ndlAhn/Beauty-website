import './createReview.css';
import { useContext, useState } from 'react';
import SubHeader from '../../../components/subHeader/subHeader';
import ReviewSidebar from '../../../components/sidebar/review-sidebar/reviewSidebar';
import { CgAsterisk } from 'react-icons/cg';
import { MdCancel } from 'react-icons/md';
import StateContext from '../../../context/context.context';
import instance from '../../../axios/instance';
import CloudinaryUploadWidget from '../../../components/cloudinaryUploadWidget/cloudinaryUploadWidget';
function CreateReview() {
    const cloudName = 'dppaihihm';
    const uploadPreset = 'Beauty Web';

    const [publicId, setPublicId] = useState('');
    const [state] = useContext(StateContext);
    const [formData, setFormData] = useState({
        title: '',
        introduction: '',
        packaging: '',
        ingredients: '',
        uses: '',
        targetUser: '',
        review: '',
        pros: '',
        cons: '',
        guide: '',
        conclusion: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await instance.post('/create-review', {
                ...formData,
                picture: publicId,
                user_id: state.userData.userId,
            });

            if (response.status === 200) {
                alert('Review submitted successfully!');
                setFormData({
                    title: '',
                    introduction: '',
                    packaging: '',
                    ingredients: '',
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
        }
    };

    return (
        <div>
            <SubHeader />
            <div className="create-review-wrap">
                <ReviewSidebar />
                <form className="create-review-area" onSubmit={handleSubmit}>
                    <div className="create-review-content">
                        <h3 className="write-review-title">WRITE REVIEW</h3>

                        {[
                            'title',
                            'introduction',
                            'packaging',
                            'ingredients',
                            'uses',
                            'targetUser',
                            'review',
                            'pros',
                            'cons',
                            'guide',
                            'conclusion',
                        ].map((field, index) => (
                            <div key={index} className="review-input-area">
                                <span className="asterisk">
                                    <h5>{field.charAt(0).toUpperCase() + field.slice(1)}</h5>
                                    <CgAsterisk style={{ color: 'red' }} />
                                </span>
                                <textarea name={field} required value={formData[field]} onChange={handleChange} />
                            </div>
                        ))}

                        <div className="review-input-area">
                            <span className="asterisk">
                                <h5>Picture</h5>
                                <CgAsterisk style={{ color: 'red' }} />
                            </span>
                            <CloudinaryUploadWidget uwConfig={{ cloudName, uploadPreset }} setPublicId={setPublicId} />
                            {publicId && (
                                <div className="image-preview">
                                    <img
                                        src={`https://res.cloudinary.com/${cloudName}/image/upload/${publicId}.jpg`}
                                        alt="Uploaded"
                                        className="preview-img"
                                    />
                                    <button type="button" className="remove-image-btn" onClick={() => setPublicId('')}>
                                        <MdCancel size={24} color="red" />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="post-area">
                        <button className="post-btn" type="submit">
                            POST REVIEW
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateReview;
