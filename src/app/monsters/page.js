import Image from "next/image";
import styles from "./monsters.module.css"

const getMonsters=async()=>{
    const response=await fetch(process.env.FETCH_URL+"monsters")
    const data=await response.json();
    return data.data
}

export default async function Monsters(){
    const monsters=await getMonsters();
    console.log(monsters);
    return(
        <div className={styles.grid}>
            {monsters.map((monster)=>{
            const {no, name, image}=monster;
            return (
                <div key={no} className={styles.monsterCard}>
                    <Image 
                        src={image} 
                        alt={name}
                        fill/>
                    <p>{name}</p>
                </div>
                )
            })}
        </div>
        )
}