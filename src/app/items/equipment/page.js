import styles from "../../../styles/index.module.css"
import CardGrid from "../../components/CardGrid"
export default function Equipment(){
    return(
        <>
        <h1 className={styles.heading}>Equipment Index</h1>
        <CardGrid type={'items/equipment'}/>
        </>
        )

}