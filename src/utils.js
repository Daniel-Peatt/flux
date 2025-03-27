import { useEffect, useState } from "react";

export function checkLoginStatus() {
    let token = localStorage.getItem('accessToken');
    if(token === null) {
        return false;
    }
    else {
        return true
    }
}

export function useChallengeExist() {
    const [challengeExist, setChallengeExist] = useState(null);



useEffect(() => {
        const Func = async() => {
        try {
            // Get the token from localStorage (or wherever it's stored)
            const token = localStorage.getItem('accessToken');
            if (token === null) {
                return null;
            }
            const doesChallengeExist = await fetch('http://localhost:5000/challenge', {
                method: 'get',
                headers: {
                    "content-type": "application/json",
                    "Authorization": `Bearer ${token}`,
                }
            });
            const data = await doesChallengeExist.json();
            // Set the state once the data is fetched
                setChallengeExist(data !== null); // Assuming null means no challenge
        } catch (error) {
            console.error(error.message);
            setChallengeExist(false); // On error, assume no challenge
        }
    }
    Func();
}, []);

    return challengeExist;

}