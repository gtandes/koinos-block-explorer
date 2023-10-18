import type { NextPage } from "next";
import Image from "next/image";

const Background: NextPage = () => {
  return (
    <Image
      className="absolute top-[0px] left-[0px] w-full h-full opacity-[0.1] z-[-1]"
      alt=""
      src="/bgcolors.svg"
      width={10}
      height={10}
    />
  );
};

export default Background;
