import styles from "../../styles/index.module.css"
import CardGrid from "../components/CardGrid"
import Refresher from "../components/Refresher"
import NewButton from "../components/NewButton"
export default function Creatures(){
    return(
        <>
        <Refresher/>
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