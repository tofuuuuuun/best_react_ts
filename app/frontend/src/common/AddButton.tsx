import { AddButtonProps } from '@/types/types';

export const AddButton = (props: AddButtonProps) => {
    const { setModalIsOpen, isModalOpen, type } = props;
    const addButtonStyle = type === '/album' ? 'color-Green' : 'color-Purple';
    const modeType = type === '/album' ? '音楽' : '映画';
    return (
        <div>
            <p className='txt-white textL1 ta-center m-bottom-2em'>あなただけの{modeType}ベスト10を選ぼう！</p>
            <button
                className='l-addButton addButton action m-bottom-1em'
                onClick={() => setModalIsOpen(!isModalOpen)}
            >
                <span className={`icon-add ${addButtonStyle}`}></span>
            </button >
        </div >
    )
}