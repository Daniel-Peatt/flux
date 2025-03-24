import styles from "./Login.module.css";
import React, {useEffect, useState} from "react"; 
import { useNavigate } from "react-router-dom";
import { checkLoginStatus } from "../../utils";


function Login () {
    // useStates
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState("");

    // Used for routing pages
    const navigate = useNavigate();

    /* The useEffect below runs this function to set a state to true or false
     if a token is stored in local storage. I then use that state in the return
     to conditional load the login component depending if the user is logged in. */


    // Runs the checkLogin once on load
    useEffect(() => {
        setIsLoggedIn(checkLoginStatus());
    }, [isLoggedIn]);

    // Saves the value of information in the text-fields to a varible
    // Used to navigate to the createAccount Route when button is pressed
    const onSubmitForm = async(e) => {
        e.preventDefault(); // Prevent default form submission behavior
        const body = {email: email.toLowerCase(), password};
        
        try {
            // Check if login information is in the database 
            const response = await fetch(`http://localhost:5000/users/login`, {
            method: "post",
            headers: {"content-type": "application/json"},
            body: JSON.stringify(body)
            });
            if (!response.ok) {
                setErrorMessage("Login failed");
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
                    
            // Saving results for storage later
            const result = await response.json();
            
            // Storing token in local storage
            localStorage.setItem("accessToken", result.accessToken);

            //  -------------- Retrieves the login token and uses that token to check if the databse has a challenges associated with the users account ------------------

            // Get the token from localStorage (or wherever it's stored)
            const token = localStorage.getItem('accessToken');
    
            const doesChallengeExist = await fetch('http://localhost:5000/challenge', {
                method: 'get',
                headers: {
                    "content-type": "application/json",
                    "Authorization": `Bearer ${token}`,
                }
            });
            const isChallenge = await doesChallengeExist.json();
            if (isChallenge == null) {
                navigate('/CreateChallenge');
            }
            else {
                navigate('/Dashboard');
            }

        } catch (err) {
            console.error("Login Error:", err);
        }        
    }

    return (
        <div className={styles.Login}>{!isLoggedIn && 
            <div> 
                <div className={styles.loginTitle}>
                    Log in
                </div>
                <form className={styles.TextFields} onSubmit={onSubmitForm}>
                    <label className={styles.userNameLabel}> Email <br />
                        <input 
                        className={styles.field} 
                        type="text"
                        onChange={e => setEmail(e.target.value)} /> 
                    </label>
                    <label className={styles.passwordLabel}> Password <br />
                        <input 
                        className={styles.field} 
                        type="password" 
                        onChange={e => setPassword(e.target.value)}/> 
                    </label>
                    <div className={styles.buttonBox}>
                        <input type="submit" className={styles.button} value="Submit"/>
                    </div>
                   
                </form>
                {errorMessage && <p className={styles.error}>{errorMessage}</p>}
            </div>}
        </div>
    );
}

export default Login;