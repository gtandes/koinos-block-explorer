import Background from "@/components/Background";
import SearchComponent from "@/components/LandingPage/Searchbar";
import Image from "next/image";

export default function page() {
  return (
    <div className="relative flex flex-col items-center justify-center  bg-almost-black w-full h-[100vh] overflow-hidden">
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
