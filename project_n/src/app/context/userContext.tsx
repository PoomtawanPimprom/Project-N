"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { userInterface } from "../interface/userInterface";
import { useSession } from "next-auth/react";
import { getUserById } from "../service/profile/service";

interface UserContextType {
  user: userInterface | null;
}

const UserContext = createContext<UserContextType>({
  user: null,
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const {data:session} = useSession();
    const [user,setUser] = useState<userInterface|null>(null);
    
    
    const fetchUser = async () => {
        if(!session){
            setUser(null);
            return;
        }
        const res = await getUserById(Number(session?.user.id))
        setUser(res)
    }

    useEffect(()=>{
        fetchUser()
    },[session])

    return(
        <UserContext.Provider value={{user}}>
            {children}
        </UserContext.Provider>
    )
};


export const useUser = () => useContext(UserContext)