import styles from "../../styles/index.module.css"
import CardGrid from "../components/CardGrid"
import NewButton from "../components/NewButton"
export default function Creatures(){
    return(
        <>
        <h1 className={styles.heading}>Creature Index</h1>
        <NewButton pathname={'/creatures'}/>
        <CardGrid type={'creatures'}/>
        <h1 className={styles.heading}>Creature Materials</h1>
        <NewButton pathname={'/critters'}/>
        <CardGrid type={'critters'}/>
        
        </>
        )

}