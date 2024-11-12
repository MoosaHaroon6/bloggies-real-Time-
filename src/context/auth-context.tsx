"use client";
import { auth, db } from "@/firebase/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

type UserType = {
    email: string;
    username: string;
    uid: string;
}

type ContextType = {
    user: UserType | null;
    setUser: (user: UserType | null) => void;
}

const AuthContext = createContext<ContextType | null>(null);


export default function AuthContextProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<UserType | null>(null);
    const route = useRouter();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const uid = user.uid;
                fetchUserData(uid);
                route.push('/blogs/allBlogs')
            } else {
                setUser(null);
                route.push('/login')
            }
        });
    }, []);


    const fetchUserData = async (uid: string) => {
        let docRef = doc(db, "users", uid);
        try {
            let userFound = await getDoc(docRef);
            let user = userFound.data();

            if (!user) return;
            setUser(user as UserType);
        } catch {
            console.error("User Not Found!");
        }
    }

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => useContext(AuthContext);