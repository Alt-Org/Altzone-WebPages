import { useStartTestingSessionMutation } from '@/entities/Box/model/boxApi';
import { useEffect } from 'react';
import { BoxErrorMessage } from './BoxErrorMessage';

const StartTestingSessionTest = () => {
    const [startTestingSession, { data, error }] = useStartTestingSessionMutation();
    const handleStartTestingSession = () => {
        startTestingSession();
    };
    useEffect(() => {
        if (data) {
            // eslint-disable-next-line no-console
            console.log('testing session started successfully:', data);
        } else if (error) {
            console.error('Error starting testing session:', error);
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
            <h3>Start testing session</h3>
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
                onClick={handleStartTestingSession}
            >
                Start
            </button>
            {error && <BoxErrorMessage error={error} />}
        </div>
    );
};

export { StartTestingSessionTest };
