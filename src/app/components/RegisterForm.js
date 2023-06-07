'use client'
import styles from '../../styles/login.module.css'
import { useState } from 'react'
import { useRouter } from 'next/navigation'


export default function LoginForm() {
    const router=useRouter()
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
    handleRegister(userObj)
  }

  const handleRegister = async (userObj) => {
    const response= await fetch(`https://hyrule-archive.herokuapp.com/users/register`,
    {
        method: "POST",
        mode: 'cors',
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(userObj)
    })
    const data= await response.json()
    console.log(data.data.username)
    if (!data.data.username){
        setToggleError(true)
        setErrorMessage(data.message)
    }
    else{
        // console.log(data)
        setToggleError(false)
        router.push('/user/register/success')
    }
  }

  return (
      <section className={styles.loginWrapper}>
        <h1 className='form-title'>Register</h1>
        <form onSubmit={triggerLogin} className={styles.loginForm}>
          <input type='text' placeholder='username' className='text-input' onChange={(event)=> {setUsername(event.target.value)}}/>
          <input type='email' placeholder='email' className='text-input' onChange={(event)=>{setEmail(event.target.value)}}/>
          <input type='password' placeholder='password' className='text-input' onChange={(event)=> {setPassword(event.target.value)}}/>
          <input type='submit' value='Register'/>
          {toggleError ?
            <h5 className='error-msg'>{errorMessage}</h5>
            :
            null
          }
        </form>
      </section>
  );
}
