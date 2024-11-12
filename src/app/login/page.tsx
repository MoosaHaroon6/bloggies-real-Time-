"use client";
import AuthForm from "@/components/auth-form";
import { auth } from "@/firebase/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function Login() {
    const route = useRouter();

    const login = async (email: string, password: string) => {
        try {
            let userCredential = await signInWithEmailAndPassword(auth, email, password)
            const user = userCredential.user;
            if (!user) return;
            if(user){
                route.push('/blogs/allBlogs');
            }
        } catch {
            console.error("Error");
        }
    }

    return (
        <div className="flex flex-col justify-center items-center mt-20">
            <AuthForm func={login} />
        </div>
    )
}