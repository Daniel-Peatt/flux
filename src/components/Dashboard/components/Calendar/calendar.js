import styles from "./Calendar.module.css";

// Custom Hooks
import useFetch from "../../../../hooks/useFetch"; // Import the custom hook
import { useEffect, useState } from "react";

function Calendar ({checkedItems}) {

    // Fetching data from the challenge table. 
    const token = localStorage.getItem('accessToken'); // Get token from localStorage
    const { data: results, loading, error } = useFetch('http://localhost:5000/challenge', token);

    const challenge = results && results.length > 0 ? results[0] : null;

    // useStates
    const [isCompleted, setIsCompleted] = useState([]);


    // Store start_date and end_date in variables
    const startDate = results && results.length > 0 ? results[0].start_date : null; 
    const endDate = results && results.length > 0 ? results[0].end_date : null;

    // Calculate days remaining and total days
    const now = new Date();
    const daysRemaining = endDate ? Math.ceil((new Date(endDate) - now) / (1000 * 60 * 60 * 24)) : 0;
    const totalDays = startDate && endDate ? Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24) + 1) : 0;
    const daysCompleted = totalDays - daysRemaining;
    const currentDay = totalDays - daysRemaining;

    useEffect(() => {
        if(!challenge) return;

        const completedDays = [];
        for(let i = currentDay - 1; i >= 0; i--)
        {
            const allChecked = challenge.checkedtasks[i].every(Boolean);  
            completedDays.unshift(allChecked);
        }

        // Converts checkedItems into an array so it can be evaluated 
        const checkedItemsArray = Object.values(checkedItems);



        // If the current days checklist gets filled out, update the index(currentDay) in completedDays to true 
        // this allows the CSS to update immediatly 
        if(checkedItemsArray.every(Boolean))
        {
            completedDays[currentDay - 1] = true;
        }
        else 
        {
            completedDays[currentDay - 1] = false;
        }

        setIsCompleted(completedDays);
        
        }, [challenge, currentDay, checkedItems]);

    // While loading, display a loading message
    if (loading) {
        return <div>Loading...</div>;
    }

    // If there's an error, display the error message
    if (error) {
        return <div>Error: {error}</div>;
    }

    // Sends class to the calandar cell depending on task completion 
    function dayStatus(index, checkedItems) {
        // add 1 to index to represent the day number
        const day = index + 1;
        // convert lifted state into an array
        const checkedItemsArray = Object.values(checkedItems);
        // set current day class to completed if all task are completed
        if(currentDay === day && checkedItemsArray.every(Boolean)) return styles.cellCompleted;
        // return nothing if index is greater than current day
        if (day >= currentDay) return '';
        // returns class depending on if task were completed or not
        if (isCompleted[index] === true) return styles.cellCompleted; 
        else return styles.cellFailed;
    }

    return (
        <div className={styles.box}>
            <h2 className={styles.title}>DAY {currentDay} <br />
                <span className={isCompleted[currentDay - 1] ? styles.title_completed : styles.title_hidden}>
                    COMPLETED
                </span>
            </h2>
            <div className={styles.calendar} style={{gridTemplateRows: `repeat(${totalDays / 7}, 1fr [col-start])` }}>
                {Array.from({ length: totalDays }, (_, index) => (
                    <div key={index} >
                        <div className={`${styles.cell} ${dayStatus(index, checkedItems)}`}>
                              {index + 1}
                        </div>                  
                    </div>
                ))}
            </div>         
        </div>
    )
}

export default Calendar;