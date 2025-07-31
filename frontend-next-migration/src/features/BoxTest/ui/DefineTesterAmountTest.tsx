import { useDefineTestersAmountMutation } from '@/entities/Box/model/boxApi';
import { ChangeEvent, useEffect, useState } from 'react';
import { BoxErrorMessage } from './BoxErrorMessage';

const DefineTesterAmountTest = () => {
    const [defineTestersAmount, { data, error }] = useDefineTestersAmountMutation();
    const [amountToAdd, setAmountToAdd] = useState('');
    const [amountToRemove, setAmountToRemove] = useState('');
    const handleDefineTestersAmount = () => {
        const args = {
            amountToAdd: Number(amountToAdd),
            amountToRemove: Number(amountToRemove),
        };
        // eslint-disable-next-line no-console
        console.log('Defining testers amount with args:', args);
        defineTestersAmount(args);
    };
    useEffect(() => {
        if (data) {
            // eslint-disable-next-line no-console
            console.log('Testers amount defined successfully:', data);
        } else if (error) {
            console.error('Error defining testers amount:', error);
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
            <h3>Define Testers Amount</h3>
            <input
                type="text"
                value={amountToAdd}
                placeholder="Amount to Add"
                onChange={(elem) => setAmountToAdd(elem.target.value)}
            />
            <input
                type="text"
                value={amountToRemove}
                placeholder="Amount to Remove"
                onChange={(elem) => setAmountToRemove(elem.target.value)}
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
                onClick={() => handleDefineTestersAmount()}
            >
                Define Testers Amount
            </button>
            {error && <BoxErrorMessage error={error} />}
        </div>
    );
};

export { DefineTesterAmountTest };
