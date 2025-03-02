import styles from "./CreateAccount.module.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateAccountPage () {
    
    // useStates
    const [email, setEmail] = useState("");
    const [password_hash, setPassword_hash] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();

    // Used to validate a email address
    const validateEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    // Sends new account information to the database
    const onSubmitForm = async(e) => {
        e.preventDefault(); // keeps it from refreshing 
        try {
            // Information from form
            const body = {email, password_hash, confirmPassword};
            
            // Setting email to lowercase so the database doesn't have repeated emails
            body.email = body.email.toLowerCase();
            
            // Check if email is valid
            if (!validateEmail(email))
            {
                setErrorMessage("Not a valid email.")
                return;
            }

            // Check if passwords match
            if (password_hash !== confirmPassword)
            {
                setErrorMessage("Passwords do not match.")
                return;
            }

            // Check if the password meets requirments
            if (password_hash.length < 8)
            {
                setErrorMessage("Password must be at least 8 characters.")
                return;
            }

            // Sending the POST request to the database
            const response = await fetch("http://localhost:5000/createUser", { // API ROUTE
                method: "post", // Sets type of API request
                headers: {"content-type": "application/json"}, // Sets the type to JSON
                body: JSON.stringify(body) // Sets and converts the body into a JSON
            });
            
            // Sending response to the console
            const result = await response.json();
            console.log(result);

            // If the response status is 409, the email already exist in the database. 
            if (response.status === 409) {
                setErrorMessage("Email is already in use.");
                return;
            } else if (!response.ok) {
                setErrorMessage(result.error || "Something went wrong. Please try again.");
                return;
            }    

            // If successful, routes the user to the CreateTitle page
            if (response.ok) {
                // Navigate to the CreateTitle page after successful registration
                navigate(`/CreateChallenge/${encodeURIComponent(email)}`); 
            }
        } catch (err) {
            console.error(err.message);
        }
    }



    return (
        <div className={styles.Login}>
            <div> 
                <div className={styles.loginTitle}>
                    Create Account
                </div>
                <form className={styles.TextFields} onSubmit={onSubmitForm}>
                    <label className={styles.emailLabel}> Email <br />
                        <input 
                        className={styles.email} 
                        type="text" 
                        value={email} 
                        onChange={e => setEmail(e.target.value)}/> 
                    </label>
                    <label className={styles.passwordLabel}> Password <br />
                        <input className={styles.password} 
                        type="password"
                        value={password_hash}
                        onChange={e => setPassword_hash(e.target.value)}/> 
                    </label>
                    <label className={styles.passwordLabel}> Confirm Password <br />
                        <input className={styles.password} 
                        type="password" 
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}/> 
                    </label>
                    <div className={styles.buttonBox}>
                        <input type="submit" // Must be type submit to trigger
                        className={styles.button} 
                        value="Submit"/>
                    </div>
                   
                </form>

                {errorMessage && <p className={styles.error}>{errorMessage}</p>}
                
            </div>
        </div>
    );
}

export default CreateAccountPage;