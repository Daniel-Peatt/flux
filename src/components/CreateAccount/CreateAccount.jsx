import styles from "./CreateAccount.module.css";

function CreateAccountPage () {
    return (
        <div className={styles.Login}>
            <div> 
                <div className={styles.loginTitle}>
                    Log in
                </div>
                <form action="" className={styles.TextFields}>
                    <label className={styles.userNameLabel}> User Name <br />
                        <input className={styles.userName} type="text" /> 
                    </label>
                    <label className={styles.passwordLabel}> Password <br />
                        <input className={styles.password} type="password" /> 
                    </label>
                    <label className={styles.passwordLabel}> Confirm Password <br />
                        <input className={styles.password} type="password" /> 
                    </label>
                    <div className={styles.buttonBox}>
                        <input type="Button" className={styles.button} value="Submit"/>
                    </div>
                   
                </form>
                
            </div>
        </div>
    );
}

export default CreateAccountPage;