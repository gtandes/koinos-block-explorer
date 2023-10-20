import Background from "@/components/Background";
import SearchComponent from "@/components/SearchPage/Searchbar";
import Image from "next/image";

export default function page() {
  return (
    <div className="relative z-[5] flex flex-col items-center justify-center w-full h-[100vh] overflow-hidden">
      <SearchComponent />
    </div>
  );
}
