// src/services/recommendService.js
import axios from 'axios';

const API_URL = 'http://localhost:3001/api/recommend';

export const getRecommendations = async (username) => {
    try {
        const response = await axios.get(`${API_URL}/${username}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching recommendations:', error);
        throw error;
    }
};