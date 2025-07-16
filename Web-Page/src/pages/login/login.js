import { useContext, useState, useRef, useEffect } from 'react';
import './login.css';
import { useNavigate } from 'react-router-dom';
import instance from '../../axios/instance';
import { LOGGIN, REGISTER } from '../../constant/endPoint';
import StateContext from '../../context/context.context';
import { logged } from '../../context/action.context';
import CloudinaryUploadWidget from '../../components/cloudinaryUploadWidget/cloudinaryUploadWidget';

function Login() {
    const navigate = useNavigate();
    const [register, setRegister] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [state, dispatchState] = useContext(StateContext);
    const [avatarPublicId, setAvatarPublicId] = useState('');
    const [skinType, setSkinType] = useState('normal');

    // Dùng useRef() để tối ưu việc truy xuất input
    const usernameRef = useRef(null);
    const passwordRef = useRef(null);
    const nameRef = useRef(null);
    const dobRef = useRef(null);
    const genderRef = useRef(null);
    const rePasswordRef = useRef(null);
    const avtRef = useRef(null);

    // Add skin type options for registration
    const SKIN_TYPES = [
        { value: 'normal', label: 'Normal' },
        { value: 'dry', label: 'Dry' },
        { value: 'oily', label: 'Oily' },
        { value: 'combination', label: 'Combination' },
        { value: 'sensitive', label: 'Sensitive' },
    ];

    // 🛠️ Hàm xử lý đăng ký
    const handleRegister = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        if (passwordRef.current.value !== rePasswordRef.current.value) {
            setErrorMessage('Passwords do not match!');
            return;
        }

        // Avatar upload
        let avt_file_path = avatarPublicId;

        // Required fields from user model
        const formData = {
            name: nameRef.current.value,
            username: usernameRef.current.value,
            password: passwordRef.current.value,
            dob: dobRef.current.value,
            gender: genderRef.current.value,
            avt_file_path,
            skin_type: skinType,
            // Optional fields, backend will use defaults
            acne_prone: false,
            dull_skin: false,
            large_pores: false,
            uneven: false,
            dark_spot: false,
            redness: false,
            dehydrated: false,
            wrinkles: false,
            hydration: false,
            acne_control: false,
            anti_aging: false,
            brightening: false,
            oil_control: false,
            smooth_and_repair: false,
            role: 'user',
        };

        try {
            console.log(formData);
            const res = await instance.post(REGISTER, formData);
            console.log(res.data);
            dispatchState(logged(res.data.data));
            navigate('/survey');
        } catch (err) {
            setErrorMessage(err.response?.data?.message || 'Registration failed!');
            console.log(err);
        }
    };

    // 🛠️ Hàm xử lý đăng nhập
    const handleLogin = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        const formData = {
            username: usernameRef.current.value,
            password: passwordRef.current.value,
        };

        try {
            const res = await instance.post(LOGGIN, formData);
            if (res.status === 200) {
                // Store JWT and userId for future requests
                localStorage.setItem('token', res.data.token);
                if (res.data.userData && res.data.userData.user_id) {
                    localStorage.setItem('userId', res.data.userData.user_id);
                }
                dispatchState(logged(res.data.data));
                navigate('/');
            }
        } catch (err) {
            setErrorMessage(err.response?.data?.message || 'Login failed!');
            console.log(err);
        }
    };

    useEffect(() => {
        // On mount, check for token and userId in localStorage
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        if (token && userId && !state.login) {
            instance
                .post('/get-user-data-by-id', { user_id: userId }, { headers: { Authorization: `Bearer ${token}` } })
                .then((res) => {
                    dispatchState(logged(res.data.data));
                })
                .catch((err) => {
                    // Optionally handle error
                    localStorage.removeItem('token');
                    localStorage.removeItem('userId');
                });
        }
    }, [state.login, dispatchState]);

    return (
        <>
            {register ? (
                <div className="register-bg">
                    <div className="register-form-bg">
                        <form onSubmit={handleRegister} className="register-form">
                            <div className="register-title">
                                <h3>Register</h3>
                            </div>
                            {errorMessage && <p className="error-message">{errorMessage}</p>}

                            <div className="register-field">
                                <label htmlFor="name">Name</label>
                                <input required type="text" id="name" ref={nameRef} />

                                <label htmlFor="username">User name</label>
                                <input required type="text" id="username" ref={usernameRef} />

                                <label htmlFor="password">Password</label>
                                <input required type="password" id="password" ref={passwordRef} />

                                <label htmlFor="rpassword">Re-enter password</label>
                                <input required type="password" id="rpassword" ref={rePasswordRef} />

                                <label htmlFor="dob">Date of birth:</label>
                                <input required type="date" id="dob" ref={dobRef} />

                                <label htmlFor="gender">Gender:</label>
                                <select id="gender" ref={genderRef}>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>

                                <label htmlFor="avatar">Avatar (optional)</label>
                                <CloudinaryUploadWidget
                                    uwConfig={{
                                        cloudName: 'dppaihihm',
                                        uploadPreset: 'Beauty Web',
                                    }}
                                    setPublicId={setAvatarPublicId}
                                />
                                {avatarPublicId && (
                                    <img
                                        src={`https://res.cloudinary.com/dppaihihm/image/upload/${avatarPublicId}.jpg`}
                                        alt="Avatar Preview"
                                        style={{ maxWidth: 100, maxHeight: 100, borderRadius: '50%', marginTop: 8 }}
                                    />
                                )}

                                <label>Skin Type</label>
                                <select value={skinType} onChange={(e) => setSkinType(e.target.value)} required>
                                    {SKIN_TYPES.map((type) => (
                                        <option key={type.value} value={type.value}>
                                            {type.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <button type="submit" className="login-btn">
                                Register
                            </button>

                            <p className="register">
                                Already have an account?{' '}
                                <a href="#" onClick={() => setRegister(false)}>
                                    Sign in
                                </a>
                            </p>
                        </form>
                    </div>
                </div>
            ) : (
                <div className="login-bg">
                    <div className="login-form-bg">
                        <form onSubmit={handleLogin} className="login-form">
                            <div className="form-title">
                                <h3 className="login-title">Login</h3>
                            </div>
                            {errorMessage && <p className="error-message">{errorMessage}</p>}

                            <div className="login-field">
                                <label htmlFor="username">User name</label>
                                <input required type="text" id="username" ref={usernameRef} />

                                <label htmlFor="password">Password</label>
                                <input required type="password" id="password" ref={passwordRef} />
                            </div>

                            <div className="remember-forgot">
                                <div className="remember">
                                    <input type="checkbox" id="rememberMe" />
                                    <label htmlFor="rememberMe"> Remember me?</label>
                                </div>
                                <a className="f-pass" href="#">
                                    Forgot password?
                                </a>
                            </div>

                            <button type="submit" className="login-btn">
                                Sign in
                            </button>

                            <p className="login-register">
                                Don't have an account?{' '}
                                <a href="#" onClick={() => setRegister(true)}>
                                    Register
                                </a>
                            </p>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}

export default Login;
