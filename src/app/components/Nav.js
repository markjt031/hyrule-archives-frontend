import Link from "next/link"
import styles from "../../styles/Nav.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faM } from '@fortawesome/free-solid-svg-icons'
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import { faUserCircle } from "@fortawesome/free-solid-svg-icons"

export default function Nav() {
  return (
    <nav className={styles.nav}>
        <div className={styles.dropdown}>
            <FontAwesomeIcon icon={faBars}/>
            <div className={styles.dropdownMenu}>
                <Link href="#">Monsters</Link>
                <Link href="#">Creatures</Link>
                <Link href='#'>Items</Link>
            </div>
        </div>
        <Link href="/home">Hyrule Archives</Link>
        <div className={styles.dropdownSearch}>
            <FontAwesomeIcon icon={faMagnifyingGlass}/>
            <div className={styles.dropdownSearchMenu}>
                <form>
                    <input type="text"></input>
                    <button type="submit" className={styles.searchBtn}><FontAwesomeIcon icon={faMagnifyingGlass}/></button>
                </form>
            </div>
        </div>
        <div className={styles.searchFullScreen}>
            <form className={styles.form}>
                <input type="text"></input>
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

