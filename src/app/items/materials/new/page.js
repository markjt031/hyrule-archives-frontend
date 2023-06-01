'use client'
import styles from '../../../../styles/login.module.css'
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
    createMaterial(form)
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
        router.push('/items/materials')
    }
    else{
        setToggleError(true)
        setErrorMessage(data.message)
    }
  }

  return (
    
      <div>
        {user ? 
       (<div>
        <h1>New Material</h1>
      <form onSubmit={handleSubmit}>
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
                <button onClick={buttonHandlerUniqueIncrease}>+</button>
                {index>0 && <button onClick={buttonHandlerUniqueDecrease}>-</button>}
                
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
                <button onClick={buttonHandlerCommonIncrease}>+</button>
                {index>0 && <button onClick={buttonHandlerCommonDecrease}>-</button>}
                
            </div>
        )})}
        <div>
            {imagePreview ? <img src={imagePreview}/> : null }
            <input type='file' name='image' accept='image/*' onChange={handleUpload}/>
        </div>
        <textarea placeholder='type description here' name='description' rows="4" onChange={handleChange}/>
        <input type='submit' value='Submit'/>
      </form>
      {toggleError ? <h5>{errorMessage}</h5>
      :
      null
      }
      </div>)
      :
      <NotAuthorized/>}
      
      </div>
      
  )
}