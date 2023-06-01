'use client'
import { createContext, useContext, useState, useEffect} from "react";

const Context=createContext();
const Provider=({children})=>{
    const [user, setUser]=useState(null)
    
    return <Context.Provider value={{user, setUser}}>{children}</Context.Provider>
}
export const useUser=()=>useContext(Context)
export default Provider