import Image from "next/image";
import styles from "../../../styles/index.module.css"
import CardGrid from "../../components/CardGrid"
import NewButton from "@/app/components/NewButton";
import Refresher from "@/app/components/Refresher";

export default function Materials(){
    return(
        <>
        <Refresher/>
        <h1 className={styles.heading}>Materials Index</h1>
        <div className={styles.btnContainer}>
            <NewButton pathname={'items/materials'}/>
        </div>
        
        <CardGrid type={'items/materials'}/>
        
        </>
        )

}