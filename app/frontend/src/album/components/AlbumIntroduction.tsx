import { IntroductionProps } from '@/types/types';

export const AlbumIntroduction = (props: IntroductionProps) => {
    const { selectStart } = props;

    return (
        <div className='l-startText txt-white font-M_PLUS m-bottom-3em fadeIn'>
            <h2 className='textL1 txt-green m-bottom-05em'>あなたの音楽、あなたのベストアルバム</h2>
            <p className='m-bottom-3em'>これまで聴いてきた音楽の中から、あなたにとっての<span className='font-wb'>最高の10枚</span>を選んでみませんか？<br />
                お気に入りのアルバムを選ぶだけで、<span className='font-wb'>あなたの音楽の歴史</span>が一目でわかるリストが完成。<br />
                懐かしい思い出や、あの時の気持ちがよみがえるかもしれません。
            </p>

            <h3 className='textL1 txt-green m-bottom-05em'>あなたの音楽の歴史を振り返る</h3>
            <p className='m-bottom-3em'>シンプルな操作で、迷わず自分のベストをピックアップ。<br />
                アルバムアートが並ぶと、まるで自分だけの<span className='font-wb'>名盤ギャラリー</span>のような仕上がりに。<br />
                「このアルバム、懐かしい！」なんて会話が生まれるかも。
            </p>

            <h3 className='textL1 txt-green m-bottom-05em'>みんなにシェアしよう</h3>
            <p className='m-bottom-2em'>完成したリストは、ワンクリックでシェア！<br />
                「このアルバム超オススメ！」って語り合ったり、<br />
                友達のベスト10と見比べたりするのも楽しいはず。
            </p>
            <div className='ta-center m-bottom-2em'>
                <button className='startButton bg-turquoise txt-white font-wb' onClick={() => selectStart()}>START</button>
            </div>
        </div>
    )
}