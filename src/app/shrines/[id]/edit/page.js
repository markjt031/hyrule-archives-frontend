'use client'
import styles from '../../../styles/shrineform.module.css'
import Link from 'next/link'
import NotAuthorized from '@/app/components/NotAuthorized'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@/context/user'
import {useEffect} from 'react'
import Image from "next/image";


export default function EditShrineForm() {
    const router=useRouter();
    const [userName, setUserName]=useState(null)
    const [userId, setUserId]=useState(null)
    const [imagePreviews, setImagePreviews]=useState([])
    const [locationImage, setLocationImage]=useState(null)
    const [toggleError, setToggleError]=useState(false)
    const [errorMessage, setErrorMessage]=useState('')
    const [formData, setFormData]= useState({})
    const [guideStepsCount, setGuideStepsCount]=useState(1)
    

  const handleSubmit = (event) => {
    event.preventDefault()
    let form=new FormData()
    for (const key in formData){
        if (formData[key]){
            form.append(key, formData[key])
        }
    }
    for (const pair of form){
        console.log(pair[0], pair[1])
    }
    form.append('userId', userId)
    form.append('userName', userName)
    if (validateInput()){
      createShrine(form)
    }
  }
  const validateInput=()=>{
    let validated=true;
    if (!formData['name']){
        setToggleError(true)
        setErrorMessage("You must enter a name")
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
  const handleUpload=(e, index)=>{
    const name=e.target.name;
    const value=e.target.files[0]
    setFormData({...formData, [name]: value})
    const images=[...imagePreviews]
    
    images.push(URL.createObjectURL(e.target.files[0]))
    console.log(images)
    setImagePreviews(images)
    
  }
  const handleLocationImageUpload=(e)=>{
    const name=e.target.name;
    const value=e.target.files[0]
    setFormData({...formData, [name]: value})
    setLocationImage(URL.createObjectURL(e.target.files[0]))
  }
  const buttonHandlerGuideStepIncrease=(e)=>{
    e.preventDefault()
    incrementGuideStep()
  }
  const buttonHandlerGuideStepDecrease=(e)=>{
    e.preventDefault()
    decrementGuideStep()
  }
  const incrementGuideStep=()=>{
    setGuideStepsCount(guideStepsCount+1)
  }
  const decrementGuideStep=(e)=>{
    setGuideStepsCount(guideStepsCount-1)
  }
  
  const createShrine = async (shrine) => {
    const response= await fetch(`https://hyrule-archive.herokuapp.com/shrines/`,
    {
        method: "POST",
        mode: "cors",
        // headers: {
        //     "Content-Type": "multipart/form-data",
        // },
        body: shrine
    })
    const data= await response.json()
    
    if (data.name){
        setToggleError(false)
        router.refresh()
        router.push('/shrines')
    }
    else{
        setToggleError(true)
        setErrorMessage(data.message)
    }
  }
  useEffect(()=>{
    setUserId(localStorage.getItem('userId'))
    setUserName(localStorage.getItem('userName'))
  },[])
  return (
    
      <>
        <h1 className={styles.title}>New Shrine</h1>
        {userId!='null' ?  
       (<div className={styles.formContainer}>
        
      <form className={styles.form}>
        <div className={styles.textInputs}>
            <input type='text' placeholder='name' name="name" onChange={handleChange}/><br/>
            <input type='text' placeholder='subtitle' name="subtitle" onChange={handleChange}/><br/>
            <input type='text' placeholder='region' name="region" onChange={handleChange}/><br/>
            <input type='text' placeholder='coordinates' name='coordinates' onChange={handleChange}/><br/>
            <label htmlFor='locationImage'>Choose image for Map location</label>
        </div>
        <div className={styles.imagePreview}>
            {locationImage ? (
            <Image 
              src={locationImage} 
              alt={formData.name || ''} 
              className={styles.imagePreviewImage}
              fill/>
              )
              : 
            <div className={styles.box}/>}

            <input type='file' title='' name='locationImage' accept='image/*'  onChange={handleLocationImageUpload}/>
        </div>
            <p className={styles.instructions}>Enter your guide below. For each step, provide body text and an image. For best results use an image with a 4/3 aspect ratio. To add steps, press +</p>
            {Array.from(Array(guideStepsCount)).map((c, index) => {
            return(
                <div key={index} className={styles.container}>
                    <div  className={styles.guideStep}>
                        <h3 className={styles.stepTitle}>Step {index+1}</h3>
                        <textarea
                            name={`bodyText[${index}]`}
                            placeholder="Enter body text for your guide"
                            onChange={handleChange}
                        />
                        <label htmlFor='locationImage'>Choose image for guide step</label>
                        <div className={styles.imagePreview}>
                        {imagePreviews[index] ? (
                            <Image 
                                src={imagePreviews[index]} 
                                alt={formData.name || ''} 
                                className={styles.imagePreviewImage}
                                fill
                                sizes=''/>)
                            : 
                            <div className={styles.box}/>}
                            <input type='file' title='' name={`images[${index}]`} accept='image/*'  onChange={(e, index)=>handleUpload(e, index)}/>
                        </div>
                    </div>
                    <div className={styles.btnDiv}>
                        {index===guideStepsCount-1 &&<button onClick={buttonHandlerGuideStepIncrease} className={styles.btnSmall}>+</button>}
                        {(index>0 && index===guideStepsCount-1) && <button onClick={buttonHandlerGuideStepDecrease} className={styles.btnSmall}>-</button>}
                    </div>
                </div>
               
            )})}
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