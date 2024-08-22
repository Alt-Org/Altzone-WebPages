import ReactModal from 'react-modal';
import {ReactNode} from "react";
import cls from "./Modal.module.scss"

type Props = {
    isOpen : boolean,
    onRequestClose? : () => void;
    shouldCloseOnExternal? : boolean,
    children : ReactNode;
}

ReactModal.setAppElement('#root');

export const Modal = (
    {
        isOpen,
        onRequestClose,
        shouldCloseOnExternal = true,
        children
    }: Props) => {

    return (
        <ReactModal
            overlayClassName={cls.overlayClassName}
            className={cls.contentClassname}
            isOpen={isOpen}
            shouldCloseOnEsc={shouldCloseOnExternal}
            shouldCloseOnOverlayClick={shouldCloseOnExternal}
            onRequestClose={onRequestClose}
            // style={customStyles}
            contentLabel="Example Modal"
        >
            {children}
        </ReactModal>
    )
}
