import styles from "./Login.module.css";
import React, {useState} from "react"; 
import { useNavigate } from "react-router-dom";


function Login () {
    // useStates
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [emailSubmit, setEmailSubmit] = useState("");
    const [passSubmit, setPassSubmit] = useState("");

    // Used for routing pages
    const navigate = useNavigate();

    // Saves the value of information in the text-fields to a varible
    // Used to navigate to the createAccount Route when button is pressed
    const handleClick = () => {
        setEmailSubmit(email);
        setPassSubmit(pass);
        console.log("email and password entered: ");
        console.log(emailSubmit);
        console.log(passSubmit);
        navigate("/CreateTitle");
    }

    // Keeps track of what is currently in the email and password text fields
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const handlePassChange = (event) => {
        setPass(event.target.value);
    }

    return (
        <div className={styles.Login}>
            <div> 
                <div className={styles.loginTitle}>
                    Log in
                </div>
                <form action="" className={styles.TextFields}>
                    <label className={styles.userNameLabel}> User Name <br />
                        <input 
                        className={styles.userName} 
                        type="text"
                        onChange={handleEmailChange} /> 
                    </label>
                    <label className={styles.passwordLabel}> Password <br />
                        <input 
                        className={styles.password} 
                        type="password" 
                        onChange={handlePassChange}/> 
                    </label>
                    <div className={styles.buttonBox}>
                        <input onClick={handleClick} type="Button" className={styles.button} value="Submit"/>
                    </div>
                   
                </form>
                
            </div>
        </div>
    );
}

export default Login;