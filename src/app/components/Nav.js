'use client'
import Link from "next/link"
import styles from "../../styles/Nav.module.css"
import { useRouter } from "next/navigation"
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faMagnifyingGlass, faUserCircle } from '@fortawesome/free-solid-svg-icons'



export default function Nav() {
    const router= useRouter()
    const [formData, setFormData] = useState({
        searchterm: "",
      });
      const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
      };
      const handleSubmit=(e)=>{
        e.preventDefault();
        router.push(`/search?name=${formData.searchterm}`)
    }
  return (
    <nav className={styles.nav}>
        <div className={styles.dropdown}>
            <FontAwesomeIcon icon={faBars}/>
            <div className={styles.dropdownMenu}>
                <Link href="/monsters">Monsters</Link>
                <Link href="/creatures">Creatures</Link>
                <Link href='/items/materials'>Materials</Link>
                <Link href='/items/equipment'>Equipment</Link>
            </div>
        </div>
        <Link href="/home">Hyrule Archives</Link>
        <div className={styles.dropdownSearch}>
            <FontAwesomeIcon icon={faMagnifyingGlass}/>
            <div className={styles.dropdownSearchMenu}>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="searchterm" onChange={handleChange} value={formData.searchterm}></input>
                    <button type="submit" className={styles.searchBtn}><FontAwesomeIcon icon={faMagnifyingGlass}/></button>
                </form>
            </div>
        </div>
        <div className={styles.searchFullScreen}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <input type="text" name="searchterm" onChange={handleChange} value={formData.searchterm}></input>
                <button type="submit"><FontAwesomeIcon icon={faMagnifyingGlass}/></button>
            </form>
        </div>
        <div className={styles.dropdown}>
            <FontAwesomeIcon icon={faUserCircle}/>
            <div className={styles.dropdownMenu}>
                <Link href="#">Login</Link>
                <Link href="#">Register</Link>
            </div>
        </div>
        
    </nav>
  )
}

