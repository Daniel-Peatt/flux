import styles from "./calendar.module.css";

// Custom Hooks
import useFetch from "../../../../hooks/useFetch"; // Import the custom hook

function Calendar () {

    // Fetching data from the challenge table. 
    const token = localStorage.getItem('accessToken'); // Get token from localStorage
    const { data: results, loading, error } = useFetch('http://localhost:5000/challenge', token);

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
            {Array.isArray(results) && results.length > 0 ? (
                results.map((item, index) => (
                    <div key={index}>
                        <h2>{item.start_date || "No title available"}</h2>
                                  
                    </div>
                ))
            ) : (
                <div>No data available</div>
            )}
        </div>
    )
}

export default Calendar;