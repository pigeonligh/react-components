import { Children } from "react";

function JoinElements({ children, separator }) {
  const childrenElements = children && Children.toArray(children).filter(Boolean);
  const separatorElement = separator || (<span>&nbsp;&nbsp;</span>);

  return (
    <span>
      {childrenElements && childrenElements.map((child, index) => (
        <span key={"join-elements-"+index}>
          {index > 0 && separatorElement}
          {child}
        </span>
      ))}
    </span>
  );
}

export default JoinElements;
