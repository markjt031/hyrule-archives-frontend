import Image from "next/image";
import styles from "../../styles/index.module.css"

const getMonsters=async()=>{
    const response=await fetch(process.env.FETCH_URL+"monsters", {next: {revalidate: 60}})
    const data=await response.json();
    return data.data
}

export default async function Monsters(){
    const monsters=await getMonsters();
    console.log(monsters);
    return(
        <>
        <h1 className={styles.heading}>Monster Index</h1>
            <div className={styles.grid}>
                {monsters.map((monster)=>{
                const {no, name, image}=monster;
                return (
                    <div key={no} className={styles.card}>
                        <Image 
                            src={image} 
                            alt={name}
                            fill/>
                        <p>#{no} {name}</p>
                    </div>
                    )
                })}
            </div>
        </>
        )

}