import './register.css';
import { FaRegUser } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
import { FaFacebook } from "react-icons/fa6";
import { MdOutlineMail } from "react-icons/md";

function Register() {
    return(
        <div>
            <div className="Background">
            <form className="formBg">
                <div className="formTitle">
                    <h3>Register</h3>
                </div>
                    <div className="registerField">
                        <label for ="Uname">User name:</label><br />
                        <input className="Uname" type="text" id="Uname" name="Uname" ></input><br /> 
                        < FaRegUser className="iconUser" />  
                        <label for ="Password">Password:</label><br />
                        <input type="text" id="Password" name="Password" ></input><br />
                        < RiLockPasswordLine className="iconLock1" />
                        <label for ="rPassword">Re-enter password:</label><br />
                        <input type="text" id="rPassword" name="rPassword" ></input><br />
                        < RiLockPasswordLine className="iconLock2" />

                    </div>
                        
                        
                    <div className="signinField"> 
                        <button className="signinButton">Sign in</button> <br />
                        <label className="sSignin" for="sSignin">Or sign in with:</label> <br />
                    </div>    
                    <div className="signinIcon">
                            <FaFacebook className="FIcon" />
                            <MdOutlineMail className="EIcon" />
                    </div>
                        <p className="Register" >Already have an account <a href="#">Sign up</a></p>
                     
                        
            </form>
            </div>
        </div>
    )
}
export default Register