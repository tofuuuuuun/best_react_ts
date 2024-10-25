type CheckboxButtonTypes = {
    id: string;
    name: string;
    image: string;
    artists: string;
}

export const CheckboxButton = (props: CheckboxButtonTypes) => {
    const { id, name, image, artists } = props;
    return (
        <>
            <label htmlFor={id} className={isCheckedToggle(id) ? 'l-button bg-orange txt-white action ta-center' : 'l-button bg-turquoise txt-white action ta-center'}>
                <input type='checkbox'
                    id={id}
                    className={isCheckedToggle(id) ? 'selected' : 'select'}
                    checked={checkboxes.some((value) => value.id === album.id)}
                    onChange={() => handleCheckboxChange(id, name, image, artists)}
                />{isCheckedToggle(id) ? '選択中' : '選択'}
            </label>
        </>
    )
}