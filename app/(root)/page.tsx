import Background from "@/components/Background";
import SearchComponent from "@/components/LandingPage/Searchbar";
import Image from "next/image";

export default function page() {
  return (
    <div className="relative z-[5] flex flex-col items-center justify-center w-full h-[100vh] overflow-hidden">
      {/* <Background /> */}
      <SearchComponent />
      {/* <Image
        className="absolute top-[39px] left-[32px]"
        alt=""
        src="/o.svg"
        width={19}
        height={18}
      /> */}
    </div>
  );
}
