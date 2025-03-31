import { Children } from "react";

export const useChildren = (children: React.ReactNode | React.ReactNode[]) => {
  return children && Children.toArray(children).filter(Boolean);
};
