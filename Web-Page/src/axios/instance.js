import axios from 'axios';
import severURL from '../constant/severUrl';

const instance = axios.create({
    baseURL: severURL,
    timeout: 10000, // Increased timeout to 10 seconds
    headers: { 'X-Custom-Header': 'foobar' },
});
export default instance;
