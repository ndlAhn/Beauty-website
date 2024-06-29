import './login.css';
import { FaRegUser } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
import { FaFacebook } from "react-icons/fa6";
import { MdOutlineMail } from "react-icons/md";
import { useState } from 'react';




function Login() {
    const [uName,setUName] = useState('')
    const [password,setPassword] = useState('')
    function handleSummit(event){
        event.preventDefault();
        
    }
    return(
        <div>
            <div className="Background">
                <form className="formBg"
                      onSubmit={handleSummit}
                >
                <div className="formTitle">
                    <h3>Login</h3>
                </div>
                    <div className="loginField">
                        <label htmlFor ="Uname">User name:</label><br />
                        <input className="Uname" type="text" id="Uname" name="Uname" 
                               onChange={e => setUName(e.target.value)}
                        ></input><br /> 
                        < FaRegUser className="iconUser" />  
                        <label htmlFor ="Password">Password:</label><br />
                        <input type="text" id="Password" name="Password" 
                               onChange={e => setPassword(e.target.value)}
                        ></input><br />
                        < RiLockPasswordLine className="iconLock" />


                    </div>
                    
                    <div className="RememberNForgot">
                        <span>
                          <input className="Rme" type ="radio" id="Rme" name="Rme"></input> 
                          <label className="RText" htmlFor="Rme"> Remember me?</label>  
                        </span>  
                        <a className="Fpass" href= "#" >Forgot password?</a> <br />
                    </div>   
                        
                        
                    <div className="signupField"> 
                        <button className="loginButton">Login</button>
                        <label className="sLogin" htmlFor="sLogin">Or sign up using:</label> <br />
                    </div>    
                    <div className="loginIcon">
                            <FaFacebook className="FIcon" />
                            <MdOutlineMail className="EIcon" />
                    </div>
                        <p className="Register" >Don't have an account? <a href="#">Register</a></p>
                     
                        
            </form>
            </div>

            
            
        </div>
    )
}

export default Login