import React from "react";
import { useChildren } from "../utils/elements";

interface JoinElementsProps {
  children: React.ReactNode | React.ReactNode[];
  component?: React.ElementType | string;
  itemComponent?: React.ElementType | string;
  separator?: React.ReactNode | string;
  [x:string]: any;
}

const JoinElements : React.FC<JoinElementsProps> = (props) => {
  const children = useChildren(props.children);
  const El = props.component || "span";
  const ElItem = props.itemComponent || "span";
  const ElSeparator = props.separator;
  const { ...rest } = props;

  return (
    <El {...rest}>
      {children && children.map((child, index) => (
        <ElItem key={"join-elements-"+index}>
          {index > 0 && ElSeparator}
          {child}
        </ElItem>
      ))}
    </El>
  );
}

export default JoinElements;
