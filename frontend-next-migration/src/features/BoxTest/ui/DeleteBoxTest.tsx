import { useDeleteBoxMutation } from '@/entities/Box/model/boxApi';
import { BoxErrorResponse } from '@/entities/Box/types/types';
import { useEffect } from 'react';
import { BoxErrorMessage } from './BoxErrorMessage';

const DeleteBoxTest = () => {
    const [deleteBox, { data: deletedBox, error: deleteBoxError }] = useDeleteBoxMutation();
    const handleDeletingABox = async () => {
        try {
            await deleteBox().unwrap();
        } catch (error) {
            console.error('delete box error', error);
        }
    };
    useEffect(() => {
        if (deletedBox) {
            // eslint-disable-next-line no-console
            console.log('Box deleted successfully:', deletedBox);
        } else if (deleteBoxError) {
            console.error('Error deleting box:', deleteBoxError);
        }
    }, [deleteBoxError, deletedBox]);

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px',
            }}
        >
            <h3>Delete data associated with a logged-in user</h3>
            <button
                style={{
                    border: '1px solid white',
                    backgroundColor: 'black',
                    padding: '10px 20px',
                    cursor: 'pointer',
                    color: 'white',
                    fontSize: '16px',
                    textAlign: 'center',
                    borderRadius: '5px',
                    margin: '10px 0',
                }}
                onClick={handleDeletingABox}
            >
                Delete Box
            </button>
            {deleteBoxError && <BoxErrorMessage error={deleteBoxError} />}
        </div>
    );
};

export { DeleteBoxTest };
