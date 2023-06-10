'use client'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

//This is a component that refreshes server pages. These functions cannot be used on a server component directly
export default function Refresher() {
    const router = useRouter()

    useEffect(() => {
        router.refresh()
        console.log('refresh')
        router.refresh()
    }, [router])

    return <></>
}