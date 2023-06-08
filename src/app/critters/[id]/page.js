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
                    <p>No: {no}</p>
                    <p>Name: <span className={utilStyles.capitalize}>{name}</span></p>
                    <p>Hearts Recovered: <HeartsRecovered numHearts={Number.parseFloat(heartsRecovered)}/></p>
                    <p>Unique Cooking Effects: <span className={utilStyles.capitalize}>{uniqueCookingEffects.join(', ')}</span></p>
                    <p>Common Locations: <span className={utilStyles.capitalize}>{commonLocations.join(', ')}</span></p>
                    <p className={styles.descriptionMobile}>Description: {description}</p>
                </div>
                
            </section>
            <article className={styles.description}>
                <p>Description: {description}</p>
            </article>
            <LinksDisplay/>
        </>

        )

}
