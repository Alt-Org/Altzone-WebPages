import { useDeleteBoxByIdMutation } from '@/entities/Box/model/boxApi';
import { useEffect, useState } from 'react';
import { BoxErrorMessage } from './BoxErrorMessage';

const DeleteBoxByIdTest = () => {
    const [deleteBoxById, { data, error }] = useDeleteBoxByIdMutation();
    const [boxId, setBoxId] = useState('');
    const handleDeletingBoxById = (boxId: string) => {
        deleteBoxById(boxId);
    };
    useEffect(() => {
        if (data) {
            // eslint-disable-next-line no-console
            console.log('Box deleted successfully:', data);
        } else if (error) {
            console.error('Error deleting box:', error);
        }
    }, [error, data]);

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
            <h3>Delete box by id</h3>
            <input
                type="text"
                placeholder="Enter Box ID"
                value={boxId}
                onChange={(elem) => setBoxId(elem.target.value)}
            />
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
                onClick={() => handleDeletingBoxById(boxId)}
            >
                Delete Box
            </button>
            {error && <BoxErrorMessage error={error} />}
        </div>
    );
};

export { DeleteBoxByIdTest };
