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

      <div className="absolute z-[1] top-0 right-[45vw] w-[55vw] h-[55vw] bg-[#19F7C1]/80 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />

      <div className="absolute z-[1] -bottom-[30vh] left-[50%] w-[50vw] h-[50vw] bg-[#e5f523]/80 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />

      {/* <div className="absolute -bottom-[20rem] backdrop:blur-3xl">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="764"
          height="831"
          viewBox="0 0 764 831"
          fill="none"
        >
          <path
            d="M761.64 501.165C761.64 750.056 796.318 1032 547.018 1032C297.718 1032 -101 488.094 -101 239.204C-101 -9.68722 166.176 0.0512953 415.476 0.0512953C664.776 0.0512953 761.64 252.274 761.64 501.165Z"
            fill="#19F7C1"
          />
        </svg>
      </div> */}

      {/* <section className="h-screen flex items-center justify-center">
        <div className="container">
          <div className="relative">
            <img src="./src/strange-liquid.jpg" alt="Strange liquid" />
          </div>
        </div>
      </section> */}
    </main>
  );
};

export default layout;
