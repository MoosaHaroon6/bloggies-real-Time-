"use client";

import { useAuthContext } from "@/context/auth-context"
import { useUserDetailsContext } from "@/context/userDetails-context";
import { auth } from "@/firebase/firebaseConfig";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NavBar() {
    // const { user } = useAuthContext()!;
    const { userDetails } = useUserDetailsContext()!;
    const route = useRouter();

    const createBlog = () => {
        if (userDetails && auth.currentUser) {
            route.push(`/blogs/createBlog`);
        } else {
            route.push('/user/userDetails');
        }
    }

    return (
        <div className="navbar bg-base-100 border-b">
            <div className="flex-1">
                <a className="btn btn-ghost text-3xl">Bloggies</a>
            </div>
            <div className="flex-none gap-2">

                <button
                    className="btn"
                    onClick={createBlog}
                >Create Blog</button>

                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img
                                alt="Tailwind CSS Navbar component"
                                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                        </div>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 
                        rounded-box z-[1] mt-3 w-[100px] p-2 shadow d-flex justify-center align-center">
                        <li>
                            Profile
                        </li>
                        <li>Settings</li>
                        {
                            auth.currentUser && userDetails ?
                                (
                                    <Link href={'/'}><li>Log Out</li></Link>
                                ) :
                                (
                                    <>
                                        <Link href={'/login'}><li>Log in</li></Link>
                                        <Link href={'/signup'}><li>Sign Up</li></Link>
                                    </>
                                )
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}