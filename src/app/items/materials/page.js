import Image from "next/image";
import styles from "../../../styles/index.module.css"
import CardGrid from "../../components/CardGrid"
import NewButton from "@/app/components/NewButton";
export default function Materials(){
    return(
        <>
        <h1 className={styles.heading}>Materials Index</h1>
        <NewButton pathname={'items/materials'}/>
        <CardGrid type={'items/materials'}/>
        
        </>
        )

}