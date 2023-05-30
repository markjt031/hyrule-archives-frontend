import Image from "next/image";
import styles from "../../styles/index.module.css"

const getMaterials=async()=>{
    const response=await fetch(process.env.FETCH_URL+"items/materials", {next: {revalidate: 60}})
    const data=await response.json();
    return data.data
}
const getEquipment=async()=>{
    const response=await fetch(process.env.FETCH_URL+"items/equipment", {next: {revalidate: 60}})
    const data=await response.json();
    return data.data
}

export default async function Items(){
    const materials=await getMaterials();
    const equipment=await getEquipment();
    console.log(materials);
    return(
        <>
        <h1 className={styles.heading}>Items Index</h1>
            <div className={styles.grid}>
                {materials.map((material)=>{
                const {no, name, image}=material;
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