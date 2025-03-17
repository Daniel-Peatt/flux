import styles from "./Login.module.css";
import React, {useState} from "react"; 
import { useNavigate } from "react-router-dom";


function Login () {
    // useStates
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    // Used for routing pages
    const navigate = useNavigate();


    // Saves the value of information in the text-fields to a varible
    // Used to navigate to the createAccount Route when button is pressed
    const onSubmitForm = async(e) => {
        e.preventDefault(); // Prevent default form submission behavior
        const body = {email: email.toLowerCase(), password};
        
        try {
            // Change email to lower case, so it matches the DB standard
            //const lowerCaseEmail = email.toLowerCase();

            // Make sure email is properly set before making the request
            // if (!email) {
            //     setErrorMessage("Failed Login - Try again")
            //     return;
            // }
            // Check if login information is in the database 
            const response = await fetch(`http://localhost:5000/users/login`, {
            method: "post",
            headers: {"content-type": "application/json"},
            body: JSON.stringify(body)
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
                    
            // Sending response to the console
            const result = await response.json();
            console.log(result);

            // Save the token if needed (like in localStorage)
            localStorage.setItem("accessToken", result.accessToken);
            // console.log(result.password_hash);

            // if(result.row.length === 0) {
            //     setErrorMessage("No account associated with email");
            //     return;
            // }

            // Password Check
            // if(password_hash !== result.password_hash)
            // {
            //     setErrorMessage("Failed Login - Try again")
            //     return;
            // }

            // Get the token from localStorage (or wherever it's stored)
            const token = localStorage.getItem('accessToken');
            
            const doesChallengeExist = await fetch('http://localhost:5000/challenge', {
                method: 'get',
                headers: {
                    "content-type": "application/json",
                    "Authorization": `Bearer ${token}`,
                }
            });
            const result2 = await doesChallengeExist.json();
            console.log(result2);
            if (result2 == null) {
                navigate('/CreateChallenge');
            }
            else {
                navigate('/Dashboard');
            }
            // Passing email to the next page
            


        } catch (err) {
            console.error("Login Error:", err);
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
            </div>
        </div>
    );
}

export default Login;