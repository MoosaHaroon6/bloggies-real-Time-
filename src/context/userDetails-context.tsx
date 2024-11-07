"use client";

import { createContext, ReactNode, useContext, useState } from "react";

type UserDetailsType = {
    image: File | string;
    dob: string;
    age: number;
    gender: string;
}

interface UserDetailsContext {
    userDetails: UserDetailsType | null;
    setUserDetails: (userDetails: UserDetailsType) => void;
}

const UserDetailsContext = createContext<UserDetailsContext | null>(null);

export default function UserDetailsContextProvider({ children }: { children: ReactNode }) {
    const [userDetails, setUserDetails] = useState<UserDetailsType | null>(null);

    return (
        <UserDetailsContext.Provider value={{ userDetails, setUserDetails }}>
            {children}
        </UserDetailsContext.Provider>
    )
}


export const useUserDetailsContext = () => useContext(UserDetailsContext);