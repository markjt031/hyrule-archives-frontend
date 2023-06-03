
import CardGrid from "../components/CardGrid";
import styles from "../../styles/index.module.css"
import NewButton from '../components/NewButton'
import NewMonsterForm from "./new/page";
import Refresher from "../components/Refresher";

export default function Monsters(){
    return(
        <>
        <Refresher/>
        <h1 className={styles.heading}>Monster Index</h1>
        <div className={styles.btnContainer}>
            <NewButton className={styles.btn} pathname='/monsters'/>
        </div>
            <CardGrid type={'monsters'}/>
        </>
        )

}