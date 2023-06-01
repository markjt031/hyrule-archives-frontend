import CardGrid from "../components/CardGrid";
import styles from "../../styles/index.module.css"
import NewButton from '../components/NewButton'

export default function Monsters(){
    return(
        <>
        <h1 className={styles.heading}>Monster Index</h1>
        <NewButton/>
        <CardGrid type={'monsters'}/>
        </>
        )

}