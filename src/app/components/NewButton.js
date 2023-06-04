'use client'
import { useUser } from "@/context/user"
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import utilStyles from '../../styles/utils.module.css'

export default function NewButton({pathname}){
    const {user, setUser}=useUser();
    const [userId, setUserId]=useState(null)
    console.log(user)
    useEffect(()=>{
        setUserId(localStorage.getItem('userId'))
    },[])
    return <>
        {userId!='null' ?
            (<Link href={`${pathname}/new`}><button className={utilStyles.btn}>Create New</button></Link>)
         :
        null
        }
    </>
}