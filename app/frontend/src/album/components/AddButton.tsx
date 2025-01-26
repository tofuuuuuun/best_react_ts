import { AddButtonProps } from '/types/types';

export const AddButton = (props: AddButtonProps) => {
    const { setModalIsOpen, isModalOpen } = props;
    return (
        <div className='albumAddButton'>
            <button className='l-albumArt albumAddButton addButton action' onClick={() => setModalIsOpen(!isModalOpen)}>
                <span className='icon-add'></span>
            </button>
        </div>
    )
}