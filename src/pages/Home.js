import Header from "../components/Header/Header.jsx";
import Background from "../components/Background/Background.jsx";
import About from "../components/About/About.jsx";
import Login from "../components/Login/Login.jsx";

import styles from "./Home.module.css";


export default function Home () {


    return (
        <> 
             
        <Header />
        <Background />
        <div className={styles.AboutLog}>
          <About />
          <Login />  
        </div>
        </>
    )
}