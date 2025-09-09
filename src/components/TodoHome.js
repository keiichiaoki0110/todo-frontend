import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
    const navigate = useNavigate();
    
    // タスクリストの状態
    const [tasks, setTasks] = useState([]);
    // 入力されたタスクタイトル
    const [title, setTitle] = useState('');
    // 入力されたタスク詳細
    const [details, setDetails] = useState('');
    // フィルタリングの状態('all', 'completed', 'incomplete')
    const [filter, setFilter] = useState('all');
    // エラーメッセージ
    const [error, setError] = useState('');
    // ローディング状態
    const [loading, setLoading] = useState(false);
    
    // コンポーネントマウント時にタスクを取得
    useEffect(() => {
        fetchTasks();
    }, []);

    // タスク一覧を取得する関数
    const fetchTasks = async () => {
        try {
            setLoading(true);
            console.log('📋 タスク一覧を取得中...');
            const response = await apiClient.get('/todos');
            console.log('✅ タスク取得成功:', response.data);
            setTasks(response.data);
        } catch (error) {
            console.error('❌ タスク取得エラー:', error);
            setError('タスクの取得に失敗しました');
        } finally {
            setLoading(false);
        }
    };

    const handleLogoutClick = () => {
        localStorage.removeItem('access_token');
        handleLogout();
        navigate('/login');
    };

    // タスクを追加する関数
    const handleAddTask = async (e) => {
        e.preventDefault();

        // タイトルの文字数制限チェック
        if (title.length > 25) {
            setError('タイトルは25文字以内で入力してください');
            return;
        }

        // 必須項目チェック
        if (!title || !details) {
            setError('タイトルと詳細を入力してください');
            return;
        }

        try {
            setError(''); // エラーをクリア
            setLoading(true);
            
            console.log('➕ タスク作成中...', { title, details });
            const response = await apiClient.post('/todos', {
                title: title.trim(),
                details: details.trim()
            });
            
            console.log('✅ タスク作成成功:', response.data);
            
            // タスクリストを再取得
            await fetchTasks();
            
            // 入力フィールドをリセット
            setTitle('');
            setDetails('');
        } catch (error) {
            console.error('❌ タスク作成エラー:', error);
            setError('タスクの作成に失敗しました');
        } finally {
            setLoading(false);
        }
    };

    // タスクの完了/未完了を切り替える関数
    const handleToggleComplete = async (taskId) => {
        try {
            console.log('🔄 タスク状態切り替え中...', taskId);
            const response = await apiClient.put(`/todos/${taskId}/toggle`);
            console.log('✅ タスク状態切り替え成功:', response.data);
            
            // タスクリストを再取得
            await fetchTasks();
        } catch (error) {
            console.error('❌ タスク状態切り替えエラー:', error);
            setError('タスクの状態変更に失敗しました');
        }
    };

    // タスクを削除する関数
    const handleDelete = async (taskId) => {
        if (window.confirm('このタスクを削除しますか？')) {
            try {
                console.log('🗑️ タスク削除中...', taskId);
                await apiClient.delete(`/todos/${taskId}`);
                console.log('✅ タスク削除成功');
                
                // タスクリストを再取得
                await fetchTasks();
            } catch (error) {
                console.error('❌ タスク削除エラー:', error);
                setError('タスクの削除に失敗しました');
            }
        }
    };

    // タスクを更新する関数
    const handleUpdate = async (taskId, newTitle, newDetails) => {
        try {
            console.log('✏️ タスク更新中...', taskId, { title: newTitle, details: newDetails });
            const response = await apiClient.put(`/todos/${taskId}`, {
                title: newTitle.trim(),
                details: newDetails.trim()
            });
            console.log('✅ タスク更新成功:', response.data);
            
            // タスクリストを再取得
            await fetchTasks();
        } catch (error) {
            console.error('❌ タスク更新エラー:', error);
            setError('タスクの更新に失敗しました');
        }
    };

    // フィルタリングされたタスクリストを取得
    const filteredTasks = tasks.filter((task) => {
        if (filter === 'completed') return task.completed;
        if (filter === 'incomplete') return !task.completed;
        return true;
    });

    // コンポーネントのスタイル設定
    const containerStyle = { width: '600px', margin: '0 auto', padding: '20px' };
    const headerStyle = { display: 'flex', justifyContent: 'space-between', marginBottom: '20px' };
    const formStyle = { display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' };
    const inputStyle = { padding: '10px', fontSize: '16px', width: '100%', boxSizing: 'border-box' };
    const errorStyle = { color: 'red', fontSize: '14px' };
    const logoutButtonStyle = { padding: '10px', fontSize: '16px', backgroundColor: '#dc3545', color: '#fff', border: 'none', cursor: 'pointer' };

    return (
        <div style={containerStyle}>
            {/* ヘッダー: ユーザー名とログアウトボタン */}
            <header style={headerStyle}>
                <div>{currentUser}でログイン中</div>
                <button style={logoutButtonStyle} onClick={handleLogoutClick}>
                    ログアウト
                </button>
            </header>

            {/* タスク追加フォーム */}
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

            {/* フィルタリングボタン */}
            <TaskFilter filter={filter} setFilter={setFilter} />

            {/* ローディング表示 */}
            {loading && <p style={{ textAlign: 'center' }}>読み込み中...</p>}

            {/* タスクリスト */}
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