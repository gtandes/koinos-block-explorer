import { FC } from "react";

type FooterProps = {};

const Footer: FC<FooterProps> = ({}) => {
  return (
    <section className="w-full h-8 flex flex-row items-center justify-start pl-8 pb-12 box-border text-center text-base text-white font-inter bg-almost-black">
      <div className="flex flex-row items-center justify-start gap-[8px]">
        <div className="relative rounded-[50%] bg-o w-2 h-2 animate-pulse" />
        <p className="relative leading-[16px]">Mainnet</p>
      </div>
    </section>
  );
};

export default Footer;
