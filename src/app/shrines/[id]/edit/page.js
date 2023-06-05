'use client'
import styles from '../../../../styles/shrineform.module.css'
import Link from 'next/link'
import NotAuthorized from '@/app/components/NotAuthorized'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@/context/user'
import {useEffect} from 'react'
import Image from "next/image";


export default function EditShrineForm({searchParams}) {
    
    const router=useRouter();
    const [userName, setUserName]=useState(null)
    const [userId, setUserId]=useState(null)
    const [files, setFiles]=useState([])
   
    const [toggleError, setToggleError]=useState(false)
    const [errorMessage, setErrorMessage]=useState('')
   
    
    const [changedIndex, setChangedIndex]=useState([])
   

    const imagesArray=[]
    if (typeof(searchParams.images)==='string'){
        imagesArray.push(searchParams.images)
        
    }
    else {
        for (let i=0; i<searchParams.images.length; i++){
            imagesArray.push(searchParams.images[i])
        }
    }
    const bodyTextArray=[]
    const bodyObj={}
    if (typeof(searchParams.bodyText)==='string'){
        bodyTextArray.push(searchParams.bodyText)
    }
    else {
        for (let i=0; i<searchParams.bodyText.length; i++){
            bodyTextArray.push(searchParams.bodyText[i])
        }
    }
    for (let i=0; i<bodyTextArray.length; i++){
        bodyObj[`bodyText[${i}]`]=bodyTextArray[i]
    }
    console.log(bodyTextArray)
    console.log(bodyObj)
    const [bodyText, setBodyText]=useState(bodyObj)
    const [formData, setFormData]= useState({
        name: searchParams.name,
        subtitle: searchParams.subtitle,
        region: searchParams.region,
        locationImage: searchParams.locationImage,
        coordinates: searchParams.coordinates,
        images: imagesArray
    })
    const [guideStepsCount, setGuideStepsCount]=useState(bodyTextArray.length)
    const [locationImage, setLocationImage]=useState(formData.locationImage)
    const [imagePreviews, setImagePreviews]=useState(formData.images)
    const handleSubmit = (event) => {
        event.preventDefault()
        let form=new FormData()
        console.log(formData)
        form.append('name', formData.name)
        form.append('subtitle', formData.subtitle)
        form.append('region', formData.region)
        form.append('coordinates', formData.coordinates)
        form.append('locationImage', formData.locationImage)
        
        for (let i=0; i<formData.images.length; i++){
            if (!changedIndex.includes(i)){
                form.append(`images`, formData.images[i])
            }
        }
        if (files.length>0){
            for (let i=0; i<files.length; i++){
                form.append('imageFiles', files[i])
            }
        }
        if (changedIndex.length>0){
            for (let i=0; i<changedIndex.length; i++){
                form.append('changedIndex', changedIndex[i])
            }
        }
        console.log(bodyText)
        if (bodyText){
            for (const text in bodyText){
                form.append(text, bodyText[text])
            }
        }
        for (const pair of form){
            console.log(pair[0], pair[1])
        }
        form.append('userId', userId)
        form.append('userName', userName)
        if (validateInput()){
        editShrine(form)
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
        setFormData({...formData, [name] : value})
    }
    const handleUpload=(e, index)=>{
        
        
        const images=[...imagePreviews]
        images[index]=URL.createObjectURL(e.target.files[0])
        const imageFiles=[...files]
        imageFiles.push(e.target.files[0])
        // setFormData({...formData, [`images[${index}]`]: e.target.files[0]})
        setImagePreviews(images)
        setFiles(imageFiles)
        const indices=[...changedIndex]
        indices.push(index)
        setChangedIndex(indices)
        
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
    
    const editShrine = async (shrine) => {
        
        const response= await fetch(`https://hyrule-archive.herokuapp.com/shrines/${searchParams._id}`,
        {
            method: "PUT",
            mode: "cors",
            // headers: {
            //     "Content-Type": "multipart/form-data",
            // },
            body: shrine
        })
        const data= await response.json()
        console.log(data)
        
        if (data.data.name){
            setToggleError(false)
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
                <input type='text' placeholder='name' value={formData.name} name="name" onChange={handleChange}/><br/>
                <input type='text' placeholder='subtitle' value={formData.subtitle} name="subtitle" onChange={handleChange}/><br/>
                <input type='text' placeholder='region' value={formData.region} name="region" onChange={handleChange}/><br/>
                <input type='text' placeholder='coordinates' value={formData.coordinates} name='coordinates' onChange={handleChange}/><br/>
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
                            {index<bodyTextArray.length ?
                            (<textarea
                                name={`bodyText[${index}]`}
                                placeholder="Enter body text for your guide"
                                value={bodyText[`bodyText[${index}]`]}
                                onChange={(e)=>setBodyText({...bodyText, [`bodyText[${index}]`]: e.target.value})}
                            />)
                            :
                            <textarea
                                name={`bodyText[${index}]`}
                                placeholder="Enter body text for your guide"
                                onChange={(e)=>setBodyText({...bodyText, [`bodyText[${index}]`]: e.target.value})}
                            />}

                            <label htmlFor={`images[${index}]`}>Choose image for guide step</label>
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
                                <input type='file' title='' name={`images[${index}]`} accept='image/*'  onChange={(e)=>handleUpload(e, index)}/>
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