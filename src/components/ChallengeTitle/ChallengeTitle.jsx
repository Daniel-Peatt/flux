import styles from "./ChallengeTitle.module.css";

function ChallengeTitle () {
    return (
        <div className={styles.box}>
            <h1>Create you Challenge</h1>  
            <input type="text" className={styles.titleField} placeholder="Name your challenge here..." />
            <input type="button" className={styles.submitButton} value="Submit"/>
        </div>
    );
}

export default ChallengeTitle;