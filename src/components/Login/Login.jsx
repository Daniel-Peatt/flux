import styles from "./Login.module.css";
import React, {useState} from "react"; 
import { useNavigate } from "react-router-dom";


function Login () {
    // useStates
    const [email, setEmail] = useState("");
    const [password_hash, setPassword_hash] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    // Used for routing pages
    const navigate = useNavigate();

    // Saves the value of information in the text-fields to a varible
    // Used to navigate to the createAccount Route when button is pressed
    const onSubmitForm = async(e) => {
        e.preventDefault(); // Prevent default form submission behavior
        
        
        try {
            // Change email to lower case, so it matches the DB standard
            const lowerCaseEmail = email.toLowerCase();
            console.log(lowerCaseEmail);

            // Make sure email is properly set before making the request
            if (!email) {
                setErrorMessage("Failed Login - Try again")
                return;
            }

            // Check if login information is in the database 
            const response = await fetch(`http://localhost:5000/users/${encodeURIComponent(lowerCaseEmail)}`, {
            method: "GET",
            headers: {"content-type": "application/json"},
        });
        if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                

            // Sending response to the console
            const result = await response.json();
            console.log(result);
            console.log(result.password_hash);

            // Password Check
            if(password_hash !== result.password_hash)
            {
                setErrorMessage("Failed Login - Try again")
                return;
            }

            // Passing email to the next page
            navigate(`/CreateChallenge/${encodeURIComponent(email)}`);


        } catch (err) {
            console.error(err.message);
        }
        
    }

    return (
        <div className={styles.Login}>
            <div> 
                <div className={styles.loginTitle}>
                    Log in
                </div>
                <form className={styles.TextFields} onSubmit={onSubmitForm}>
                    <label className={styles.userNameLabel}> Email <br />
                        <input 
                        className={styles.userName} 
                        type="text"
                        onChange={e => setEmail(e.target.value)} /> 
                    </label>
                    <label className={styles.passwordLabel}> Password <br />
                        <input 
                        className={styles.password} 
                        type="password" 
                        onChange={e => setPassword_hash(e.target.value)}/> 
                    </label>
                    <div className={styles.buttonBox}>
                        <input type="submit" className={styles.button} value="Submit"/>
                    </div>
                   
                </form>
                {errorMessage && <p className={styles.error}>{errorMessage}</p>}
            </div>
        </div>
    );
}

export default Login;