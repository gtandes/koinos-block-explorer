import type { NextPage } from "next";

const Background: NextPage = () => {
  return (
    <img
      className="absolute top-[0px] left-[0px] w-full h-full opacity-[0.1] z-[-1]"
      alt=""
      src="/bgcolors.svg"
    />
  );
};

export default Background;
