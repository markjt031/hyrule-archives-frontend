import styles from "../../styles/index.module.css"
import CardGrid from "../components/CardGrid"
export default function Creatures(){
    return(
        <>
        <h1 className={styles.heading}>Creature Index</h1>
        <CardGrid type={'creatures'}/>
        <h1 className={styles.heading}>Creature Materials</h1>
        <CardGrid type={'critters'}/>
        </>
        )

}