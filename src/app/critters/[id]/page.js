import styles from '../../../styles/show.module.css'
import utilStyles from '../../../styles/utils.module.css'
import Image from 'next/image';
import EditDelete from '@/app/components/EditDelete';
import Refresher from '@/app/components/Refresher';
import LinksDisplay from '@/app/components/LinksDisplay';
import HeartsRecovered from '@/app/components/HeartsRecovered';

export async function generateStaticParams() {
    const response = await fetch(process.env.FETCH_URL+"critters");
    const data=await response.json()
    return data.data.map((critter) => ({
        id: critter._id
    }));
  }
export async function getCritter(id) {
    const critter = await fetch(process.env.FETCH_URL+`critters/${id}`, {next: {revalidate:1}}).then((res) => res.json());
    return critter.data;
}
    
export default async function Critter({params}){
    const {id}=params

    const critter=await getCritter(id)
    const {_id, no, name, heartsRecovered, uniqueCookingEffects, commonLocations, description, image, userId }=critter
    return(
        <>
            <Refresher/>
            <section className={styles.largerCard}>
                {image &&<figure className={styles.imageWrapper}>
                    <Image
                        src={image}
                        alt={name}
                        fill/>
                </figure>}
                <div className={styles.cardInfo}>
                <article className={styles.right}><EditDelete pathname='critters' itemId={id} userId={userId} data={critter}/></article>
                    <p><span className={utilStyles.bold}>No:</span> {no}</p>
                    <p><span className={utilStyles.bold}>Name:</span> <span className={utilStyles.capitalize}>{name}</span></p>
                    <p><span className={utilStyles.bold}>Hearts Recovered: </span><HeartsRecovered numHearts={Number.parseFloat(heartsRecovered)}/></p>
                    <p><span className={utilStyles.bold}>Unique Cooking Effects: </span><span className={utilStyles.capitalize}>{uniqueCookingEffects.join(', ')}</span></p>
                    <p><span className={utilStyles.bold}>Common Locations: </span><span className={utilStyles.capitalize}>{commonLocations.join(', ')}</span></p>
                    <p className={styles.description}><span className={utilStyles.bold}>Description: </span>{description}</p>
                </div>
                
            </section>
           
            <LinksDisplay/>
        </>

        )

}
