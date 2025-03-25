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
             <nav className={styles.dropdown}>
                <button className={styles.button}>Menu</button>
                <div className={styles.links}>
                    <a>Profile</a>
                    <a>Dashboard</a>
                    <a onClick={logOut}>Log out</a>
                </div>
             </nav>
        </header>
    )
}

export default Header;