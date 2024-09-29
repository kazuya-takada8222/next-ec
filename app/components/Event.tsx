// "use client"

// import { useSession } from "next-auth/react";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import { useState } from "react";
// // import Link from "next/link";

// type PlayerType = {
//   title: string;
//   details: {
//     team: string;
//   };
//   thumbnail: string;
// };

// const Player = ({ player }: { player: PlayerType }) => {

//     const [showModal, setShowModal] = useState(false);
//     const{ data: session} = useSession();
//     const user = session?.user;
//     const router = useRouter();
//     const startCheckout = async () => {
//       try {
//               const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/checkout`),
//               {
//                 method:"POST",
//                 headers: {"Content-Type": "application/json"},
//                 body: JSON.stringify({
//                 })
//               }
//             const responseData = await Response.json();
//             if (responseData) {
//               router.push(responseData.checkout_url);
//             }
//           } catch (err) {
//             console.error(err);
//           }

//     };

    

    
//     const handlePurchaseClick = () => {
//       setShowModal(true);
//     };

//     const handleCancel = () => {
//       setShowModal(false);
//     };

//     const handlePurchaseConfirm = () => {
//         if (!user) {
//           setShowModal(false);
//           //ログインページへ
//           router.push("/login");
//         }else {
//           //stripeで決済
//           startCheckout();
//         }
//     };
//     return (
//         <>
//           <style jsx global>
//             {`@keyframes fadeIn{
//               from {
//                 opacity: 0;
//                 transform: scale(0.9);
//               }
//               to {
//                 opacity: 1;
//                 transform: scale(1);

//               }
            
//             }
//             .modal {
//               animation: fadeIn 0.3s ease-out forwards;
            
//             }
//             `}
//           </style>

//           <div className="flex flex-col items-center m-4">
//             <a onClick={handlePurchaseClick} className="cursor-pointer shadow-2xl duration-300 hover:translate-y-1 hover:shadow-none">
//                 <Image
//                   priority
//                   src={player.thumbnail}
//                   alt={player.title}
//                   width={450}
//                   height={350}
//                   className="rounded-t-md"
//                 />
//                 <div className="px-4 py-4 bg-slate-100 rounded-b-md">
//                     <h2 className="text-lg font-semibold ">{player.title}</h2>
//                     <p className="mt-2 text-lg text-slate-600">{player.details.team}</p>
//                 </div>
//             </a>

//             {showModal && (
//                 <div className="absolute top-0 left-0 right-0 bottom-0 bg-slate-900 bg-opacity-50 flex justify-center items-center modal">
//                 <div className="bg-white p-8 rounded-lg">
//                   <h3 className="text-xl mb-4">本を購入しますか</h3>
//                   <button onClick={handlePurchaseConfirm} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4">購入する</button>
//                   <button onClick={handleCancel} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">キャンセル</button>
  
//                 </div>
  
//               </div>

//             )}

            





//           </div>
//         </>
//     );
// };

// export default Player;

"use client";

import { User } from "@/types/types";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
// import Link from "next/link";

type EventType = {
  title: string;
  details: {
    team: string;
  };
  thumbnail: string;
  id: number;
  className?: string;
};

const Event = ({ event , className }: { event: EventType; className?: string }) => {
  const [showModal, setShowModal] = useState(false);
  const { data: session } = useSession();
  const user: User = session?.user;
  const router = useRouter();

  const startCheckout = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: event.title,
          price: 100,
          userId: user?.id,
          bookId: event.id
        })
      });
      

      const responseData = await response.json(); // response.json() でレスポンスを取得
      console.log('ResponseData,', responseData);
      if (responseData && responseData.checkout_url) {
        router.push(responseData.checkout_url); // checkout_urlがあればリダイレクト
      }
    } catch (err) {
      console.error("Checkout error:", err);
    }
  };
  const handlePurchaseClick = () => {
    setShowModal(true);
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  const handlePurchaseConfirm = () => {
    if (!user) {
      setShowModal(false);
      // ログインページへリダイレクト
      router.push("/login");
    } else {
      // stripeで決済
      startCheckout();
    }
  };
  

  return (
    <>
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .modal {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>

      <div className="flex flex-col">
        <a onClick={handlePurchaseClick} className="cursor-pointer shadow-2xl duration-300 hover:translate-y-1 hover:shadow-none">
          <div className="relative w-96 h-96">
            <Image
              priority
              src={event.thumbnail}
              alt={event.title}
              fill
              sizes="100vw"
              style={{objectFit: 'cover'}}
              className="rounded-t-md"
            />
          </div>
          
          <div className="px-6 py-4 bg-slate-100 rounded-b-md">
            <h2 className="text-lg font-semibold text-center ">{event.title}</h2>
            <p className="mt-2 text-lg text-slate-600 text-center">{event.details.team}</p>
          </div>
        </a>

        {showModal && (
          <div className="absolute top-0 left-0 right-0 bottom-0 bg-slate-900 bg-opacity-50 flex justify-center items-center modal">
            <div className="bg-white p-8 rounded-lg">
              <h3 className="text-xl mb-4">本を購入しますか</h3>
              <button
                onClick={handlePurchaseConfirm}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
              >
                購入する
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              >
                キャンセル
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Event;
