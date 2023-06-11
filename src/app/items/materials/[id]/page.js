import styles from '../../../../styles/show.module.css'
import utilStyles from '../../../../styles/utils.module.css'
import Image from 'next/image';
import EditDelete from '@/app/components/EditDelete';
import Refresher from '@/app/components/Refresher';
import LinksDisplay from '@/app/components/LinksDisplay';
import Link from 'next/link';
import HeartsRecovered from '@/app/components/HeartsRecovered';

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
    const {_id, no, name, heartsRecovered, fuseAttackPower, uniqueCookingEffects, commonLocations, description, image, userId }=material
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
                    
                    <p><span className={utilStyles.bold}>No:</span> {no}</p><div className={styles.right}><EditDelete pathname='items/materials' itemId={_id} userId={userId} data={material}/></div>
                    <p><span className={utilStyles.bold}>Name:</span> <span className={utilStyles.capitalize}>{name}</span></p>
                    <p><span className={utilStyles.bold}>Hearts Recovered:</span> <HeartsRecovered numHearts={Number.parseFloat(heartsRecovered)}/></p>
                    {fuseAttackPower && <p><span className={utilStyles.bold}>Fuse Attack Power:</span> {fuseAttackPower}</p>}
                    <p><span className={utilStyles.bold}>Unique Cooking Effects:</span> <span className={utilStyles.capitalize}>{uniqueCookingEffects.join(', ')}</span></p>
                    <p><span className={utilStyles.bold}>Common Locations:</span> <span className={utilStyles.capitalize}>{commonLocations.join(', ')}</span></p>
                    <p className={styles.description}><span className={utilStyles.bold}>Description:</span> {description}</p>
                </article>
                
            </section>

            <LinksDisplay/>
        </>

    )

}