import { useResetBoxMutation } from '@/entities/Box/model/boxApi';
import { useEffect } from 'react';
import { BoxErrorMessage } from './BoxErrorMessage';

const ResetBoxTest = () => {
    const [resetBox, { data: resetBoxData, error: resetBoxError }] = useResetBoxMutation();
    const handleResetBox = async () => {
        try {
            await resetBox().unwrap();
        } catch (error) {
            console.error('reset box error', error);
        }
    };
    useEffect(() => {
        if (resetBoxData) {
            // eslint-disable-next-line no-console
            console.log('Box reset successfully:', resetBoxData);
        } else if (resetBoxError) {
            console.error('Error resetting box:', resetBoxError);
        }
    }, [resetBoxError, resetBoxData]);

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
            <h3>Reset the testing box data</h3>
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
                onClick={() => handleResetBox()}
            >
                Reset
            </button>
            {resetBoxError && <BoxErrorMessage error={resetBoxError} />}
        </div>
    );
};

export { ResetBoxTest };
