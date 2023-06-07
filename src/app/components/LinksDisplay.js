import { pathByNumber } from "@/lib/pathByNo";
import Link from "next/link";
import utilStyles from '../../styles/utils.module.css'
import styles from '../../styles/linksSection.module.css'

const getData=async()=>{
    const response=await fetch(`${process.env.FETCH_URL}search?name=`, {next: {revalidate: 1}})
    const data=await response.json();
    return data.data
}

export default async function LinksDisplay(){
    const data=await getData()
    const newData=data.map((item)=>{
        return(
            {
                name:item.name,
                pathname: pathByNumber(item.no),
                id: item._id
            }
        )
    })
    return(
        <>
            <section className={styles.linksSection}>
                <h4>Creatures</h4>
                <ul>
                {newData.filter(item=>item.pathname==='creatures/').map((item)=>{
                    const {name, pathname, id}=item
                    return(
                    <li key={id}>
                        <Link href={`/${pathname}${id}`}><h6 className={utilStyles.capitalize}>{name}</h6></Link>
                    </li>)
                })}
                </ul>
                <h4>Critters</h4>
                <ul>
                {newData.filter(item=>item.pathname==='critters/').map((item)=>{
                    const {name, pathname, id}=item
                    return(
                    <li key={id}>
                        <Link href={`/${pathname}${id}`}><h6 className={utilStyles.capitalize}>{name}</h6></Link>
                    </li>)
                })}
                </ul>
                <h4>Monsters</h4>
                <ul>
                {newData.filter(item=>item.pathname==='monsters/').map((item)=>{
                    const {name, pathname, id}=item
                    return(
                    <li key={id}>
                        <Link href={`/${pathname}${id}`}><h6 className={utilStyles.capitalize}>{name}</h6></Link>
                    </li>)
                })}
                </ul>
                <h4>Materials</h4>
                <ul>
                {newData.filter(item=>item.pathname==='items/materials/').map((item)=>{
                    const {name, pathname, id}=item
                    return(
                    <li key={id}>
                        <Link href={`/${pathname}${id}`}><h6 className={utilStyles.capitalize}>{name}</h6></Link>
                    </li>)
                })}
                </ul>
                <h4>Equipment</h4>
                <ul>
                {newData.filter(item=>item.pathname==='items/equipment/').map((item)=>{
                    const {name, pathname, id}=item
                    return(
                    <li key={id}>
                        <Link href={`/${pathname}${id}`}><h6 className={utilStyles.capitalize}>{name}</h6></Link>
                    </li>)
                })}
                </ul>
            </section>
        
        </>
    )
}