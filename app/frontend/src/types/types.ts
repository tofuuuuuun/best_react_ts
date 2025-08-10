import { ReactNode } from "react";

/**************************************** 
* common types
**************************************** */
export type frontCoverArt = {
    id: string;
    poster_path: string;
}
export type gridArtProps = {
    selectStart: () => void;
    randomURLList1: frontCoverArt[];
    randomURLList2: frontCoverArt[];
    randomURLList3: frontCoverArt[];
    randomURLList4: frontCoverArt[];
    type: string;
}

export type AddButtonProps = {
    isModalOpen: boolean;
    setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    type: string;
}

export type ResetAreaProps = {
    reset: () => void;
    type: string;
}

export type Debounce = (fn: () => void) => void;

export type headerProps = { type: string; }

export type GenericModalProps = {
    onClose: () => void;
    children: ReactNode;
};

export type ModalProps = {
    toggleModal: (toggle: boolean) => void;
    changeType: (typeValue: string) => void
    dataType: string;
    searchArtist: (artistName: string) => void;
    artistName: string;
    inputArtistName: (event: { target: { value: string } }) => void;
    responseArtist: ResponseArtist[];
    searchAlbum: (id: string, name: string) => void;
    filterResponseAlbum: ResponseAlbumType[];
    clearModal: () => void;
    deleteAlbum: (id: string) => void;
    albumArtList: { id: string, albumName: string, albumArt: string, albumArtist: string }[];
    toggleAlbum: (id: string, albumName: string, albumArt: string, albumArtist: string) => void;
    errorMessage: string;
}

export type SearchFormProps = {
    artistName: string;
    movieTitle: string;
    inputArtistName: (event: { target: { value: string } }) => void;
    inputMovieTitle: (event: React.ChangeEvent<HTMLInputElement>) => void;
    searchArtist: (artistName: string) => void;
    responseArtist: ResponseArtist[];
    searchAlbum: (id: string, name: string) => void;
    searchMovie: (title: string) => void;
    clearModal: () => void;
    type: string;
}

export type GenericBestListProps = {
    children: ReactNode;
};

/**************************************** 
* BEST MUSIC types
**************************************** */

export type IntroductionProps = {
    selectStart: () => void;
}

export type ModalAutocompleteProps = {
    responseArtist: ResponseArtist[];
    searchAlbum: (id: string, name: string) => void;
}

export type ResponseArtist = {
    id: string;
    name: string;
    images: { url: string }[];
}

export type SelectTypeProps = {
    dataType: string;
    selectType: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export type ResponseArtistType = {
    id: string;
    images: { url: string }[];
    name: string;
}

export type ResponseAlbumType = {
    album_type: string;
    id: string;
    images: { url: string }[];
    name: string;
    release_date: string;
    type: string;
    artists: { id: string, name: string }[];
}

export type AlbumArtListType = {
    id: string;
    albumName: string;
    albumArt: string;
    albumArtist: string;
}

export type Album = {
    id: string;
    albumArt: string;
    albumName: string;
    albumArtist: string;
}
export type AlbumArtListProps = {
    isSelectStart: boolean;
    albumArtList: Album[];
    deleteAlbum: (id: string) => void;
}

export type CheckboxButtonProps = {
    id: string;
    name: string;
    image: string;
    artists: string;
    toggleDisplayFlg: boolean;
    toggleAlbum: (id: string, name: string, image: string, artists: string) => void;
}

export type ResponseAlbumListProps = {
    toggleAlbum: (id: string, albumName: string, albumArt: string, albumArtist: string) => void;
    filterResponseAlbum: ResponseAlbumType[];
    albumArtList: { id: string, albumName: string, albumArt: string, albumArtist: string }[];
}

/**************************************** 
* BEST MOVIE types
**************************************** */

export type movieModalProps = {
    toggleModal: (toggle: boolean) => void;
    searchMovie: (artistName: string) => void;
    movieTitle: string;
    inputMovieTitle: (event: React.ChangeEvent<HTMLInputElement>) => void;
    responseMovies: MovieType[];
    clearModal: () => void;
    deleteMovie: (id: string) => void;
    moviePosterList: { id: string, title: string, poster_path: string }[];
    toggleMovie: (id: string, original_title: string, poster_path: string) => void;
    errorMessage: string;
}

export type movieSearchFormProps = {
    movieTitle: string;
    inputMovieTitle: (event: React.ChangeEvent<HTMLInputElement>) => void;
    clearModal: () => void;
    searchMovie: (title: string) => void;
}

export type ResponseMoviesType = {
    id: string;
    title: string;
    poster_path: string;
}

export type MovieType = {
    id: string;
    title: string;
    poster_path: string;
}

export type Movie = {
    id: string;
    title: string;
    poster_path: string;
}
export type MoviePosterListProps = {
    moviePosterList: Movie[];
    deleteMovie: (id: string) => void;
}

export type movieCheckboxButtonProps = {
    id: string;
    title: string;
    poster: string;
    toggleDisplayFlg: boolean;
    toggleMovie: (id: string, title: string, poster: string) => void;
}

export type ResponseMoviesProps = {
    toggleMovie: (id: string, title: string, poster: string) => void;
    responseMovies: MovieType[];
    moviePosterList: { id: string, title: string, poster_path: string }[];
}