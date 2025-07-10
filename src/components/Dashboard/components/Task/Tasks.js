//styles
import styles from "./Task.module.css";

// Custom Hooks
import useFetch from "../../../../hooks/useFetch"; // Import the custom hook
import { use, useEffect, useState } from "react";

const Task = ({checkedItems, setCheckedItems}) => {
  // Fetching data from the challenge table ----------------------------------------
  const token = localStorage.getItem("accessToken"); // Get token from localStorage
  const {
    data: results,
    loading,
    error,
  } = useFetch("http://localhost:5000/challenge", token);

  const firstChallenge = results && results.length > 0 ? results[0] : null;

  // useStates ----------------------------------------------------------
  // Handle events once task has been checked off
  
  const [parsedTasks, setParsedTask] = useState([]);

  // Date calculations --------------------------------------------------
  const now = new Date();
  const daysRemaining = Math.ceil(
    (new Date(firstChallenge?.end_date) - now) / (1000 * 60 * 60 * 24) + 1
  );
  const totalDays = Math.ceil(
    (new Date(firstChallenge?.end_date) -
      new Date(firstChallenge?.start_date)) /
      (1000 * 60 * 60 * 24) + 1
  );
  const currentDay = totalDays - daysRemaining;

  useEffect(() => {
    if(!firstChallenge)return;

    // Parse the tasks JSON string ----------------------------------------
    if (firstChallenge && firstChallenge.tasks) {
        try {
        // Fix the format by replacing curly braces with square brackets
        const fixedTasks = firstChallenge.tasks
            .replace(/^{/, "[")
            .replace(/}$/, "]"); 
        setParsedTask(JSON.parse(fixedTasks));
        } catch (e) {
        console.error("Failed to parse tasks JSON:", e);
        }
    }

    setCheckedItems(firstChallenge.checkedtasks[currentDay]);
    //console.log('checkedItems: ' + checkedItems);

  }, [firstChallenge])




  // While loading, display a loading message
  if (loading) {
    return <div>Loading...</div>;
  }

  // If there's an error, display the error message
  if (error) {
    return <div>Error: {error}</div>;
  }



  const handleRowClick = async (task) => {
    // prev is automatically set to the previous value of checkedItems
    setCheckedItems(prev => {
      const updated = [...prev]; // sets copy of prev state
      updated[parsedTasks.indexOf(task)] = !updated[parsedTasks.indexOf(task)] // updates copy with opposite value at index of selected task
      return updated; // returns updated value
    });
    
    try {
      const body = {
        // ROW - The day the user is on
        indexOne: currentDay,
        // COLUMN - The task the user has checked off
        indexTwo: parsedTasks.indexOf(task),
      };

      // Sending the PUT request to the database.
      const response = await fetch("http://localhost:5000/updateTasksArray", {
        method: "put",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        }, // Sets the type to JSON
        body: JSON.stringify(body),
      });
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className={styles.box}>
      <h2 className={styles.title}>
        {firstChallenge.title || "No title available"}
      </h2>
      <ul>
        {parsedTasks.map((task, index) => (
          <div className={`${styles.taskRow} ${index % 2 === 0 ? styles.backgroundOne : styles.backgroundTwo}`} key={index}>
            <label className={`${styles.checkBox} ${checkedItems[index] ? styles.checkBoxSelected : ''}`}>
              <input
                type="checkbox"
                // Sending the function the current task
                onChange={() => {
                  handleRowClick(task);
                }}
              />
              <span></span>
            </label>
            <li
              className={`${styles.tasks} ${checkedItems[index] ? styles.taskSelected : ''}`}
            >
              {task}
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Task;
