import './register.css';
import { FaFacebook } from "react-icons/fa6";
import { MdOutlineMail } from "react-icons/md";

function Register() {
    return(
        <div>
            <div className="register-bg">
                <div className="register-form-bg">
                    <form className="register-form">
                <div className="register-title">
                    <h3>Register</h3>
                </div>
                    <div className="register-field">
                        
                           <label htmlFor ="Uname">User name</label>
                            <input className="Uname" type="text" id="Uname" name="Uname" /> 
                       
                         
                
                            <label htmlFor ="password">Password</label>
                            <input type="text" id="Password" name="Password" />   
                      
                        
                       
                            <label htmlFor ="en-password">Re-enter password</label>
                            <input type="text" id="rPassword" name="rPassword" />

                        
        

                    </div>
                        
                        
                    <div className="re-signin-field"> 
                        <button className="re-signin-btn">Sign up</button>
                        <label className="re-signin-text" htmlFor="re-signin">Or register in with:</label>
                    </div>    
                    <div className="re-signin-icon">
                            <FaFacebook className="f-icon" />
                            <MdOutlineMail className="e-icon" />
                    </div>
                        <p className="register" >Already have an account <a href="#">Sign up</a></p>                 
            </form>
                </div>
            
            </div>
        </div>
    )
}
export default Register