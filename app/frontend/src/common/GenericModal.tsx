import { GenericModalProps } from "@/types/types";
import { BsXCircleFill } from "react-icons/bs";

export const GenericModal = ({ onClose, children }: GenericModalProps) => {

    return (
        <div className='c-modal__container'>
            <div className='c-modal__body'>
                <div className='c-modal__icon--close' onClick={onClose}>
                    <BsXCircleFill />
                </div>
                <div className='c-modal__content'>
                    {children}
                </div>
            </div>
        </div >
    )
}