'use client'
import styles from '../../../../../styles/createeditform.module.css'
import Link from 'next/link'
import NotAuthorized from '@/app/components/NotAuthorized'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@/context/user'
import Image from 'next/image'


export default function NewEquipmentForm({searchParams}) {
    const router=useRouter();
    const {user, setUser}=useUser()
    
    const [toggleError, setToggleError]=useState(false)
    const [errorMessage, setErrorMessage]=useState('')
    const [otherProperties, setOtherProperties]=useState({})
    
    
    //Data was passed as JSON string. I'm realizing that this may have been a better way to handle all the logic at the
    //beginning of the other forms as well
    const data=JSON.parse(searchParams.data)
    //Make empty strings for undefined data
    let propertyCount
    //Reformatting the properties object to pass as form data
    if (!data.properties.attack){
        data.properties['properties[attack]']=0
    }
    else{
        data.properties['properties[attack]']=data.properties.attack
    }
    if (!data.properties.defense){
        data.properties['properties[defense]']=0
    }
    else{
        data.properties['properties[defense]']=data.properties.defense
    }
    if (data.properties.otherProperties.length===0){
        propertyCount=1
        data.properties[`properties[otherProperties][0]`]=''
    }
    else{
        propertyCount=data.properties.otherProperties.length
        for (let i=0; i<otherProperties.length; i++){
            data.properties[`properties[otherProperties][${i}]`]=data.properties.otherProperties[i]
        }
        
    }
    console.log(data)
    let commonCount
    let locationObj={}
    if (data.commonLocations.length===0){
        commonCount=1
    }
    else{
        commonCount=data.commonLocations.length
        for (let i=0; i<data.commonLocations.length; i++){
            locationObj[`commonLocations[${i}]`]=data.commonLocations[i]
          }
    }
    
    delete data.properties.otherProperties
    delete data.properties.attack
    delete data.properties.defense

     //Set up default form data
     const [imagePreview, setImagePreview]=useState(data.image)
    const [properties, setProperties]=useState(data.properties)
    const [otherPropertiesCount, setOtherPropertiesCount]=useState(propertyCount)
    const [commonLocationsCount, setCommonLocationsCount]=useState(commonCount)
    const [commonLocations, setCommonLocations]=useState(locationObj)
    const [formData, setFormData]= useState({
        no: data.no,
        name: data.name,
        description: data.description,
        
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
        
        editEquipment(form, data._id)
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
    const editEquipment = async (equipment, id) => {
        const response= await fetch(`https://hyrule-archive.herokuapp.com/items/equipment/${id}`,
        {
            method: "PUT",
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
        <h1 className={styles.title}>Edit Equipment</h1>
        {user ?   
       (<div className={styles.formContainer}>
        
      <form className={styles.form}>
        <div className={styles.textInputs}>
            <input type='number' placeholder='no' value={formData.no} name="no" onChange={handleChange}/><br/>
            <input type='text' placeholder='name' value={formData.name} name="name" onChange={handleChange}/><br/>
            <input type='text' placeholder='attack' name='attack' value={properties['properties[attack]']} onChange={(event)=>setProperties({...properties, ['properties[attack]']:event.target.value})}/> <br/>
            <input type='text' placeholder='defense' name='defense' value={properties['properties[defense]']} onChange={(event)=>setProperties({...properties, ['properties[defense]']:event.target.value})}/> 
            {Array.from(Array(otherPropertiesCount)).map((c, index) => {
            return(
                <div key={index}>
                    <input
                        type="text"
                        name=""
                        value={properties[`otherProperties][${index}`]}
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
                        value={commonLocations[`commonLocations[${index}]`]}
                        placeholder="common locations"
                        onChange={(event) => setCommonLocations({...commonLocations, [`commonLocations[${index}]`]:event.target.value })}
                    />
                    {index===commonLocationsCount-1 &&<button onClick={buttonHandlerCommonIncrease} className={styles.btnSmall}>+</button>}
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