import { useContext, useState } from 'react';
import './login.css';
import { FaFacebook } from 'react-icons/fa6';
import { MdOutlineMail } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import instance from '../../axios//instance';
import { LOG_IN, LOGGIN, REGISTER } from '../../constant/endPoint';
import StateContext from '../../context/context.context';
import { logged } from '../../context/action.context';
function Login() {
    const navigate = useNavigate();
    const [register, setRegister] = useState(false);
    const [state, dispatchState] = useContext(StateContext);

    const handleRegister = (e) => {
        e.preventDefault();
        const formData = {
            name: e.target.name.value,
            username: e.target.username.value,
            password: e.target.password.value,
            dob: e.target.dob.value,
            gender: e.target.gender.value,
        };
        console.log(formData);
        instance
            .post(REGISTER, formData)
            .then((res) => {
                dispatchState(logged(formData));
                navigate('/survey');
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleLogin = (e) => {
        e.preventDefault();
        console.log(e.target);
        const formData = {
            username: e.target.username.value,
            password: e.target.password.value,
        };
        instance
            .post(LOGGIN, formData)
            .then((res) => {
                console.log(res.data);
                if (res.status === 200) {
                    dispatchState(logged(res.data.userData));
                    navigate('/');
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };
    return (
        <>
            {register === true ? (
                <div className="register-bg">
                    <div className="register-form-bg">
                        <form onSubmit={(e) => handleRegister(e)} className="register-form">
                            <div className="register-title">
                                <h3>Register</h3>
                            </div>
                            <div className="register-field">
                                <label htmlFor="en-password">Name</label>
                                <input required type="text" id="name" name="name" />

                                <label htmlFor="Uname">User name</label>
                                <input required className="Uname" type="text" id="username" name="username" />

                                <label htmlFor="password">Password</label>
                                <input required type="password" id="Password" name="password" />

                                <label htmlFor="en-password">Re-enter password</label>
                                <input required type="password" id="rPassword" name="rpassword" />
                                <div className="dob">
                                    <label htmlFor="dob">Date of birth:</label>
                                    <input required className="date" type="date" id="dob" name="dob" />
                                </div>
                                <div className="gender" id="gender">
                                    <label htmlFor="gender">Giới tính:</label>
                                    <select id="gender" name="gender">
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="other">Khác</option>
                                    </select>
                                </div>
                            </div>

                            {/* <div className="re-signin-field">
                                <button className="re-signin-btn">Sign up</button>
                                <label className="re-signin-text" htmlFor="re-signin">
                                    Or register in with:
                                </label>
                            </div>
                            <div className="re-signin-icon">
                                <FaFacebook className="f-icon" />
                                <MdOutlineMail className="e-icon" />
                            </div> */}
                            <button type="submit" className="login-btn">
                                Register
                            </button>

                            <p className="register">
                                Already have an account{' '}
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
                        <form onSubmit={(e) => handleLogin(e)} className="login-form">
                            <div className="form-title">
                                <h3 className="login-title">Login</h3>
                            </div>
                            <div className="login-field">
                                <label htmlFor="Uname">User name</label>
                                <input required className="Uname" type="text" id="Uname" name="username" />
                                <label htmlFor="Password">Password</label>
                                <input required className="pass" type="password" id="Password" name="password" />
                            </div>
                            <div className="remember-forgot">
                                <div className="remember">
                                    <input className="r-me" type="radio" id="Rme" name="Rme"></input>
                                    <label className="r-text" htmlFor="Rme">
                                        {' '}
                                        Remember me?
                                    </label>
                                </div>
                                <a className="f-pass" href="#">
                                    Forgot password?
                                </a>
                            </div>
                            <div className="signup-field">
                                <button type="submit" className="login-btn">
                                    Sign in
                                </button>
                                {/* <label className="s-login" htmlFor="sLogin">
                                    Or sign up using:
                                </label>{' '} */}
                                <br />
                            </div>
                            {/* <div className="login-icon">
                                <FaFacebook className="f-icon" />
                                <MdOutlineMail className="e-icon" />
                            </div> */}

                            <div className="login-register-field">
                                <p className="login-register">
                                    Don't have an account?{' '}
                                    <a href="#" onClick={() => setRegister(true)}>
                                        Register
                                    </a>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}

export default Login;
