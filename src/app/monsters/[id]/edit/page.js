'use client'
import styles from '../../../../styles/login.module.css'
import Link from 'next/link'
import NotAuthorized from '@/app/components/NotAuthorized'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@/context/user'



export default function EditMonsterForm({searchParams}) {
    console.log(searchParams)
    const router=useRouter();
    const {user, setUser}=useUser()
    const [imagePreview, setImagePreview]=useState(searchParams.image)
    const [toggleError, setToggleError]=useState(false)
    const [errorMessage, setErrorMessage]=useState('')
    const [formData, setFormData]= useState({})
    
    const [recoverableMaterials, setRecoverableMaterials]=useState({})
   
    const [commonLocations, setCommonLocations]=useState({})

    //This is to handle an error where the create form made recoverable materials just
    //a string when there was only one value, but an array if there was more than one.
    const recoverableArray=[]
    if (typeof searchParams.recoverableMaterials==='string'){
        recoverableArray.push(searchParams.recoverableMaterials)
    }
    else {
        for (let i=0; i<searchParams.recoverableMaterials.length; i++){
            recoverableArray.push(searchParams.recoverableMaterials[i])
        }
    }
    //Repeating for the other array
    const commonArray=[]
    if (typeof searchParams.commonLocationss==='string'){
        commonArray.push(searchParams.commonLocations)
    }
    else {
        for (let i=0; i<searchParams.commonLocations.length; i++){
            commonArray.push(searchParams.commonLocations[i])
        }
    }
    const [commonLocationsCount, setCommonLocationsCount]=useState(commonArray.length)
    const [recoverableMaterialsCount, setRecoverableMaterialsCount]=useState(recoverableArray.length)
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
    const response= await fetch(`http://hyrule-archive.herokuapp.com/monsters/${searchParams._id}`,
    {
        method: "PUT",
        mode: "cors",
        // headers: {
        //     "Content-Type": "multipart/form-data",
        // },
        body: monster
    })
    const data= await response.json()
    
    if (data.data.name){
        setToggleError(false)
        router.push('/monsters')
    }
    else{
        setToggleError(true)
        setErrorMessage(data.message)
    }
  }

  return (
    
      <div>
        {/* {user ?  */}
       (<div>
        <h1>Edit Monster</h1>
      <form onSubmit={handleSubmit}>
      <input type='number' placeholder='no' name="no" value={searchParams.no} onChange={handleChange}/><br/>
        <input type='text' placeholder='name' name="name" value={searchParams.name} onChange={handleChange}/>
        {Array.from(Array(recoverableMaterialsCount)).map((c, index) => {
            console.log(recoverableMaterialsCount)
        console.log(index)
        return(
            <div key={index}>
                <input
                    type="text"
                    value={recoverableArray[index]}
                    placeholder="recoverable material"
                    onChange={(event) => setRecoverableMaterials({...recoverableMaterials, [`recoverableMaterials[${index}]`]:event.target.value })}
                />
                <button onClick={buttonHandlerRecoverableIncrease}>+</button>
                {index>0 && <button onClick={buttonHandlerRecoverableDecrease}>-</button>}
                
            </div>
        )})}
        {Array.from(Array(commonLocationsCount)).map((c, index) => {
        console.log(index)
        return(
            <div key={index}>
                <input
                    type="text"
                    value={searchParams.commonLocations[index]}
                    
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
        <textarea placeholder='type description here' value={searchParams.description} name='description' rows="4" onChange={handleChange}/>
        <input type='submit' value='Submit'/>
      </form>
      {toggleError ? <h5>{errorMessage}</h5>
      :
      null
      }
      </div>)
      {/* :
      <NotAuthorized/>} */}
      
      </div>
      
  )
}