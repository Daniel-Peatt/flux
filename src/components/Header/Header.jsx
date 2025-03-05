import styles from "./Header.module.css";
import { useNavigate } from "react-router-dom";

function Header () {
    const navigate = useNavigate();
    const goToHome = () => {
        navigate("/");
    }

    return (
        <header className={styles.Header}>
             <div onClick={goToHome} className={styles.icon}>Flux</div>
        </header>
    )
}

export default Header;