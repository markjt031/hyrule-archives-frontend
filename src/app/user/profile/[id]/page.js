import { pathByNumber } from "@/lib/pathByNo";
import Link from "next/link";
import utilStyles from '../../../../styles/utils.module.css'
import UploadAvatar from "@/app/components/UploadAvatar";

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
                <h2>{profile.username}&apos;s Profile</h2>
                <div>
                    <UploadAvatar currentAvatar={profile.avatar}/>
                </div>
                <div>
                    
                    <h2>Created Monsters:</h2>
                    {profile.monsters.length>0 ? 
                    (<ul>
                        {profile.monsters.map((monster)=>{
                                return <li key={monster.no} className={utilStyles.capitalize}><Link href={`/monsters/${monster._id}`}>{monster.name}</Link></li>
                            })}
                    </ul>)
                    :
                    <h5>No monsters created</h5>
                    }
                    <h2>Created Creatures:</h2>
                    {profile.creatures.length>0 || profile.critters.length>0 ?
                    (<ul>
                        {profile.creatures.map((creature)=>{
                                return <li key={creature.no} className={utilStyles.capitalize}><Link href={`/creatures/${creature._id}`}>{creature.name}</Link></li>
                            })}
                        {profile.critters.map((critter)=>{
                                return <li key={critter.no} className={utilStyles.capitalize}><Link href={`/critters/${critter._id}`}>{critter.name}</Link></li>
                            })}
                    </ul>)
                    :
                    <h5>No creatures created</h5>
                    }
                    <h2>Created Materials:</h2>
                    {profile.materials.length>0 ?
                    (<ul>
                        {profile.materials.map((material)=>{
                                return <li key={material.no} className={utilStyles.capitalize}><Link href={`/items/materials/${material._id}`}>{material.name}</Link></li>
                            })}
                    </ul>)
                    :
                    <h5>No materials created</h5>
                    }
                    <h2>Created Equipment:</h2>
                    {profile.equipment.length>0 ? 
                    (<ul>
                        {profile.equipment.map((equipment)=>{
                                return <li key={equipment.no} className={utilStyles.capitalize}><Link href={`/items/equipment/${equipment._id}`}>{equipment.name}</Link></li>
                            })}
                    </ul>)
                    :
                    <h5>No equipment added</h5>
                    }
                    {profile.shrines.length>0 ?
                    (<ul>
                        {profile.shrines.map((shrine)=>{
                            return <li key={shrine._id} className={utilStyles.capitalize}><Link href={`/shrines/${shrine._id}`}>{shrine.name}</Link></li>
                        })}
                    </ul>)
                    :
                    <h5>No shrines found</h5>
                    }
                    {profile.koroks.length>0 ?
                    (<ul>
                        {profile.koroks.map((korok)=>{
                            return <li key={korok._id} className={utilStyles.capitalize}><Link href={`/koroks/${korok._id}`}>{korok.name}</Link></li>
                        })}
                    </ul>)
                    :
                    <h5>No koroks found</h5>
                    }   
                </div>
            </div>
        </div>
    )

}