"use client"

import { createContext, useContext } from "react"

 export const UserContext = createContext(null)

export function UserProvider({user,children}:{user:any,children:React.ReactNode}){
    return (
        <UserContext.Provider value={user}>
            {children}
        </UserContext.Provider>
    )
}

export function useUser() {
    return useContext(UserContext);
  }
