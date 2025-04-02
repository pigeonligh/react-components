import React from "react";

type Handler = () => void;

interface ModalProps {
  open: boolean;
  handleOpen: Handler;
  handleClose: Handler;
}

type Render = (props: ModalProps) => React.ReactNode;

type PropsGenerator = (props: ModalProps) => Object;

interface ModalWrapperProps {
  view?: Render;
  modal?: Render;
  component?: React.ElementType | string;
  componentProps?: PropsGenerator;
  style?: React.CSSProperties;
  defaultStyle?: boolean;
}

const ModalWrapper: React.FC<ModalWrapperProps> = (props) => {
  const [ open, setOpen ] = React.useState(false);
  const handleOpen = () => { setOpen(true) };
  const handleClose = () => { setOpen(false) };
  const modalProps = { open, handleOpen: handleOpen, handleClose: handleClose };
  const propsGenerator = props.componentProps || ((modelProps) => ({
    open: modelProps.open,
    onOpen: modelProps.handleOpen,
    onClose: modelProps.handleClose,
  }));

  const El = props.component || 'div';

  const defaultStyle = {
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
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
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
