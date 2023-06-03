import styles from '../../../styles/show.module.css'
import utilStyles from '../../../styles/utils.module.css'
import Image from 'next/image';
import EditDelete from '@/app/components/EditDelete';
import Refresher from '@/app/components/Refresher';

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
    console.log(params)
    const {id}=params

    const critter=await getCritter(id)
    const {_id, no, name, heartsRecovered, uniqueCookingEffects, commonLocations, description, image, userId }=critter
    console.log(critter)
    return(
        <>
        <Refresher/>
        <div className={styles.largerCard}>
            <div className={styles.imageWrapper}>
                <Image
                    src={image}
                    alt={name}
                    fill/>
            </div>
            <div className={styles.cardInfo}>
            <div className={styles.right}><EditDelete pathname='critters' itemId={id} userId={userId} data={critter}/></div>
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
