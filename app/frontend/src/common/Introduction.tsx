import { frontCoverArt, gridArtProps } from '@/types/types';
import { BsArrowRightShort } from "react-icons/bs";

export const Introduction = (props: gridArtProps) => {
    const { selectStart, randomURLList1, randomURLList2, randomURLList3, randomURLList4, type } = props;

    const addButtonStyle = type === '/album' ? 'u-bg-green' : 'u-bg-purple';
    const modeType = type === '/album' ? '音楽' : '映画';

    const renderList = (covers: frontCoverArt[], className: string) => {
        const base_url = type === '/album' ? '' : 'https://image.tmdb.org/t/p/w200/';
        if (!covers || covers.length === 0) {
            return <div className='m-gridPoster--list'>No data available</div>;
        }
        return (
            <ul className={`m-gridPoster--list ${className}`} >
                {
                    covers.map((value, index) => (
                        value ? (
                            <li key={value.id} className=''>
                                <img
                                    className='m-gridPoster--list--img'
                                    src={`${base_url}${value.poster_path}`}
                                    loading={index >= 4 ? "lazy" : "eager"}
                                />
                            </li>
                        ) : ''
                    ))
                }
            </ul >
        )
    };

    return (
        <>
            <div id='introduction' className='m-introduction'>
                <div className='m-gridPoster'>
                    <div className='m-gridPoster--container'>
                        {renderList(randomURLList1, 'e-scroll-infinity--left1 infinity-scroll-left1')}
                        {renderList(randomURLList1, 'e-scroll-infinity--left1 infinity-scroll-left1')}
                    </div>
                    <div className='m-gridPoster--container'>
                        {renderList(randomURLList2, 'e-scroll-infinity--right1 infinity-scroll-right1')}
                        {renderList(randomURLList2, 'e-scroll-infinity--right1 infinity-scroll-right1')}
                    </div>
                    <div className='m-gridPoster--container'>
                        {renderList(randomURLList3, 'e-scroll-infinity--left2 infinity-scroll-left2')}
                        {renderList(randomURLList3, 'e-scroll-infinity--left2 infinity-scroll-left2')}
                    </div>
                    <div className='m-gridPoster--container'>
                        {renderList(randomURLList4, 'e-scroll-infinity--right2 infinity-scroll-right2')}
                        {renderList(randomURLList4, 'e-scroll-infinity--right2 infinity-scroll-right2')}
                    </div>
                </div>
                <div className='m-gridPoster__text'>
                    <h2 className='m-main__text u-m-bottom-1em'>{modeType}の話をしよう。<br />あなたの"ベスト10"は？</h2>
                    <button className={`m-btn m-btn__text--white u-m-both-auto ${addButtonStyle}`} onClick={() => selectStart()}>START <BsArrowRightShort size={24} /></button>
                </div>
            </div >
        </>
    )
}