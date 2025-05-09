import { Button } from '@mui/material';
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
        <Button
            type="button"
            contained
            color="primary"
            onClick={handleUploadClick}
            ref={uploadButtonRef}
            id="upload_widget"
        >
            Upload
        </Button>
    );
};

export default CloudinaryUploadWidget;
