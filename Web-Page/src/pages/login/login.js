import './login.css';
import { FaFacebook } from "react-icons/fa6";
import { MdOutlineMail } from "react-icons/md";





function Login() {
    
    return(
        <div>
            <div className="login-bg">
                <div className="login-form-bg">
                    <form className ="login-form">
                        <div className="form-title">
                            <h3 className="login-title">Login</h3>
                        </div>
                        <div className="login-field">
                            <label htmlFor ="Uname">User name</label>
                            <input className="Uname" type="text" id="Uname" name="Uname" />
                            <label htmlFor ="Password">Password</label>
                            <input className="pass" type="text" id="Password" name="Password" />
                        </div>
                        <div className="remember-forgot">
                            
                            <div className="remember">
                                <input className="r-me" type ="radio" id="Rme" name="Rme"></input> 
                                <label className="r-text" htmlFor="Rme"> Remember me?</label>
                            </div>
                            <a className="f-pass" href= "#" >Forgot password?</a>
                        </div>
                        <div className="signup-field"> 
                            <button className="login-btn">Login</button>
                            <label className="s-login" htmlFor="sLogin">Or sign up using:</label> <br />
                        </div>    
                        <div className="login-icon">
                            <FaFacebook className="f-icon" />
                            <MdOutlineMail className="e-icon" />
                        </div>

                        <div className="login-register-field">
                            <p className="login-register" >Don't have an account? <a href="#">Register</a></p>
                        </div>
                         
                     
                    </form>
                </div>
            </div>
            
        </div>
        // <div>
        //     <div className="Background">
        //         <form className="formBg">
        //         <div className="formTitle">
        //             <h3>Login</h3>
        //         </div>
        //             <div className="loginField">
        //                 <label htmlFor ="Uname">User name:</label><br />
        //                 <input className="Uname" type="text" id="Uname" name="Uname" />
        //                 {/* < FaRegUser className="iconUser" />   */}
        //                 <label htmlFor ="Password">Password:</label><br />
        //                 <input type="text" id="Password" name="Password" 
                            
        //                 ></input><br />
        //                 {/* < RiLockPasswordLine className="iconLock" /> */}


        //             </div>
                    
        //             <div className="RememberNForgot">
        //                 <span>
        //                   <input className="Rme" type ="radio" id="Rme" name="Rme"></input> 
        //                   <label className="RText" htmlFor="Rme"> Remember me?</label>  
        //                 </span>  
        //                 <a className="Fpass" href= "#" >Forgot password?</a> <br />
        //             </div>   
                        
                        
        //             <div className="signupField"> 
        //                 <button className="loginButton">Login</button>
        //                 <label className="sLogin" htmlFor="sLogin">Or sign up using:</label> <br />
        //             </div>    
        //             <div className="loginIcon">
        //                     <FaFacebook className="FIcon" />
        //                     <MdOutlineMail className="EIcon" />
        //             </div>
        //                 <p className="Register" >Don't have an account? <a href="#">Register</a></p>
                     
                        
        //     </form>
        //     </div>

            
            
        // </div>
    )
}

export default Login;