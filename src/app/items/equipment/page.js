import Image from "next/image";
import styles from "../../../styles/index.module.css"

const getEquipment=async()=>{
    const response=await fetch(process.env.FETCH_URL+"items/equipment", {next: {revalidate: 60}})
    const data=await response.json();
    return data.data
}

export default async function Equipment(){
    const equipment=await getEquipment();
    console.log(equipment);
    return(
        <>
        <h1 className={styles.heading}>Equipment Index</h1>
            <div className={styles.grid}>
                {equipment.map((equipment)=>{
                const {no, name, image}=equipment
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