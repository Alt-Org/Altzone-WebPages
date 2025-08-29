import { useDeleteBoxDailyTaskByIdMutation } from '@/entities/Box/model/boxApi';
import { useEffect, useState } from 'react';
import { BoxErrorMessage } from './BoxErrorMessage';

const DeleteBoxDailyTaskByIdTest = () => {
    const [deleteBoxDailyTaskById, { data, error }] = useDeleteBoxDailyTaskByIdMutation();
    const [taskId, setTaskId] = useState('');
    const handleDeletingBoxById = (taskId: string) => {
        deleteBoxDailyTaskById(taskId);
    };
    useEffect(() => {
        if (data) {
            // eslint-disable-next-line no-console
            console.log('Daily task deleted successfully:', data);
        } else if (error) {
            console.error('Error deleting daily task:', error);
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
            <h3>Delete daily task by id</h3>
            <input
                type="text"
                placeholder="Enter Daily Task ID"
                value={taskId}
                onChange={(elem) => setTaskId(elem.target.value)}
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
                onClick={() => handleDeletingBoxById(taskId)}
            >
                Delete Task
            </button>
            {error && <BoxErrorMessage error={error} />}
        </div>
    );
};

export { DeleteBoxDailyTaskByIdTest };
