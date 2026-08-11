import { Autocomplete } from "@/album/components/Modal/Autocomplete";
import { SearchFormProps } from "@/types/types";
import { BsSearch, BsXCircleFill } from "react-icons/bs";

export const SearchForm = (props: SearchFormProps) => {
	const { inputValue, selectedMode, onSearch, responseArtist, searchAlbum } = props;
	return (
		<div className='c-input__container'>
			<div className='c-input__search'>
				<input
					type='text'
					name='form'
					value={inputValue}
					onChange={(e) => { onSearch(e.target.value) }}
				/>
				<div className='c-input__btn--clear'>
					<BsXCircleFill />
				</div>
				{selectedMode === 'album' && (
					<Autocomplete
						responseArtist={responseArtist}
						searchAlbum={searchAlbum}
					/>
				)}
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