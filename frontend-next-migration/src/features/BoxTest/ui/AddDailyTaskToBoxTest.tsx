import { useAddDailyTaskToBoxMutation } from '@/entities/Box/model/boxApi';
import { useEffect, useState } from 'react';
import { BoxErrorMessage } from './BoxErrorMessage';
import { title } from 'process';

const AddDailyTaskToBoxTest = () => {
    const [addDailyTaskToBox, { data, error }] = useAddDailyTaskToBoxMutation();
    const [type, setType] = useState('');
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState('');
    const [points, setPoints] = useState('');
    const [coins, setCoins] = useState('');
    const [timeLimitMinutes, setTimeLimitMinutes] = useState('');
    const handleAddDailyTaskToBox = () => {
        const args = {
            type,
            title,
            amount: Number(amount),
            points: Number(points),
            coins: Number(coins),
            timeLimitMinutes: Number(timeLimitMinutes),
        };
        // eslint-disable-next-line no-console
        console.log('Adding daily task with args:', args);
        addDailyTaskToBox(args);
    };
    useEffect(() => {
        if (data) {
            // eslint-disable-next-line no-console
            console.log('Daily task added successfully:', data);
        } else if (error) {
            console.error('Error adding daily task:', error);
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
            <h3>Add Daily Task To Box</h3>
            <input
                type="text"
                value={type}
                placeholder="Type"
                onChange={(elem) => setType(elem.target.value)}
            />
            <input
                type="text"
                value={title}
                placeholder="Title"
                onChange={(elem) => setTitle(elem.target.value)}
            />
            <input
                type="text"
                value={amount}
                placeholder="Amount"
                onChange={(elem) => setAmount(elem.target.value)}
            />
            <input
                type="text"
                value={points}
                placeholder="Points"
                onChange={(elem) => setPoints(elem.target.value)}
            />
            <input
                type="text"
                value={coins}
                placeholder="Coins"
                onChange={(elem) => setCoins(elem.target.value)}
            />
            <input
                type="text"
                value={timeLimitMinutes}
                placeholder="Time Limit (Minutes)"
                onChange={(elem) => setTimeLimitMinutes(elem.target.value)}
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
                onClick={() => handleAddDailyTaskToBox()}
            >
                Add Daily Task
            </button>
            {error && <BoxErrorMessage error={error} />}
        </div>
    );
};

export { AddDailyTaskToBoxTest };
