import styles from "./CreateChallenge.module.css";
import { useParams } from "react-router-dom";
import React, { useState, useRef } from "react";

function ChallengeTitle () {
    // References
    const { email } = useParams(); // Extract the email from the URL
    const inputRef = useRef(null); // Create a reference for the input field

    // useStates
    const [tasks, setTasks] = useState([]);
    const [taskfield, setTaskField] = useState("");

    const onSubmitForm = async (e) => {
        e.preventDefault(); // keeps it from refreshing 
        try {
            console.log("Submit button has been clicked");
        } catch (err) {
            console.error(err.message);
        }
    } 

    const handleClick = () => {
        console.log("Add task button has been clicked");
        if(taskfield) { // Prevents empty task from being added
          setTasks([taskfield, ...tasks]);
          setTaskField(""); // Clear the input field after adding task  
        }
        // Focus on the input field after submit
        // Reference needs to be on the text field too
        inputRef.current.focus();
    }

    return (
        <div>
            
            <form onSubmit={onSubmitForm} className={styles.box} >
            <h1>Create you Challenge</h1>
                <div className={styles.box1}>
                    <div className={styles.box1_1}>
                        <input type="text" className={`${styles.titleField} ${styles.field}`} placeholder="Name your challenge here..." />
                        <textarea type="text" className={`${styles.intentionsField} ${styles.field}`} placeholder="Intentions for callenge..." />
                        <div className={styles.row}>
                            <h3 style={{marginLeft: "10px"}}>Start Date</h3>
                            <input type="date" className={styles.field}/>                           
                        </div>
                        <div className={styles.row}>
                            <h3 style={{marginLeft: "10px"}}>End Date</h3> 
                            <input type="date" className={styles.field}/>                             
                        </div>
                        <div className={styles.row}>
                           <input 
                            type="text" 
                            className={`${styles.addTaskField}`} 
                            placeholder="Add a task" 
                            value={taskfield}
                            ref={inputRef} // Attach the ref to the input
                            onChange={(e) => setTaskField(e.target.value)}/>
                            <input 
                            type="button" 
                            value="Add" 
                            onClick={handleClick}
                            className={`${styles.addTaskButton}`}/>  
                        </div>
                         
                    </div>
                    <div className={styles.box1_2}>
                        <div>

                        
                        <ul>
                            {tasks.map((task, index) => (
                                <li key={index} className={styles.taskList}>
                                    {task}
                                </li>       
                            ))}
                        </ul>


                        </div>
                    </div>                    
                </div>    
                <div className={styles.line}>
                    <div className={styles.line1}></div> 
                    <input type="submit" className={`${styles.submitButton}`} value="Submit"/> 
                    <div className={styles.line2}></div> 
                </div>            
                
            </form>
            
        </div>
    );
}

export default ChallengeTitle;