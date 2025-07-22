import React from 'react';

// タスクアイテムの表示コンポーネント
function TaskItem({ task, onToggleComplete }) {
    // タスクアイテム全体のスタイル
    const itemStyle = {
        padding: '15px',
        borderBottom: '1px solid #ddd',
        marginBottom: '10px',
        cursor: 'pointer',
    };

    // タイトルと詳細のスタイル
    const textStyle = {
        whiteSpace: 'pre-wrap',
        textDecoration: task.completed ? 'line-through' : 'none', // 完了タスクに取り消し線を適用
        color: task.completed ? '#28a745' : '#000',
    };

    return (
        <li style={itemStyle} onClick={() => onToggleComplete(task.id)}>
            <h3 style={textStyle}>{task.title}</h3> {/* タスクのタイトル */}
            <p style={textStyle}>{task.details}</p> {/* タスクの詳細 */}
            <small>作成日時: {task.createdAt}</small>
            <br />
            <small>更新日時: {task.updatedAt}</small>
        </li>
    );
}

export default TaskItem;
