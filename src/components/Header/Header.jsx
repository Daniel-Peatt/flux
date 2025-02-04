import styles from "./Header.module.css";
import { useNavigate } from "react-router-dom";

function Header () {
    const navigate = useNavigate();
    const goToHome = () => {
        navigate("/");
    }

    return (
        <div className={styles.Header}>
             <div onClick={goToHome} className={styles.icon}>Flux</div>
        </div>
    )
}

export default Header;