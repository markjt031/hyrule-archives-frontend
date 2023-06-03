import Image from "next/image";
import styles from "../../styles/index.module.css"
import utilStyles from "../../styles/utils.module.css"
import Link from "next/link";

export const getData=async(type)=>{
    const response=await fetch(`${process.env.FETCH_URL}${type}`, {next: {revalidate: 1}})
    const data=await response.json();
    return data.data
}

export default async function CardGrid({type}){
    console.log(type)
    const data=await getData(type)
    console.log(data)
    return(
        <>
            <div className={styles.grid}>
                {data.map((item)=>{
                const {_id, no, name, image}=item;
                return (
                    <Link key={no} href={`${type}/${_id}`}>
                    <div className={styles.card}>
                        <Image 
                            src={image} 
                            alt={name}
                            sizes="(min width: 1024px) 400px, 200px"
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