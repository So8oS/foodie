import Link from "next/link";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import Navbar from "@/components/navbar";
import TopArt from "@/components/topArt";

export default function Home() {
  const { data: session } = useSession();
  return (
    <div className="">
      <TopArt />
      <div className="p-4">
        {/* <Navbar /> */}
        <div className="flex flex-col text-2xl gap-2 justify-center items-center mt-2">
          <Link href="/auth">Auth</Link>
          {session?.user && <button onClick={() => signOut({ callbackUrl: "/" })}>Sign out</button>}
        </div>
      </div>
    </div>
  );
}
