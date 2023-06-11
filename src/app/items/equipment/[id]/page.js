import styles from '../../../../styles/show.module.css'
import utilStyles from '../../../../styles/utils.module.css'
import Image from 'next/image';
import EditDelete from '@/app/components/EditDelete';
import Refresher from '@/app/components/Refresher';
import LinksDisplay from '@/app/components/LinksDisplay';

export async function generateStaticParams() {
    const response = await fetch(process.env.FETCH_URL+"items/equipment");
    const data=await response.json()
    return data.data.map((equipment) => ({
        id: equipment._id
    }));
  }
export async function getEquipment(id) {
    const material = await fetch(process.env.FETCH_URL+`items/equipment/${id}`,{next: {revalidate:1}}).then((res) => res.json());
    return material.data;
}
    
export default async function Equipment({params}){
    console.log(params)
    const {id}=params

    const equipment=await getEquipment(id)
    const {_id, no, name, properties, commonLocations, description, image, userId }=equipment
    
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
                    <div className={styles.right}><EditDelete pathname='items/equipment' itemId={_id} userId={userId} data={JSON.stringify(equipment)}/></div>
                    <p><span className={utilStyles.bold}>No:</span> {no}</p>
                    <p><span className={utilStyles.bold}>Name:</span> <span className={utilStyles.capitalize}>{name}</span></p>
                    {properties.attack ? <p className={utilStyles.capitalize}><span className={utilStyles.bold}>Attack: </span> {properties.attack}</p> : null}
                    {properties.defense ? <p className={utilStyles.capitalize}><span className={utilStyles.bold}>Defense: </span>{properties.defense}</p> : null}
                    <p><span className={utilStyles.bold}>Other Properties:</span> <span className={utilStyles.capitalize}>{properties.otherProperties.join(', ')}</span></p>
                    <p><span className={utilStyles.bold}>Common Locations:</span> <span className={utilStyles.capitalize}>{commonLocations.join(', ')}</span></p>
                    <p className={styles.description}><span className={utilStyles.bold}>Description:</span> {description}</p>
                </article>
                
            </section>
            <LinksDisplay/>
        </>

        )

}