import { GenericModal } from '@/common/GenericModal';
import { SearchForm } from '@/common/SearchForm';

import type { renewModalProsp } from '@/types/types';

export const Modal = (props: renewModalProsp) => {
	const { toggleModal, inputValue, selectedMode, onSearch } = props;

	// const selectType = (event: { target: { value: string; }; }) => changeType(event.target.value);
	const onClose = () => toggleModal(false, undefined);
	// const MAX_ALBUM = 10;
	return (
		<GenericModal onClose={onClose}>
			<SearchForm
				inputValue={inputValue}
				selectedMode={selectedMode}
				onSearch={onSearch}
			/>
			{/* <div className='u-txt-white'><p>あと{MAX_ALBUM - albumArtList.length}作品選べます</p></div> */}
			{/* <ErrorMessage errorMessage={errorMessage} /> */}
			{/* {filterResponseAlbum.length !== 0 && (
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
            )} */}
		</GenericModal>
	)
}