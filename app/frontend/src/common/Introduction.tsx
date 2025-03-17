import { frontCoverArt, gridArtProps } from '@/types/types';

export const Introduction = (props: gridArtProps) => {
    const { selectStart, randomURLList1, randomURLList2, randomURLList3, randomURLList4, type } = props;

    const addButtonStyle = type === '/album' ? 'color-Green' : 'color-Purple';
    const modeType = type === '/album' ? '音楽' : '映画';

    const renderList = (covers: frontCoverArt[], className: string) => {
        const base_url = type === '/album' ? '' : 'https://image.tmdb.org/t/p/w500/';
        return (
            <ul className={`l-gridPoster ${className}`} >
                {
                    covers.map((value, index) => (
                        value ? <li key={index} className='topRateItem'><img className='l-topRateMovies' src={`${base_url}${value}`} /></li> : ''
                    ))
                }
            </ul >
        )
    };

    return (
        <>
            <div id='introduction' className='l-introductionWrapper l-overflowHidden startText ta-center fadeIn'>
                <div className='l-gridPosterWrapper'>
                    <div className='girdPosterBlockWrapper m-right-1em'>
                        {renderList(randomURLList1, 'scroll-infinity__list--left1 infinity-scroll-left1')}
                        {renderList(randomURLList1, 'scroll-infinity__list--left1 infinity-scroll-left1')}
                    </div>
                    <div className='girdPosterBlockWrapper m-right-1em'>
                        {renderList(randomURLList2, 'scroll-infinity__list--right1 infinity-scroll-right1')}
                        {renderList(randomURLList2, 'scroll-infinity__list--right1 infinity-scroll-right1')}
                    </div>
                    <div className='girdPosterBlockWrapper m-right-1em'>
                        {renderList(randomURLList3, 'scroll-infinity__list--left2 infinity-scroll-left2')}
                        {renderList(randomURLList3, 'scroll-infinity__list--left2 infinity-scroll-left2')}
                    </div>
                    <div className='girdPosterBlockWrapper'>
                        {renderList(randomURLList4, 'scroll-infinity__list--right2 infinity-scroll-right2')}
                        {renderList(randomURLList4, 'scroll-infinity__list--right2 infinity-scroll-right2')}
                    </div>
                </div>
                <div className='l-introductionText txt-white font-wb ta-left'>
                    <h1 className='topText m-bottom-1em'>{modeType}の話をしよう。<br />あなたの"ベスト10"は？</h1>
                    <div className='l-startButtonWrapper ta-center'>
                        <button className={`startButton ${addButtonStyle} bg-turquoise txt-white font-wb`} onClick={() => selectStart()}>START</button>
                    </div>
                </div>
            </div >
        </>
    )
}