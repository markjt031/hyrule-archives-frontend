'use client'
import Link from 'next/link'
import RegisterForm from '../../components/RegisterForm'
import styles from '../../../styles/login.module.css'

function Register() {
  return (
    <div className={styles.container}>
        <div className={styles.loginFormOverlay}>
            <RegisterForm/>
        </div>
    </div>
  )
}

export default Register