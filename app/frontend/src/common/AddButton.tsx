import { AddButtonProps } from '@/types/types';

export const AddButton = (props: AddButtonProps) => {
    const { setModalIsOpen, isModalOpen, type } = props;
    const addButtonStyle = type === 'album' ? 'color-Green' : 'color-Purple';
    return (
        <div className='albumAddButton'>
            <button className='l-albumArt albumAddButton addButton action' onClick={() => setModalIsOpen(!isModalOpen)}>
                <span className={`icon-add ${addButtonStyle}`}></span>
            </button >
        </div >
    )
}