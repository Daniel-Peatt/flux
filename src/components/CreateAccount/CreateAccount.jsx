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

    // Sends new account information to the database
    const onSubmitForm = async(e) => {
        e.preventDefault(); // keeps it from refreshing 
        try {
            const body = {email, password_hash};
            const response = await fetch("http://localhost:5000/createUser", { // API ROUTE
                method: "post", // Sets type of API request
                headers: {"content-type": "application/json"}, // Sets the type to JSON
                body: JSON.stringify(body) // Sets and converts the body into a JSON
            });
            const result = await response.json();
            console.log(result);
            if (response.status === 409) {
                setErrorMessage("Email is already taken.");
                return;
            } else if (!response.ok) {
                setErrorMessage(result.error || "Something went wrong. Please try again.");
                return;
            }    
            // If successful, routes the user to the CreateTitle page
            if (response.ok) {
                // Navigate to another page after successful registration
                navigate("/CreateTitle"); 
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
                    <label className={styles.emailLabel}> User Name <br />
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