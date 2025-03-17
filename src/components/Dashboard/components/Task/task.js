// imports
import { useEffect } from 'react';

//styles
import styles from "./task.module.css";

// Custom Hooks
import useFetch from "../../../../hooks/useFetch"; // Import the custom hook

const Task = () => {
    // Fetching data from the challenge table. 
    const token = localStorage.getItem('accessToken'); // Get token from localStorage
    const { data: results, loading, error } = useFetch('http://localhost:5000/challenge', token);

    const firstChallenge = results && results.length > 0 ? results[0] : null;

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
            
            <h2>{firstChallenge.title || "No title available"}</h2>
            <ul>
                <li>{firstChallenge.tasks}</li>
                <li>{firstChallenge.tasks}</li>
                <li>{firstChallenge.tasks}</li>
            </ul>
          
        </div>
    );
}

export default Task;