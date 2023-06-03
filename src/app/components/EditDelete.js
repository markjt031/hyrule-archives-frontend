'use client'
import { useUser } from "@/context/user"
import { useRouter } from "next/navigation";
import { useState } from "react"
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from "next/link";
import styles from '../../styles/editdelete.module.css'
import { revalidatePath } from "next/cache";


export default function EditDelete({pathname, itemId, userId, data}){
    const {user, setUser}=useUser();
    const [confirmDelete, setConfirmDelete]=useState(false)
    const router=useRouter()

    console.log(user)
    const handleDelete=async ()=>{
        const response= await fetch(`https://hyrule-archive.herokuapp.com/${pathname}/${itemId}`,
        {
            method: 'DELETE',
            mode: 'cors',
        }).then(()=>{
            revalidatePath(`/${pathname}/`)
            console.log('did it work?')
            router.push(`/${pathname}`)
        })
    }
        
    const deleteButtonHandler=()=>{
        setConfirmDelete(true)
    }
    const noButtonHandler=()=>{
        setConfirmDelete(false)
    }
    return <>
        {user && user.id===userId ?
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