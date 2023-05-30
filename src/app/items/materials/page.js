import Image from "next/image";
import styles from "../../../styles/index.module.css"

const getMaterials=async()=>{
    const response=await fetch(process.env.FETCH_URL+"items/materials", {next: {revalidate: 60}})
    const data=await response.json();
    return data.data
}

export default async function Materials(){
    const materials=await getMaterials();
    console.log(materials);
    return(
        <>
        <h1 className={styles.heading}>Materials Index</h1>
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
            </div>
        </>
        )

}