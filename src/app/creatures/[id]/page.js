import styles from '../../../styles/show.module.css'
import utilStyles from '../../../styles/utils.module.css'
import Image from 'next/image';
import EditDelete from '@/app/components/EditDelete';
import Refresher from '@/app/components/Refresher';
import LinksDisplay from '@/app/components/LinksDisplay';

export async function generateStaticParams() {
    const response = await fetch(process.env.FETCH_URL+"creatures");
    const data=await response.json()
    return data.data.map((creature) => ({
        id: creature._id
    }));
  }
export async function getCreature(id) {
    const creature = await fetch(process.env.FETCH_URL+`creatures/${id}`, {next: {revalidate:1}}).then((res) => res.json());
    return creature.data;
}
    
export default async function Creature({params}){
    const {id}=params
    const creature=await getCreature(id)
    const {no, name, recoverableMaterials, commonLocations, description, image }=creature
    return(
        <>
            <Refresher/>
            <section className={styles.largerCard}>
                <figure className={styles.imageWrapper}>
                    <Image
                        src={image}
                        alt={name}
                        fill/>
                </figure>
                <article className={styles.cardInfo}>
                <div className={styles.right}><EditDelete pathname='creatures' itemId={id} userId={creature.userId} data={creature}/></div>
                    <p>No: {no}</p>
                    <p>Name: <span className={utilStyles.capitalize}>{name}</span></p>
                    {recoverableMaterials && <p>Recoverable Materials: <span className={utilStyles.capitalize}>{recoverableMaterials.join(', ')}</span></p>}
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
