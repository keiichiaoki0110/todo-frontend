import React from 'react';
import TaskItem from './TaskItem';

function TaskList({ tasks, onDelete, onUpdate, onToggleComplete }) {
    if (!tasks || tasks.length === 0) return <p>タスクがありません。</p>;

    const listStyle = {
        marginTop: '20px',
        listStyle: 'none',
        padding: 0,
    };

    return (
        <ul style={listStyle}>
            {tasks.map((task) => (
                <TaskItem key={task.id} task={task} onDelete={onDelete} onUpdate={onUpdate} onToggleComplete={onToggleComplete} />
            ))}
        </ul>
    );
}

export default TaskList;

