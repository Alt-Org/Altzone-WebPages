import { useCreateBoxMutation } from '@/entities/Box/model/boxApi';
import { useEffect, useState } from 'react';
import { BoxErrorMessage } from './BoxErrorMessage';

const CreateBoxTest = () => {
    const [createBox, { data: createdBox, error: createBoxError }] = useCreateBoxMutation();
    const [adminPassword, setAdminPassword] = useState('');
    const [playerName, setPlayerName] = useState('');
    const [clanNames, setClanNames] = useState<string[]>([]);
    const handleCreatingABox = () => {
        const createBoxArgs = {
            adminPassword,
            playerName,
            clanNames,
        };
        // eslint-disable-next-line no-console
        console.log('Creating a box with args:', createBoxArgs);
        createBox(createBoxArgs);
    };
    useEffect(() => {
        if (createdBox) {
            // eslint-disable-next-line no-console
            console.log('Box created successfully:', createdBox);
        } else if (createBoxError) {
            console.error('Error creating box:', createBoxError);
        }
    }, [createBoxError, createdBox]);

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
            <h3>Create a Testing Box</h3>
            <input
                type="text"
                value={adminPassword}
                onChange={(elem) => setAdminPassword(elem.target.value)}
                placeholder="Admin Password"
            />
            <input
                type="text"
                value={playerName}
                onChange={(elem) => setPlayerName(elem.target.value)}
                placeholder="Player Name"
            />
            <input
                type="text"
                value={clanNames}
                onChange={(elem) => setClanNames(elem.target.value.split(','))}
                placeholder="Clan Names (comma separated)"
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
                onClick={() => handleCreatingABox()}
            >
                Create a testing box
            </button>
            {createBoxError && <BoxErrorMessage error={createBoxError} />}
        </div>
    );
};

export { CreateBoxTest };
