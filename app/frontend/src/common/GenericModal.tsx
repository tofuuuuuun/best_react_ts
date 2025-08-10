import { GenericModalProps } from "@/types/types";
import { BsXCircleFill } from "react-icons/bs";

export const GenericModal = ({ onClose, children }: GenericModalProps) => {

    return (
        <div className='m-modal__container'>
            <div className='m-modal__body'>
                <div className='m-modal__icon--close' onClick={onClose}>
                    <BsXCircleFill />
                </div>
                <div className='m-modal__content'>
                    {children}
                </div>
            </div>
        </div >
    )
}