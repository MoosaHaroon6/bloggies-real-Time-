"use client";

import { useUserDetailsContext } from "@/context/userDetails-context";
import { auth, db, storage } from "@/firebase/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { uploadBytesResumable, getDownloadURL, ref } from "firebase/storage";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type StoredUserDetailsType = {
    image: string;
    dob: string;
    age: number | null;
    gender: string;
};

export default function UserDetails() {
    const [dob, setDob] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const [age, setAge] = useState<number | null>(null);
    const [gender, setGender] = useState('');
    const [imageURL, setImageURl] = useState("");

    const { setUserDetails } = useUserDetailsContext()!;
    const route = useRouter();

    const makeImageName = () => `${auth.currentUser?.uid}.${image?.name?.split(".").pop()}`;

    const uploadFiles = () => {
        if (!age || !dob || !gender || !image) return;
        uploadImage();
    };

    const saveUserDetailsToFirebase = async () => {
        const userDetails: StoredUserDetailsType = {
            dob,
            age: age ?? 0,
            image: imageURL,
            gender,
        };

        const docID = auth.currentUser?.uid;
        const docRef = doc(db, "userDetails", docID!);

        try {
            await setDoc(docRef, userDetails);
            setUserDetails(userDetails);
            route.push("/blogs/allBlogs");
        } catch (error) {
            console.error("Error Saving Details", error);
        }
    };

    useEffect(() => {
        if (imageURL) {
            saveUserDetailsToFirebase();
        }
    }, [imageURL]);

    const uploadImage = () => {
        if (!image) return;

        const storageRef = ref(storage, `userPfp/${makeImageName()}`);
        const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log("Upload is " + progress + "% done");
            },
            (error) => {
                console.error("Error during image upload", error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log("File available at", downloadURL);
                    setImageURl(downloadURL);
                });
            }
        );
    };

    return (
        <div className="card bg-base-100 w-96 shadow-xl m-auto mt-[100px]">
            <h1 className="text-3xl text-center font-bold">User Details</h1>
            <div className="card-body items-center text-center gap-4">

                <label className="input input-bordered flex items-center gap-2">
                    <input
                        type="text"
                        className="grow w-[300px]"
                        placeholder="Age"
                        value={age ?? ''}
                        onChange={(e) => { setAge(e.target.value ? Number(e.target.value) : null) }}
                    />
                </label>

                <label className="input input-bordered flex items-center gap-2">
                    <input
                        type="text"
                        className="grow w-[300px]"
                        placeholder="Date Of Birth"
                        value={dob}
                        onChange={(e) => { setDob(e.target.value) }}
                    />
                </label>

                <select
                    className="select select-bordered w-[350px] max-w-xs"
                    value={gender}
                    onChange={(e) => { setGender(e.target.value) }}
                    defaultValue="Gender"
                >
                    <option disabled value="Choose Gender">Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>

                <p>Profile Image:</p>
                <input
                    type="file"
                    className="file-input file-input-bordered w-[285px] max-w-xs"
                    onChange={(e) => {
                        const files = e.target.files;
                        if (files?.length) {
                            setImage(files[0]);
                        }
                    }}
                />

                <div className="card-actions">
                    <button
                        className="btn btn-primary w-[200px]"
                        onClick={uploadFiles}
                    >
                        Save Details
                    </button>
                </div>

            </div>
        </div>
    );
}
