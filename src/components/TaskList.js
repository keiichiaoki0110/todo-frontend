import React from 'react';
import TaskItem from './TaskItem';

function TaskList({ tasks, onToggleComplete }) {
    return (
        <ul style={{ marginTop: '20px', listStyle: 'none', padding: 0 }}>
            {tasks.map((task, index) => {
                console.log('task:', task); // ← ここで確認
                return (
                    <TaskItem
                        key={task?.id || index}
                        task={task}
                        onToggleComplete={onToggleComplete}
                    />
                );
            })}
        </ul>
    );
}

export default TaskList;
