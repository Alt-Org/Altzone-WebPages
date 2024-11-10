import { ReactNode } from 'react';
import ReactModal from 'react-modal';
import cls from './Modal.module.scss';

type Props = {
    isOpen: boolean;
    onRequestClose?: () => void;
    shouldCloseOnExternal?: boolean;
    children: ReactNode;
};

ReactModal.setAppElement('#root');

/**
 * Modal component that uses ReactModal under the hood.
 *
 * @param {Object} props - The properties object.
 * @param {boolean} props.isOpen - Determines if the modal is open or closed.
 * @param {() => void} [props.onRequestClose] - Function to be called when the modal requests to be closed.
 * @param {boolean} [props.shouldCloseOnExternal=true] - Determines if the modal should close when clicking outside of it or pressing the ESC key.
 * @param {ReactNode} props.children - Content to be rendered inside the modal.
 *
 * @example
 * <Modal isOpen={true} onRequestClose={() => console.log('Closed')} shouldCloseOnExternal={true}>
 *   <div>Your content here</div>
 * </Modal>
 */
export const Modal = ({
    isOpen,
    onRequestClose,
    shouldCloseOnExternal = true,
    children,
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
    );
};
