'use client'
 import styles from '../../styles/notauth.module.css'
export default function NotAuthorized(){
    return (<div className={styles.container}>
        <h1>Access Denied</h1>
        <div className={styles.imageContainer}> </div>
        <h2>Login or the Gloom Hands will get you!</h2>
    </div>)
}