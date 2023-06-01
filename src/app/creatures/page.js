import styles from "../../styles/index.module.css"
import CardGrid from "../components/CardGrid"
import EditDelete from "../components/EditDelete"
import NewButton from "../components/NewButton"
export default function Creatures(){
    return(
        <>
        <h1 className={styles.heading}>Creature Index</h1>
        <div className={styles.btnContainer}>
            <NewButton pathname={'/creatures'}/>
        </div>
        <CardGrid type={'creatures'}/>
        <h1 className={styles.heading}>Creature Materials</h1>
        <div className={styles.btnContainer}>
            <NewButton pathname={'/critters'}/>
        </div>
        <CardGrid type={'critters'}/>
        </>
        )

}