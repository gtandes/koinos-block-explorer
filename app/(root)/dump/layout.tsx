import { FC } from "react";

type layoutProps = {
  children: React.ReactNode;
};

const layout: FC<layoutProps> = ({ children }) => {
  return <main className="min-h-screen">{children}</main>;
};

export default layout;
