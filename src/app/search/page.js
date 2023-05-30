import styles from '../../styles/index.module.css'
import Image from 'next/image'
import Link from 'next/link'

const getSearchResults=async(searchTerm)=>{
    const response=await fetch(process.env.FETCH_URL+`search?name=${searchTerm}`)
    const data=await response.json()
    if (data.data.length>0){
        return data.data;
    }
    else return {message: "No results found"}
}
const pathByNumber=(no)=>{
    if (no>=1 && no<=92){
        return 'creatures/'
    }
    if (no>=93 && no<=202){
        return 'monsters/'
    }
    if (no>=203 && no<=328){
        return 'items/materials'
    }
    if (no>=329 && no<=503){
        return 'equipment/'
    }
}


export default async function Search({searchParams}){
    console.log(searchParams)
    const {name}=searchParams
    const results=await getSearchResults(name)
    if (results.message){
        return <p>{results.message}</p>
    }
    else return (<>
        <h1 className={styles.heading}>Search Results</h1>
            <div className={styles.grid}>
                
                {results.map((result)=>{
                const {_id, no, name, image}=result;
                const path=pathByNumber(no)+`${_id}`
                return (
                    <Link href={path}>
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
        </>)
}