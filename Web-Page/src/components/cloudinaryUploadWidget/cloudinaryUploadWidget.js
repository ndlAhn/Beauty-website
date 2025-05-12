import { Button } from '@mui/material';
import { useEffect, useRef, useState } from 'react';

const CloudinaryUploadWidget = ({ uwConfig, setPublicId }) => {
    const uploadWidgetRef = useRef(null);
    const [widgetReady, setWidgetReady] = useState(false);

    // Khởi tạo widget ngay khi component mount
    useEffect(() => {
        // Kiểm tra nếu Cloudinary script đã được load
        const checkCloudinary = () => {
            if (window.cloudinary) {
                initializeWidget();
                return;
            }

            // Nếu chưa, thử lại sau 100ms
            setTimeout(checkCloudinary, 100);
        };

        const initializeWidget = () => {
            if (!uploadWidgetRef.current) {
                uploadWidgetRef.current = window.cloudinary.createUploadWidget(uwConfig, (error, result) => {
                    if (!error && result && result.event === 'success') {
                        setPublicId(result.info.public_id);
                    }
                });
                setWidgetReady(true);
            }
        };

        checkCloudinary();

        // Cleanup
        return () => {
            if (uploadWidgetRef.current) {
                uploadWidgetRef.current.destroy();
                uploadWidgetRef.current = null;
            }
        };
    }, [uwConfig, setPublicId]);

    const handleUploadClick = () => {
        if (uploadWidgetRef.current) {
            uploadWidgetRef.current.open();
        } else {
            console.warn('Upload widget is not ready yet');
        }
    };

    return (
        <Button type="button" color="primary" onClick={handleUploadClick} disabled={!widgetReady}>
            {widgetReady ? 'Upload' : 'Loading...'}
        </Button>
    );
};

export default CloudinaryUploadWidget;
