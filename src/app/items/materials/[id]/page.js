import styles from '../../../../styles/show.module.css'
import utilStyles from '../../../../styles/utils.module.css'
import Image from 'next/image';
import EditDelete from '@/app/components/EditDelete';
import Refresher from '@/app/components/Refresher';
import LinksDisplay from '@/app/components/LinksDisplay';
import Link from 'next/link';

export async function generateStaticParams() {
    const response = await fetch(process.env.FETCH_URL+"items/materials");
    const data=await response.json()
    return data.data.map((material) => ({
        id: material._id
    }));
  }
export async function getMaterial(id) {
    const material = await fetch(process.env.FETCH_URL+`items/materials/${id}`,{next: {revalidate:1}}).then((res) => res.json());
    return material.data;
}
    
export default async function Materials({params}){
    const {id}=params

    const material=await getMaterial(id)
    const {_id, no, name, heartsRecovered, uniqueCookingEffects, commonLocations, description, image, userId }=material
    return(
        <>
            <Refresher/>
            <section className={styles.largerCard}>
                {image && <figure className={styles.imageWrapper}>
                    <Image
                        src={image}
                        alt={name}
                        fill/>
                </figure>}
                <article className={styles.cardInfo}>
                    <div className={styles.right}><EditDelete pathname='items/materials' itemId={_id} userId={userId} data={material}/></div>
                    <p>No: {no}</p>
                    <p>Name: <span className={utilStyles.capitalize}>{name}</span></p>
                    <p>Hearts Recovered: {heartsRecovered}</p>
                    <p>Unique Cooking Effects: <span className={utilStyles.capitalize}>{uniqueCookingEffects.join(', ')}</span></p>
                    <p>Common Locations: <span className={utilStyles.capitalize}>{commonLocations.join(', ')}</span></p>
                    <p className={styles.descriptionMobile}>Description: {description}</p>
                </article>
                
            </section>
            <article className={styles.description}>
                    <p>Description: {description}</p>
                </article>
            <LinksDisplay/>
        </>

    )

}