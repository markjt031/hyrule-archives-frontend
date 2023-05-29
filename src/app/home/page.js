import Image from 'next/image'
import styles from './home.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
        <div className={styles.container}>
            <Image
              src="/The-Legend-of-Zelda-Tears-of-the-Kingdom-Walkthrough-and-Strategy-Guide-1024x576.jpg"
              alt="Zelda cover art"
              className={styles.landingImage}
              fill
              priority
            />
        </div>
        <div>
          <h1>Welcome to Hyrule Archives!</h1>
          <p>Your one stop for Legend of Zelda: Tears of the Kingdom information. Create an account to add your own compendium information, shrine guides, and Korok sightings!</p>
        </div>
    </main>
  )
}
