import styles from "./Header.module.css";
import { useNavigate } from "react-router-dom";
import { checkLoginStatus, useChallengeExist } from "../../utils";
import { useState } from "react";
import Contact from '../PopUp/Contact.jsx'; // Importing popup component for Contact

function Header () {
    const [isLoggedIn, setIsLoggedIn] = useState(checkLoginStatus());
    // Check if the user is logged in
    
    const activeChallenge = useChallengeExist();


    const navigate = useNavigate();
    const goToHome = () => {
        navigate("/");
    }

    //Logs out current user
    const logOut = () => {
        localStorage.removeItem("accessToken"); // Removes JWT token from local storage
        navigate("/"); // Navigates user back to the front page after loging out
        window.location.reload(true); // Reloads the home page to ensure conditional components load 
    }
    
    const goToDashboard = () => {  
        if (activeChallenge === true) {
          navigate("/Dashboard");  
        }
        else {
            navigate("/CreateChallenge");
        }
        
    }

    return (
        <header className={styles.Header}>
             <div onClick={goToHome} className={styles.icon}>Flux</div>
             <nav className={styles.dropdown}>
                <button className={styles.button}>Menu</button>
                <div className={styles.links}>
                    {/* Will only show up if the user is logged in */} 
                    { isLoggedIn && <div>Profile</div> }
                    { isLoggedIn && <div onClick={goToDashboard}>Dashboard</div> }
                    <div>Contact us</div>
                    <div>About us</div>
                    { isLoggedIn && <div onClick={logOut}>Log out</div> }
                </div>
             </nav> 
        </header> 
    )
}

export default Header;