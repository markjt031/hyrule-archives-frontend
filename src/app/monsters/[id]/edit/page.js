'use client'
import styles from '../../../../styles/createeditform.module.css'
import Link from 'next/link'
import NotAuthorized from '@/app/components/NotAuthorized'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@/context/user'
import Image from 'next/image'



export default function EditMonsterForm({searchParams}) {
    console.log(searchParams)
    const router=useRouter();
    const {user, setUser}=useUser()
    const [imagePreview, setImagePreview]=useState(searchParams.image)
    const [toggleError, setToggleError]=useState(false)
    const [errorMessage, setErrorMessage]=useState('')
    
    console.log(searchParams)
    //This is to handle an error where the create form made recoverable materials just
    //a string when there was only one value, but an array if there was more than one.
    //Also handles empty arrays for this data
 
    const recoverableArray=[]
    const recoverableObj={}
    let count=1
    if (searchParams.recoverableMaterials){
      if (typeof searchParams.recoverableMaterials==='string'){
          recoverableArray.push(searchParams.recoverableMaterials)
      }
      else {
          for (let i=0; i<searchParams.recoverableMaterials.length; i++){
              recoverableArray.push(searchParams.recoverableMaterials[i])
          }
      }
      for (let i=0; i<recoverableArray.length; i++){
        recoverableObj[`recoverableMaterials[${i}]`]=recoverableArray[i]
      }
      count=recoverableArray.length
  }
    const [recoverableMaterialsCount, setRecoverableMaterialsCount]=useState(recoverableArray.length)
    const [recoverableMaterials, setRecoverableMaterials]=useState(recoverableObj)
    //Repeating for the other array
    const commonArray=[]
    count=1
    const locationObj={}
    if (searchParams.commonLocations){
      if (typeof searchParams.commonLocations==='string'){
          commonArray.push(searchParams.commonLocations)
      }
      else {
          for (let i=0; i<searchParams.commonLocations.length; i++){
              commonArray.push(searchParams.commonLocations[i])
          }
      }
      
      for (let i=0; i<commonArray.length; i++){
        locationObj[`commonLocations[${i}]`]=commonArray[i]
      }
      count=commonArray.length
  }
    const [commonLocationsCount, setCommonLocationsCount]=useState(count)
    const [commonLocations, setCommonLocations]=useState(locationObj)
    const [formData, setFormData]= useState({
      no: searchParams.no,
      name: searchParams.name,
      description: searchParams.description,
    })
    
   
    const handleSubmit = (event) => {
        event.preventDefault()
        let form=new FormData()
        for (const key in formData){
            form.append(key, formData[key])
        }
        for (const location in commonLocations){
            form.append(location, commonLocations[location])
        }
        for (const material in recoverableMaterials){
            form.append(material, recoverableMaterials[material])
        }
        createMonster(form)
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
          setErrorMessage("You must enter number for no recovered. This should match the compendium numbers")
          validated=false
      }
      return validated
    }
  const handleChange=(e)=>{
    const name=e.target.name;
    const value=e.target.value;
    console.log(e.target.value)
    setFormData({...formData, [name] : value})
  }
  const handleUpload=(e)=>{
    const name=e.target.name;
    const value=e.target.files[0]
    setFormData({...formData, [name]: value})
    setImagePreview(URL.createObjectURL(e.target.files[0]))
  }
  const buttonHandlerRecoverableIncrease=(e)=>{
    e.preventDefault()
    incrementRecoverableMaterials()
  }
  const buttonHandlerRecoverableDecrease=(e)=>{
    e.preventDefault()
    decrementRecoverableMaterials()
  }
  const incrementRecoverableMaterials=()=>{
    setRecoverableMaterialsCount(recoverableMaterialsCount+1)
  }
  const decrementRecoverableMaterials=(e)=>{
    setRecoverableMaterialsCount(recoverableMaterialsCount-1)
  }
  const buttonHandlerCommonIncrease=(e)=>{
    e.preventDefault()
    incrementCommonLocations()
  }
  const buttonHandlerCommonDecrease=(e)=>{
    e.preventDefault()
    decrementCommonLocations()
  }
  const incrementCommonLocations=()=>{
    setCommonLocationsCount(commonLocationsCount+1)
  }
  const decrementCommonLocations=()=>{
    setCommonLocationsCount(commonLocationsCount-1)
  }
  const createMonster = async (monster) => {
    const response= await fetch(`https://hyrule-archive.herokuapp.com/monsters/${searchParams._id}`,
    {
        method: "PUT",
        mode: "cors",
        // headers: {
        //     "Content-Type": "multipart/form-data",
        // },
        body: monster
    })
    const data= await response.json()
    
    if (data.name){
        setToggleError(false)
        router.push('/monsters')
    }
    else{
        setToggleError(true)
        setErrorMessage(data.message)
    }
  }

  return (
    
      <>
         <h1 className={styles.title}>Edit Monster</h1>
        {user ? 
       (<div className={styles.formContainer}>
       
      <form className={styles.form}>
       <div className={styles.textInputs}>
            <input type='number' placeholder='no' name="no" value={formData.no} onChange={handleChange}/><br/>
            <input type='text' placeholder='name' name="name" value={formData.name} onChange={handleChange}/>
            {Array.from(Array(recoverableMaterialsCount)).map((c, index) => {
                console.log(recoverableMaterialsCount)
            console.log(index)
            return(
                <div key={index}>
                    <input
                        type="text"
                        value={recoverableMaterials[`recoverableMaterials[${index}]`]}
                        placeholder="recoverable material"
                        onChange={(event) => setRecoverableMaterials({...recoverableMaterials, [`recoverableMaterials[${index}]`]:event.target.value })}
                    />
                    {index===recoverableMaterialsCount-1 && <button onClick={buttonHandlerRecoverableIncrease} className={styles.btnSmall}>+</button>}
                    {(index>0 && index===recoverableMaterialsCount-1) && <button onClick={buttonHandlerRecoverableDecrease} className={styles.btnSmall}>-</button>}
                    
                </div>
            )})}
            {Array.from(Array(commonLocationsCount)).map((c, index) => {
            console.log(index)
            return(
                <div key={index}>
                    <input
                        type="text"
                        value={commonLocations[`commonLocations[${index}]`]}
                        
                        placeholder="common locations"
                        onChange={(event) => setCommonLocations({...commonLocations, [`commonLocations[${index}]`]:event.target.value })}
                    />
                    {index===commonLocationsCount-1 && <button onClick={buttonHandlerCommonIncrease} className={styles.btnSmall}>+</button>}
                    {(index>0 && index===commonLocationsCount-1) && <button onClick={buttonHandlerCommonDecrease} className={styles.btnSmall}>-</button>}
                    
                </div>
            )})}
            <textarea placeholder='type description here' value={formData.description} name='description' rows="4" onChange={handleChange}/>
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
            <input type='file' title=' ' name='image' accept='image/*' onChange={handleUpload}/>
        </div>
      </form>
      <input type='submit' onClick={handleSubmit}  value='Submit'/>
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