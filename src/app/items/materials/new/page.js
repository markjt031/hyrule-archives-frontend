'use client'
import styles from '../../../../styles/createeditform.module.css'
import Link from 'next/link'
import NotAuthorized from '@/app/components/NotAuthorized'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@/context/user'



export default function NewMaterialForm() {
    const router=useRouter();
    const {user, setUser}=useUser()
    const [imagePreview, setImagePreview]=useState(null)
    const [toggleError, setToggleError]=useState(false)
    const [errorMessage, setErrorMessage]=useState('')
    const [formData, setFormData]= useState({})
    const [uniqueCookingEffectsCount, setUniqueCookingEffectsCount]=useState(1)
    const [uniqueCookingEffects, setUniqueCookingEffects]=useState({})
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
    for (const effect in uniqueCookingEffects){
        form.append(effect, uniqueCookingEffects[effect])
    }
    form.append('userId', user.id)
    if (validateInput()){
      createMaterial(form)
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
  const createMaterial = async (material) => {
    const response= await fetch(`http://hyrule-archive.herokuapp.com/items/materials/`,
    {
        method: "POST",
        mode: "cors",
        // headers: {
        //     "Content-Type": "multipart/form-data",
        // },
        credentials: 'include',
        body: material
    })
    const data= await response.json()
    
    if (data.name){
        setToggleError(true)
        router.refresh()
        router.push('/items/materials')
    }
    else{
        setToggleError(true)
        setErrorMessage(data.message)
    }
  }

  return (
    
      <>
      <h1>New Material</h1>
        {user ? 
       (<div className={styles.formContainer}>
      <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.textInputs}>
          <input type='number' placeholder='no' name="no" onChange={handleChange}/><br/>
          <input type='text' placeholder='name' name="name" onChange={handleChange}/><br/>
          <input type='number' placeholder='hearts recovered' name="heartsRecovered" onChange={handleChange}/><br/>
          <input type='number' placeholder='fuse attack power' name="fuseAttackPower" onChange={handleChange}/><br/>
          {Array.from(Array(uniqueCookingEffectsCount)).map((c, index) => {
          return(
              <div key={index}>
                  <input
                      type="text"
                      name=""
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
                      // value={commonLocations[index]}
                      name=""
                      placeholder="common locations"
                      onChange={(event) => setCommonLocations({...commonLocations, [`commonLocations[${index}]`]:event.target.value })}
                  />
                  {index===commonLocationsCount-1 &&<button className={styles.btnSmall} onClick={buttonHandlerCommonIncrease}>+</button>}
                  {(index>0 && index===commonLocationsCount-1)&& <button className={styles.btnSmall} onClick={buttonHandlerCommonDecrease}>-</button>}
              </div>
          )})}
          <textarea placeholder='type description here' name='description' rows="4" onChange={handleChange}/>
        </div>
        <div className={styles.imagePreview}>
            {imagePreview ? <img src={imagePreview} className={styles.imagePreviewImage}/> : <div className={styles.box}/> }
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