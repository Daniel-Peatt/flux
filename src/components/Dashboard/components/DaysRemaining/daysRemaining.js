import styles from "./daysRemaining.module.css";

// Custom Hooks
import useFetch from "../../../../hooks/useFetch"; // Import the custom hook

function DaysRemaining () {

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

    // Calculate days remaining 
    const now = new Date();
    const daysRemaining = results.start_date - results.end_date;

    return (
        <div className={styles.box}>
            {/* I do not understand this one, but it allows me to display data from the database */}
            {Array.isArray(results) && results.length > 0 ? (
                results.map((item, index) => (
                    <div key={index}>
                        {new Date(item.start_date) > new Date() ? (
                            <div>Start date not reached</div>
                        ) : (
                            <h2>Days remaining: {Math.ceil(Math.abs(new Date(item.end_date) - new Date()) / (1000 * 60 * 60 * 24)) || "No title available"}</h2>
                        ) 
                        }
                        <h2>Total days: {Math.ceil(Math.abs(new Date(item.end_date) - new Date(item.start_date)) / (1000 * 60 * 60 * 24)) || "No title available"}</h2>                                  
                    </div>
                ))
            ) : (
                <div>No data available</div>
            )}
        </div>
    )
}

export default DaysRemaining;