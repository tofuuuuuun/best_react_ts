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
export type ResetAreaProps = {
    resetAlbumList: () => void;
    handleCapture: () => void;
}
export type IntroductionProps = {
    selectStart: () => void;
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
export type AddButtonProps = {
    isModalOpen: boolean;
    setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export type SelectTypeProps = {
    type: string;
    selectType: (e: React.ChangeEvent<HTMLInputElement>) => void
}
export type ResponseArtist = {
    id: string;
    name: string;
    images: { url: string }[];
}

export type SearchFormProps = {
    artistName: string;
    inputArtistName: (event: { target: { value: string } }) => void;
    clearModal: () => void;
    searchArtist: (artistName: string) => void;
    responseArtist: ResponseArtist[];
    searchAlbum: (id: string, name: string) => void;
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

export type ModalProps = {
    toggleModal: (toggle: boolean) => void;
    changeType: (typeValue: string) => void
    type: string;
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


export type ModalAutocompleteProps = {
    responseArtist: ResponseArtist[];
    searchAlbum: (id: string, name: string) => void;
}
