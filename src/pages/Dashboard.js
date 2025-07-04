// CSS
import styles from "./Dashboard.module.css"

// Components
import Header from "../components/Header/Header.jsx";
import Tasks from "../components/Dashboard/components/Task/Tasks.js";
import Calendar from "../components/Dashboard/components/Calendar/Calendar.js";
import DaysRemaining from "../components/Dashboard/components/DaysRemaining/DaysRemaining.js";
import { useNavigate } from "react-router-dom";

export default function Dashboard () {

    const date = new Date();

    // Used for routing pages
    const navigate = useNavigate();

    const token = localStorage.getItem('accessToken'); // Get token from localStorage
    const deleteChallenge = async() => { 
        try {
            const response = await fetch("http://localhost:5000/deleteChallenge", {
                method: 'DELETE',
                headers: {
                    "Authorization": `Bearer ${token}`, // Add the token
                },
            });
            console.log(response);

            navigate("/CreateChallenge");
        } catch (error) {
            console.error(error.message);
        }
    }

    return (
        <div>
            <div className={styles.container}>   
                <Header />
                {/* Display the current date */}
                <div className={styles.daily_info}>
                   <div>Current Date: {date.toLocaleDateString()}</div> 
                </div>
                
                {/* Render the challenge info */}
                {/* <div>{results ? JSON.stringify(results) : "No data available"}</div> */}
                <div className={`${styles.item1} ${styles.item}`}><Tasks /></div>
                <div className={`${styles.item2} ${styles.item}`}><Calendar /></div>
                <div className={`${styles.item3} ${styles.item}`}><DaysRemaining /></div>                     
            </div>
                <div className={styles.footer}>
                    <button className={styles.deleteChallengeButton} onClick={deleteChallenge}>Delete challenge</button>
                </div> 
        </div>    
        
    );
}