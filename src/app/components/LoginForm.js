'use client'
import styles from '../../styles/login.module.css'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@/context/user'


export default function LoginForm() {
    const router=useRouter();
    const {user, setUser}=useUser()
    const {userId, setUserId}=useUser()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail]=useState('')
    const [toggleError, setToggleError]=useState(false)
    const [errorMessage, setErrorMessage]=useState('')

  const triggerLogin = (event) => {
    event.preventDefault()
    let userObj = {
      username: username,
      email: email,
      password: password
    }
    handleLogin(userObj)
  }

  const handleLogin = async (userObj) => {
    const response= await fetch(`http://localhost:3002/users/login`,
    {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(userObj)
    })
    const data= await response.json()
    if (data.username){
        setToggleError(false)
        localStorage.setItem("userId", data.id)
        setUserId(localStorage.getItem('userId'))
        localStorage.setItem('userName', data.username)
        router.refresh();
        router.push('/')
    }
    else{
        setToggleError(true)
        setErrorMessage(data.message)
    }
  }

  return (
      <section className={styles.loginWrapper}>
        <h1 className='form-title'>Login</h1>
        <form onSubmit={triggerLogin} className={styles.loginForm}>
          <input type='text' placeholder='username' className='text-input' onChange={(event)=> {setUsername(event.target.value)}}/>
          <input type='email' placeholder='email' className='text-input' onChange={(event)=>{setEmail(event.target.value)}}/>
          <input type='password' placeholder='password' className='text-input' onChange={(event)=> {setPassword(event.target.value)}}/>
          <h2>New user? Register <Link href="/user/register" ><span className={styles.registerLink}>here</span></Link> </h2>
          {toggleError ?
            <h5 className='error-msg'>{errorMessage}</h5>
            :
            null
          }
          <input type='submit' value='Login'/>
        </form>
      </section>
  );
}
