
import styles from "../../styles/index.module.css"
import Refresher from "../components/Refresher";
import KorokFilter from "../components/KorokFilter";
import KorokGrid from "../components/KorokDisplay";

export const getKorok=async()=>{
    const response=await fetch(`${process.env.FETCH_URL}koroks`, {next: {revalidate: 1}})
    const data=await response.json();
    return data.data
}

export default async function Korok(){
    const koroks=await getKorok()
    return(
        <>
            <Refresher/>
            <div className={styles.filter}><KorokFilter/></div>
            <KorokGrid data={koroks}/>
        </>
    )
}