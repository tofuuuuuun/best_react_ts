import { AddButtonProps } from '@/types/types';
import { MdAdd } from 'react-icons/md';

export const AddButton = (props: AddButtonProps) => {
    const { setModalIsOpen, isModalOpen, type } = props;
    const addButtonStyle = type === '/album' ? 'u-txt-green' : 'u-txt-purple';
    return (
        <div className='m-innerContainer'>
            <p className='u-textL1 u-m-bottom-2em'>検索して10作品選ぶことができます。</p>
            <button
                className='m-btn m-btn--add u-m-bottom-1em'
                onClick={() => setModalIsOpen(!isModalOpen)}
            >
                <MdAdd size={48} className={addButtonStyle} />
            </button >
        </div >
    )
}