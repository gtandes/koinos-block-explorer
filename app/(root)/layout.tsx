import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { FC } from "react";

type layoutProps = {
  children: React.ReactNode;
};

const layout: FC<layoutProps> = ({ children }) => {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="h-20" />
      {children}
      <Footer />
    </main>
  );
};

export default layout;
