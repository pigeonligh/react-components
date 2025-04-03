import React from "react";
import { useChildren } from "../utils/elements";

export interface AlignProps {
  children: React.ReactNode | React.ReactNode[];
  width?: string;
  height?: string;
  vertical?: 'top' | 'center' | 'bottom' | boolean;
  horizontal?: 'left' | 'center' | 'right' | boolean;
  style?: React.CSSProperties;
  [x:string]: any;
}

export const useVerticalStyle = (vertical?: 'top' | 'center' | 'bottom' | boolean) => {
  const value = vertical === true ? 'center' : vertical;
  const ret: React.CSSProperties = {};
  switch (value) {
    case 'top':
      ret.marginTop = '0';
      ret.marginBottom = 'auto';
      ret.height = 'fit-content';
      break;

    case 'center':
      ret.marginTop = 'auto';
      ret.marginBottom = 'auto';
      ret.height = 'fit-content';
      break;
    
    case 'bottom':
      ret.marginTop = 'auto';
      ret.marginBottom = '0';
      ret.height = 'fit-content';
      break;

    default:
      ret.marginTop = '0';
      ret.marginBottom = '0';
      ret.height = '100%';
  }
  return ret;
}

export const useHorizontalStyle = (horizontal?: 'left' | 'center' | 'right' | boolean) => {
  const value = horizontal === true ? 'center' : horizontal;
  const ret: React.CSSProperties = {};
  switch (value) {
    case 'left':
      ret.marginLeft = '0';
      ret.marginRight = 'auto';
      ret.width = 'fit-content';
      break;

    case 'center':
      ret.marginLeft = 'auto';
      ret.marginRight = 'auto';
      ret.width = 'fit-content';
      break;
    
    case 'right':
      ret.marginLeft = 'auto';
      ret.marginRight = '0';
      ret.width = 'fit-content';
      break;

    default:
      ret.marginLeft = '0';
      ret.marginRight = '0';
      ret.width = '100%';
  }
  return ret;
}

const useRest = (props: AlignProps) => {
  const { children, width, height, vertical, horizontal, style, ...rest } = props;
  return rest;
}

const Align: React.FC<AlignProps> = (props) => {
  const children = useChildren(props.children);
  const rest = useRest(props);

  const parentStyle: React.CSSProperties = {
    display: 'flex',
    width: props.width || '100%',
    height: props.height || '100%',
    ...props.style
  };

  const childStyle: React.CSSProperties = {
    ...useVerticalStyle(props.vertical),
    ...useHorizontalStyle(props.horizontal)
  };

  return (
    <div style={parentStyle} {...rest}>
      <div style={childStyle}>
        {children}
      </div>
    </div>
  );
}

export default Align;
