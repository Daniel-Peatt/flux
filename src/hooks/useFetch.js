import { useState, useEffect } from 'react';

function useFetch(url, token) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`, // Add the token
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }

                const result = await response.json();
                console.log("useFetch hook results: ");
                console.log(result);

                
                setData(result); // Store data in state
                setLoading(false); // Set loading to false
            } catch (err) {
                setError(err.message); // Handle error
                setLoading(false); // Set loading to false
            }
        };

        fetchData();
    }, [url, token]); // Re-run effect when the URL or token changes

    return { data, loading, error };
}

export default useFetch;