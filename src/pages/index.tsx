import Link from "next/link";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  return (
    <div className="">
      <div className="p-4">
        {/* <Navbar /> */}
        <div className="flex flex-col justify-center items-center  text-2xl gap-2 mt-2">
          <Link className="p-2 w-52 rounded-lg shadow-2xl border border-slate-400  text-[#F45867] text-xl font-semibold  flex justify-center" href="/auth">
            Auth
          </Link>
          {session?.user && (
            <>
              <Link className="p-2 w-52 rounded-lg shadow-2xl border border-slate-400  text-[#F45867] text-xl font-semibold  flex justify-center" href="/main">
                Home Page
              </Link>
              <Link className="p-2 w-52 rounded-lg shadow-2xl border border-slate-400  text-[#F45867] text-xl font-semibold  flex justify-center" href="/addrestaurant">
                Add Restaurant
              </Link>
              <button className="p-2 w-52 rounded-lg shadow-2xl border border-slate-400 self-center text-[#F45867] text-xl font-semibold" onClick={() => signOut({ callbackUrl: "/" })}>
                Sign out
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
