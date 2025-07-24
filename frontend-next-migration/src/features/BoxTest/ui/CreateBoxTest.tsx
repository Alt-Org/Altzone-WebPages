import { useCreateBoxMutation } from '@/entities/Box/model/boxApi';
import { BoxErrorResponse } from '@/entities/Box/types/types';
import { useEffect } from 'react';

/**
 * Component to create a testing box.
 * It uses the `useCreateBoxMutation` hook to create a box with predefined parameters.
 */
const CreateBoxTest = () => {
    const [createBox, { data: createdBox, error: createBoxError }] = useCreateBoxMutation();
    const handleCreatingABox = async () => {
        const createBoxArgs = {
            adminPassword: '1617181920',
            playerName: 'LiemNguyen4',
        };
        try {
            await createBox(createBoxArgs).unwrap();
        } catch (error) {
            console.error('create box error', error);
        }
    };
    useEffect(() => {
        if (createdBox) {
            // eslint-disable-next-line no-console
            console.log('Box created successfully:', createdBox);
        } else if (createBoxError) {
            console.error('Error creating box:', createBoxError);
        }
    }, [createBoxError, createdBox]);

    // Extract error message
    let errorMessage: string | undefined;
    if (createBoxError) {
        if (createBoxError && 'data' in createBoxError) {
            // loop through errors and get the messages
            const messages = (createBoxError.data as BoxErrorResponse).errors.map(
                (error) => error.message,
            );
            errorMessage = messages.join(', ');
        } else {
            errorMessage = 'Unknown error';
        }
    }

    return (
        <div>
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
                onClick={handleCreatingABox}
            >
                Create a testing box
            </button>
            {createBoxError && <div>Create box error: {errorMessage}</div>}
        </div>
    );
};

export { CreateBoxTest };
