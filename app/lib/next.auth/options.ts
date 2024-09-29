// import { PrismaAdapter } from "@next-auth/prisma-adapter";
// import type { NextAuthOptions } from "next-auth";
// import GitHubProvider from "next-auth/providers/github";
// import prisma from "../prisma";

// export const authOptions: NextAuthOptions = {
//     debug: false,
//     providers: [
//         GitHubProvider({
//             clientId: process.env.GITHUB_ID!,
//             clientSecret: process.env.GITHUB_SECRET!,

//         }),
//     ],
//     adapter: PrismaAdapter(prisma),
//     callbacks: {
//         session: ({ session, user }) => {
//             return {
//                 ...session,
//                 user: {
//                     ...session.user,
//                     id: user.id,
//                 },
//             };
//         },
//     },
//     secret: process.env.NEXTAUTH_SECRET,
// };

import { PrismaAdapter } from "@next-auth/prisma-adapter";
import type { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import prisma from "../prisma";

if (!process.env.GITHUB_ID || !process.env.GITHUB_SECRET) {
    throw new Error("GitHub ID and Secret must be set in environment variables.");
}

export const authOptions: NextAuthOptions = {
    debug: false,
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
    ],
    adapter: PrismaAdapter(prisma),
    callbacks: {
        session: ({ session, user }) => {
            return {
                ...session,
                user: {
                    ...session.user,
                    id: user.id,
                },
            };
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
};
