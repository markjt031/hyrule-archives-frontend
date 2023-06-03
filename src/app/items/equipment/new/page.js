'use client'
import styles from '../../../../styles/createeditform.module.css'
import Link from 'next/link'
import NotAuthorized from '@/app/components/NotAuthorized'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@/context/user'
import Image from 'next/image'


export default function NewEquipmentForm() {
    const router=useRouter();
    const {user, setUser}=useUser()
    const [userId, setUserId]=useState(null)
    const [imagePreview, setImagePreview]=useState(null)
    const [toggleError, setToggleError]=useState(false)
    const [errorMessage, setErrorMessage]=useState('')
    const [formData, setFormData]= useState({})
    const [otherPropertiesCount, setOtherPropertiesCount]=useState(1)
    const [commonLocationsCount, setCommonLocationsCount]=useState(1)
    const [commonLocations, setCommonLocations]=useState({})
    const [properties, setProperties]=useState({})

    useEffect(()=>{
        setUserId(localStorage.getItem('userId'))
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
        for (const property in properties){
            form.append(property, properties[property])
        }
        for (const pair of form){
            console.log(pair[0], pair[1])
        }
        form.append('userId', userId)
        if (validateInput()){
            createEquipment(form)
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
    const buttonHandlerPropertiesIncrease=(e)=>{
        e.preventDefault()
        incrementProperties()
    }
    const buttonHandlerPropertiesDecrease=(e)=>{
        e.preventDefault()
        decrementProperties()
    }
    const incrementProperties=()=>{
        setOtherPropertiesCount(otherPropertiesCount+1)
    }
    const decrementProperties=(e)=>{
        setOtherPropertiesCount(otherPropertiesCount-1)
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
    const createEquipment = async (equipment) => {
        const response= await fetch(`https://hyrule-archive.herokuapp.com/items/equipment`,
        {
            method: "POST",
            mode: "cors",
            // headers: {
            //     "Content-Type": "multipart/form-data",
            // },
            body: equipment
        })
        const data= await response.json()
        
        if (data.name){
            setToggleError(false)
            router.refresh()
            router.push('/items/equipment')
        }
        else{
            setToggleError(true)
            setErrorMessage(data.message)
        }
    }

    return (
        
        <>
            <h1 className={styles.title}>New Equipment</h1>
            {userId!='null' ?  
        (<div className={styles.formContainer}>
            
        <form className={styles.form}>
            <div className={styles.textInputs}>
                <input type='number' placeholder='no' name="no" onChange={handleChange}/><br/>
                <input type='text' placeholder='name' name="name" onChange={handleChange}/>
                <input type='text' placeholder='attack' name='attack' onChange={(event)=>setProperties({...properties, ['properties[attack]']:event.target.value})}/> 
                <input type='text' placeholder='defense' name='defense' onChange={(event)=>setProperties({...properties, ['properties[defense]']:event.target.value})}/> 
                {Array.from(Array(otherPropertiesCount)).map((c, index) => {
                return(
                    <div key={index}>
                        <input
                            type="text"
                            name=""
                            placeholder="other properties"
                            onChange={(event) => setProperties({...properties, [`properties[otherProperties][${index}]`]:event.target.value })}
                        />
                        {index===otherPropertiesCount-1 &&<button onClick={buttonHandlerPropertiesIncrease} className={styles.btnSmall}>+</button>}
                        {(index>0 && index===otherPropertiesCount-1) && <button onClick={buttonHandlerPropertiesDecrease} className={styles.btnSmall}>-</button>}
                        
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
                        {index===commonLocationsCount-1 &&<button onClick={buttonHandlerCommonIncrease} className={styles.btnSmall}>+</button>}
                        {(index>0 && index===commonLocationsCount-1) && <button onClick={buttonHandlerCommonDecrease} className={styles.btnSmall}>-</button>}
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