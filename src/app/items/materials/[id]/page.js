import styles from '../../../../styles/show.module.css'
import utilStyles from '../../../../styles/utils.module.css'
import Image from 'next/image';

export async function generateStaticParams() {
    const response = await fetch(process.env.FETCH_URL+"items/materials");
    const data=await response.json()
    return data.data.map((material) => ({
        id: material._id
    }));
  }
export async function getMaterial(id) {
    const material = await fetch(process.env.FETCH_URL+`items/materials/${id}`).then((res) => res.json());
    return material.data;
}
    
export default async function Materials({params}){
    console.log(params)
    const {id}=params

    const material=await getMaterial(id)
    const {no, name, heartsRecovered, uniqueCookingEffects, commonLocations, description, image }=material
    console.log(material)
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
                <p>Hearts Recovered: {heartsRecovered}</p>
                <p>Unique Cooking Effects: <span className={utilStyles.capitalize}>{uniqueCookingEffects.join(', ')}</span></p>
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