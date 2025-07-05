import React from 'react';
import Profile from './profile';
import PersonalInfo from '../personal-information/personalInfo';
import { useLocation } from 'react-router-dom';

// This component combines the main profile and personal info views
function CombinedProfile() {
    const location = useLocation();
    // Show both sections on /profile and /personal-information
    return (
        <div>
            <Profile />
            <PersonalInfo />
        </div>
    );
}

export default CombinedProfile;
