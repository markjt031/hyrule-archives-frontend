import Refresher from "../components/Refresher";
import NewButton from "../components/NewButton";
import styles from '../../styles/index.module.css'
import utilStyles from '../../styles/utils.module.css'
import Link from "next/link";


export const getShrine=async()=>{
    const response=await fetch(`${process.env.FETCH_URL}shrines`, {next: {revalidate: 1}})
    const data=await response.json();
    return data.data
}

export default async function Shrines(){
    const shrines=await getShrine();
    return(
        <>
            <Refresher/>
            <div className={styles.btnContainer}><NewButton pathname='/shrines'/></div>
            <ul className={styles.titleRow}>
                <li>Name</li>
                <li>Subtitle</li>
                <li>Region</li>
            </ul>
            <div className={styles.shrineList}>
            {shrines.map((shrine)=>{
                const {_id, name, subtitle, region}=shrine
                return(
                    <ul className={styles.shrineUl} key={_id}>
                        <Link href={`/shrines/${_id}`}><li className={utilStyles.capitalize}>{name}</li></Link>
                        <Link href={`/shrines/${_id}`}><li className={utilStyles.capitalize}>{subtitle}</li></Link>
                        <Link href={`/shrines/${_id}`}><li className={utilStyles.capitalize}>{region}</li></Link>
                    </ul>
                )
            })}
            </div>
        </>)
} 