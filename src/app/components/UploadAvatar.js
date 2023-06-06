'use client'
import Image from "next/image"
import {useState, useEffect} from "react"
import styles from '../../styles/createeditform.module.css'
import utilStyles from '../../styles/utils.module.css'
import { useRouter } from "next/navigation"

export default function UploadAvatar({currentAvatar}){
    let image
    if (currentAvatar){
        image=currentAvatar
    }
    else{
        image=null
    }
    const [imagePreview, setImagePreview]=useState(image)
    const [formData, setFormData]=useState({})
    const [editing, setEditing]=useState(false)
    const [userId, setUserId]=useState(null)
    const [toggleError, setToggleError]=useState(false)
    const [errorMessage, setErrorMessage]=useState('')
    const router=useRouter()

    useEffect(()=>{
        setUserId(localStorage.getItem('userId'))
    },[])

    const handleUpload=(e)=>{
        const name=e.target.name;
        const value=e.target.files[0]
        setFormData({...formData, [name]: value})
        setImagePreview(URL.createObjectURL(e.target.files[0]))
    }
    const handleSubmit=(e)=>{
            e.preventDefault()
            let form=new FormData()
            for (const key in formData){
                if (formData[key]){
                    form.append(key, formData[key])
                }
            }
            for (const pair of form){
                console.log(pair[0], pair[1])
            }
            setEditing(!editing)
            editAvatar(form)
            
            
    }
    const editAvatar = async (avatar) => {
        const response= await fetch(`https://hyrule-archive.herokuapp.com/users/profile/${userId}`,
        {
            method: "PUT",
            mode: "cors",
            // headers: {
            //     "Content-Type": "multipart/form-data",
            // },
            body: avatar
        })
        const data= await response.json()
        
        if (data.data){
            setToggleError(false)
            router.refresh()
        }
        else{
            setToggleError(true)
            setErrorMessage(data.message)
        }
      }
    return(
        <>
        {editing ?
        (
        <>
            <form className={styles.form}>
                <div className={styles.imagePreview}>
                    {imagePreview ? (
                    <Image 
                        src={imagePreview} 
                        alt='user avatar' 
                        className={styles.imagePreviewImage}
                        fill/>
                    )
                    :
                    <div className={styles.box}/>}
                    <label htmlFor="avatar">Upload an Avatar</label>
                    <input type='file' title='' name='avatar' accept='image/*'  onChange={handleUpload}/>
                    
                </div>
            </form>
            <input className={utilStyles.btn} type='submit' onClick={handleSubmit}/>
            <button className={utilStyles.btn} onClick={()=>setEditing(!editing)}>Cancel</button>
        </>)
            :
            (<div className={styles.imagePreview}>
                {imagePreview ? (
                <Image 
                src={imagePreview} 
                alt='user avatar' 
                className={styles.imagePreviewImage}
                fill/>)
                :
                <div className={styles.box}/>}
                </div>)}
            {(userId!='null' &&!editing) && <button className={utilStyles.btn} onClick={()=>setEditing(!editing)}>Change Avatar</button>}
            {toggleError && <h5>{errorMessage}</h5>}
        </>
    )
}