import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const Modal = ({ children, open, className = "", onClose }) => {
  //open dialog programatically
  const dialog = useRef();

  useEffect(() => {
    //locking the value so the same value will be used in the clean up function below
    const modal = dialog.current;

    if (open) {
      modal.showModal();
    }

    return () => modal.close();
  }, [open]);

  //inject dialog in a specific space in the DOM (id="modal")
  //params: the component to be open
  //params: element selected in the DOM (where the component will be)
  return createPortal(
    <dialog ref={dialog} className={`modal ${className}`} onClose={onClose}>
      {children}
    </dialog>,
    document.getElementById("modal")
  );
};

export default Modal;
