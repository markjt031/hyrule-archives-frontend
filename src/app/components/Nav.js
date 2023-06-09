'use client'
import Link from "next/link"
import styles from "../../styles/Nav.module.css"
import 'font-awesome/css/font-awesome.min.css'
import { useRouter } from "next/navigation"
import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faMagnifyingGlass, faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { useUser } from "@/context/user"




export default function Nav() {
    
    const router= useRouter()
    const {userId, setUserId}=useUser()
    const [isSearching, setIsSearching]=useState(false)
    const [formData, setFormData] = useState({
        searchterm: "",
      });
    
      useEffect(() => {
        if(localStorage.getItem('userId')) {
            setUserId(localStorage.getItem('userId'))
        }
    }, [])

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSubmit=(e)=>{
        e.preventDefault();
        router.push(`/search?name=${formData.searchterm}`)
    }

    const handleLogout=async()=>{
        const response= await fetch(`https://hyrule-archive.herokuapp.com/users/logout`)
        localStorage.setItem('userId', null)
        localStorage.setItem('userName', null)
        setUserId(localStorage.getItem('userId'))
        router.refresh()
        router.push('/')
    }

  return (
    <>

    <nav className={styles.nav}>
        <div className={styles.left}>
            <div className={styles.dropdown}>
                <FontAwesomeIcon icon={faBars}/>
                <div className={styles.dropdownMenu}>
                    <Link href="/monsters">Monsters</Link>
                    <Link href="/creatures">Creatures</Link>
                    <Link href='/items/materials'>Materials</Link>
                    <Link href='/items/equipment'>Equipment</Link>
                    <Link href='/shrines'>Shrines</Link>
                    <Link href='/koroks'>Koroks</Link>
                </div>
            </div>
            <Link href="/">Hyrule Archives</Link>
        </div>
        <div className={styles.right}>
            <div className={styles.dropdownSearch}>
                <button onClick={()=>setIsSearching(!isSearching)}><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
                
            </div>
            <div className={styles.searchFullScreen}>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <input type="text" name="searchterm" className={styles.searchbar}onChange={handleChange} value={formData.searchterm}></input>
                    <button type="submit"><FontAwesomeIcon icon={faMagnifyingGlass}/></button>
                </form>
            </div>
            {userId=='null' ? <div className={styles.dropdown}>
                <FontAwesomeIcon icon={faUserCircle}/>
                <div className={styles.dropdownMenu}>
                    <Link href="/user/login">Login</Link>
                    <Link href="/user/register">Register</Link>
                </div>
            </div>
            :
            <div className={styles.dropdown}>
            <FontAwesomeIcon icon={faUserCircle}/>
            <div className={styles.dropdownMenu}>
                <Link href={`/user/profile/${userId}`}>Profile</Link>
                <Link href={`/`} onClick={handleLogout}>Logout</Link>
            </div>
        </div>
        }
        </div>
        
    </nav>
    {isSearching && <div className={styles.dropdownSearchMenu}>
    
    <form onSubmit={handleSubmit}>
        <input type="text" name="searchterm"  onChange={handleChange} value={formData.searchterm}></input>
        
    </form>
    <FontAwesomeIcon icon={faMagnifyingGlass} className={styles.placeholderIcon}/>
</div>}
</>
  )
}

