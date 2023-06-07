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
                    <p>No: {no}</p>
                    <p>Name: <span className={utilStyles.capitalize}>{name}</span></p>
                    {properties.attack ? <p className={utilStyles.capitalize}>Attack : {properties.attack}</p> : null}
                    {properties.defense ? <p className={utilStyles.capitalize}>Defense: {properties.defense}</p> : null}
                    <p>Other Properties: <span className={utilStyles.capitalize}>{properties.otherProperties.join(', ')}</span></p>
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