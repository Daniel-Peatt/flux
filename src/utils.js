import { useEffect, useState } from "react";

// Checks if token is expired
const isTokenExpired = (token) => {
    if (!token) return true; // No token means it's effectively expired
    try {
        const payload = JSON.parse(atob(token.split('.')[1])); // Decode the JWT payload
        return payload.exp * 1000 < Date.now(); // Compare expiration time (in ms) with current time
    } catch (e) {
        return true; // If decoding fails, treat as expired
    }
};

// Checks if user is logged in
export function checkLoginStatus() {
    let token = localStorage.getItem('accessToken');
    if(token === null) { // If the token does not exist
        return false;
    }
    else if(isTokenExpired(token)) { // Deletes token from local storage is expired
        localStorage.removeItem("accessToken"); // Clear token if unauthorized
        return false;
    }
    else { // Token exist and is not expired
        return true;
    }
}

export function useChallengeExist() {
    const [challengeExist, setChallengeExist] = useState(null);
useEffect(() => {
        const Func = async() => {
        try {
            // Get the token from localStorage (or wherever it's stored)
            const token = localStorage.getItem('accessToken');
            // This prevents the function from trying to make a call to the database when the user is not logged in.
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
            // If the fetch returns something successfully, update the state.
            setChallengeExist(data !== null);
        } catch (error) {
            console.error(error.message);
            setChallengeExist(false); // On error, assume no challenge
        }
    }
    Func();
}, []);
    return challengeExist;
}