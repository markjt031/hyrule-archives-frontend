'use client'
import styles from '../../../styles/login.module.css'
import Link from 'next/link'
import NotAuthorized from '@/app/components/NotAuthorized'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@/context/user'



export default function NewCreatureForm() {
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
    createCreature(form)
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
  const createCreature = async (creature) => {
    const response= await fetch(`http://hyrule-archive.herokuapp.com/creatures/`,
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
        setToggleError(true)
        router.push('/creatures')
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
        <h1>New Creature</h1>
      <form onSubmit={handleSubmit}>
      <input type='number' placeholder='no' name="no" onChange={handleChange}/><br/>
        <input type='text' placeholder='name' name="name" onChange={handleChange}/>
        {Array.from(Array(recoverableMaterialsCount)).map((c, index) => {
        return(
            <div key={index}>
                <input
                    type="text"
                    name=""
                    placeholder="recoverable material"
                    onChange={(event) => setRecoverableMaterials({...recoverableMaterials, [`recoverableMaterials[${index}]`]:event.target.value })}
                />
                <button onClick={buttonHandlerRecoverableIncrease}>+</button>
                {index>0 && <button onClick={buttonHandlerRecoverableDecrease}>-</button>}
                
            </div>
        )})}
        {Array.from(Array(commonLocationsCount)).map((c, index) => {
        return(
            <div key={index}>
                <input
                    type="text"
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