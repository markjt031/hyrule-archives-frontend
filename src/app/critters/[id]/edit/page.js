'use client'
import styles from '../../../../styles/createeditform.module.css'
import NotAuthorized from '@/app/components/NotAuthorized'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@/context/user'
import Image from 'next/image'



export default function EditCritterForm({searchParams}) {
    const router=useRouter();
    const {user, setUser}=useUser()
    const [imagePreview, setImagePreview]=useState(searchParams.image)
    const [toggleError, setToggleError]=useState(false)
    const [errorMessage, setErrorMessage]=useState('')
    
    console.log(searchParams)
    //This is to handle an error where the create form made recoverable materials just
    //a string when there was only one value, but an array if there was more than one.
    //Also handles empty arrays for this data
    const uniqueArray=[]
    let uniqueObj={}
    let count=1
    if (searchParams.uniqueCookingEffects){
        if (typeof searchParams.uniqueCookingEffects==='string'){
            uniqueArray.push(searchParams.uniqueCookingEffects)
        }
        else {
            for (let i=0; i<searchParams.uniqueCookingEffects.length; i++){
                uniqueArray.push(searchParams.uniqueCookingEffects[i])
            }
        }
        for (let i=0; i<uniqueArray.length; i++){
          uniqueObj[`uniqueCookingEffects[${i}]`]=uniqueArray[i]
        }
        count=uniqueArray.length
    }
    const [uniqueCookingEffectsCount, setUniqueCookingEffectsCount]=useState(count)
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
    const [uniqueCookingEffects, setUniqueCookingEffects]=useState(uniqueObj)
    const [formData, setFormData]= useState({
      no: searchParams.no,
      name: searchParams.name,
      heartsRecovered: searchParams.heartsRecovered,
      fuseAttackPower: searchParams.fuseAttackPower,
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
      for (const effect in uniqueCookingEffects){
          form.append(effect, uniqueCookingEffects[effect])
      }
      form.append('userId', user.id)
      if (validateInput()){
        editCritter(form)
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
        setErrorMessage("You must enter number for no recovered. This should match the compendium numbers")
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
  const buttonHandlerUniqueIncrease=(e)=>{
    e.preventDefault()
    incrementUniqueCooking()
  }
  const buttonHandlerUniqueDecrease=(e)=>{
    e.preventDefault()
    decrementUniqueCooking()
  }
  const incrementUniqueCooking=()=>{
    setUniqueCookingEffectsCount(uniqueCookingEffectsCount+1)
  }
  const decrementUniqueCooking=(e)=>{
    setUniqueCookingEffectsCount(uniqueCookingEffectsCount-1)
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
  const editCritter = async (critter) => {
    const response= await fetch(`http://hyrule-archive.herokuapp.com/critters/${searchParams._id}`,
    {
        method: "PUT",
        mode: "cors",
        // headers: {
        //     "Content-Type": "multipart/form-data",
        // },
        body: critter
    })
    const data= await response.json()
    console.log(data)
    if (data.name){
        setToggleError(false)
        router.push('/creatures')
    }
    else{
        setToggleError(true)
        setErrorMessage(data.message)
    }
  }

  return (
    
      <>
      <h1 className={styles.title}>Edit Creature Material</h1>
        {user ? 
       (<div className={styles.formContainer}>
      <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.textInputs}>
          <input type='number' placeholder='no' required value={formData.no} name="no" onChange={handleChange}/><br/>
          <input type='text' placeholder='name' required value={formData.name} name="name" onChange={handleChange}/><br/>
          <input type='number' placeholder='hearts recovered' required value={formData.heartsRecovered} name="heartsRecovered" onChange={handleChange}/><br/>
          <input type='number' placeholder='fuse attack power' required value={formData.fuseAttackPower}  name="fuseAttackPower" onChange={handleChange}/><br/>
          {Array.from(Array(uniqueCookingEffectsCount)).map((c, index) => {
          return(
              <div key={index}>
                  <input
                      type="text"
                      name=""
                      value={uniqueCookingEffects[`uniqueCookingEffects[${index}]`]}
                      placeholder="unique cooking effects"
                      onChange={(event) => setUniqueCookingEffects({...uniqueCookingEffects, [`uniqueCookingEffects[${index}]`]:event.target.value })}
                  />
                  {index===uniqueCookingEffectsCount-1 &&<button className={styles.btnSmall} onClick={buttonHandlerUniqueIncrease}>+</button>}
                  {(index>0 && index===uniqueCookingEffectsCount-1) && <button className={styles.btnSmall} onClick={buttonHandlerUniqueDecrease}>-</button>}
              </div>
          )})}
          {Array.from(Array(commonLocationsCount)).map((c, index) => {
          return(
              <div key={index}>
                  <input
                      type="text"
                      value={commonLocations[`commonLocations[${index}]`]}
                      name=""
                      placeholder="common locations"
                      onChange={(event) => setCommonLocations({...commonLocations, [`commonLocations[${index}]`]:event.target.value })}
                  />
                  {index===commonLocationsCount-1 &&<button className={styles.btnSmall} onClick={buttonHandlerCommonIncrease}>+</button>}
                  {(index>0 && index===commonLocationsCount-1)&& <button className={styles.btnSmall} onClick={buttonHandlerCommonDecrease}>-</button>}
              </div>
          )})}
          <textarea placeholder='type description here' name='description' value={searchParams.description} rows="4" onChange={handleChange}/>
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
      null
      }
      </div>)
      :
      <NotAuthorized/>}
      
      </>
      
  )
}