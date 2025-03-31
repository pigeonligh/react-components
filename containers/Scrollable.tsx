import React, { useEffect, useRef } from "react";
import { useChildren } from '../utils/elements';

import styles from './Scrollable.module.css';

interface ScrollController {
  scrollTo: (position: number, smooth: boolean) => void;
  scrollBy: (delta: number, smooth: boolean) => void;
}

interface ScrollableProps {
  children: React.ReactNode | React.ReactNode[];
  height?: string;
  placeholder?: React.ReactNode;
  placeholderHeight?: string;
  onScroll?: (event: React.UIEvent<HTMLDivElement>, position: number) => void;
  setupControl?: (control: ScrollController | null) => void;
  disableScroll?: boolean;
}

const usePlaceholder = (placeholder: React.ReactNode, placeholderHeight?: string) => {
  if (placeholder) {
    return placeholder;
  }
  if (placeholderHeight) {
    return <div style={{ height: placeholderHeight, width: '100%' }} />;
  }
  return null;
}

const Scrollable: React.FC<ScrollableProps> = (props) => {
  const children = useChildren(props.children);
  const height = props.height || "100%";
  const placeholder = usePlaceholder(props.placeholder, props.placeholderHeight);
  const disable = props.disableScroll || false;

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    if (disable) {
      return;
    }
    if (props.onScroll) {
      props.onScroll(event, event.currentTarget.scrollTop);
    }
  }

  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (props.setupControl) {
      const setup = props.setupControl;
      const control: ScrollController = {
        scrollTo: (position: number, smooth: boolean) => {
          if (ref && ref.current) {
            ref.current.scrollTo({ top: position, behavior: smooth ? 'smooth' : 'instant' });
          }
        },
        scrollBy: (delta: number, smooth: boolean) => {
          if (ref && ref.current) {
            ref.current.scrollBy({ top: delta, behavior: smooth ? 'smooth' : 'instant' });
          }
        }
      };
      setup(control);

      return () => { setup(null); }
    }
  }, [ ref, props.setupControl ]);

  return (
    <div
      ref={ref}
      className={styles.scrollable}
      style={{ height, overflowY: disable ? 'hidden' : 'scroll' }}
      onScroll={handleScroll}
    >
      {children}
      {placeholder}
    </div>
  );
}

export default Scrollable;
