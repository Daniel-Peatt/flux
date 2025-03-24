import styles from "./Calendar.module.css";

// Custom Hooks
import useFetch from "../../../../hooks/useFetch"; // Import the custom hook

function Calendar () {

    // Fetching data from the challenge table. 
    const token = localStorage.getItem('accessToken'); // Get token from localStorage
    const { data: results, loading, error } = useFetch('http://localhost:5000/challenge', token);

    // Store start_date and end_date in variables
    const startDate = results && results.length > 0 ? results[0].start_date : null; 
    const endDate = results && results.length > 0 ? results[0].end_date : null;

    // Calculate days remaining and total days
    const now = new Date();
    const daysRemaining = endDate ? Math.ceil((new Date(endDate) - now) / (1000 * 60 * 60 * 24)) : 0;
    const totalDays = startDate && endDate ? Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)) : 0;
    const daysCompleted = totalDays - daysRemaining;
    console.log(daysRemaining, totalDays, daysCompleted);


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
            <div className={styles.calendar} style={{gridTemplateRows: `repeat(${totalDays / 7}, 1fr [col-start])` }}>
                {Array.from({ length: totalDays }, (_, index) => (
                    <div key={index} className={styles.cell}>
                        {index}
                    </div>
                ))}
            </div>         
        </div>
    )
}

export default Calendar;