import { FC } from "react";

type FooterProps = {};

const Footer: FC<FooterProps> = ({}) => {
  return (
    <section className="hidden fixed bottom-8 w-full sm:flex flex-row items-center justify-start pl-8 box-border text-center text-base text-white font-inter z-10">
      <div className="flex flex-row items-center justify-start gap-[8px]">
        <div className="relative rounded-[50%] bg-o w-2 h-2 animate-pulse" />
        <p className="relative leading-[16px]">Mainnet</p>
      </div>
    </section>
  );
};

export default Footer;
