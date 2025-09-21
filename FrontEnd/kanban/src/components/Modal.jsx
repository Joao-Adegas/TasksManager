import { children } from 'react'
import Modal from 'react-modal'
import "../styles/Modal.scss"

export default function ModalComponent({isOpen,onCLose,children}){

    return(
        <Modal
        appElement={document.getElementById('root')}
        isOpen={isOpen}
        contentLabel="Modal"
        onRequestClose={onCLose}
        className="custom-modal"
        overlayClassName="custom-overlay"
        shouldCloseOnOverlayClick={false}>
            {children}
        </Modal>
    )
}