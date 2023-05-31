'use client'
import Link from 'next/link'
import LoginForm from '../../components/LoginForm'
import styles from '../../../styles/login.module.css'

function Login() {
  return (
    <div className={styles.container}>
      <div className={styles.loginFormOverlay}>
          <LoginForm/>
      </div>
    </div>
  )
}

export default Login