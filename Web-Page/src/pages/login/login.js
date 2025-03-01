import { useContext, useState, useRef } from 'react';
import './login.css';
import { useNavigate } from 'react-router-dom';
import instance from '../../axios/instance';
import { LOGGIN, REGISTER } from '../../constant/endPoint';
import StateContext from '../../context/context.context';
import { logged } from '../../context/action.context';

function Login() {
    const navigate = useNavigate();
    const [register, setRegister] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [state, dispatchState] = useContext(StateContext);

    // Dùng useRef() để tối ưu việc truy xuất input
    const usernameRef = useRef(null);
    const passwordRef = useRef(null);
    const nameRef = useRef(null);
    const dobRef = useRef(null);
    const genderRef = useRef(null);
    const rePasswordRef = useRef(null);

    // 🛠️ Hàm xử lý đăng ký
    const handleRegister = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        if (passwordRef.current.value !== rePasswordRef.current.value) {
            setErrorMessage('Passwords do not match!');
            return;
        }

        const formData = {
            name: nameRef.current.value,
            username: usernameRef.current.value,
            password: passwordRef.current.value,
            dob: dobRef.current.value,
            gender: genderRef.current.value,
        };

        try {
            const res = await instance.post(REGISTER, formData);
            dispatchState(logged(formData));
            navigate('/survey');
        } catch (err) {
            setErrorMessage(err.response?.data?.message || 'Registration failed!');
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
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('userId', res.data.userData.userId);
                dispatchState(logged(res.data.userData));
                navigate('/');
            }
        } catch (err) {
            setErrorMessage(err.response?.data?.message || 'Login failed!');
        }
    };

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
