import { useLazyClaimTesterAccountQuery } from '@/entities/Box/model/boxApi';
import { BoxErrorResponse } from '@/entities/Box/types/types';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { useEffect } from 'react';

const ClaimTesterAccountTest = () => {
    const [triggerClaim, { data, error, isError }] = useLazyClaimTesterAccountQuery();

    useEffect(() => {
        if (data) {
            // eslint-disable-next-line no-console
            console.log('Claimed account successfully:', data);
        } else if (error) {
            console.error('Error claiming tester account:', error);
        }
    }, [error, data]);

    // Extract error message
    let errorMessage: string | undefined;
    if (isError) {
        if (error && 'data' in error) {
            // loop through errors and get the messages
            const messages = (error.data as BoxErrorResponse).errors.map((error) => error.message);
            errorMessage = messages.join(', ');
        } else {
            errorMessage = 'Unknown error';
        }
    }

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
            <h3>Claim Tester Account</h3>
            <input
                id="claim-tester-password"
                type="password"
                placeholder="Enter your password"
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
                onClick={() => {
                    const password = (
                        document.querySelector('#claim-tester-password') as HTMLInputElement
                    ).value;
                    triggerClaim(password);
                }}
            >
                Claim tester account
            </button>
            {typeof data !== 'undefined' && <div>Account claimed successfully!</div>}
            {error && <div>Claim error: {errorMessage}</div>}
        </div>
    );
};

export { ClaimTesterAccountTest };
