import Image from "next/image";
import styles from "../../styles/index.module.css"

const getCreatures=async()=>{
    const response=await fetch(process.env.FETCH_URL+"Creatures", {next: {revalidate: 60}})
    const data=await response.json();
    return data.data
}
const getCritters=async()=>{
    const response=await fetch(process.env.FETCH_URL+"Critters", {next: {revalidate: 60}})
    const data=await response.json()
    return data.data
}

export default async function Creatures(){
    const creatures=await getCreatures()
    const critters=await getCritters()
    console.log(creatures)
    console.log(critters)
    return(
        <>
        <h1 className={styles.heading}>Creature Index</h1>
            <div className={styles.grid}>
                {creatures.map((creature)=>{
                const {no, name, image}=creature
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
                {critters.map((critter)=>{
                const {no, name, image}=critter;
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