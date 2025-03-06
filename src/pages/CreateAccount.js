import Header from "../components/Header/Header.jsx";
import CreateAccount from "../components/CreateAccount/CreateAccount.jsx";
import Background from "../components/Background/Background.jsx";

// CSS
import styles from './CreateAccount.module.css';

export default function CreateAccountPage () {
    return (
        <>
        <Header />
        <Background />
        <div styles={styles.box}>
             <CreateAccount />   
        </div>
        
        </>
    )
}