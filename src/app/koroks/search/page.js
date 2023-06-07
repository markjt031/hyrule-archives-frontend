
import Refresher from "../../components/Refresher";
import KorokGrid from "../../components/KorokDisplay";
import KorokFilter from "../../components/KorokFilter"
import NewButton from "@/app/components/NewButton";
import styles from "../../../styles/index.module.css"

export const getKorok=async(searchTerm)=>{
    const response=await fetch(`${process.env.FETCH_URL}koroks/search?region=${searchTerm}`, {next: {revalidate: 1}})
    const data=await response.json();
    return data.data
   
}

export default async function Korok({searchParams}){
    const {region}=searchParams
    const koroks=await getKorok(region)
    return(
        <>
        {koroks.length>0 ? 
           ( <>
                <Refresher/>
                <div className={styles.filter}><KorokFilter/></div>
                <KorokGrid data={koroks}/>
            </>)
            :
            <div className={styles.filter}>
                <KorokFilter/>
                <p>No koroks found</p>
            </div>
            }
            
        </>
    )
}