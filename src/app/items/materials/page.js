import Image from "next/image";
import styles from "../../../styles/index.module.css"
import CardGrid from "../../components/CardGrid"
export default function Monsters(){
    return(
        <>
        <h1 className={styles.heading}>Materials Index</h1>
        <CardGrid type={['items/materials']}/>
        </>
        )

}