import React, { useState } from 'react';

function TaskItem({ task = {}, onDelete, onUpdate, onToggleComplete }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(task.title || '');
    const [editedDetails, setEditedDetails] = useState(task.details || '');

    const handleSave = () => {
        onUpdate(task.id, editedTitle, editedDetails);
        setIsEditing(false);
    };

    const itemStyle = {
        padding: '15px',
        borderBottom: '1px solid #ddd',
        marginBottom: '10px',
    };

    const textStyle = {
        whiteSpace: 'pre-wrap',
        textDecoration: task.completed ? 'line-through' : 'none',
        color: task.completed ? '#28a745' : '#000',
    };

    const inputStyle = {
        padding: '10px',
        fontSize: '16px',
        width: '100%',
        boxSizing: 'border-box',
        marginBottom: '10px',
    };

    const buttonStyle = {
        padding: '5px 10px',
        fontSize: '14px',
        backgroundColor: '#28a745',
        color: '#fff',
        border: 'none',
        cursor: 'pointer',
        marginRight: '5px',
    };

    const editButtonStyle = {
        ...buttonStyle,
        backgroundColor: '#007bff',
    };

    const deleteButtonStyle = {
        ...buttonStyle,
        backgroundColor: '#dc3545',
    };

    if (!task || !task.id) return null;

    return (
        <li style={itemStyle}>
            {isEditing ? (
                <>
                    <input
                        type="text"
                        value={editedTitle}
                        onChange={(e) => setEditedTitle(e.target.value)}
                        style={inputStyle}
                    />
                    <textarea
                        value={editedDetails}
                        onChange={(e) => setEditedDetails(e.target.value)}
                        style={{ ...inputStyle, height: '80px' }}
                    />
                    <button onClick={handleSave} style={buttonStyle}>
                        保存
                    </button>
                </>
            ) : (
                <>
                    <h3 style={textStyle} onClick={() => onToggleComplete(task.id)}>
                        {task.title}
                    </h3>
                    <p style={textStyle} onClick={() => onToggleComplete(task.id)}>
                        {task.details}
                    </p>
                    <small>作成日時: {task.createdAt}</small>
                    <br />
                    <small>更新日時: {task.updatedAt}</small>
                    <br />
                    <button onClick={() => setIsEditing(true)} style={editButtonStyle}>
                        編集
                    </button>
                    <button onClick={() => onDelete(task.id)} style={deleteButtonStyle}>
                        削除
                    </button>
                </>
            )}
        </li>
    );
}

export default TaskItem;
