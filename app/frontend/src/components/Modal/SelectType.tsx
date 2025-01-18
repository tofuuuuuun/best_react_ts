import { SelectTypeProps } from '../../types/types.ts';

export const SelectType = (props: SelectTypeProps) => {
    const { type, selectType } = props;
    return (
        <div className='ta-left m-bottom-1em p-top-1em'>
            <form id='type'>
                <input type='radio' name='typeLabel' id='typeAll' value='all' checked={type === 'all'} onChange={selectType} />
                <label htmlFor='typeAll' className='l-subButton bg-gray typeAll m-right-05em'>すべて</label>
                <input type='radio' name='typeLabel' id='typeAlbum' value='album' checked={type === 'album'} onChange={selectType} />
                <label htmlFor='typeAlbum' className='l-subButton bg-gray typeAlbum m-right-05em'>アルバム</label>
                <input type='radio' name='typeLabel' id='typeSingleEP' value='single' checked={type === 'single'} onChange={selectType} />
                <label htmlFor='typeSingleEP' className='l-subButton bg-gray typeSingleEP'>シングルとEP</label>
            </form>
        </div>
    )
}