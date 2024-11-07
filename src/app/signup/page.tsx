"use client";
import AuthForm from "@/components/auth-form";
import { auth, db } from "@/firebase/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function SignUp() {

    const route = useRouter();

    const signUp = async (email: string, password: string, username: string) => {
        try {
            let userCredential = await createUserWithEmailAndPassword(auth, email, password)
            const user = userCredential.user;
            await saveUserToFireStore(email, password, user.uid, username);
            route.push('/blogs/allBlogs');
        } catch {
            console.error("Error");
        }

    }

    const saveUserToFireStore = async (
        email: string,
        password: string,
        username: string,
        uid: string) => {
        let user = { email, password, uid, username };
        let docRef = doc(db, "users", uid);
        await setDoc(docRef, user);
    }

    return (
        <div className="flex flex-col justify-center items-center mt-20">
            <AuthForm
                func={signUp}
                signup={true}
            />

        </div>
    )
}