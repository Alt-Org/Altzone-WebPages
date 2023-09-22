import ReactModal from 'react-modal';
import {ReactNode} from "react";
import cls from "./Modal.module.scss"

type Props = {
    isOpen : boolean,
    onRequestClose : () => void;
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


// const customStyles = {
//     content: {
//         display: "flex",
//         // backgroundColor: "rgba(245, 40, 145, 0)",
//         backgroundColor: "brown",
//         top: '50%',
//         left: '50%',
//         right: 'auto',
//         bottom: 'auto',
//         marginRight: '-50%',
//         padding: 0,
//         border: "none",
//         transform: 'translate(-50%, -50%)',
//     },
// };

