'use client'
import styles from '../../../styles/createeditform.module.css'
import Link from 'next/link'
import NotAuthorized from '@/app/components/NotAuthorized'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'



export default function NewCreatureForm() {
    const router=useRouter();
    const [userId, setUserId]=useState(null)
    const [imagePreview, setImagePreview]=useState(null)
    const [toggleError, setToggleError]=useState(false)
    const [errorMessage, setErrorMessage]=useState('')
    const [formData, setFormData]= useState({})
    const [recoverableMaterialsCount, setRecoverableMaterialsCount]=useState(1)
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
        createCreature(form)
      }
    }
    const validateInput=()=>{
      let validated=true;
      if (!formData['name']){
          setToggleError(true)
          setErrorMessage("You must enter a name")
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
    const createCreature = async (creature) => {
      const response= await fetch(`https://hyrule-archive.herokuapp.com/creatures/`,
      {
          method: "POST",
          mode: "cors",
          // headers: {
          //     "Content-Type": "multipart/form-data",
          // },
          body: creature
      })
      const data= await response.json()
      
      if (data.name){
          setToggleError(false)
          router.refresh()
          router.push(`/creatures/${data._id}`)
      }
      else{
          setToggleError(true)
          setErrorMessage(data.message)
      }
    }

    return (
      
        <>
          <h1 className={styles.title}>New Creature</h1>
          {userId!='null' ? 
        (<div className={styles.formContainer}>
          
        <form className={styles.form}>
        <div className={styles.textInputs}>
              <input type='number' placeholder='no' name="no" onChange={handleChange}/><br/>
              <input type='text' placeholder='name' name="name" onChange={handleChange}/>
              {Array.from(Array(recoverableMaterialsCount)).map((c, index) => {
              return(
                  <div key={index}>
                      <input
                          type="text"
                          placeholder="recoverable material"
                          onChange={(event) => setFormData({...formData, [`recoverableMaterials[${index}]`]:event.target.value })}
                      />
                      {index===recoverableMaterialsCount-1 &&<button onClick={()=>setRecoverableMaterialsCount(recoverableMaterialsCount+1)} className={styles.btnSmall}>+</button>}
                      {(index>0 && index===recoverableMaterialsCount-1) && <button onClick={()=>setRecoverableMaterialsCount(recoverableMaterialsCount-1)} className={styles.btnSmall}>-</button>}
                      
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
                      {index===commonLocationsCount-1 && <button onClick={()=>setCommonLocationsCount(commonLocationsCount+1)} className={styles.btnSmall}>+</button>}
                      {(index>0 && index===commonLocationsCount-1)&& <button onClick={()=>setCommonLocationsCount(commonLocationsCount-1)} className={styles.btnSmall}>-</button>}
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
              <input type='file' name='image' accept='image/*' title=' ' onChange={handleUpload}/>
          </div>
          
        </form>
        <input type='submit' onClick={handleSubmit} value='Submit'/>
        {toggleError ? <h5>{errorMessage}</h5>
        :
        null
        }
        </div>)
        :
        <NotAuthorized/>}
        
        </>
        
    )
  }