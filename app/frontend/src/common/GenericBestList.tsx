import { GenericBestListProps } from '@/types/types';

export const GenericBestList = ({ children }: GenericBestListProps) => {
    return (
        <>
            <div className='m-bestList__container'>
                <div className='u-ta-center u-m-bottom-2em u-p-top-1em'>
                    <input type='text' placeholder='このリストに名前をつけよう' className='m-bestList__input'></input>
                </div>
                <ul className='m-bestList__list' id='target'>
                    {children}
                </ul>
            </div>
        </>
    )
}