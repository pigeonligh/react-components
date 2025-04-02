import React from 'react';
import { useChildren } from '../utils/elements';

interface UnselectableProps {
  children: React.ReactNode | React.ReactNode[];
  component?: React.ElementType | string;
  ignore?: boolean;
  style?: React.CSSProperties;
  [x:string]: any;
}

const useRest = (props: UnselectableProps) => {
  const { children, component, style, ...rest } = props;
  return rest;
}

const unselectableStyle = {
  WebkitTouchCallout: 'none',
  WebkitUserSelect: 'none',
  KhtmlUserSelect: 'none',
  MozUserSelect: 'none',
  msUserSelect: 'none',
  userSelect: 'none',
}

const Unselectable: React.FC<UnselectableProps> = (props) => {
  const children = useChildren(props.children);
  const El = props.component || 'span';
  const rest = useRest(props);

  return (
    <El {...rest} style={{
      ...(props.ignore ? {} : unselectableStyle),
      ...props.style,
    }}>
      {children}
    </El>
  );
}

export default Unselectable;
