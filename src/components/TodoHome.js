import React, { useState, useEffect } from 'react';
import apiClient from '../api/client';

// TaskFilterコンポーネント
const TaskFilter = ({ filter, setFilter }) => {
    const filterStyle = {
        display: 'flex',
        justifyContent: 'center',
        gap: '10px',
        margin: '20px 0'
    };

    const buttonStyle = {
        padding: '8px 16px',
        fontSize: '14px',
        border: '1px solid #ccc',
        backgroundColor: '#f8f9fa',
        cursor: 'pointer',
        borderRadius: '4px'
    };

    const activeButtonStyle = {
        ...buttonStyle,
        backgroundColor: '#007bff',
        color: '#fff',
        border: '1px solid #007bff'
    };

    return (
        <div style={filterStyle}>
            <button
                style={filter === 'all' ? activeButtonStyle : buttonStyle}
                onClick={() => setFilter('all')}
            >
                全て
            </button>
            <button
                style={filter === 'completed' ? activeButtonStyle : buttonStyle}
                onClick={() => setFilter('completed')}
            >
                完了
            </button>
            <button
                style={filter === 'incomplete' ? activeButtonStyle : buttonStyle}
                onClick={() => setFilter('incomplete')}
            >
                未完了
            </button>
        </div>
    );
};

// TaskItemコンポーネント
const TaskItem = ({ task, onToggleComplete, onDelete, onUpdate }) => {
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
                    <button onClick={() => setIsEditing(false)} style={deleteButtonStyle}>
                        キャンセル
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
                    <small>作成日時: {new Date(task.createdAt).toLocaleString()}</small>
                    <br />
                    <small>更新日時: {new Date(task.updatedAt).toLocaleString()}</small>
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
};

// TaskListコンポーネント
const TaskList = ({ tasks, onToggleComplete, onDelete, onUpdate }) => {
    const listStyle = {
        listStyleType: 'none',
        padding: '0',
        margin: '20px 0'
    };

    if (tasks.length === 0) {
        return <p style={{ textAlign: 'center', color: '#666', fontStyle: 'italic' }}>タスクがありません</p>;
    }

    return (
        <ul style={listStyle}>
            {tasks.map(task => (
                <TaskItem
                    key={task.id}
                    task={task}
                    onToggleComplete={onToggleComplete}
                    onDelete={onDelete}
                    onUpdate={onUpdate}
                />
            ))}
        </ul>
    );
};

// メインのTodoHomeコンポーネント
const TodoHome = ({ currentUser, handleLogout }) => {
    // タスクリストの状態
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState('');
    const [details, setDetails] = useState('');
    const [filter, setFilter] = useState('all');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            setLoading(true);
            const response = await apiClient.get('/todos');
            setTasks(response.data);
        } catch (error) {
            setError('タスクの取得に失敗しました');
        } finally {
            setLoading(false);
        }
    };

    const handleLogoutClick = () => {
        localStorage.removeItem('access_token');
        handleLogout();
        // useNavigateを使わずリダイレクト
        window.location.href = '/login';
    };

    const handleAddTask = async (e) => {
        e.preventDefault();
        if (title.length > 25) {
            setError('タイトルは25文字以内で入力してください');
            return;
        }
        if (!title || !details) {
            setError('タイトルと詳細を入力してください');
            return;
        }
        try {
            setError('');
            setLoading(true);
            await apiClient.post('/todos', { title: title.trim(), details: details.trim() });
            await fetchTasks();
            setTitle('');
            setDetails('');
        } catch {
            setError('タスクの作成に失敗しました');
        } finally {
            setLoading(false);
        }
    };

    const handleToggleComplete = async (taskId) => {
        try {
            await apiClient.put(`/todos/${taskId}/toggle`);
            await fetchTasks();
        } catch {
            setError('タスクの状態変更に失敗しました');
        }
    };

    const handleDelete = async (taskId) => {
        if (window.confirm('このタスクを削除しますか？')) {
            try {
                await apiClient.delete(`/todos/${taskId}`);
                await fetchTasks();
            } catch {
                setError('タスクの削除に失敗しました');
            }
        }
    };

    const handleUpdate = async (taskId, newTitle, newDetails) => {
        try {
            await apiClient.put(`/todos/${taskId}`, { title: newTitle.trim(), details: newDetails.trim() });
            await fetchTasks();
        } catch {
            setError('タスクの更新に失敗しました');
        }
    };

    const filteredTasks = tasks.filter((task) => {
        if (filter === 'completed') return task.completed;
        if (filter === 'incomplete') return !task.completed;
        return true;
    });

    const containerStyle = { width: '600px', margin: '0 auto', padding: '20px' };
    const headerStyle = { display: 'flex', justifyContent: 'space-between', marginBottom: '20px' };
    const formStyle = { display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' };
    const inputStyle = { padding: '10px', fontSize: '16px', width: '100%', boxSizing: 'border-box' };
    const errorStyle = { color: 'red', fontSize: '14px' };
    const logoutButtonStyle = { padding: '10px', fontSize: '16px', backgroundColor: '#dc3545', color: '#fff', border: 'none', cursor: 'pointer' };

    return (
        <div style={containerStyle}>
            <header style={headerStyle}>
                <div>{currentUser}でログイン中</div>
                <button style={logoutButtonStyle} onClick={handleLogoutClick}>
                    ログアウト
                </button>
            </header>

            <form style={formStyle} onSubmit={handleAddTask}>
                <input
                    type="text"
                    placeholder="タスクタイトル (25文字以内)"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    style={inputStyle}
                    disabled={loading}
                />
                <textarea
                    placeholder="タスク詳細"
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    style={{ ...inputStyle, height: '120px' }}
                    disabled={loading}
                />
                {error && <p style={errorStyle}>{error}</p>}
                <button 
                    type="submit" 
                    style={{ 
                        padding: '10px', 
                        fontSize: '16px', 
                        backgroundColor: loading ? '#ccc' : '#28a745', 
                        color: '#fff', 
                        border: 'none', 
                        cursor: loading ? 'not-allowed' : 'pointer' 
                    }}
                    disabled={loading}
                >
                    {loading ? '処理中...' : '追加'}
                </button>
            </form>

            <TaskFilter filter={filter} setFilter={setFilter} />
            {loading && <p style={{ textAlign: 'center' }}>読み込み中...</p>}
            <TaskList 
                tasks={filteredTasks} 
                onToggleComplete={handleToggleComplete}
                onDelete={handleDelete}
                onUpdate={handleUpdate}
            />
        </div>
    );
};

export default TodoHome;
