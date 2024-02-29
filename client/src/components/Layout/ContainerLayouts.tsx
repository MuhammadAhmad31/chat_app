import { FC } from "react";
import { Toaster } from "@/components/ui/toaster";

type Props = {
  children: React.ReactNode;
};

export const ContainerLayouts: FC<Props> = ({ children }) => {
  return (
    <div className="w-full">
      <div className="w-full p-12">{children}</div>
      <Toaster />
    </div>
  );
};
