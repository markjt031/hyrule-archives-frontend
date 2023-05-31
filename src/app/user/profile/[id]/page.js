import { pathByNumber } from "@/lib/pathByNo";
import Link from "next/link";
import utilStyles from '../../../../styles/utils.module.css'

export async function generateStaticParams() {
    const response = await fetch(process.env.FETCH_URL+"users");
    const data=await response.json()
    return data.data.map((user) => ({
        id: user._id
    }));
  }
export async function getProfile(id) {
    const profile = await fetch(process.env.FETCH_URL+`users/profile/${id}`, {next: {revalidate: 60}}).then((res) => res.json());
    return profile;
}

export default async function Profile({params}){
    console.log(params)
    const {id}=params

    const profile=await getProfile(id)
    
    console.log(profile)
    return(
        <div>
            <div>
                <h1>User Profile</h1>
                <div>
                    <h2>Created Monsters:</h2>
                    <ul>
                        {profile.monsters.map((monster)=>{
                                return <li key={monster.no} className={utilStyles.capitalize}><Link href={`/monsters/${monster._id}`}>{monster.name}</Link></li>
                            })}
                    </ul>
                    <h2>Created Creatures:</h2>
                    <ul>
                        {profile.creatures.map((creature)=>{
                                return <li key={creature.no} className={utilStyles.capitalize}><Link href={`/creatures/${creature._id}`}>{creature.name}</Link></li>
                            })}
                        {profile.critters.map((critter)=>{
                                return <li key={critter.no} className={utilStyles.capitalize}><Link href={`/critters/${critter._id}`}>{critter.name}</Link></li>
                            })}
                    </ul>
                    <h2>Created Materials:</h2>
                    <ul>
                        {profile.materials.map((material)=>{
                                return <li key={material.no} className={utilStyles.capitalize}><Link href={`/items/materials/${material._id}`}>{material.name}</Link></li>
                            })}
                    </ul>
                    <h2>Created Equipment:</h2>
                    <ul>
                        {profile.equipment.map((equipment)=>{
                                return <li key={equipment.no} className={utilStyles.capitalize}><Link href={`/items/equipment/${equipment._id}`}>{equipment.name}</Link></li>
                            })}
                    </ul>
                        
                </div>
            </div>
        </div>
    )

}