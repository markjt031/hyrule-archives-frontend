'use client'
import Link from 'next/link'
import styles from '../../../../styles/login.module.css'

function Success() {
  return (
    <div className={styles.linkbg}>
        <p className={styles.text}>You have successfully registered. Click <Link href="/user/login">here</Link> to login</p>
    </div>
  )
}

export default Success