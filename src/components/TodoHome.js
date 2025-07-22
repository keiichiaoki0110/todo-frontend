import React, { useState } from 'react';
import TaskFilter from './TaskFilter';
import TaskList from './TaskList';

function TodoHome({ onLogout, username }) {
    // タスクリストの状態
    const [tasks, setTasks] = useState([]);
    // 入力されたタスクタイトル
    const [title, setTitle] = useState('');
    // 入力されたタスク詳細
    const [details, setDetails] = useState('');
    // フィルタリングの状態 ('all', 'completed', 'incomplete')
    const [filter, setFilter] = useState('all');
    // エラーメッセージ
    const [error, setError] = useState('');

    // タスクを追加する関数
    const handleAddTask = (e) => {
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

        setError(''); // エラーをクリア

        // 新しいタスクの作成
        const currentDateTime = new Date().toLocaleString();
        const newTask = {
            id: Date.now(), // 一意のIDを生成
            title,
            details,
            createdAt: currentDateTime, // 作成日時
            updatedAt: currentDateTime, // 更新日時
            completed: false, // 初期状態は未完了
        };

        // タスクリストに追加
        setTasks([...tasks, newTask]);
        setTitle(''); // 入力フィールドをリセット
        setDetails('');
    };

    // タスクの完了/未完了を切り替える関数
    const handleToggleComplete = (taskId) => {
        setTasks(
            tasks.map((task) =>
                task.id === taskId
                    ? { ...task, completed: !task.completed, updatedAt: new Date().toLocaleString() } // 状態を反転
                    : task
            )
        );
    };

    // フィルタリングされたタスクリストを取得
    const filteredTasks = tasks.filter((task) => {
        if (filter === 'completed') return task.completed; // 完了タスクのみ
        if (filter === 'incomplete') return !task.completed; // 未完了タスクのみ
        return true; // 全タスク
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
            {/* ヘッダー: ユーザー情報とログアウトボタン */}
            <header style={headerStyle}>
                <div>{username}でログイン中</div>
                <button style={logoutButtonStyle} onClick={onLogout}>
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
                />
                <textarea
                    placeholder="タスク詳細"
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    style={{ ...inputStyle, height: '120px' }}
                />
                {error && <p style={errorStyle}>{error}</p>}
                <button type="submit" style={{ padding: '10px', fontSize: '16px', backgroundColor: '#28a745', color: '#fff', border: 'none', cursor: 'pointer' }}>
                    追加
                </button>
            </form>

            {/* フィルタリングボタン */}
            <TaskFilter filter={filter} setFilter={setFilter} />

            {/* タスクリスト */}
            <TaskList tasks={filteredTasks} onToggleComplete={handleToggleComplete} />
        </div>
    );
}

export default TodoHome;
