// import prisma from "@/app/lib/prisma";
// import { NextResponse } from "next/server";
// import Stripe from "stripe";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
// //購入履歴の保存
// export async function POST(request: Request, response: Response) {
//     const { sessionId } = await request.json();
//     try {
//         const session = await stripe.checkout.sessions.retrieve(sessionId);

//         const existingPurchase = await prisma.purchase.findFirst({
//             where: {
//                 userId: session.client_reference_id!,
//                 bookId: session.metadata?.bookId,
//             },
//         });

//         if(!existingPurchase) {
//             const purchase = await prisma.purchase.create({
//                 data: {
//                     userId: session.client_reference_id!,
//                     bookId: session.metadata?.bookId!,
//                 },
//             });
    
//             return NextResponse.json({ purchase })
//         } else {
//             return NextResponse.json({ message: "すでに購入済みです。"})
//         }
        

//     }catch (err){
//         return NextResponse.json(err);
//     }
// }

import prisma from "app/lib/prisma";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

// 購入履歴の保存
export async function POST(request: Request) {
    const { sessionId } = await request.json();
    try {
        console.log("API Called");
        const session = await stripe.checkout.sessions.retrieve(sessionId);
        console.log("Session Retrieved:", session);
        const clientReferenceId = session.client_reference_id;
        const bookId = session.metadata?.bookId;
    
        console.log("ClientReferenceId:", clientReferenceId);
        console.log("BookId:", bookId);
        
        if (!clientReferenceId || !bookId) {
            return NextResponse.json({ message: "購入履歴に必要な情報が不足しています。" }, { status: 400 });
        }
    
        const existingPurchase = await prisma.purchase.findFirst({
            where: {
                userId: clientReferenceId,
                bookId: bookId,
            },
        });
    
        console.log("Existing Purchase:", existingPurchase);
        
        if (!existingPurchase) {
            const purchase = await prisma.purchase.create({
                data: {
                    userId: clientReferenceId,
                    bookId: bookId,
                },
            });
    
            console.log("Purchase Created:", purchase);
            return NextResponse.json({ purchase });
        } else {
            return NextResponse.json({ message: "すでに購入済みです。" });
        }
    } catch (err) {
        console.log("Error occurred:", err); // エラー内容をログに出力
        return NextResponse.json({ error: "サーバーエラーが発生しました。" }, { status: 500 });
    }
    
}
