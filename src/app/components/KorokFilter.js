'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import styles from '../../styles/filter.module.css'

export default function KorokFilter(){
    const router=useRouter()
    const [choice, setChoice]=useState('')
    const handleSubmit=(e)=>{
        e.preventDefault()
        router.push(`/koroks/search?region=${choice}`)
    }
    const handleChange=(e)=>{
        e.preventDefault()
        setChoice(e.target.value)
    }
    return (
        <form className={styles.selectForm} onSubmit={(e)=>handleSubmit(e)}>
            <label htmlFor='filters'>Filter by region:</label>
            <select name='region' placeholder='Choose a region' className={styles.selectMenu} onChange={(e)=>{setChoice(e.target.value)}}>
                <option>Choose a region</option>
                <option value='Akkala'>Akkala</option>
                <option value='East Necluda'>East Necluda</option>
                <option value='Eldin'>Eldin</option>
                <option value='Faron'>Faron</option>
                <option value='Gerudo Desert'>Gerudo Desert</option>
                <option value='Gerudo Highlands'>Gerudo Highlands</option>
                <option value='Hebra Mountains'>Hebra Mountains</option>
                <option value='Hyrule Field'>Hyrule Field</option>
                <option value='Hyrule Ridge'>Hyrule Ridge</option>
                <option value='Lanayru Great Spring'>Lanayru Great Spring</option>
                <option value='Lanayru Wetlands'>Lanayru Wetands</option>
                <option value='Mount Lanayru'>Mount Lanayru</option>
                <option value='Sky Islands'>Sky Islands</option>
                <option value='Tabantha Frontier'>Tabantha Frontier</option>
                <option value='Tabantha Tundra'>Tabantha Tundra</option>
                <option value='West Necluda'>West Necluda</option>
            </select>
            <button type='submit' name='submit'>Filter</button>
        </form>
    )
}