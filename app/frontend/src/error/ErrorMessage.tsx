type ErrorMessageProps = {
    errorMessage: string;
}

export const ErrorMessage = (props: ErrorMessageProps) => {
    const { errorMessage } = props;
    return (
        <>
            {errorMessage && <div className='errorMessage'>{errorMessage}</div>}
        </>
    )
}