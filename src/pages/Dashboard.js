import { useState, useEffect } from "react";
import useFetch from "../hooks/useFetch"; // Import the custom hook
// CSS
import styles from "./Dashboard.module.css"

// Components
import Header from "../components/Header/Header.jsx";
import Task from "../components/Dashboard/components/Task/task.js";
import Calendar from "../components/Dashboard/components/Calendar/calendar.js";
import DaysRemaining from "../components/Dashboard/components/DaysRemaining/daysRemaining.js";

export default function Dashboard () {
    const token = localStorage.getItem('accessToken'); // Get token from localStorage
    const { data: results, loading, error } = useFetch('http://localhost:5000/challenge', token); // Use the custom hook


    // While loading, display a loading message
    if (loading) {
        return <div>Loading...</div>;
    }

    // If there's an error, display the error message
    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className={styles.parentContainer}>
            <div className={styles.container}>   
                <Header />
                {/* Render the challenge info */}
                {/* <div>{results ? JSON.stringify(results) : "No data available"}</div> */}
                <div className={`${styles.item1} ${styles.item}`}><Task /></div>
                <div className={`${styles.item2} ${styles.item}`}><Calendar /></div>
                <div className={`${styles.item3} ${styles.item}`}><DaysRemaining /></div>       
            </div>
        </div>
    );
}