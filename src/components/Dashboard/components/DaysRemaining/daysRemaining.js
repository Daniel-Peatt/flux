// CSS
import styles from "./daysRemaining.module.css";

// Custom Hooks
import useFetch from "../../../../hooks/useFetch"; // Import the custom hook

// Import for pie chart
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';



function DaysRemaining () {

    // Fetching data from the challenge table. 
    const token = localStorage.getItem('accessToken'); // Get token from localStorage
    const { data: results, loading, error } = useFetch('http://localhost:5000/challenge', token);
    console.log("Fetched results on client:", results);

    const firstChallenge = results && results.length > 0 ? results[0] : null;

        // While loading, display a loading message
        if (loading) {
        return <div>Loading...</div>;
    }

    // If there's an error, display the error message
    if (error) {
        return <div>Error: {error}</div>;
    }

    // Ensure result is an object and not an array
    if (!results || typeof results !== 'object') {
        return <div>No data available</div>;
    }

    // Calculate days remaining and total days
    const now = new Date();
    const daysRemaining = firstChallenge && firstChallenge.end_date ? Math.ceil((new Date(firstChallenge.end_date) - now) / (1000 * 60 * 60 * 24)) : 0;
    const totalDays = firstChallenge && firstChallenge.start_date && firstChallenge.end_date ? Math.ceil((new Date(firstChallenge.end_date) - new Date(firstChallenge.start_date)) / (1000 * 60 * 60 * 24)) : 0;
    const daysCompleted = totalDays - daysRemaining;

    // Pie chart data
    const data = {
        
        datasets: [
            {
                
                data: [daysRemaining, daysCompleted],
                backgroundColor: [
                    'rgba(175, 133, 55, 0.03)',
                    'rgb(189, 143, 59)',
                ],
                borderColor: 'rgb(227, 205, 163, .15)',
                hoverOffset: 4
            }
        ]
    };

    // Pie chart options
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Days Remaining vs Days Completed'
            }
        }
    };

    return (
        <div className={styles.box}>
            <Pie data={data} options={options} className={styles.chart}/>
        </div>
    )
}

export default DaysRemaining;