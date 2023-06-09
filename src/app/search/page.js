import styles from '../../styles/index.module.css'
import Image from 'next/image'
import Link from 'next/link'
import { pathByNumber } from '@/lib/pathByNo'

const getSearchResults=async(searchTerm)=>{
    const response=await fetch(process.env.FETCH_URL+`search?name=${searchTerm}`)
    const data=await response.json()
    return data.data;
 
}

export default async function Search({searchParams}){
    const {name}=searchParams
    const results=await getSearchResults(name)
    
    return (<>
        
        <h1 className={styles.heading}>Search Results</h1>
        {results.length>0 ?
            <div className={styles.grid}>
                
                {results.map((result)=>{
                const {_id, no, name, image}=result;
                const path=pathByNumber(no)+`${_id}`
                return (
                    <Link href={path} key={_id}>
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
            :
            <p>No results found</p>}
        </>)
}