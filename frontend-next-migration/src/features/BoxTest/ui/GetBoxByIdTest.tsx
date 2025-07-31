import { useLazyGetBoxByIdQuery } from '@/entities/Box/model/boxApi';
import { useEffect, useState } from 'react';
import { BoxErrorMessage } from './BoxErrorMessage';

const GetBoxByIdTest = () => {
    const [triggerGetBoxById, { data, error }] = useLazyGetBoxByIdQuery();

    const [id, setId] = useState('');

    const handleGetBoxById = async (id: string) => {
        // eslint-disable-next-line no-console
        console.log('Get box by id:', id);
        await triggerGetBoxById(id);
    };
    useEffect(() => {
        if (data) {
            // eslint-disable-next-line no-console
            console.log('Get box by id successfully:', data);
        } else if (error) {
            console.error('Error getting box:', error);
        }
    }, [data]);

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
            <h3>Get box by id</h3>
            <input
                type="text"
                placeholder="Enter box id"
                value={id}
                onChange={(elem) => setId(elem.target.value)}
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
                onClick={() => handleGetBoxById(id)}
            >
                Get box
            </button>
            {typeof data !== 'undefined' && <div>Get box successfully!</div>}
            {error && <BoxErrorMessage error={error} />}
        </div>
    );
};

export { GetBoxByIdTest };
