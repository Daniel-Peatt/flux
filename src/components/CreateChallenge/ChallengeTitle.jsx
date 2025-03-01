import styles from "./ChallengeTitle.module.css";
import { useParams } from "react-router-dom";

function ChallengeTitle () {
    const { email } = useParams(); // Extract the email from the URL

    return (
        <div className={styles.box}>
            <h1>Create you Challenge {email}</h1>  
            <input type="text" className={styles.titleField} placeholder="Name your challenge here..." />
            <input type="button" className={styles.submitButton} value="Submit"/>
        </div>
    );
}

export default ChallengeTitle;