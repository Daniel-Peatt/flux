// CSS
import styles from "./Dashboard.module.css"

// Components
import Header from "../components/Header/Header.jsx";
import Tasks from "../components/Dashboard/components/Task/Tasks.js";
import Calendar from "../components/Dashboard/components/Calendar/Calendar.js";
import DaysRemaining from "../components/Dashboard/components/DaysRemaining/DaysRemaining.js";

export default function Dashboard () {
    return (
        <div>
            <div className={styles.container}>   
                <Header />
                {/* Render the challenge info */}
                {/* <div>{results ? JSON.stringify(results) : "No data available"}</div> */}
                <div className={`${styles.item1} ${styles.item}`}><Tasks /></div>
                <div className={`${styles.item2} ${styles.item}`}><Calendar /></div>
                <div className={`${styles.item3} ${styles.item}`}><DaysRemaining /></div>                     
            </div>
            <div className={styles.deleteChallenge}>Delete challenge</div> 
        </div>    
        
    );
}