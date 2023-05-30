import CardGrid from "../components/CardGrid";
import styles from "../../styles/index.module.css"

export default function Monsters(){
    return(
        <>
        <h1 className={styles.heading}>Monster Index</h1>
        <CardGrid type={['monsters']}/>
        </>
        )

}