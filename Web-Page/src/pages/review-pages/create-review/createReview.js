import './createReview.css';
import { useState } from 'react';
import axios from 'axios';
import SubHeader from '../../../components/subHeader/subHeader';
import ReviewSidebar from '../../../components/sidebar/review-sidebar/reviewSidebar';
import { IoIosCloudUpload } from 'react-icons/io';
import { CgAsterisk } from 'react-icons/cg';
import { MdCancel } from 'react-icons/md';

function CreateReview() {
    const [formData, setFormData] = useState({
        title: '',
        introduction: '',
        pakaging: '',
        ingredients: '',
        uses: '',
        targetUser: '',
        review: '',
        pros: '',
        cons: '',
        guide: '',
        conclusion: '',
        picture: null,
        previewImage: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({
                ...formData,
                picture: file,
                previewImage: URL.createObjectURL(file),
            });
        }
    };

    const handleRemoveImage = () => {
        setFormData({
            ...formData,
            picture: null,
            previewImage: null,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();
        for (const key in formData) {
            if (key !== 'previewImage') {
                formDataToSend.append(key, formData[key]);
            }
        }
        console.log(formData);
        // try {
        //     const response = await axios.post('/create-review', formDataToSend, {
        //         headers: {
        //             'Content-Type': 'multipart/form-data',
        //         },
        //     });

        //     if (response.status === 200) {
        //         alert('Review submitted successfully!');
        //         setFormData({
        //             title: '',
        //             introduction: '',
        //             pakaging: '',
        //             ingredients: '',
        //             uses: '',
        //             targetUser: '',
        //             review: '',
        //             pros: '',
        //             cons: '',
        //             guide: '',
        //             conclusion: '',
        //             picture: null,
        //             previewImage: null,
        //         });
        //     } else {
        //         alert('Failed to submit review');
        //     }
        // } catch (error) {
        //     console.error('Error submitting review:', error);
        // }
    };

    return (
        <div>
            <SubHeader />
            <div className="create-review-wrap">
                <ReviewSidebar />

                <form className="create-review-area" onSubmit={handleSubmit}>
                    <div className="create-review-content">
                        <h3 className="write-review-title">WRITE REVIEW</h3>
                        <div className="review-input-area">
                            <span className="asterisk">
                                <h5>Title</h5>
                                <CgAsterisk style={{ color: 'red' }} />
                            </span>
                            <textarea
                                name="title"
                                className="input-title"
                                required
                                value={formData.title}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="review-input-area">
                            <span className="asterisk">
                                <h5>Introduction</h5>
                                <CgAsterisk style={{ color: 'red' }} />
                            </span>
                            <textarea
                                name="introduction"
                                className="input-intro"
                                required
                                value={formData.introduction}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="review-input-area">
                            <span className="asterisk">
                                <h5>Picture</h5>
                                <CgAsterisk style={{ color: 'red' }} />
                            </span>
                            <div className="upload-area">
                                {!formData.previewImage && (
                                    <>
                                        <IoIosCloudUpload className="upload-icon" />
                                        <input type="file" accept="image/*" onChange={handleFileChange} />
                                    </>
                                )}
                                {formData.previewImage && (
                                    <div className="image-preview">
                                        <img src={formData.previewImage} alt="Preview" className="preview-img" />
                                        <button type="button" className="remove-image-btn" onClick={handleRemoveImage}>
                                            <MdCancel size={24} color="red" />
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        {[
                            'pakaging',
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
                                <textarea
                                    name={field}
                                    className={`input-${field}`}
                                    required={field !== 'guide'}
                                    value={formData[field]}
                                    onChange={handleChange}
                                />
                            </div>
                        ))}
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
