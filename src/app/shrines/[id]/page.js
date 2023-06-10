import styles from '../../../styles/shrine.module.css'
import utilStyles from '../../../styles/utils.module.css'
import Image from 'next/image';
import EditDelete from '@/app/components/EditDelete';
import Refresher from '@/app/components/Refresher'
import { format } from 'date-fns';
import Link from 'next/link';


export async function generateStaticParams() {
    const response = await fetch(process.env.FETCH_URL+"shrines");
    const data=await response.json()
    return data.data.map((shrine) => ({
        id: shrine._id
    }));
  }
export async function getShrine(id) {
    const shrine = await fetch(process.env.FETCH_URL+`shrines/${id}`, {next: {revalidate:1}}).then((res) => res.json());
    return shrine.data;
}
export default async function Shrine({params}){
    const {id}=params
    const shrine = await getShrine(id)
    const {name, subtitle, region, locationImage, coordinates, bodyText, images, userId, userName, createdAt, updatedAt}=shrine
    return <>
        <Refresher/>
        <div className={styles.btnContainer}><EditDelete pathname='shrines' itemId={id} userId={userId} data={shrine}/></div>
        <section className={styles.titleInformation}>
            <h1>{name}</h1>
            <h2>{subtitle}</h2>
            <h3>Region: {region}</h3>
            <h3>Coordinates: {coordinates}</h3>
            <div className={styles.imageWrapper}>
                <Image 
                    src={locationImage}
                    alt='map image'
                    fill
                />
            </div>
            
            </section>
            <section className={styles.guide}>
                <div className={styles.guideHeader}>
                    <h1>Guide</h1>
                    <h3>Created By: <Link href={`/user/profile/${userId}`}>{userName}</Link></h3>
                    <h3>On: {format(new Date(createdAt), 'MM/dd/yyyy ')}</h3>
                </div>
                {bodyText.map((article, index)=>{
                    return(
                    <article key={index} className={styles.guideBlock}>
                        <div className={styles.imageWrapper}>
                        {images[index]&&
                        <Image 
                            src={images[index]}
                            alt={name}
                            fill/>}
                        </div>
                        
                        <p>{bodyText[index]}</p>
                    </article>
                    )
                })}
            </section>

    </>
}