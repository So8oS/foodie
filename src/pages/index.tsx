import Link from "next/link";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import Navbar from "@/components/navbar";

export default function Home() {
  return (
    <div>
      <div className="flex justify-between w-full">
        <div className="flex">
          <svg className="" xmlns="http://www.w3.org/2000/svg" width="50" height="75" viewBox="0 0 50 75" fill="none">
            <circle cx="2" cy="27" r="30" stroke="#F45867" stroke-width="36" />
          </svg>
          <svg className="absolute " xmlns="http://www.w3.org/2000/svg" width="160" height="66" viewBox="0 0 160 66" fill="none">
            <circle cx="77.5" cy="-16.5" r="82.5" fill="#FFECE7" />
          </svg>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" width="77" height="72" viewBox="0 0 77 72" fill="none">
          <circle cx="90.5" cy="-18.5" r="90.5" fill="#F45867" />
        </svg>
      </div>
      <div className="p-4">
        <Navbar />
        <Link href="/auth">Auth</Link>
        <button onClick={() => signOut()}>Sign out</button>
      </div>
    </div>
  );
}
