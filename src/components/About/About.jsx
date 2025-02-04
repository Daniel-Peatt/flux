import styles from "./About.module.css";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";


const About = () => {
    const [data, setData] = useState([]);
    
    useEffect(() => {
        fetch("http://localhost:5000/api/data")
          .then((response) => response.json())
          .then((json) => setData(json))
          .catch((error) => console.error("Error fetching data:", error));
      }, []);

    // Used to navigate to the createAccount Route when button is pressed
    const navigate = useNavigate();
    const goToCreateAccount = () => {
        navigate("/createAccount");
    }

    return (
        <div className={styles.About}>
            <h1 className={styles.title}>Your Goals <br /> Your Way</h1>
            <p className={styles.message}>Unleash your potential with a platform designed to empower you to create, 
                track, and conquer your personal Goals
                and challenges. Whether your're striving for fitness milestones, professional 
                growth, or personal development, Flux puts you in control. 
            </p>
            <form className={styles.buttonBox}>
                <input onClick={goToCreateAccount} className={styles.button} type="button" value="Get Started"/>
            </form>
            <div>
                {/* Data from database */}
            <h1>Data from PostgreSQL</h1>
            <ul>
                {data.map((item, index) => (
                <li key={index}>{JSON.stringify(item)}</li>
                ))}
            </ul>
            </div>
        </div>
        
  
    )
}

export default About;