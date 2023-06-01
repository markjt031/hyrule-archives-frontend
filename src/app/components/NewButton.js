'use client'
import { useUser } from "@/context/user"
import { useRouter } from "next/navigation";
import Link from "next/link";
import utilStyles from '../../styles/utils.module.css'

export default function NewButton({pathname}){
    const {user, setUser}=useUser();
    console.log(user)
    
    
    return <>
        {user ?
            (<Link href={`${pathname}/new`}><button className={utilStyles.btn}>Create New</button></Link>)
         :
        null
        }
    </>
}