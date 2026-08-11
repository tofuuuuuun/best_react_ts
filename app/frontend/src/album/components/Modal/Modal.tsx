import { ResponseAlbumList } from '@/album/components/Modal/ResponseAlbumList';
import { SelectType } from '@/album/components/Modal/SelectType';
import { GenericModal } from '@/common/GenericModal';
import { SearchForm } from '@/common/SearchForm';
import { ErrorMessage } from '@/error/ErrorMessage';

import type { renewModalProsp } from '@/types/types';

export const Modal = (props: renewModalProsp) => {
	const { toggleModal, inputValue, selectedMode, responseArtist, searchAlbum, onSearch, errorMessage, filterResponseAlbum, toggleItems, albumArtList, dataType, changeType } = props;

	const selectType = (event: { target: { value: string; }; }) => changeType(event.target.value);
	const onClose = () => toggleModal(false, undefined);
	// const MAX_ALBUM = 10;
	return (
		<GenericModal onClose={onClose}>
			<SearchForm
				inputValue={inputValue}
				selectedMode={selectedMode}
				responseArtist={responseArtist}
				onSearch={onSearch}
				searchAlbum={searchAlbum}
			/>
			{/* <div className='u-txt-white'><p>あと{MAX_ALBUM - albumArtList.length}作品選べます</p></div> */}
			<ErrorMessage errorMessage={errorMessage} />
			{filterResponseAlbum.length !== 0 && (
				<div>
					<SelectType
						dataType={dataType}
						selectType={selectType}
					/>
					<ResponseAlbumList
						toggleItems={toggleItems}
						filterResponseAlbum={filterResponseAlbum}
						albumArtList={albumArtList}
					/>
				</div>
			)}
		</GenericModal>
	)
}