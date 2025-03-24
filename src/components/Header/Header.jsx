import styles from "./Header.module.css";
import { useNavigate } from "react-router-dom";

function Header () {
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

    return (
        <header className={styles.Header}>
             <div onClick={goToHome} className={styles.icon}>Flux</div>
             <div className={styles.links}>
                <div onClick={logOut}>Log out</div>
             </div>
             
        </header>
    )
}

export default Header;