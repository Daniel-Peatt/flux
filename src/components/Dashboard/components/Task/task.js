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
    
    // Parse the tasks JSON string
    let tasks = [];
    if (firstChallenge && firstChallenge.tasks) {
        try {
            // Fix the format by replacing curly braces with square brackets
            const fixedTasks = firstChallenge.tasks.replace(/^{/, '[').replace(/}$/, ']');
            tasks = JSON.parse(fixedTasks);
        } catch (e) {
            console.error("Failed to parse tasks JSON:", e);
        }
    }
    
       
    return (
        <div className={styles.box}>
            
            <h2 className={styles.title}>{firstChallenge.title || "No title available"}</h2>
            <ul>
                {tasks.map((task, index) => (
                    <div className={styles.taskRow} key={index} >
                        <label className={styles.checkBox}>
                        <input type='checkbox'/>
                        <span></span>
                        </label>
                        <li className={styles.tasks}>{task}</li>
                    </div>
                ))}
            </ul>
          
        </div>
    );
}

export default Task;