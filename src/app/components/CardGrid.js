import Image from "next/image";
import styles from "../../styles/index.module.css"
import utilStyles from "../../styles/utils.module.css"
import Link from "next/link";

export const getData=async(type)=>{
    const response=await fetch(`${process.env.FETCH_URL}${type}`, {next: {revalidate: 60}})
    const data=await response.json();
    return data.data
}

export default async function CardGrid({type}){
    console.log(type)
    const data=[]
    for (let i=0; i<type.length;i++){
        console.log(type[i])
        const items=await getData(type[i])
        data.push(...items)
    }
    console.log(data)
    return(
        <>
        
            <div className={styles.grid}>
                
                {data.map((item)=>{
                const {_id, no, name, image}=item;
                return (
                    <Link href={`${type}/${_id}`}>
                    <div key={no} className={styles.card}>
                        <Image 
                            src={image} 
                            alt={name}
                            fill/>
                        <p>#{no} {name}</p>
                    </div>
                    </Link>
                    )
                })}
            </div>
        </>
        )

}