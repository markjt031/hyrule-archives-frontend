import styles from '../../../styles/show.module.css'
import utilStyles from '../../../styles/utils.module.css'
import Image from 'next/image';

export async function generateStaticParams() {
    const response = await fetch(process.env.FETCH_URL+"creatures");
    const data=await response.json()
    return data.data.map((creature) => ({
        id: creature._id
    }));
  }
export async function getCreature(id) {
    const creature = await fetch(process.env.FETCH_URL+`creatures/${id}`).then((res) => res.json());
    return creature.data;
}
    
export default async function Creature({params}){
    console.log(params)
    const {id}=params

    const creature=await getCreature(id)
    const {no, name, recoverableMaterials, commonLocations, description, image }=creature
    console.log(creature)
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