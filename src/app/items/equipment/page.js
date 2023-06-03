import styles from "../../../styles/index.module.css"
import CardGrid from "../../components/CardGrid"
import NewButton from "@/app/components/NewButton"
import Refresher from "@/app/components/Refresher"

export default function Equipment(){
    return(
        <>
            <Refresher/>
            <h1 className={styles.heading}>Equipment Index</h1>
            <div className={styles.btnContainer}>
                <NewButton pathname={'items/equipment'}/>
            </div>
            <CardGrid type={'items/equipment'}/>
        </>
        )

}