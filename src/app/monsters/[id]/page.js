import styles from '../../../styles/show.module.css'
import utilStyles from '../../../styles/utils.module.css'
import Image from 'next/image';

export async function generateStaticParams() {
    const response = await fetch(process.env.FETCH_URL+"monsters");
    const data=await response.json()
    return data.data.map((monster) => ({
        id: monster._id
    }));
  }
export async function getMonster(id) {
    const monster = await fetch(process.env.FETCH_URL+`monsters/${id}`).then((res) => res.json());
    return monster.data;
}
    
export default async function Monsters({params}){
    console.log(params)
    const {id}=params

    const monster=await getMonster(id)
    const {no, name, recoverableMaterials, commonLocations, description, image }=monster
    console.log(monster)
    return(
        <>
        <div className={styles.largerCard}>
            <div className={styles.imageWrapper}>
                <Image
                    src={image}
                    alt={name}
                    fill/>
            </div>
            <div className={styles.cardInfo}>
                <p>No: {no}</p>
                <p>Name: <span className={utilStyles.capitalize}>{name}</span></p>
                <p>Recoverable Materials: <span className={utilStyles.capitalize}>{recoverableMaterials.join(', ')}</span></p>
                <p>Common Locations: <span className={utilStyles.capitalize}>{commonLocations.join(', ')}</span></p>
                <p className={styles.descriptionMobile}>Description: {description}</p>
            </div>
            
        </div>
        <div className={styles.description}>
                <p>Description: {description}</p>
            </div>
        <div>
            
        </div>
        </>

        )

}
