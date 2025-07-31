import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

const parseErrorMessage = (
    error: FetchBaseQueryError | SerializedError | undefined,
): string | undefined => {
    if (!error) return undefined;

    // FetchBaseQueryError
    if (typeof error === 'object' && error !== null && 'status' in error) {
        return 'error' in error ? error.error : JSON.stringify(error.data);
    }
    // SerializedError
    if (
        typeof error === 'object' &&
        error !== null &&
        'message' in error &&
        typeof (error as any).message === 'string'
    ) {
        return error.message;
    }
    return undefined;
};

const BoxErrorMessage = (props: { error: FetchBaseQueryError | SerializedError | undefined }) => {
    const { error } = props;
    if (!error) return null;
    const errorMessage = parseErrorMessage(error);

    return (
        <div
            style={{
                color: 'red',
                fontSize: '18px',
                backgroundColor: 'black',
                maxWidth: '600px',
                overflowWrap: 'break-word',
            }}
        >
            {errorMessage || 'Unknown error'}
        </div>
    );
};

export { BoxErrorMessage };
