import styles from '../../../styles/show.module.css'
import utilStyles from '../../../styles/utils.module.css'
import Image from 'next/image';
import EditDelete from '@/app/components/EditDelete';
import Refresher from '@/app/components/Refresher'
import LinksDisplay from '@/app/components/LinksDisplay';

export async function generateStaticParams() {
    const response = await fetch(process.env.FETCH_URL+"monsters");
    const data=await response.json()
    return data.data.map((monster) => ({
        id: monster._id
    }));
  }
export async function getMonster(id) {
    const monster = await fetch(process.env.FETCH_URL+`monsters/${id}`, {next: {revalidate:1}}).then((res) => res.json());
    return monster.data;
}
    
export default async function Monsters({params}){
    const {id}=params

    const monster=await getMonster(id)
    const {no, name, recoverableMaterials, commonLocations, description, image }=monster
    return(
        <>
        <Refresher/>
        <section className={styles.largerCard}>
            {image &&
            <div className={styles.imageWrapper}>
                <Image
                    src={image}
                    alt={name}
                    className={styles.image}
                    fill/>
            </div>}
            <article className={styles.cardInfo}>
            
                <p><span className={utilStyles.bold}>No:</span> {no}</p><div className={styles.right}><EditDelete pathname='monsters' itemId={id} userId={monster.userId} data={monster}/></div>
                <p><span className={utilStyles.bold}> Name:</span> <span className={utilStyles.capitalize}>{name}</span></p>
                <p><span className={utilStyles.bold}>Recoverable Materials:</span> <span className={utilStyles.capitalize}>{recoverableMaterials.join(', ')}</span></p>
                <p><span className={utilStyles.bold}>Common Locations:</span> <span className={utilStyles.capitalize}>{commonLocations.join(', ')}</span></p>
                <p className={styles.description}><span className={utilStyles.bold}>Description:</span> {description}</p>
            </article>
            
        </section>
  
        <LinksDisplay/>
        </>

        )

}
