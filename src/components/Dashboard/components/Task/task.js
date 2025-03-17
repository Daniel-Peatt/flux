// imports
import { useEffect } from 'react';

//styles
import styles from "./task.module.css";

// Custom Hooks
import useFetch from "../../../../hooks/useFetch"; // Import the custom hook

const Task = () => {
    // Fetching data from the challenge table. 
    const token = localStorage.getItem('accessToken'); // Get token from localStorage
    const { data: data, loading, error } = useFetch('http://localhost:5000/challenge', token);

      // While loading, display a loading message
      if (loading) {
        return <div>Loading...</div>;
    }

    // If there's an error, display the error message
    if (error) {
        return <div>Error: {error}</div>;
    }

 
    
    return (
        <div className={styles.box}>
            {/* I do not understand this one, but it allows me to display data from the database */}
            {Array.isArray(data) && data.length > 0 ? (
                data.map((item, index) => (
                    <div key={index}>
                        <h2>{item.title || "No title available"}</h2>
                        <ul className={styles.tasks}>
                            <li className={styles.task}>{data.tasks}</li>
                        </ul>              
                    </div>
                ))
            ) : (
                <div>No data available</div>
            )}
        </div>
    );
}

export default Task;