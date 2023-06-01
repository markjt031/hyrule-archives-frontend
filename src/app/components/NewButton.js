'use client'
import { useUser } from "@/context/user"
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function NewButton(){
    const {user, setUser}=useUser();
    const pathname=usePathname();
    console.log(user)

    
    return <>
        {user ?
            (<Link href={`${pathname}/new`}><button >Click Me</button></Link>)
        :
        null
        }
    </>
}