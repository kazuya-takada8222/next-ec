// components/Sidebar.js
export default function Sidebar() {
    return (
      <div className="w-1/4 p-5 bg-slate-100 h-screen">
        <h2 className="text-lg font-bold mb-4">種目で探す</h2>
        <ul>
          <li className="mb-2">
            <a href="#" className=" text-slate-600">サッカー</a>
          </li>
          <li className="mb-2">
            <a href="#" className="text-slate-600">テニス</a>
          </li>
          <li className="mb-2">
            <a href="#" className="text-slate-600">バスケットボール</a>
          </li>
          <li className="mb-2">
            <a href="#" className="text-slate-600">バレーボール</a>
          </li>
        </ul>
      </div>
    );
  }
  