import React from "react";

export type OpenHandler = (event: React.MouseEvent<HTMLElement>) => void;
export type CloseHandler = () => void;

export interface ModalProps {
  anchorEl: HTMLElement | null;
  open: boolean;
  handleOpen: OpenHandler;
  handleClose: CloseHandler;
}

export type Render = (props: ModalProps) => React.ReactNode;

export type PropsGenerator = (props: ModalProps) => Object;

export interface ModalWrapperProps {
  view?: Render;
  modal?: Render;
  component?: React.ElementType | string;
  componentProps?: PropsGenerator;
  style?: React.CSSProperties;

  floating?: boolean;
  defaultStyle?: boolean;
}

const ModalWrapper: React.FC<ModalWrapperProps> = (props) => {
  const [ anchorEl, setAnchorEl ] = React.useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);
  const handleOpen = (event: React.MouseEvent<HTMLElement>) => { setAnchorEl(event.currentTarget) };
  const handleClose = () => { setAnchorEl(null) };

  const modalProps = {
    anchorEl: anchorEl,
    open: open, 
    handleOpen: handleOpen, 
    handleClose: handleClose
  };

  const propsGenerator = props.componentProps || ((modelProps) => ({
    anchorEl: modelProps.anchorEl,
    open: modelProps.open,
    onOpen: modelProps.handleOpen,
    onClose: modelProps.handleClose,
  }));

  const El = props.component || 'div';

  const floatingStyle: React.CSSProperties = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  };

  const defaultStyle: React.CSSProperties = {
    width: '60vw',
    backgroundColor: '#202020',
    border: '2px solid #404040',
    color: 'white',
    padding: '20px',
    boxShadow: '10px 10px 10px rgba(0, 0, 0, 0.5)',
  };

  return (
    <React.Fragment>
      {props.view && props.view(modalProps)}
      <El {...(propsGenerator(modalProps))}>
        <div style={{
          ...(props.floating ? floatingStyle : {}),
          ...(props.defaultStyle ? defaultStyle : {}),
          ...props.style,
        }}>
          {props.modal && props.modal(modalProps)}
        </div>
      </El>
    </React.Fragment>
  );
}

export default ModalWrapper;
