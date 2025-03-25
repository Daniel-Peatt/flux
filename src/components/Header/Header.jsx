import styles from "./Header.module.css";
import { useNavigate } from "react-router-dom";
import { checkLoginStatus } from "../../utils";
import { useState } from "react";

function Header () {
    const [isLoggedIn, setIsLoggedIn] = useState(checkLoginStatus());
    // Check if the user is logged in


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
        navigate("/Dashboard");
    }

    return (
        <header className={styles.Header}>
             <div onClick={goToHome} className={styles.icon}>Flux</div>
             <nav className={styles.dropdown}>
                <button className={styles.button}>Menu</button>
                <div className={styles.links}>
                    {/* Will only show up if the user is logged in */} 
                    { isLoggedIn && <a>Profile</a> }
                    { isLoggedIn && <a onClick={goToDashboard}>Dashboard</a> }
                    { isLoggedIn && <a onClick={logOut}>Log out</a> }
                    <a>Contact us</a>
                    <a>About us</a>
                </div>
             </nav>
        </header>
    )
}

export default Header;