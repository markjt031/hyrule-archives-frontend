'use client'
import styles from '../../../styles/createeditform.module.css'
import Link from 'next/link'
import NotAuthorized from '@/app/components/NotAuthorized'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@/context/user'
import Image from 'next/image'



export default function NewCritterForm() {
    const router=useRouter();
    const [imagePreview, setImagePreview]=useState(null)
    const [toggleError, setToggleError]=useState(false)
    const [errorMessage, setErrorMessage]=useState('')
    const [formData, setFormData]= useState({})
    const [userId, setUserId]=useState(null)
    const [uniqueCookingEffectsCount, setUniqueCookingEffectsCount]=useState(1)
    const [commonLocationsCount, setCommonLocationsCount]=useState(1)
    
    useEffect(()=>{
      setUserId(localStorage.getItem('userId'))
    },[])
    const handleSubmit = (event) => {
        event.preventDefault()
        let form=new FormData()
        for (const key in formData){
            form.append(key, formData[key])
        }
        form.append('userId', userId)
        if (validateInput()){
          createCritter(form)
        }
    }
    const validateInput=()=>{
      let validated=true;
      if (!formData['name']){
          setToggleError(true)
          setErrorMessage("You must enter a name")
          validated=false
      }
      if (!formData['fuseAttackPower']){
          setToggleError(true)
          setErrorMessage("You must enter number for fuse attack power. Enter 0 if none")
          validated=false
      }
      if (!formData['heartsRecovered']){
          setToggleError(true)
          setErrorMessage("You must enter number for hearts recovered. Enter 0 if none")
          validated=false
      }
      if (!formData['no']){
          setToggleError(true)
          setErrorMessage("You must enter number for no. This should match the compendium numbers")
          validated=false
      }
      return validated
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
      setImagePreview(URL.createObjectURL(e.target.files[0]))
    }

    const createCritter = async (critter) => {
      const response= await fetch(`https://hyrule-archive.herokuapp.com/critters/`,
      {
          method: "POST",
          mode: "cors",
          // headers: {
          //     "Content-Type": "multipart/form-data",
          // },
          body: critter
      })
      const data= await response.json()
      
      if (data.name){
          setToggleError(false)
          router.refresh()
          router.push('/creatures')
      }
      else{
          setToggleError(true)
          setErrorMessage(data.message)
      }
    }

    return (
      
        <>
        {userId!='null' ? 
        (<div className={styles.formContainer}>
        <h1 className={styles.title}>New Creature Material</h1>
        <form className={styles.form}>
          <div className={styles.textInputs}>
            <input type='number' placeholder='no' name="no" onChange={handleChange}/><br/>
            <input type='text' placeholder='name' name="name" onChange={handleChange}/><br/>
            <input type='number' placeholder='fuse attack power' name="fuseAttackPower" onChange={handleChange}/><br/>
            <input type='number' placeholder='hearts recovered' name="heartsRecovered" onChange={handleChange}/><br/>

            {Array.from(Array(uniqueCookingEffectsCount)).map((c, index) => {
            return(
                <div key={index}>
                    <input
                        type="text"
                        placeholder="unique cooking effects"
                        onChange={(event) => setFormData({...formData, [`uniqueCookingEffects[${index}]`]:event.target.value })}
                    />
                    {index===uniqueCookingEffectsCount-1 &&<button className={styles.btnSmall} onClick={()=>setUniqueCookingEffectsCount(uniqueCookingEffectsCount+1)}>+</button>}
                    {index>0 && <button className={styles.btnSmall} onClick={()=>setUniqueCookingEffectsCount(uniqueCookingEffectsCount-1)}>-</button>}
                    
                </div>
            )})}
            {Array.from(Array(commonLocationsCount)).map((c, index) => {
            return(
                <div key={index}>
                    <input
                        type="text"
                        placeholder="common locations"
                        onChange={(event) => setFormData({...formData, [`commonLocations[${index}]`]:event.target.value })}
                    />
                    {index===commonLocationsCount-1 &&<button className={styles.btnSmall} onClick={()=>setCommonLocationsCount(commonLocationsCount+1)}>+</button>}
                    {index>0 && <button className={styles.btnSmall} onClick={()=>setCommonLocationsCount(commonLocationsCount-1)}>-</button>}
                    
                </div>
            )})}
            <textarea placeholder='type description here' name='description' rows="4" onChange={handleChange}/>
          </div>
          <div className={styles.imagePreview}>
          {imagePreview ? (
              <Image 
                src={imagePreview} 
                alt={formData.name || ''} 
                className={styles.imagePreviewImage}
                fill
                sizes=''/>)
                : 
                <div className={styles.box}/>}
              <label htmlFor='image' className={styles.label}>Select an image</label>
              <input type='file' name='image' accept='image/*' onChange={handleUpload}/>
          </div>
        </form>
        <input type='submit' onClick={handleSubmit} value='Submit'/>
        {toggleError ? <h5>{errorMessage}</h5>
        :
        null}
        </div>)
        :
        <NotAuthorized/>}
        
        </>
        
    )
  }