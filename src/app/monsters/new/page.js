'use client'
import styles from '../../../styles/createeditform.module.css'
import Link from 'next/link'
import NotAuthorized from '@/app/components/NotAuthorized'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@/context/user'
import {useEffect} from 'react'




export default function NewMonsterForm() {
    const router=useRouter();
    const {user, setUser}=useUser()
    const [imagePreview, setImagePreview]=useState(null)
    const [toggleError, setToggleError]=useState(false)
    const [errorMessage, setErrorMessage]=useState('')
    const [formData, setFormData]= useState({})
    const [recoverableMaterialsCount, setRecoverableMaterialsCount]=useState(1)
    const [recoverableMaterials, setRecoverableMaterials]=useState({})
    const [commonLocationsCount, setCommonLocationsCount]=useState(1)
    const [commonLocations, setCommonLocations]=useState({})

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
    form.append('userId', user.id)
    if (validateInput()){
      createMonster(form)
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
    const response= await fetch(`http://hyrule-archive.herokuapp.com/monsters/`,
    {
        method: "POST",
        mode: "cors",
        // headers: {
        //     "Content-Type": "multipart/form-data",
        // },
        body: monster
    })
    const data= await response.json()
    
    if (data.name){
        setToggleError(true)
        router.refresh()
        router.push('/monsters')
    }
    else{
        setToggleError(true)
        setErrorMessage(data.message)
    }
  }
  useEffect(()=>{
    router.prefetch('/monsters')
  }, [router])
  return (
    
      <>
        <h1 className={styles.title}>New Monster</h1>
        {user ?  
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
                        name=""
                        className={styles.expandingCategory}
                        placeholder="recoverable material"
                        onChange={(event) => setRecoverableMaterials({...recoverableMaterials, [`recoverableMaterials[${index}]`]:event.target.value })}
                    />
                    {index===recoverableMaterialsCount-1 &&<button onClick={buttonHandlerRecoverableIncrease} className={styles.btnSmall}>+</button>}
                    {(index>0 && index===recoverableMaterialsCount-1) && <button onClick={buttonHandlerRecoverableDecrease} className={styles.btnSmall}>-</button>}
                    
                </div>
            )})}
            {Array.from(Array(commonLocationsCount)).map((c, index) => {
            return(
                <div key={index}>
                    <input
                        type="text"
                        className={styles.expandingCategory}
                        name=""
                        placeholder="common locations"
                        onChange={(event) => setCommonLocations({...commonLocations, [`commonLocations[${index}]`]:event.target.value })}
                    />
                    {index===commonLocationsCount-1 && <button onClick={buttonHandlerCommonIncrease} className={styles.btnSmall}>+</button>}
                    {index>0 && <button onClick={buttonHandlerCommonDecrease} className={styles.btnSmall}>-</button>}
            </div>
        )})}
            <textarea placeholder='type description here' name='description' rows="4" onChange={handleChange}/>
        </div>
        
        <div className={styles.imagePreview}>
            {imagePreview ? <img src={imagePreview} className={styles.imagePreviewImage}/> : <div className={styles.box}/>}
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