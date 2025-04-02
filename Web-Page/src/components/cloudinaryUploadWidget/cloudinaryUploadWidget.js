import { useEffect, useRef } from 'react';

const CloudinaryUploadWidget = ({ uwConfig, setPublicId }) => {
    const uploadWidgetRef = useRef(null);
    const uploadButtonRef = useRef(null);
    const handleUploadClick = () => {
        console.log(uploadWidgetRef);
        if (uploadWidgetRef.current) {
            uploadWidgetRef.current.open();
        }
    };
    useEffect(() => {
        const initializeUploadWidget = () => {
            if (window.cloudinary && uploadButtonRef.current) {
                // Create upload widget
                uploadWidgetRef.current = window.cloudinary.createUploadWidget(uwConfig, (error, result) => {
                    if (!error && result && result.event === 'success') {
                        console.log('Upload successful:', result.info);
                        setPublicId(result.info.public_id);
                    }
                });
            }
        };

        initializeUploadWidget();
    }, [uwConfig, setPublicId]);

    return (
        <button
            type="button"
            onClick={handleUploadClick}
            ref={uploadButtonRef}
            id="upload_widget"
            className="cloudinary-button"
        >
            Upload
        </button>
    );
};

export default CloudinaryUploadWidget;
