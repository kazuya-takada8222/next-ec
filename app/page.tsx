// "use client"

// import { getServerSession } from "next-auth";
// import Event from "./components/Event";
// import { authOptions } from "./lib/next.auth/options";
// import { User } from "./types/types";

// const events = [
//   {
//     id:1,
//     title: "FIFA ワールドカップ2026",
//     thumbnail: "/thumbnails/worldcup2026.jpg",
//     details: {
//       id:1,
//       feild: "soccer",
//       team: "サッカー日本代表",
//       profile_icon: ""
//     },
    
//   },
//   {
//     id:2,
//     title: "遠藤航",
//     thumbnail: "/thumbnails/endou_wataru.jpg",
//     details: {
//       id:2,
//       feild: "soccer",
//       team: "サッカー日本代表",
//       profile_icon: ""
//     },
    
//   },
//   {
//     id:3,
//     title: "南野拓実",
//     thumbnail: "/thumbnails/minamino_takumi.jpg",
//     details: {
//       id:3,
//       feild: "soccer",
//       team: "サッカー日本代表",
//       profile_icon: ""
//     },
    
//   },
// ]




// export default async function Home() {

//   const session = await getServerSession(authOptions);
//   const user: User = session?.user;

//   if(user) {
//     const response = await fetch(
//       `${process.env.NEXT_PUBLIC_API_URL}/purchases/${user.id}`
//     );
//     const purchasesData = await response.json();
//     console.log(purchasesData);
//   }
  
//   return (
//     <>
//       <main className="flex flex-wrap justify-center items-center md:mt-30 mt-20">
        
//         {events.map((event) => (
//           <Event key={event.id} event={event} />
//         ))}
//       </main>

//     </>
//   );
// }

import { getServerSession } from "next-auth";
import Event from "./components/Event";
import { authOptions } from "./lib/next.auth/options";
import { User } from "./types/types";
import Sidebar from "./components/Sidebar"; // サイドバーをインポート

const events = [
  {
    id: 1,
    title: "サッカー代表戦",
    thumbnail: "/thumbnails/soccerofpro.jpg",
    details: {
      id: 1,
      feild: "soccer",
      team: "サッカー日本代表",
      profile_icon: "",
    },
  },
  {
    id: 2,
    title: "Jリーグ",
    thumbnail: "/thumbnails/jleague.jpg",
    details: {
      id: 2,
      feild: "soccer",
      team: "サッカー",
      profile_icon: "",
    },
  },
  {
    id: 3,
    title: "Bリーグ",
    thumbnail: "/thumbnails/Bleague.webp",
    details: {
      id: 3,
      feild: "soccer",
      team: "バスケットボール",
      profile_icon: "",
    },
  },
  {
    id: 2,
    title: "バレーボール日本代表",
    thumbnail: "/thumbnails/valleyball.png",
    details: {
      id: 2,
      feild: "soccer",
      team: "バレーボール",
      profile_icon: "",
    },
  },
  {
    id: 2,
    title: "テニス",
    thumbnail: "/thumbnails/tennis.jpeg",
    details: {
      id: 2,
      feild: "soccer",
      team: "サッカー",
      profile_icon: "",
    },
  },
];

export default async function Home() {
  const session = await getServerSession(authOptions);
  const user: User = session?.user;

  if (user) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/purchases/${user.id}`
    );
    const purchasesData = await response.json();
    console.log(purchasesData);
  }

  return (
    <>
      <main className="h-screen flex flex-col">
        {/* 上半分のメインコンテンツ */}
        <div className="flex-grow flex  items-start  md:mt-30 mt-20 w-full h-[50%] overflow-x-scroll">
          {events.map((event) => {
            
            return <Event key={event.id} event={event} />;
            
          })}
        </div>
        {/* 下半分のサイドバー */}
        <div className="h-[50%] flex">
          <Sidebar/>
          <div className="w-3/4 flex flex-col items-center">
            <h2 className="text-xl font-bold">Featured Events</h2>
            <div className="flex-grow flex flex-col  items-center items-start  md:mt-30 mt-20 w-full h-full ">
              {events.map((event) => {
                
                return <Event key={event.id} event={event} />;
                
              })}
            </div>
          </div>
        </div>

      </main>
    </>
  );
}
