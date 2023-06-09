'use client'
import Link from 'next/link'
import styles from '../../../../styles/login.module.css'

function Success() {
  return (
    <>
    <p className={styles.text}>You have successfully registered. Click <Link href="/user/login">here</Link> to login</p>
      <div className={styles.linkbg}> 
      </div>
      
    </>
  )
}

export default Success