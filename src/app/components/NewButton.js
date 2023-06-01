'use client'
import { useUser } from "@/context/user"
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NewButton({pathname}){
    const {user, setUser}=useUser();
    console.log(user)

    
    return <>
        {user ?
            (<Link href={`${pathname}/new`}><button>Create New</button></Link>)
        :
        null
        }
    </>
}