import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { FC } from "react";

type layoutProps = {
  children: React.ReactNode;
};

const layout: FC<layoutProps> = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default layout;
