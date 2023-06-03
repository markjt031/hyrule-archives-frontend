'use client'
import Image from "next/image";
import styles from "../../styles/index.module.css"
import utilStyles from "../../styles/utils.module.css"
import Link from "next/link";
import { useRouter } from "next/navigation";

import { use, cache, useState, useEffect } from 'react'


export const getData=cache(async(type)=>{
    const response=await fetch(`http://hyrule-archive.herokuapp.com/${type}`, {next: {revalidate: 1}})
    const data=await response.json();
    
    return data.data
})

export default function CardGridClient({type}){
    
    const data=use(getData(type))
    const router=useRouter()
    
    
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