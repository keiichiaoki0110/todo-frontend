import React, { useState } from 'react';

function TodoHome({ onLogout, username }) {
    // タスク一覧を管理する状態
    const [tasks, setTasks] = useState([]);
    // フォーム入力値を管理する状態
    const [title, setTitle] = useState('');
    const [details, setDetails] = useState('');
    // エラーメッセージを管理
    const [error, setError] = useState('');
    // タスク追加成功時の通知を管理
    const [notification, setNotification] = useState('');

    // タスク追加の処理
    const handleAddTask = (e) => {
        e.preventDefault();

        // タイトルのバリデーション
        if (title.trim().length === 0 || title.trim().length > 25) {
            setError('タイトルは1文字以上、25文字以内で入力してください。');
            return;
        }

        // 詳細のバリデーション
        if (details.trim().length === 0) {
            setError('詳細を入力してください。');
            return;
        }

        // バリデーション通過後、エラーをリセット
        setError('');

        // 現在の日時を取得
        const currentDateTime = new Date().toLocaleString();

        // 新しいタスクを作成
        const newTask = {
            id: Date.now(), // 一意のID
            title: title.trim(),
            details: details.trim(),
            createdAt: currentDateTime,
            updatedAt: currentDateTime,
        };

        // タスクリストに追加
        setTasks([...tasks, newTask]);

        // 入力フォームをリセット
        setTitle('');
        setDetails('');

        // 通知を表示
        setNotification('タスクが追加されました！');
        setTimeout(() => setNotification(''), 3000); // 3秒後に通知を非表示
    };

    // ログアウト処理
    const handleLogout = () => {
        // タスクリストをリセット
        setTasks([]);
        // ログアウト関数を実行（親コンポーネントから提供）
        onLogout();
    };

    // ヘッダーのスタイル
    const headerStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
    };

    // ボタンのスタイル
    const buttonStyle = {
        padding: '10px',
        backgroundColor: '#dc3545',
        color: '#fff',
        border: 'none',
        cursor: 'pointer',
        borderRadius: '5px',
    };

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', boxSizing: 'border-box' }}>
            {/* ヘッダー */}
            <header style={headerStyle}>
                <div>
                    {username}でログイン中
                </div>
                <button style={buttonStyle} onClick={handleLogout}>
                    ログアウト
                </button>
            </header>

            {/* タスク追加フォーム */}
            <form onSubmit={handleAddTask} style={{ marginBottom: '20px' }}>
                <input
                    type="text"
                    placeholder="タスクタイトル (25文字以内)"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    style={{
                        width: '100%',
                        padding: '10px',
                        marginBottom: '10px',
                        border: '1px solid #ccc',
                        borderRadius: '5px',
                    }}
                />
                <textarea
                    placeholder="タスク詳細"
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    rows="4"
                    style={{
                        width: '100%',
                        padding: '10px',
                        border: '1px solid #ccc',
                        borderRadius: '5px',
                    }}
                />
                {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
                <button
                    type="submit"
                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#007bff',
                        color: '#fff',
                        border: 'none',
                        cursor: 'pointer',
                        borderRadius: '5px',
                        marginTop: '10px',
                    }}
                >
                    追加
                </button>
            </form>

            {/* 通知表示 */}
            {notification && <p style={{ color: 'green', marginBottom: '20px' }}>{notification}</p>}

            {/* タスクリスト */}
            <ul style={{ listStyle: 'none', padding: 0 }}>
                {tasks.map((task) => (
                    <li
                        key={task.id}
                        style={{
                            borderBottom: '1px solid #ddd',
                            padding: '10px',
                            marginBottom: '10px',
                            borderRadius: '5px',
                            backgroundColor: '#f8f9fa',
                        }}
                    >
                        <h3 style={{ margin: '0 0 5px 0' }}>{task.title}</h3>
                        <p style={{ margin: '0 0 5px 0' }}>{task.details}</p>
                        <small style={{ display: 'block', color: '#888' }}>作成日時: {task.createdAt}</small>
                        <small style={{ display: 'block', color: '#888' }}>更新日時: {task.updatedAt}</small>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TodoHome;
