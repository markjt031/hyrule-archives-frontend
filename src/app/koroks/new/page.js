'use client'
import Link from 'next/link'
import NotAuthorized from '@/app/components/NotAuthorized'
import styles from '../../../styles/korokform.module.css'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@/context/user'
import {useEffect} from 'react'
import Image from "next/image";

export default function NewKorokForm(){
    const [userId, setUserId]=useState(null)
    const [userName, setUserName]=useState(null)
    const [formData, setFormData]=useState({})
    const [imagePreviews, setImagePreviews]=useState({})
    const [toggleError, setToggleError]=useState(false)
    const [errorMessage, setErrorMessage]=useState('')
    const router=useRouter()

    useEffect(()=>{
        setUserId(localStorage.getItem('userId'))
        setUserName(localStorage.getItem('userName'))
    },[])

    const handleSubmit = (event) => {
        event.preventDefault()
        let form=new FormData()
        for (const key in formData){
            if (formData[key]){
                form.append(key, formData[key])
            }
        }
        form.append('userId', userId)
        form.append('userName', userName)
        if (validateInput()){
          createKorok(form)
        }
    }
    const validateInput=()=>{
        let validated=true;
        if (!formData['region']){
            setToggleError(true)
            setErrorMessage("You must enter a region")
            validated=false
        }
        if (!formData['locationImage']){
            setToggleError(true)
            setErrorMessage("You must enter a location image")
            validated=false
        }
        return validated
      }
    const createKorok = async (korok) => {
        const response= await fetch(`https://hyrule-archive.herokuapp.com/koroks`,
        {
            method: "POST",
            mode: "cors",
            // headers: {
            //     "Content-Type": "multipart/form-data",
            // },
            body: korok
        })
        const data= await response.json()
        
        if (data.region){
            setToggleError(false)
            router.refresh()
            router.push('/koroks')
        }
        else{
            setToggleError(true)
            setErrorMessage(data.message)
        }
      }
    const handleChange=(e)=>{
        const name=e.target.name;
        const value=e.target.value;
        setFormData({...formData, [name] : value})
    }
    const handleUpload=(e)=>{
        const name=e.target.name;
        const value=e.target.files[0]
        setFormData({...formData, [name]: value})
        setImagePreviews({...imagePreviews, [name]:URL.createObjectURL(e.target.files[0])})
    }
    return (<>
            <h1 className={styles.title}>New Korok</h1>
        {userId!=null ?
            <div className={styles.formContainer}>
                <form className={styles.form}>
                    <div className={styles.imageInputs}>
                        <div className={styles.imagePreview}>
                        <label htmlFor='locationImage' className={styles.label}>Select a map location image</label>
                            {imagePreviews[`locationImage`] ? (
                                <Image 
                                src={imagePreviews[`locationImage`]} 
                                alt={formData.name || ''} 
                                className={styles.imagePreviewImage}
                                fill
                                sizes=''/>)
                                : 
                                <div className={styles.box}/>}
                            
                            <input type='file' name='locationImage' accept='image/*' title=' ' onChange={handleUpload}/>
                        </div>
                        
                        <div className={styles.imagePreview}>
                        <label htmlFor='locationImage' className={styles.label}>Select an image of korok puzzle</label>
                            {imagePreviews[`korokImage`] ? (
                                <Image 
                                src={imagePreviews[`korokImage`]} 
                                alt={formData.name || ''} 
                                className={styles.imagePreviewImage}
                                fill
                                sizes=''/>)
                                : 
                                <div className={styles.box}/>}
                            <input type='file' name='korokImage' accept='image/*' title=' ' onChange={handleUpload}/>
                        </div>
                    </div>
                    
                    
                    <div className={styles.textInputs}>
                        <input type='text' name='region' placeholder='region' onChange={handleChange}/><br/>
                        <textarea name='locationDescription' placeholder='Describe the location' onChange={handleChange}/><br/>
                        <textarea name='korokDescription' placeholder="Describe how to find the korok" onChange={handleChange}/><br/>
                    </div>
                   
                </form>
                <input type='submit' value='Submit' onClick={handleSubmit}/>
            </div>        
            :
            <NotAuthorized/>
        }
    </>)
}