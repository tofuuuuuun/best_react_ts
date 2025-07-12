import { AddButtonProps } from '@/types/types';

export const AddButton = (props: AddButtonProps) => {
    const { setModalIsOpen, isModalOpen, type } = props;
    const addButtonStyle = type === '/album' ? 'color-Green' : 'color-Purple';
    return (
        <div className='innerContent'>
            <p className='txt-white textL1 ta-center m-bottom-2em'>検索して10作品選ぶことができます。</p>
            <button
                className='l-addButton addButton action m-bottom-1em'
                onClick={() => setModalIsOpen(!isModalOpen)}
            >
                <span className={`icon-add ${addButtonStyle}`}></span>
            </button >
        </div >
    )
}