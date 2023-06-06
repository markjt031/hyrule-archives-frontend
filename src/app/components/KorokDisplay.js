import EditDelete from "../components/EditDelete";
import NewButton from "../components/NewButton";
import Image from "next/image";
import styles from "../../styles/index.module.css"
import utilStyles from "../../styles/utils.module.css"

export default function KorokGrid({data}){

       return(
        <>
        <div className={styles.btnContainer}><NewButton pathname='/koroks'/></div>
        <div className={styles.korokGrid}>
            {data.map((korok, index)=>{
            const {_id, region, locationDescription, locationImage, korokImage, korokDescription, userId}=korok
            return(
                    <div className={styles.korokCard} key={_id}>
                        <h3>Korok #{index+1}</h3><EditDelete pathname='koroks' itemId={_id} userId={userId} data={korok}/>
                        <h4 className={utilStyles.capitalize}>Region: {region}</h4>
                        <div className={styles.imageWrapper}>
                            {locationImage &&
                            <Image 
                                src={locationImage}
                                alt="korok location"
                                fill
                            />}
                        </div>
                        {locationDescription && <p>{locationDescription}</p>}
                        <div className={styles.imageWrapper}>
                            {korokImage &&
                            <Image 
                                src={korokImage}
                                alt="korok image"
                                fill
                            />}
                        </div>
                        {korokDescription && <p>{korokDescription}</p>}
                    </div>
                )
            })} 
            </div>
            </>)

}