
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "../lib/next.auth/options";
import { User } from "@/types/types";



const Header = async () => {
    const session = await getServerSession(authOptions);
    const user: User = session?.user;
    return (
        <header className="bg-slate-50 text-grey-100 shadow-lg">
            <nav className="flex items-center justify-between p-4">
                <Link href={"/"} className="text-gray-950 text-xl font-bold">
                    FunSports
                </Link>
                <div className="flex items-center gap-1">
                    <Link href="/" className="text-gray-950 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                        ホーム
                    </Link>
                    <Link href={user ? "profile" : "/api/auth/signin"} className="text-gray-950 hover:text-white px-3 py-2 rounded-md text-sm font-medium" >
                        {user ? "プロフィール" : "ログイン"}
                    </Link>

                    {user ? (
                        <Link
                            href={"/api/auth/signout"}
                            className="text-gray-950 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                        >
                            ログアウト
                        </Link>): ""}

                    <Link href={`/profile`}>
                        <Image width={50} height={50} alt="profile_icon" src={user?.image || "/default_icon.png"}/>
                    </Link>

                </div>

            </nav>

        </header>
    );
};

export default Header;