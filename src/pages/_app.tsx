import Navbar from "@/components/navbar";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import Footer from "@/components/footer";
import { useEffect, useState } from "react";
import Typewriter from "typewriter-effect";
import { motion } from "framer-motion";
export default function App({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoading(true);
    }, 2000);
  }, []);

  return (
    <>
      {!loading ? (
        <div className="flex justify-center items-center h-screen bg-[#F45867]  font-bold text-5xl text-[#FFFFFF]">
          <Typewriter options={{ strings: ["Foodie"], autoStart: true }} />
        </div>
      ) : (
        <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
          <SessionProvider session={pageProps.session}>
            <Component {...pageProps} />
            <Footer />
          </SessionProvider>
        </motion.div>
      )}
    </>
  );
}
