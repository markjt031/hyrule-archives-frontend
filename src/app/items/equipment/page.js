import styles from "../../../styles/index.module.css"
import CardGrid from "../../components/CardGrid"
import NewButton from "@/app/components/NewButton"
export default function Equipment(){
    return(
        <>
            <h1 className={styles.heading}>Equipment Index</h1>
            <div className={styles.btnContainer}>
                <NewButton pathname={'items/equipment'}/>
            </div>
            <CardGrid type={'items/equipment'}/>
        </>
        )

}