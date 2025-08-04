import { SelectTypeProps } from '@/types/types';

export const SelectType = (props: SelectTypeProps) => {
    const { dataType, selectType } = props;
    return (
        <div className='u-ta-left u-m-bottom-1em u-p-top-1em'>
            <form id='type'>
                <input type='radio' name='typeLabel' id='typeAll' value='all' checked={dataType === 'all'} onChange={selectType} />
                <label htmlFor='typeAll' className='m-btn__sub u-bg-gray typeAll u-m-right-05em'>すべて</label>
                <input type='radio' name='typeLabel' id='typeAlbum' value='album' checked={dataType === 'album'} onChange={selectType} />
                <label htmlFor='typeAlbum' className='m-btn__sub u-bg-gray typeAlbum u-m-right-05em'>アルバム</label>
                <input type='radio' name='typeLabel' id='typeSingleEP' value='single' checked={dataType === 'single'} onChange={selectType} />
                <label htmlFor='typeSingleEP' className='m-btn__sub u-bg-gray typeSingleEP'>シングルとEP</label>
            </form>
        </div>
    )
}