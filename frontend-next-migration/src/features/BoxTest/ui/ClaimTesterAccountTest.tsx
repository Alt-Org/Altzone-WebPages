import { useLazyClaimTesterAccountQuery } from '@/entities/Box/model/boxApi';
import { useEffect, useState } from 'react';
import { BoxErrorMessage } from './BoxErrorMessage';

const ClaimTesterAccountTest = () => {
    const [triggerClaim, { data, error }] = useLazyClaimTesterAccountQuery();

    const [password, setPassword] = useState('');

    const handleClaimTesterAccount = async (password: string) => {
        // eslint-disable-next-line no-console
        console.log('Claiming tester account with password:', password);
        await triggerClaim(password);
    };
    useEffect(() => {
        if (data) {
            // eslint-disable-next-line no-console
            console.log('Claimed account successfully:', data);
        } else if (error) {
            console.error('Error claiming tester account:', error);
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
            <h3>Claim Tester Account</h3>
            <input
                id="claim-tester-password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(elem) => setPassword(elem.target.value)}
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
                onClick={() => handleClaimTesterAccount(password)}
            >
                Claim tester account
            </button>
            {typeof data !== 'undefined' && <div>Account claimed successfully!</div>}
            {error && <BoxErrorMessage error={error} />}
        </div>
    );
};

export { ClaimTesterAccountTest };
