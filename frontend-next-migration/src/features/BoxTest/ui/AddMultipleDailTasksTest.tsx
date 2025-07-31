import { useAddMultipleDailyTasksMutation } from '@/entities/Box/model/boxApi';
import { useEffect } from 'react';
import { BoxErrorMessage } from './BoxErrorMessage';

const AddMultipleDailyTasksTest = () => {
    const [addMultipleDailyTasks, { data, error }] = useAddMultipleDailyTasksMutation();
    const handleAddMultipleDailyTasks = () => {
        const args = ['Test Daily Task 1', 'Test Daily Task 2'];
        addMultipleDailyTasks(args);
    };
    useEffect(() => {
        if (data) {
            // eslint-disable-next-line no-console
            console.log('Daily tasks added successfully:', data);
        } else if (error) {
            console.error('Error adding daily tasks:', error);
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
            <h3>Add Daily Tasks</h3>
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
                onClick={() => handleAddMultipleDailyTasks()}
            >
                Add Daily Tasks
            </button>
            {error && <BoxErrorMessage error={error} />}
        </div>
    );
};

export { AddMultipleDailyTasksTest };
