import styles from "./Login.module.css";

function Login () {
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
                    <div className={styles.buttonBox}>
                        <input type="Button" className={styles.button} value="Submit"/>
                    </div>
                   
                </form>
                
            </div>
        </div>
    );
}

export default Login;