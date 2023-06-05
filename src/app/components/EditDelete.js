'use client'
import { useUser } from "@/context/user"
import { useRouter } from "next/navigation";
import {useEffect} from 'react'
import { useState } from "react"
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from "next/link";
import styles from '../../styles/editdelete.module.css'


export default function EditDelete({pathname, itemId, userId, data}){
    const {user, setUser}=useUser();
    const [usersId, setUsersId]=useState(null)
    const [confirmDelete, setConfirmDelete]=useState(false)
    const router=useRouter()

    console.log(user)
    const handleDelete=async ()=>{
        const response= await fetch(`https://hyrule-archive.herokuapp.com/${pathname}/${itemId}`,
        {
            method: 'DELETE',
            mode: 'cors',
        }).then(()=>{
            console.log('did it work?')
            router.push(`/${pathname}`)
        })
    }
    useEffect(()=>{
        setUsersId(localStorage.getItem('userId'))
    },[])
    const deleteButtonHandler=()=>{
        setConfirmDelete(true)
    }
    const noButtonHandler=()=>{
        setConfirmDelete(false)
    }
    return <>
        {usersId!='null' && usersId===userId ?
            (<div>
                <div className={styles.buttonContainer}>
                    {/* This part is for the equipment edit form that needs to be passed as a json string */}
                    {typeof(data)==='string' ? 
                    <Link href={{
                        pathname: `/${pathname}/${itemId}/edit`,
                        query: {data:data}
                        }}>
                        <button className={styles.button}><FontAwesomeIcon icon={faPencil}/></button>
                    </Link>
                    :
                    <Link href={{
                        pathname: `/${pathname}/${itemId}/edit`,
                        query: data
                        }}>
                        <button className={styles.button}><FontAwesomeIcon icon={faPencil}/></button>
                    </Link>
                    }
                    <button className={styles.button} onClick={()=>{deleteButtonHandler()}}><FontAwesomeIcon icon={faTrash}/></button>
                </div>
                {confirmDelete ? (<div>
                    <h3>Are you sure you want to delete?</h3>
                    <button onClick={()=>{handleDelete()}}>Yes</button>
                    <button onClick={()=>{noButtonHandler()}}>No</button>
                    </div>)
                    :
                    null
                    }
            </div>)
        :
        null
        }
    </>
}