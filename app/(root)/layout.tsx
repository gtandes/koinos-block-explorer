import { FC } from "react";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
// import { AuthProvider } from "@/contexts/AuthContext";

type layoutProps = {
  children: React.ReactNode;
};

const layout: FC<layoutProps> = ({ children }) => {
  return (
    // <AuthProvider>
    <main className="min-h-screen overflow-y-auto overflow-x-hidden sm:overflow-hidden h-[100vh]">
      <Navbar />
      <div className="h-20" />
      {children}
      <Footer />

      <div className="absolute z-[1] top-0 right-[45vw] w-[55vw] h-[55vw] bg-[#19F7C1]/80 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000 overflow-hidden" />

      <div className="absolute z-[1] -bottom-[30vh] left-[50%] w-[50vw] h-[50vw] bg-[#e5f523]/80 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000 overflow-hidden" />
    </main>
    // </AuthProvider>
  );
};

export default layout;
