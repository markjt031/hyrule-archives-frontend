'use client'

import { useRouter } from "next/navigation"

export default function Critters(){
    const router=useRouter()
    router.push('/creatures')
    return <></>
}