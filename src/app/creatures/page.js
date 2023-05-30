import styles from "../../styles/index.module.css"
import CardGrid from "../components/CardGrid"
export default function Monsters(){
    return(
        <>
        <h1 className={styles.heading}>Creature Index</h1>
        <CardGrid type={['creatures', 'critters']}/>
        </>
        )

}