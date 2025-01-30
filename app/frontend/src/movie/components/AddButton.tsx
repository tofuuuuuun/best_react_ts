import { AddButtonProps } from '@/types/types';

export const AddButton = (props: AddButtonProps) => {
    const { setModalIsOpen, isModalOpen } = props;
    return (
        <>
            <div className='l-addButtonWrapper p-top-3em'>
                <div><p className='textXL1 txt-white font-wb ta-center'>あなただけの10作品を選ぼう！</p></div>
                <div className='movieAddButton fadeIn'>
                    <button className='l-movieAddPoster movieAddButton addButton action' onClick={() => setModalIsOpen(!isModalOpen)}>
                        <span className='icon-add'></span>
                    </button>
                </div>
            </div>
        </>
    )
}