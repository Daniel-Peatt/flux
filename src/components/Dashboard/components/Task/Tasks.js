//styles
import styles from "./Task.module.css";

// Custom Hooks
import useFetch from "../../../../hooks/useFetch"; // Import the custom hook
import { useState } from "react";

const Task = () => {
    // Fetching data from the challenge table. 
    const token = localStorage.getItem('accessToken'); // Get token from localStorage
    const { data: results, loading, error } = useFetch('http://localhost:5000/challenge', token);

    // Handle events once task has been checked off
    // The default state is an object
    const [checkedItems, setCheckedItems] = useState({});

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

    // Date calculations
    const now = new Date();
    const daysRemaining = Math.ceil((new Date(firstChallenge.end_date) - now) / (1000 * 60 * 60 * 24) + 1); 
    const totalDays = Math.ceil((new Date(firstChallenge.end_date) - new Date(firstChallenge.start_date)) / (1000 * 60 * 60 * 24)+ 1 );
    const currentDay = totalDays - daysRemaining;


    const handleRowClick = async (task) => {
        // prev is automatically set to the previous value of checkedItems
        setCheckedItems((prev) => ({
            ...prev, // spreads the previous state. Which keeps prevents others rows from being changes
            [task]: !prev[task], // sets the task to opposite of the current value 
        }));

        try {
            const body = {
                // ROW - The day the user is on
                indexOne: currentDay,
                // COLUMN - The task the user has checked off
                indexTwo: tasks.indexOf(task) 
            }

            // Sending the PUT request to the database.
            const response = await fetch("http://localhost:5000/updateTasksArray", {
                method: "put",
                headers: {
                    "content-type": "application/json",
                    "Authorization": `Bearer ${token}`,
                }, // Sets the type to JSON
                body: JSON.stringify(body)
            });

        } catch (err) {
            console.error(err.message);
        }
    }
    
    //console.log('checkedTasks: ' + firstChallenge.checkedtasks[0]);
    
       
    return (
        <div className={styles.box}>
            
            <h2 className={styles.title}>{firstChallenge.title || "No title available"}</h2>
            <ul>
                {tasks.map((task, index) => (
                    <div className={styles.taskRow} key={index} >
                        <label className={styles.checkBox}>
                        <input 
                            type='checkbox'
                            // Sending the function the current task
                            onChange={() => {handleRowClick(task)}}/> 
                        <span></span>
                        </label>
                        <li className={checkedItems[task] ? styles.taskSelected : styles.tasks}>{task}</li>
                    </div>
                ))}
            </ul>
          
        </div>
    );
}

export default Task;