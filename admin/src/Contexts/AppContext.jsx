import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext=createContext()
const AppContextProvider=(props)=>{
    const currencySymbol='$'
    const calculateAge=(dob)=>{
        const today=new Date()
        const birthDate=new Date(dob)
        let age=today.getFullYear()-birthDate.getFullYear()
        return age;
    }
    const value={
       calculateAge,
       currencySymbol
    }   
    
    return(
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}
export default AppContextProvider