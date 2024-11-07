"use client";
import AuthForm from "@/components/auth-form";
import { auth } from "@/firebase/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function Login() {

    const login = async (email: string, password: string) => {
        try {
            let userCredential = await signInWithEmailAndPassword(auth, email, password)
            const user = userCredential.user;
            if (!user) return;
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