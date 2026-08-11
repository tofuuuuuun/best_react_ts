import { BsSearch, BsXCircleFill } from "react-icons/bs";

export const SearchForm = (props: { inputValue: string, selectedMode: string, onSearch: (value: string) => void }) => {
	const { inputValue, selectedMode, onSearch } = props;
	return (
		<div className='c-form__container'>
			<div className='c-form__search'>
				<input
					type='text'
					name='form'
					value={inputValue}
					onChange={(e) => { onSearch(e.target.value) }}
				/>
				<div className='c-form__btn--clear'>
					<BsXCircleFill />
				</div>
				{/* {selectedMode === 'album' && (
					<Autocomplete
						responseArtist={responseArtist}
						searchAlbum={searchAlbum}
					/>
				)} */}
			</div>
			<div className='u-p-left-1em'>
				<button
					className={`c-btn u-txt-white ${selectedMode === 'album' ? 'u-bg-green' : 'u-bg-purple'}`}
					onClick={() => onSearch(inputValue)}
				>
					<BsSearch />
				</button>
			</div>
		</div >
	)
}