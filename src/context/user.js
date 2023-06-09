'use client'
import { createContext, useContext, useState, useEffect} from "react";

const Context=createContext();
const Provider=({children})=>{
    const [user, setUser]=useState(null)
    const [userId, setUserId]=useState(null)
    
    useEffect(()=>{
        if (localStorage.getItem('userId')){
            setUserId(localStorage.getItem('userId'))
        }
        else {
            localStorage.setItem('userId', null)
            setUserId(localStorage.getItem('userId'))
        }
    })
    
    return <Context.Provider value={{user, userId, setUser, setUserId}}>{children}</Context.Provider>
}
export const useUser=()=>useContext(Context)
export default Provider